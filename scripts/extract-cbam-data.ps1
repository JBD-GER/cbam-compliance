param(
  [Parameter(Mandatory = $true)]
  [string]$DefaultValuesPath,
  [Parameter(Mandatory = $true)]
  [string]$BenchmarksPath,
  [string]$OutPath = "public/data/cbam-calculator-data.json"
)

Add-Type -AssemblyName System.IO.Compression.FileSystem

function Get-ZipText($zip, [string]$name) {
  $entry = $zip.GetEntry($name)
  if (-not $entry) { return $null }
  $reader = [System.IO.StreamReader]::new($entry.Open())
  try { return $reader.ReadToEnd() } finally { $reader.Close() }
}

function Get-SharedStrings($zip) {
  $text = Get-ZipText $zip "xl/sharedStrings.xml"
  $strings = New-Object System.Collections.Generic.List[string]
  if (-not $text) { return $strings }

  [xml]$xml = $text
  $ns = [System.Xml.XmlNamespaceManager]::new($xml.NameTable)
  $ns.AddNamespace("x", "http://schemas.openxmlformats.org/spreadsheetml/2006/main")

  foreach ($si in $xml.SelectNodes("//x:si", $ns)) {
    $parts = $si.SelectNodes(".//x:t", $ns) | ForEach-Object { $_.'#text' }
    $strings.Add(($parts -join ""))
  }
  return $strings
}

function Get-CellText($cell, $sharedStrings, $ns) {
  $type = $cell.GetAttribute("t")
  if ($type -eq "s") {
    $value = $cell.SelectSingleNode("x:v", $ns)
    if ($value) { return $sharedStrings[[int]$value.InnerText] }
  }
  if ($type -eq "inlineStr") {
    return (($cell.SelectNodes(".//x:t", $ns) | ForEach-Object { $_.'#text' }) -join "")
  }
  $raw = $cell.SelectSingleNode("x:v", $ns)
  if ($raw) { return $raw.InnerText }
  return ""
}

function Convert-ToNumber($value) {
  if ($null -eq $value) { return $null }
  $text = "$value".Trim()
  if ($text -eq "" -or $text -eq "N/A" -or $text -eq "see below") { return $null }
  $number = 0.0
  if ([double]::TryParse($text, [System.Globalization.NumberStyles]::Float, [System.Globalization.CultureInfo]::InvariantCulture, [ref]$number)) {
    return [Math]::Round($number, 6)
  }
  return $null
}

function Normalize-Cn($value) {
  return ("$value" -replace "\s", "").Trim()
}

function Read-SheetRows($zip, [string]$sheetPath) {
  $shared = Get-SharedStrings $zip
  [xml]$xml = Get-ZipText $zip $sheetPath
  $ns = [System.Xml.XmlNamespaceManager]::new($xml.NameTable)
  $ns.AddNamespace("x", "http://schemas.openxmlformats.org/spreadsheetml/2006/main")

  $rows = New-Object System.Collections.Generic.List[object]
  foreach ($row in $xml.SelectNodes("//x:sheetData/x:row", $ns)) {
    $values = New-Object System.Collections.Generic.List[string]
    foreach ($cell in $row.SelectNodes("x:c", $ns)) {
      $values.Add((Get-CellText $cell $shared $ns))
    }
    $rows.Add($values.ToArray())
  }
  return $rows
}

function Get-WorkbookSheetMap($zip) {
  [xml]$workbook = Get-ZipText $zip "xl/workbook.xml"
  [xml]$rels = Get-ZipText $zip "xl/_rels/workbook.xml.rels"
  $relMap = @{}
  foreach ($rel in $rels.Relationships.Relationship) {
    $relMap[$rel.Id] = "xl/$($rel.Target)"
  }

  $sheets = New-Object System.Collections.Generic.List[object]
  foreach ($sheet in $workbook.workbook.sheets.sheet) {
    $sheets.Add([pscustomobject]@{
      Name = $sheet.name
      Path = $relMap[$sheet.id]
    })
  }
  return $sheets
}

function Read-Benchmarks($path) {
  $zip = [System.IO.Compression.ZipFile]::OpenRead($path)
  try {
    $sheets = Get-WorkbookSheetMap $zip
    $sheet = $sheets | Where-Object { $_.Name -eq "Benchmarks" } | Select-Object -First 1
    $rows = Read-SheetRows $zip $sheet.Path
    $benchmarks = @{}
    $lastCn = ""
    $lastDescription = ""

    foreach ($row in $rows) {
      if ($row.Count -lt 6) { continue }
      $cn = Normalize-Cn $row[0]
      $description = "$($row[1])".Trim()
      if ($cn -match "^\d{4,10}$") {
        $lastCn = $cn
        $lastDescription = $description
      } elseif ($cn -eq "" -and $lastCn -ne "") {
        $cn = $lastCn
        if ($description -eq "") { $description = $lastDescription }
      } else {
        continue
      }

      $bmA = Convert-ToNumber $row[2]
      $routeA = "$($row[3])".Trim()
      $bmB = Convert-ToNumber $row[4]
      $routeB = "$($row[5])".Trim()

      if (-not $benchmarks.ContainsKey($cn)) {
        $benchmarks[$cn] = New-Object System.Collections.Generic.List[object]
      }

      if ($null -ne $bmA) {
        $benchmarks[$cn].Add([pscustomobject]@{
          benchmark = $bmA
          route = $routeA
          column = "A"
        })
      }
      if ($null -ne $bmB) {
        $benchmarks[$cn].Add([pscustomobject]@{
          benchmark = $bmB
          route = $routeB
          column = "B"
        })
      }
    }

    return ,$benchmarks
  } finally {
    $zip.Dispose()
  }
}

function Pick-Benchmark($benchmarks, [string]$cn, [string]$route) {
  if (-not $benchmarks.ContainsKey($cn)) { return $null }
  $items = @($benchmarks[$cn].ToArray())
  $routeText = "$route".Trim()
  if ($routeText -ne "" -and $routeText -ne " ") {
    $matched = $items | Where-Object { $_.route -eq $routeText } | Select-Object -First 1
    if ($matched) { return $matched.benchmark }
  }
  $preferred = $items | Where-Object { $_.column -eq "B" } | Select-Object -First 1
  if ($preferred) { return $preferred.benchmark }
  return ($items | Select-Object -First 1).benchmark
}

$benchmarks = Read-Benchmarks $BenchmarksPath

$zip = [System.IO.Compression.ZipFile]::OpenRead($DefaultValuesPath)
try {
  $sheets = Get-WorkbookSheetMap $zip | Where-Object {
    $_.Name -notin @("Overview", "Version History")
  }

  $countries = New-Object System.Collections.Generic.List[string]
  $productsByCountry = @{}
  $indexByCn = @{}

  foreach ($sheet in $sheets) {
    $country = $sheet.Name
    $countries.Add($country)
    $rows = Read-SheetRows $zip $sheet.Path
    $currentCategory = ""
    $products = New-Object System.Collections.Generic.List[object]

    foreach ($row in $rows) {
      if ($row.Count -lt 8) { continue }
      $first = "$($row[0])".Trim()

      if ($first -ne "" -and $first -notmatch "^\d") {
        $currentCategory = $first
        continue
      }

      $cn = Normalize-Cn $first
      if ($cn -notmatch "^\d{4,10}$") { continue }

      $description = "$($row[1])".Trim()
      $direct = Convert-ToNumber $row[2]
      $indirect = Convert-ToNumber $row[3]
      $total = Convert-ToNumber $row[4]
      $dv2026 = Convert-ToNumber $row[5]
      $dv2027 = Convert-ToNumber $row[6]
      $dv2028 = Convert-ToNumber $row[7]
      $route = if ($row.Count -gt 8) { "$($row[8])".Trim() } else { "" }

      if ($null -eq $dv2026 -and $null -eq $total) { continue }

      $benchmark = Pick-Benchmark $benchmarks $cn $route
      $record = [pscustomobject]@{
        cn = $cn
        category = $currentCategory
        description = $description
        direct = $direct
        indirect = $indirect
        total = $total
        dv2026 = $dv2026
        dv2027 = $dv2027
        dv2028 = $dv2028
        route = $route
        benchmark = $benchmark
      }
      $products.Add($record)

      if (-not $indexByCn.ContainsKey($cn)) {
        $indexByCn[$cn] = [pscustomobject]@{
          cn = $cn
          category = $currentCategory
          description = $description
          benchmark = $benchmark
        }
      }
    }

    $productsByCountry[$country] = $products
  }

  $outDir = Split-Path -Parent $OutPath
  if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

  $payload = [pscustomobject]@{
    generatedAt = (Get-Date).ToString("s")
    certificatePrice2026 = 75.36
    cbamFactor2026 = 0.025
    freeAllocation2026 = 0.975
    countries = @($countries | Sort-Object)
    cnIndex = @($indexByCn.Values | Sort-Object cn)
    productsByCountry = $productsByCountry
  }

  $json = $payload | ConvertTo-Json -Depth 8 -Compress
  [System.IO.File]::WriteAllText((Resolve-Path ".").Path + "\" + $OutPath, $json, [System.Text.Encoding]::UTF8)
  Write-Output "Wrote $OutPath"
  Write-Output "Countries: $($countries.Count)"
  Write-Output "CN index: $($indexByCn.Count)"
} finally {
  $zip.Dispose()
}
