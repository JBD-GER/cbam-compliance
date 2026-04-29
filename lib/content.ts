export type Service = {
  title: string;
  href: string;
  description: string;
  features: string[];
  cta: string;
  badge?: string;
};

export const mainServices: Service[] = [
  {
    title: "CBAM-Betroffenheitsanalyse",
    href: "/leistungen/cbam-betroffenheitsanalyse",
    description: "Für Unternehmen, die wissen möchten, ob und in welchem Umfang CBAM für ihre Importstruktur relevant ist.",
    features: [
      "Prüfung Ihrer Importdaten",
      "Analyse der KN-/CN-Codes",
      "Prüfung der Ursprungsländer",
      "Bewertung der 50-Tonnen-Schwelle",
      "Übersicht betroffener Produkte und Lieferanten",
      "Handlungsempfehlung als PDF"
    ],
    cta: "Analyse anfragen"
  },
  {
    title: "CBAM-Readiness-Dienstleistung",
    href: "/leistungen/cbam-readiness",
    description: "Für Unternehmen, die CBAM strukturiert in Einkauf, Zoll, Buchhaltung und Geschäftsführung vorbereiten möchten.",
    features: [
      "Vollständige Import- und Warengruppenanalyse",
      "CBAM-Risikomatrix",
      "Aufbau einer CBAM-Datenstruktur",
      "Lieferantenliste mit Datenanforderungen",
      "Vorbereitung der Registrierung",
      "Management Summary für die Geschäftsführung"
    ],
    cta: "Readiness anfragen",
    badge: "Hauptangebot"
  },
  {
    title: "Laufende CBAM-Begleitung",
    href: "/leistungen/laufende-begleitung",
    description: "Für Unternehmen mit regelmäßigen Importen, wechselnden Lieferanten oder wiederkehrenden CBAM-relevanten Warenbewegungen.",
    features: [
      "Monatliche Importdatenprüfung",
      "Prüfung neuer KN-/CN-Codes",
      "Nachhalten von Lieferantendaten",
      "Aktualisierung des CBAM-Datenraums",
      "Fristenüberwachung",
      "Vorbereitung der Jahreserklärung"
    ],
    cta: "Begleitung anfragen"
  }
];

export const allServices = [
  {
    title: "CBAM-Betroffenheitsanalyse",
    href: "/leistungen/cbam-betroffenheitsanalyse",
    description: "Wir prüfen, ob Ihre Importdaten, Waren, Ursprungsländer und Mengen in den CBAM-Anwendungsbereich fallen."
  },
  {
    title: "CBAM-Readiness-Dienstleistung",
    href: "/leistungen/cbam-readiness",
    description: "Wir bauen eine strukturierte CBAM-Daten- und Prozessgrundlage für Ihr Unternehmen auf."
  },
  {
    title: "Lieferanten-Datendienstleistung",
    href: "/leistungen/lieferanten-datenpaket",
    description: "Wir strukturieren die Kommunikation mit relevanten Lieferanten und bereiten Emissionsdaten verwertbar auf."
  },
  {
    title: "CBAM-Registrierungsvorbereitung",
    href: "/leistungen/cbam-registrierungsvorbereitung",
    description: "Wir bereiten die organisatorischen Angaben und Voraussetzungen für den Registrierungsprozess vor."
  },
  {
    title: "Laufende CBAM-Begleitung",
    href: "/leistungen/laufende-begleitung",
    description: "Wir begleiten Ihre CBAM-Prozesse laufend und halten Daten, Fristen und Lieferanteninformationen aktuell."
  }
];

export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  summary: string;
  situation: string;
  approach: string[];
  result: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "stahlimporte-cn-code-analyse",
    title: "Stahlimporte: CN-Code-Analyse und Berichtsvorbereitung",
    sector: "Eisen & Stahl",
    summary:
      "Für einen Importeur wurden Importdaten strukturiert, potenziell CBAM-relevante CN-Codes identifiziert und Berichtsgrundlagen vorbereitet.",
    situation:
      "Das Unternehmen importierte regelmäßig stahlnahe Waren aus Drittstaaten. Die relevanten Informationen lagen verteilt in Zollunterlagen, Einkaufsdaten und Lieferantenlisten vor.",
    approach: [
      "Importdaten nach CN-Codes, Ursprungsländern, Lieferanten und Mengen strukturiert",
      "CBAM-relevante Positionen markiert und Datenlücken dokumentiert",
      "Berichtsvorlagen und interne Übersichten für die weitere Abstimmung erstellt",
      "Offene Punkte für Lieferanten- beziehungsweise Händlerverifizierung vorbereitet"
    ],
    result:
      "Das Unternehmen verfügt über eine nachvollziehbare Arbeitsgrundlage für interne Abstimmungen. Die Verifizierung einzelner Händler- und Lieferantenangaben läuft weiter; formale Berichtspflichten und Abgaben werden im vorgesehenen regulatorischen Zeitfenster vorbereitet."
  },
  {
    slug: "aluminium-lieferantendaten",
    title: "Aluminium: Lieferantendaten und Emissionswerte strukturiert",
    sector: "Aluminium",
    summary:
      "Bei wiederkehrenden Aluminiumimporten wurden Lieferanteninformationen gebündelt und mit den Importpositionen verknüpft.",
    situation:
      "Die Einkaufsabteilung hatte mehrere Lieferantenkontakte, aber keine einheitliche Übersicht über benötigte Emissionsinformationen, Ansprechpartner und Rückmeldestatus.",
    approach: [
      "Lieferantenliste mit relevanten Warenpositionen aufgebaut",
      "Datenanforderungen für Emissionswerte und Nachweise vorbereitet",
      "Rückmeldungen in eine prüfbare Struktur überführt",
      "Berichte für die interne CBAM-Vorbereitung zusammengestellt"
    ],
    result:
      "Die Lieferantenkommunikation ist dokumentiert und auswertbar. Einzelne Angaben warten noch auf Bestätigung beziehungsweise Verifizierung durch Händler und Lieferanten."
  },
  {
    slug: "zement-datenraum",
    title: "Zementwaren: Datenraum für CBAM-relevante Importe",
    sector: "Zement",
    summary:
      "Für zementnahe Waren wurde ein CBAM-Datenraum aufgebaut, um Mengen, Ursprung und Emissionsinformationen konsistent nachzuhalten.",
    situation:
      "Die Datenlage war grundsätzlich vorhanden, aber nicht in einer Form, die für wiederkehrende CBAM-Prüfungen und Berichtsvorbereitung effizient nutzbar war.",
    approach: [
      "Warengruppen und CN-Codes konsolidiert",
      "Ursprungsländer und Importmengen je Zeitraum ausgewertet",
      "Standardwerte, verfügbare Lieferantendaten und offene Nachweise getrennt dargestellt",
      "Management-Übersicht und operative Arbeitsliste erstellt"
    ],
    result:
      "Die relevanten Warenbewegungen können laufend geprüft werden. Die Berichtsvorbereitung ist angelegt; finale Bewertungen und spätere Abgaben erfolgen erst nach weiterer Daten- und Verifizierungsprüfung."
  },
  {
    slug: "mittelstand-cbam-readiness",
    title: "Mittelstand: CBAM-Readiness für Einkauf, Zoll und Finanzen",
    sector: "Mehrere Warengruppen",
    summary:
      "Ein mittelständisches Unternehmen erhielt eine abteilungsübergreifende CBAM-Struktur mit Verantwortlichkeiten, Datenübersichten und Berichtsvorbereitung.",
    situation:
      "Einkauf, Zoll und Finanzbereich arbeiteten mit unterschiedlichen Datenausschnitten. Für die Geschäftsführung fehlte eine klare Sicht auf Umfang, offene Punkte und nächste Schritte.",
    approach: [
      "Importdaten über mehrere Abteilungen zusammengeführt",
      "CBAM-relevante Waren und Lieferanten priorisiert",
      "Rollen, Zuständigkeiten und Rückfragewege dokumentiert",
      "Berichte und Management Summary für die weitere Vorbereitung erstellt"
    ],
    result:
      "Das Unternehmen kann CBAM-Themen strukturierter steuern. Aktuell stehen weitere Lieferanten- und Händlerverifizierungen aus; die formale Abgabe beziehungsweise weitergehende Einreichungen werden für die Regelphase vorbereitet."
  }
];

export const faqItems = [
  {
    question: "Was ist CBAM?",
    answer:
      "CBAM steht für Carbon Border Adjustment Mechanism. Das Instrument betrifft bestimmte emissionsintensive Waren, die aus Drittstaaten in die EU eingeführt werden. Für Importeure entstehen dadurch zusätzliche Daten-, Melde- und Vorbereitungsanforderungen."
  },
  {
    question: "Für welche Unternehmen ist CBAM relevant?",
    answer:
      "Relevant kann CBAM für Unternehmen sein, die unter anderem Eisen, Stahl, Aluminium, Zement, Düngemittel, Wasserstoff oder Strom aus Nicht-EU-Ländern importieren. Entscheidend sind konkrete Waren, KN-/CN-Codes, Ursprungsländer und Mengen."
  },
  {
    question: "Prüfen Sie auch KN- und CN-Codes?",
    answer:
      "Wir analysieren die bereitgestellten Importdaten und strukturieren KN-/CN-Codes für die CBAM-Prüfung. Eine finale zollrechtliche Einreihung oder verbindliche Bewertung erfolgt bei Bedarf durch Ihre Zollberatung."
  },
  {
    question: "Können Sie die Registrierung als CBAM-Anmelder übernehmen?",
    answer:
      "Wir bereiten organisatorische Angaben, Datenräume und interne Voraussetzungen für den Registrierungsprozess vor. Die rechtliche oder zollrechtliche Bewertung und formale Verantwortung verbleibt beim Unternehmen beziehungsweise bei den beauftragten Beratern."
  },
  {
    question: "Ist das Rechts- oder Zollberatung?",
    answer:
      "Nein. CBAM-Compliance.de erbringt keine Rechts-, Steuer- oder Zollberatung. Unsere Arbeit liegt in der datenbasierten Analyse, organisatorischen Vorbereitung, Prozessstrukturierung und Lieferantenkommunikation."
  },
  {
    question: "Wie wird der Umfang der CBAM-Betroffenheitsanalyse festgelegt?",
    answer:
      "Der konkrete Umfang hängt von Datenlage, Anzahl der Gesellschaften, Importvolumen, Warengruppen und Lieferantenstruktur ab. Nach dem Erstgespräch erhalten Sie eine transparente Einschätzung des sinnvollen Vorgehens."
  },
  {
    question: "Wie schnell kann die Analyse starten?",
    answer:
      "Nach einem Erstgespräch und der Bereitstellung der relevanten Importdaten kann die Analyse in der Regel kurzfristig starten. Den konkreten Zeitplan stimmen wir anhand Ihrer Datenlage ab."
  },
  {
    question: "Können Sie auch Lieferantendaten strukturieren?",
    answer:
      "Ja. Wir unterstützen bei der Übersicht relevanter Lieferanten, der Definition benötigter Informationen, der Kommunikation von Datenanforderungen und der verwertbaren Aufbereitung eingehender Rückmeldungen."
  }
];

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  intro: string;
  sections: {
    title: string;
    paragraphs: string[];
    image?: {
      src: string;
      alt: string;
    };
    links?: {
      label: string;
      href: string;
    }[];
  }[];
  sources?: {
    label: string;
    href: string;
  }[];
};

export const articles: Article[] = [
  {
    slug: "cbam-lexikon-sop-importeure",
    title: "CBAM-Lexikon und SOP für Importeure: Pflichten, Waren, Kosten und nächste Schritte",
    description:
      "Das große CBAM-Lexikon für Importeure: Für wen CBAM gilt, welche Waren betroffen sind, welche Regelungen relevant sind, wie Kosten entstehen und wie Unternehmen ihre Daten strukturiert vorbereiten.",
    date: "2026-04-27",
    readingTime: "22 Min.",
    category: "CBAM-Lexikon",
    intro:
      "CBAM wirkt auf den ersten Blick wie ein reines Zollthema. In der Praxis ist es ein wiederkehrender Compliance-Prozess für Einkauf, Zoll, Finanzen, Nachhaltigkeit und Geschäftsführung. Dieses Lexikon bündelt die wichtigsten Fragen und dient als SOP für Unternehmen, die ihre CBAM-Betroffenheit prüfen, Daten sortieren, Lieferanten einbinden und mögliche Zertifikatskosten vorbereiten möchten.",
    sections: [
      {
        title: "Kurzdefinition: Was ist CBAM?",
        paragraphs: [
          "CBAM steht für Carbon Border Adjustment Mechanism, also den CO2-Grenzausgleichsmechanismus der Europäischen Union. Betroffen sind bestimmte emissionsintensive Waren, die aus Drittstaaten in die EU eingeführt werden.",
          "Der Mechanismus soll verhindern, dass CO2-intensive Produktion aus der EU in Länder mit geringerer CO2-Bepreisung verlagert wird. Für Importeure bedeutet CBAM vor allem: Waren prüfen, Emissionen ermitteln, Lieferantendaten einholen, Fristen beachten und ab der Regelphase Zertifikatspflichten vorbereiten.",
          "CBAM ersetzt keine klassische Zollabwicklung. Es ergänzt sie um eine zusätzliche Klima- und Emissionslogik, die eng an Warencodes, Ursprungsländer, Nettomassen und eingebettete Emissionen gekoppelt ist."
        ],
        image: {
          src: "/images/import_hamburg.jpg",
          alt: "Containerschiff im Hafen als Einstieg in das CBAM-Lexikon für Importeure"
        }
      },
      {
        title: "Für wen gilt CBAM?",
        paragraphs: [
          "CBAM kann für Unternehmen relevant sein, die CBAM-Waren aus Nicht-EU-Ländern in die EU einführen. Entscheidend ist nicht die Branche des Unternehmens, sondern die konkrete Kombination aus Ware, KN- beziehungsweise CN-Code, Ursprung, Menge und Einfuhrvorgang.",
          "Typische betroffene Rollen sind Importeure, indirekte Zollvertreter, Einkaufsabteilungen, Zollabteilungen, Finanzbereiche, Nachhaltigkeitsteams und Geschäftsführungen. Auch Unternehmen, die nur gelegentlich relevante Waren importieren, sollten prüfen, ob Schwellenwerte oder Sonderregeln greifen.",
          "Besonders wichtig: CBAM betrifft nicht nur große Industrieunternehmen. Auch mittelständische Handels-, Produktions- und Projektunternehmen können betroffen sein, wenn sie relevante Vormaterialien, Bauteile oder Waren aus Drittstaaten beziehen."
        ],
        links: [
          {
            label: "CBAM-Betroffenheit prüfen lassen",
            href: "/leistungen/cbam-betroffenheitsanalyse"
          },
          {
            label: "Beratung anfragen",
            href: "/beratung"
          }
        ]
      },
      {
        title: "Welche Warengruppen sind grundsätzlich relevant?",
        paragraphs: [
          "Der CBAM-Anwendungsbereich umfasst derzeit insbesondere Eisen und Stahl, Aluminium, Zement, Düngemittel, Wasserstoff und Strom. Innerhalb dieser Gruppen kommt es auf konkrete KN-/CN-Codes an. Eine grobe Warenbeschreibung reicht für eine belastbare Prüfung nicht aus.",
          "Für Unternehmen ist deshalb der erste operative Schritt eine Warencode-Liste aus den Importdaten. Diese Liste sollte mit Warenbeschreibung, Ursprungsländern, Lieferanten, Mengen, Zeiträumen und Zollbelegen verbunden werden.",
          "Wenn Warencodes unklar, uneinheitlich oder historisch gewachsen sind, sollte das früh markiert werden. Die finale zollrechtliche Einreihung ist ein eigenes Thema und sollte bei Bedarf mit Zollberatung geklärt werden."
        ],
        image: {
          src: "/images/import.jpg",
          alt: "Containerterminal als Symbol für CBAM-relevante Warengruppen und Importdaten"
        }
      },
      {
        title: "Welche Regelungen und Phasen gibt es?",
        paragraphs: [
          "Der zentrale Rechtsrahmen ist die CBAM-Verordnung (EU) 2023/956. Daneben gibt es Durchführungsrechtsakte und praktische Vorgaben der EU-Kommission, etwa zu Berichten, Register, Zertifikatspreisen und Emissionsberechnung.",
          "Die Übergangsphase diente vor allem der Meldung und Datensammlung. In der Regelphase stehen Zulassung, CBAM-Erklärungen, geprüfte Emissionsdaten und CBAM-Zertifikate stärker im Mittelpunkt.",
          "Für Unternehmen ist wichtig, die regulatorischen Begriffe in operative Arbeit zu übersetzen: Welche Daten müssen aus welchem System kommen? Wer fragt Lieferanten an? Wer prüft Emissionswerte? Wer behält Fristen und Zuständigkeiten im Blick?"
        ],
        links: [
          {
            label: "Artikel zu CBAM-Zertifikaten und Terminen",
            href: "/ratgeber/cbam-zertifikate-verkauf-termine-2027"
          },
          {
            label: "Registrierung vorbereiten",
            href: "/leistungen/cbam-registrierungsvorbereitung"
          }
        ]
      },
      {
        title: "Was ist die 50-Tonnen-Schwelle?",
        paragraphs: [
          "Die 50-Tonnen-Schwelle ist für viele Importeure ein zentraler Prüfpunkt. Sie bezieht sich auf bestimmte CBAM-Waren pro Kalenderjahr und kann darüber entscheiden, ob Unternehmen weitere Anforderungen wie eine Zulassung als CBAM-Anmelder berücksichtigen müssen.",
          "Die Schwelle sollte nicht pauschal geschätzt werden. Unternehmen brauchen eine nachvollziehbare Auswertung nach Kalenderjahr, Warencodes, Nettomasse, Ursprungsländern und betroffenen Gesellschaften.",
          "Strom und Wasserstoff sind gesondert zu betrachten. Gerade bei Unternehmensgruppen, mehreren Importeuren oder indirekten Importstrukturen sollte die Auswertung sauber dokumentiert werden."
        ]
      },
      {
        title: "Was ist mit Produkten, die CBAM-Bestandteile nur teilweise enthalten?",
        paragraphs: [
          "Viele Praxisfragen entstehen bei Produkten, die nur teilweise Materialien aus den CBAM-Bereichen enthalten, etwa Komponenten mit Stahl- oder Aluminiumanteilen. Entscheidend ist nicht der umgangssprachliche Materialanteil allein, sondern ob die konkret eingeführte Ware mit ihrem KN-/CN-Code in den CBAM-Anwendungsbereich fällt.",
          "Ein Produkt kann Stahl enthalten und dennoch nicht automatisch CBAM-pflichtig sein. Umgekehrt kann eine scheinbar einfache Ware aufgrund ihres Codes relevant sein. Deshalb gehört die Prüfung immer an die konkrete Einfuhrposition, nicht nur an Produktnamen oder technische Beschreibungen.",
          "Für gemischte Waren empfiehlt sich eine Arbeitsliste mit Produktname, Warencode, Materialhinweisen, Lieferant, Ursprung, Nettomasse und offenem Klärungsstatus. Unklare Fälle sollten separat markiert und bei Bedarf fachlich geprüft werden."
        ],
        image: {
          src: "/images/compliance.jpg",
          alt: "Unterlagen und Datenanalyse als Kontext für gemischte Produkte mit möglichen CBAM-Anteilen"
        }
      },
      {
        title: "Welche Daten brauchen Importeure zuerst?",
        paragraphs: [
          "Am Anfang stehen Importdaten: Zollanmeldungen, Warennummern, Warenbeschreibungen, Ursprungsländer, Nettomassen, Lieferanten, Zeiträume, Rechnungsbezug und interne Artikelnummern. Ohne diese Grundlage bleibt CBAM zu abstrakt.",
          "Danach folgt die CBAM-Markierung: Welche Positionen sind potenziell relevant? Welche Länder sind Drittstaaten? Welche Mengen laufen pro Jahr auf? Welche Lieferanten müssen Emissionsdaten liefern?",
          "Eine gute SOP trennt dabei zwischen gesicherten Informationen, offenen Datenlücken und fachlich zu prüfenden Annahmen. Das macht die Abstimmung mit Geschäftsführung, Einkauf, Zoll und externen Beratern deutlich effizienter."
        ],
        links: [
          {
            label: "Readiness-Prozess aufbauen",
            href: "/leistungen/cbam-readiness"
          },
          {
            label: "Ratgeber: Betroffenheit prüfen",
            href: "/ratgeber/cbam-betroffenheit-pruefen"
          }
        ]
      },
      {
        title: "Wie teuer wird CBAM?",
        paragraphs: [
          "CBAM-Kosten hängen vor allem von eingebetteten Emissionen, anrechenbaren CO2-Preisen im Herkunftsland, Benchmarks, Zertifikatspreisen, Mengen und Datenqualität ab. Eine pauschale Euro-Antwort ist seriös kaum möglich.",
          "Für eine erste Orientierung sollten Unternehmen Szenarien rechnen: Welche Mengen sind betroffen? Welche Standardwerte oder tatsächlichen Emissionswerte liegen vor? Welcher Zertifikatspreis wird angesetzt? Welche Daten fehlen noch?",
          "Unser Kostenrechner hilft, Größenordnungen sichtbar zu machen. Er ersetzt keine rechtliche, steuerliche oder zollrechtliche Bewertung, eignet sich aber gut, um intern über Risiko, Budget und Datenbedarf zu sprechen."
        ],
        image: {
          src: "/images/computer.jpg",
          alt: "Laptop mit Datenauswertung als Symbol für CBAM-Kostenrechnung und Szenarien"
        },
        links: [
          {
            label: "CBAM-Kostenrechner öffnen",
            href: "/cbam-kostenrechner"
          },
          {
            label: "Artikel zum ersten Zertifikatspreis 2026",
            href: "/ratgeber/erster-cbam-zertifikatspreis-q1-2026"
          }
        ]
      },
      {
        title: "Was sind eingebettete Emissionen?",
        paragraphs: [
          "Eingebettete Emissionen sind die Emissionen, die mit der Herstellung der importierten CBAM-Waren verbunden sind. Sie werden häufig auch als graue Emissionen bezeichnet.",
          "In der Praxis müssen Unternehmen unterscheiden, ob tatsächliche Emissionsdaten vom Hersteller vorliegen, ob Standardwerte genutzt werden oder ob Angaben noch fehlen. Jede Variante hat Auswirkungen auf Datenqualität, Nachweise und spätere Kostenabschätzung.",
          "Lieferantenangaben sollten nicht nur gesammelt, sondern den richtigen Waren, Zeiträumen, Anlagen und Nachweisen zugeordnet werden. Genau hier entstehen in vielen Unternehmen die größten operativen Reibungsverluste."
        ]
      },
      {
        title: "Wie läuft Lieferantenkommunikation sinnvoll ab?",
        paragraphs: [
          "Lieferantenkommunikation sollte strukturiert, konkret und nachverfolgbar sein. Allgemeine Mails mit der Bitte um CBAM-Daten führen häufig zu unvollständigen oder nicht nutzbaren Antworten.",
          "Eine gute Anfrage enthält betroffene Waren, relevante Zeiträume, benötigte Datenfelder, gewünschtes Format, Frist, Ansprechpartner und Hinweis auf Nachweise. Eingehende Antworten sollten mit Status, Rückfragen und Plausibilität in einer zentralen Übersicht erfasst werden.",
          "Priorisieren Sie Lieferanten nach Volumen, CBAM-Relevanz und Datenlücke. So wird zuerst dort gearbeitet, wo der größte Einfluss auf Bericht, Kosten und Risiko liegt."
        ],
        links: [
          {
            label: "Lieferanten-Datendienstleistung ansehen",
            href: "/leistungen/lieferanten-datenpaket"
          },
          {
            label: "Ratgeber zu Lieferantendaten",
            href: "/ratgeber/lieferantendaten-cbam-strukturieren"
          }
        ]
      },
      {
        title: "SOP: Der praktische CBAM-Ablauf in 12 Schritten",
        paragraphs: [
          "1. Importdaten für den relevanten Zeitraum exportieren. 2. KN-/CN-Codes, Warenbeschreibungen, Ursprungsländer und Nettomassen normalisieren. 3. Potenziell CBAM-relevante Codes markieren. 4. Drittstaatenbezug prüfen. 5. Mengen und Schwellenwerte je Kalenderjahr auswerten. 6. Lieferanten und Hersteller identifizieren.",
          "7. Datenlücken je Ware und Lieferant erfassen. 8. Lieferantenanfragen mit klaren Datenfeldern versenden. 9. Rückmeldungen dokumentieren und plausibilisieren. 10. Kosten- und Emissionsszenarien vorbereiten. 11. Zuständigkeiten, Fristen und Freigaben intern festlegen. 12. Ergebnisse regelmäßig aktualisieren und für Registrierung, Erklärung oder Beratung bereithalten.",
          "Dieser Ablauf ist bewusst operativ formuliert. Er ersetzt keine rechtliche oder zollrechtliche Bewertung, sorgt aber dafür, dass Fachentscheidungen auf einer sauberen Datenbasis stattfinden."
        ],
        image: {
          src: "/images/office.jpg",
          alt: "Arbeitsplatz als Symbol für strukturierte CBAM-SOP und interne Zuständigkeiten"
        }
      },
      {
        title: "Welche internen Rollen sollten beteiligt sein?",
        paragraphs: [
          "Einkauf kennt Lieferanten und Vertragsbeziehungen. Zoll kennt Warencodes und Einfuhrprozesse. Finanzen braucht Kosten- und Rückstellungsinformationen. Nachhaltigkeit oder Compliance bewerten Emissionsdaten und Dokumentationsanforderungen. Die Geschäftsführung braucht eine verdichtete Risikosicht.",
          "CBAM scheitert selten an einer einzelnen Information. Häufig scheitert es daran, dass Informationen in verschiedenen Abteilungen liegen und niemand die Gesamtstruktur verantwortet.",
          "Deshalb sollte früh festgelegt werden, wer Daten liefert, wer prüft, wer Lieferanten nachhält, wer externe Berater einbindet und wer Entscheidungen freigibt."
        ]
      },
      {
        title: "Welche Fehler passieren häufig?",
        paragraphs: [
          "Häufige Fehler sind: nur nach Produktnamen statt nach Warencodes prüfen, Ursprungsländer nicht sauber auswerten, Nettomassen nicht konsolidieren, Lieferanten zu spät anfragen, Rückmeldungen in E-Mails liegen lassen und Kosten erst kurz vor Fristen betrachten.",
          "Ein weiterer Fehler ist die Vermischung von Annahmen und gesicherten Daten. Für CBAM braucht es eine klare Trennung zwischen Fakten, offenen Punkten und zu prüfenden Fachfragen.",
          "Auch eine reine Einmalliste reicht selten aus. CBAM ist ein laufender Prozess, weil neue Importe, Lieferanten, Codes, Mengen und regulatorische Details hinzukommen können."
        ]
      },
      {
        title: "Was sollte die Geschäftsführung wissen?",
        paragraphs: [
          "Die Geschäftsführung braucht keine Detailtabelle mit jeder einzelnen Zollposition. Sie braucht eine klare Übersicht über betroffene Warengruppen, Volumen, Lieferanten, Datenlücken, potenzielle Kosten, Fristen, Verantwortlichkeiten und nächste Entscheidungen.",
          "Eine gute Management Summary beantwortet: Sind wir betroffen? Wie groß ist der Umfang? Welche Daten fehlen? Welche Risiken bestehen? Welche Ressourcen brauchen Einkauf, Zoll und Finanzen? Welche externen Prüfungen sind sinnvoll?",
          "Damit wird CBAM nicht als Einzelaufgabe behandelt, sondern als steuerbarer Compliance- und Datenprozess."
        ],
        links: [
          {
            label: "Laufende CBAM-Begleitung",
            href: "/leistungen/laufende-begleitung"
          },
          {
            label: "Kontakt aufnehmen",
            href: "/kontakt"
          }
        ]
      }
    ],
    sources: [
      {
        label: "EU-Kommission: Carbon Border Adjustment Mechanism",
        href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en"
      },
      {
        label: "EU-Kommission: CBAM Registry and Reporting",
        href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-registry-and-reporting_en"
      },
      {
        label: "EU-Kommission: Price of CBAM certificates",
        href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/price-cbam-certificates_en"
      }
    ]
  },
  {
    slug: "cbam-zertifikate-verkauf-termine-2027",
    title: "CBAM-Zertifikate: Verkauf, Abgabe und wichtige Termine ab 2027",
    description:
      "Was CBAM-Zertifikate sind, wann der Verkauf startet und welche Quartals- und Abgabefristen zugelassene CBAM-Anmelder ab 2027 einplanen sollten.",
    date: "2026-04-15",
    readingTime: "8 Min.",
    category: "CBAM-Zertifikate",
    intro:
      "Mit dem Übergang in die CBAM-Regelphase rücken CBAM-Zertifikate in den Mittelpunkt. Für Importeure emissionsintensiver Waren geht es nicht mehr nur um Daten und Berichte, sondern auch um die organisatorische Vorbereitung auf Kauf, Vorhaltung und Abgabe von Zertifikaten.",
    sections: [
      {
        title: "Was CBAM-Zertifikate abbilden",
        paragraphs: [
          "CBAM ist Teil des europäischen Fit-for-55-Pakets. Der Mechanismus soll sicherstellen, dass für bestimmte emissionsintensive Waren, die in die EU eingeführt werden, ein CO2-Preis berücksichtigt wird, der sich am EU-Emissionshandel orientiert.",
          "Ein CBAM-Zertifikat ist die Einheit, die zugelassene CBAM-Anmelder kaufen und abgeben müssen, um ihre finanziellen Verpflichtungen nach der CBAM-Verordnung zu erfüllen. Jedes Zertifikat steht für eine Tonne CO2-Äquivalent an eingebetteten Emissionen, also sogenannten grauen Emissionen.",
          "Wurde für diese Emissionen im Herkunftsland bereits ein CO2-Preis gezahlt, kann dies unter bestimmten Voraussetzungen die Zahl der abzugebenden CBAM-Zertifikate reduzieren. Ziel ist es, eine Doppelbelastung zu vermeiden. Die konkrete Anrechnung muss jedoch anhand der jeweils geltenden Vorgaben und Nachweise geprüft werden."
        ]
      },
      {
        title: "Rechtlicher Rahmen und offene Detailregelungen",
        paragraphs: [
          "Den Kern bildet die CBAM-Verordnung, Verordnung (EU) 2023/956. Für die Berechnung und Veröffentlichung des Preises der CBAM-Zertifikate ist außerdem die Durchführungsverordnung (EU) 2025/2548 der Kommission vom 10. Dezember 2025 relevant.",
          "Noch nicht vollständig abgeschlossen sind einzelne Detailregelungen zur praktischen Abwicklung. Dazu gehören insbesondere Vorgaben zur Verwaltung, Struktur und Höhe möglicher Entgelte sowie weitere Aspekte des Kaufs und Rückkaufs von CBAM-Zertifikaten.",
          "Auch die konkreten Modalitäten zur Anrechnung von in Drittstaaten gezahlten CO2-Preisen bleiben für Unternehmen ein wichtiger Punkt. Importeure sollten deshalb ihre Daten und Nachweise frühzeitig strukturieren, ohne die finale rechtliche oder zollrechtliche Bewertung vorwegzunehmen."
        ]
      },
      {
        title: "Verkauf der Zertifikate startet im Februar 2027",
        paragraphs: [
          "Der Verkauf von CBAM-Zertifikaten an zugelassene CBAM-Anmelder soll im Februar 2027 starten. Die Zertifikate werden dann über die gemeinsame zentrale Plattform erworben.",
          "Ab 2027 müssen zugelassene CBAM-Anmelder am Ende jedes Quartals sicherstellen, dass sich auf ihrem Konto im CBAM-Register eine ausreichende Anzahl an Zertifikaten befindet. Nach den aktuellen Vorgaben muss diese Anzahl mindestens 50 Prozent der grauen Emissionen der seit Jahresbeginn eingeführten CBAM-Waren entsprechen.",
          "Diese Vorhaltepflicht ist quartalsbezogen zu betrachten. Relevante Stichtage sind damit insbesondere der 31. März, 30. Juni, 30. September und 31. Dezember eines Kalenderjahres."
        ]
      },
      {
        title: "Rückwirkende Abgabe für Emissionen des Jahres 2026",
        paragraphs: [
          "Besonders wichtig für die Planung: Die Verpflichtung zur Abgabe von CBAM-Zertifikaten startet im Jahr 2027 auch für die Importe beziehungsweise grauen Emissionen des Jahres 2026.",
          "Zugelassene CBAM-Anmelder müssen im Jahr 2027 rückwirkend Zertifikate entsprechend der erklärten grauen Emissionen des Jahres 2026 erwerben und bis zum 30. September 2027 im CBAM-Register abgeben.",
          "Für Unternehmen bedeutet das: Importdaten aus 2026 sollten bereits während des Jahres sauber strukturiert, plausibilisiert und mit Lieferanteninformationen verknüpft werden."
        ]
      },
      {
        title: "Wichtige Termine im Jahr 2027",
        paragraphs: [
          "01.02.2027: Beginn des Verkaufs von CBAM-Zertifikaten für graue Emissionen der Jahre 2026 und 2027 an zugelassene CBAM-Anmelder.",
          "31.03.2027: Vorhalten einer Anzahl an CBAM-Zertifikaten im CBAM-Konto, die mindestens 50 Prozent der grauen Emissionen der seit Anfang 2027 eingeführten CBAM-Waren entspricht.",
          "30.06.2027: Erneute quartalsbezogene Prüfung und Vorhaltung von mindestens 50 Prozent der grauen Emissionen der seit Jahresbeginn eingeführten CBAM-Waren.",
          "30.09.2027: Abgabe der CBAM-Zertifikate für die in der CBAM-Erklärung angegebenen grauen Emissionen des Jahres 2026. Zusätzlich ist die quartalsbezogene 50-Prozent-Vorhaltung für 2027 zu beachten.",
          "31.10.2027: Möglichkeit, einen Rückkauf gegebenenfalls überzählig erworbener CBAM-Zertifikate für graue Emissionen des Jahres 2026 zu ersuchen."
        ]
      }
    ],
    sources: [
      {
        label: "EU-Kommission: Price of CBAM certificates",
        href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/price-cbam-certificates_en"
      },
      {
        label: "EU-Kommission: Common Central Platform call for tender",
        href: "https://taxation-customs.ec.europa.eu/news/cbam-call-tender-establish-common-central-platform-ccp-2026-03-02_en"
      }
    ]
  },
  {
    slug: "erster-cbam-zertifikatspreis-q1-2026",
    title: "Erster CBAM-Zertifikatspreis für Q1 2026 veröffentlicht",
    description:
      "Die Europäische Kommission hat den ersten CBAM-Zertifikatspreis veröffentlicht. Für das erste Quartal 2026 beträgt er 75,36 Euro.",
    date: "2026-04-07",
    readingTime: "4 Min.",
    category: "Zertifikatspreis",
    intro:
      "Die Europäische Kommission hat den ersten Preis für CBAM-Zertifikate für das erste Quartal 2026 veröffentlicht. Der Wert ist ein wichtiger Orientierungspunkt für Importeure, die ihre CBAM-Kosten und Datenprozesse für die Regelphase vorbereiten.",
    sections: [
      {
        title: "Preis für Q1 2026: 75,36 Euro",
        paragraphs: [
          "Der veröffentlichte Preis für CBAM-Zertifikate für das erste Quartal 2026 beläuft sich auf 75,36 Euro.",
          "Dieser Preis gilt für den Verkauf von CBAM-Zertifikaten, die den grauen Emissionen von CBAM-Waren entsprechen, die im ersten Quartal 2026 in die Europäische Union eingeführt wurden."
        ]
      },
      {
        title: "Quartalspreise im Jahr 2026",
        paragraphs: [
          "Im Jahr 2026 berechnet und veröffentlicht die Europäische Kommission vier vierteljährliche Preise, jeweils einen für jedes Kalenderquartal.",
          "Der Preis für das zweite Quartal 2026 soll am 06.07.2026 veröffentlicht werden. Für Q3 2026 ist der 05.10.2026 vorgesehen, für Q4 2026 der 04.01.2027."
        ]
      },
      {
        title: "Ab 2027 wöchentliche Preise",
        paragraphs: [
          "Ab 2027 wird die Kommission den Preis für CBAM-Zertifikate wöchentlich berechnen und veröffentlichen.",
          "Der tatsächliche Verkauf der CBAM-Zertifikate startet im Februar 2027. Die bereits 2026 veröffentlichten Quartalspreise dienen damit als frühzeitige Referenz für Planung, Datenaufbereitung und interne Kostenabschätzungen."
        ]
      }
    ],
    sources: [
      {
        label: "EU-Kommission: First CBAM certificate price is now available",
        href: "https://taxation-customs.ec.europa.eu/news/first-cbam-certificate-price-now-available-2026-04-07_en"
      },
      {
        label: "EU-Kommission: Price of CBAM certificates",
        href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/price-cbam-certificates_en"
      }
    ]
  },
  {
    slug: "cbam-antragstellung-vorlaeufige-einfuhr-31-maerz-2026",
    title: "CBAM: Frist zur Antragstellung für vorläufige Einfuhr endet am 31.03.2026",
    description:
      "Einführer oberhalb der maßgeblichen Mengenschwelle sollten rechtzeitig klären, ob sie den Status eines zugelassenen CBAM-Anmelders benötigen.",
    date: "2026-03-17",
    readingTime: "5 Min.",
    category: "Zulassung",
    intro:
      "Seit dem 01.01.2026 benötigen Einführer bestimmter CBAM-Waren vor der Einfuhr grundsätzlich den Status eines zugelassenen CBAM-Anmelders, sofern sie die maßgebliche Mengenschwelle überschreiten.",
    sections: [
      {
        title: "Wer betroffen sein kann",
        paragraphs: [
          "Relevant ist die Regelung für Einführer von CBAM-Waren oberhalb der maßgeblichen Mengenschwelle von 50 Tonnen CBAM-Waren pro Kalenderjahr. Strom und Wasserstoff sind hiervon gesondert zu betrachten.",
          "Für betroffene Unternehmen ist entscheidend, ob vor der Einfuhr bereits eine Zulassung als CBAM-Anmelder vorliegt oder ob rechtzeitig ein Antrag gestellt wurde."
        ]
      },
      {
        title: "Übergangsregelung bis 31.03.2026",
        paragraphs: [
          "Nach Artikel 17 Absatz 7a der CBAM-Verordnung besteht eine Übergangsregelung. Wird der Antrag auf Zulassung spätestens bis zum 31.03.2026 und vor der Einfuhr der betreffenden CBAM-Waren gestellt, kann die Einfuhr oberhalb der Mengenschwelle vorläufig auch ohne bereits erteilten Zulassungsstatus erfolgen.",
          "Diese Möglichkeit gilt bis zur Entscheidung über den Zulassungsantrag. Unternehmen sollten dennoch nicht nur auf die formale Antragstellung schauen, sondern auch die zugrunde liegenden Daten, Ansprechpartner und Unterlagen vorbereiten."
        ]
      },
      {
        title: "Ab 01.04.2026 reicht die Antragstellung allein nicht mehr",
        paragraphs: [
          "Ab dem 01.04.2026 reicht eine bloße Antragstellung grundsätzlich nicht mehr aus, wenn der Antrag nicht bereits vor dem 31.03.2026 gestellt wurde.",
          "In diesem Fall muss der Status eines zugelassenen CBAM-Anmelders vor der Einfuhr vorliegen, sofern die Voraussetzungen für die Pflicht zur Zulassung erfüllt sind."
        ]
      },
      {
        title: "Was Unternehmen jetzt vorbereiten sollten",
        paragraphs: [
          "Einführer, die bis zum 31.03.2026 einen Antrag stellen möchten, sollten sicherstellen, dass sie Zugang zum CBAM-Register haben.",
          "Außerdem sollten die für die Antragstellung erforderlichen Angaben und Unterlagen vollständig und intern abgestimmt vorliegen. Dazu gehören insbesondere Unternehmensangaben, Ansprechpartner, Importstruktur und relevante Zuständigkeiten."
        ]
      }
    ],
    sources: [
      {
        label: "EU-Kommission: Reminder CBAM goes live on 1 January 2026",
        href: "https://taxation-customs.ec.europa.eu/news/reminder-cbam-goes-live-1-january-2026-2025-12-23_en"
      },
      {
        label: "EU-Kommission: CBAM Registry and Reporting",
        href: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-registry-and-reporting_en"
      }
    ]
  },
  {
    slug: "cbam-informationsveranstaltung-eu-kommission-maerz-2026",
    title: "CBAM-Informationsveranstaltung der Europäischen Kommission: Was Unternehmen mitnehmen sollten",
    description:
      "Die EU-Kommission informierte am 19.03.2026 zu CBAM, Emissionsberechnung, Verifizierung und Akkreditierung.",
    date: "2026-03-19",
    readingTime: "4 Min.",
    category: "Veranstaltung",
    intro:
      "Die Generaldirektion Steuern und Zollunion der Europäischen Kommission, DG TAXUD, hat am 19.03.2026 eine Informationsveranstaltung zu CBAM angeboten. Im Fokus standen praktische Fragen der Regelphase.",
    sections: [
      {
        title: "Rahmen der Veranstaltung",
        paragraphs: [
          "Die Online-Veranstaltung fand am 19.03.2026 von 10:00 bis 11:30 Uhr MEZ statt.",
          "Adressiert waren unter anderem Importeure, CBAM-Anmelder, Exporteure aus Drittstaaten und potenzielle Prüfer beziehungsweise Verifizierer."
        ]
      },
      {
        title: "Inhalte: Emissionsberechnung und Verifizierung",
        paragraphs: [
          "Die Agenda umfasste verschiedene Aspekte der Emissionsberechnung. Dazu gehören eingebettete Emissionen, die Berücksichtigung freier Zuteilungen und die Frage, ob beziehungsweise wie bereits gezahlte CO2-Preise in Drittstaaten berücksichtigt werden können.",
          "Ein weiterer Schwerpunkt lag auf Anforderungen an Verifizierung und Akkreditierung. Für Unternehmen ist das relevant, wenn tatsächliche Emissionswerte genutzt und entsprechende Nachweise strukturiert werden sollen."
        ]
      },
      {
        title: "Warum solche Termine für Importeure wichtig sind",
        paragraphs: [
          "Informationsveranstaltungen der EU-Kommission helfen, operative Anforderungen und Meilensteine besser einzuordnen.",
          "Für Unternehmen ersetzt das keine individuelle rechtliche, steuerliche oder zollrechtliche Bewertung. Es kann aber helfen, interne Datenprozesse, Lieferantenkommunikation und Zuständigkeiten frühzeitig auf die kommenden Anforderungen auszurichten."
        ]
      }
    ],
    sources: [
      {
        label: "EU-Kommission: CBAM webinar follow-up - What changes for me?",
        href: "https://taxation-customs.ec.europa.eu/news/cbam-webinar-follow-what-changes-me-2026-03-26_en"
      }
    ]
  },
  {
    slug: "cbam-betroffenheit-pruefen",
    title: "CBAM-Betroffenheit prüfen: Welche Daten Importeure zuerst benötigen",
    description:
      "Ein strukturierter Einstieg für Unternehmen, die klären möchten, ob Waren, Ursprungsländer und Importmengen in den CBAM-Kontext fallen.",
    date: "2024-03-18",
    readingTime: "6 Min.",
    category: "Betroffenheitsanalyse",
    intro:
      "Viele Unternehmen starten mit der Frage, ob CBAM für sie überhaupt relevant ist. Eine belastbare Antwort entsteht nicht durch eine pauschale Einschätzung, sondern durch eine strukturierte Sicht auf Importdaten, Warencodes, Ursprungsländer, Mengen und Lieferanten.",
    sections: [
      {
        title: "Die Importdaten sind der Ausgangspunkt",
        paragraphs: [
          "Für eine erste Prüfung sollten Unternehmen ihre Einfuhrdaten so aufbereiten, dass Warennummern, Ursprungsländer, Mengen, Lieferanten und Zeiträume nachvollziehbar zusammengeführt werden können.",
          "Dabei geht es nicht darum, sofort eine finale rechtliche Bewertung zu ersetzen. Entscheidend ist zunächst, eine Datengrundlage zu schaffen, auf der interne Teams und externe Berater gezielt weiterarbeiten können."
        ]
      },
      {
        title: "KN-/CN-Codes sauber strukturieren",
        paragraphs: [
          "CBAM-Relevanz hängt stark an konkreten Warencodes. Deshalb sollten KN-/CN-Codes nicht nur als einzelne Listen betrachtet werden, sondern im Zusammenhang mit Produkten, Lieferanten und Importvolumen.",
          "Unklare oder uneinheitlich verwendete Codes sollten früh markiert werden. So lässt sich gezielt entscheiden, welche Punkte intern geklärt oder mit Zollberatung abgestimmt werden müssen."
        ]
      },
      {
        title: "Lieferanten früh sichtbar machen",
        paragraphs: [
          "Eine Betroffenheitsanalyse sollte nicht bei den Waren enden. Relevante Lieferanten müssen identifiziert werden, weil spätere Datenanforderungen häufig über Einkauf und Lieferantenkommunikation laufen.",
          "Je früher diese Übersicht steht, desto besser lassen sich Zuständigkeiten, Fristen und Kommunikationswege vorbereiten."
        ]
      }
    ]
  },
  {
    slug: "cbam-readiness-prozess-aufbauen",
    title: "CBAM-Readiness: Wie Unternehmen einen belastbaren Prozess aufbauen",
    description:
      "Warum CBAM nicht als Einzelaufgabe behandelt werden sollte und welche Rollen Einkauf, Zoll, Finanzen und Geschäftsführung typischerweise benötigen.",
    date: "2024-10-07",
    readingTime: "7 Min.",
    category: "Readiness",
    intro:
      "CBAM wird für betroffene Importeure schnell zu einer wiederkehrenden organisatorischen Aufgabe. Ein Readiness-Prozess hilft, Daten, Zuständigkeiten und Lieferantenkommunikation nicht erst unter Zeitdruck aufzubauen.",
    sections: [
      {
        title: "CBAM braucht klare Verantwortlichkeiten",
        paragraphs: [
          "In vielen Unternehmen liegen relevante Informationen verteilt: Einkauf kennt Lieferanten, Zoll kennt Warencodes, Buchhaltung kennt Belege und Geschäftsführung benötigt eine Risikosicht.",
          "Ein belastbarer Prozess verbindet diese Perspektiven. Dafür sollten Zuständigkeiten, Eskalationswege und Datenquellen früh dokumentiert werden."
        ]
      },
      {
        title: "Datenraum statt Einzellisten",
        paragraphs: [
          "Eine reine Excel-Liste reicht häufig nicht aus, wenn mehrere Teams regelmäßig mit neuen Importen, Lieferantenantworten und offenen Punkten arbeiten.",
          "Sinnvoll ist eine klare Datenstruktur mit Versionierung, Verantwortlichkeiten und nachvollziehbaren Statusfeldern. Das reduziert Rückfragen und macht Fortschritt sichtbar."
        ]
      },
      {
        title: "Geschäftsführung braucht Entscheidungsgrundlagen",
        paragraphs: [
          "Management-Informationen sollten verdichtet sein: betroffene Warengruppen, relevante Lieferanten, Datenlücken, Fristen und empfohlene nächste Schritte.",
          "So entsteht eine Grundlage für Priorisierung, Ressourcenplanung und die gezielte Einbindung externer Rechts-, Steuer- oder Zollberatung."
        ]
      }
    ]
  },
  {
    slug: "lieferantendaten-cbam-strukturieren",
    title: "Lieferantendaten für CBAM strukturieren: Was in der Praxis zählt",
    description:
      "Wie Unternehmen relevante Lieferanten identifizieren, Datenanforderungen formulieren und Rückmeldungen verwertbar aufbereiten.",
    date: "2025-02-12",
    readingTime: "6 Min.",
    category: "Lieferantenkommunikation",
    intro:
      "Lieferantendaten sind ein zentraler Engpass in der CBAM-Vorbereitung. Viele Rückmeldungen kommen spät, unvollständig oder in Formaten, die intern erst nutzbar gemacht werden müssen.",
    sections: [
      {
        title: "Nicht alle Lieferanten sind gleich relevant",
        paragraphs: [
          "Der erste Schritt ist eine Priorisierung: Welche Lieferanten stehen hinter potenziell CBAM-relevanten Waren, welchen Anteil haben sie am Importvolumen und wo bestehen erkennbare Datenlücken?",
          "Diese Sicht verhindert, dass Teams ihre Energie auf Randfälle verteilen, während wesentliche Lieferanten ungeklärt bleiben."
        ]
      },
      {
        title: "Datenanforderungen eindeutig formulieren",
        paragraphs: [
          "Lieferantenkommunikation sollte konkrete Datenfelder, Fristen, Ansprechpartner und Rückgabeformate enthalten. Allgemeine Anfragen führen häufig zu uneinheitlichen Antworten.",
          "Hilfreich ist eine zentrale Übersicht, in der Status, Rückfragen und offene Informationen fortlaufend nachgehalten werden."
        ]
      },
      {
        title: "Rückmeldungen verwertbar machen",
        paragraphs: [
          "Eingehende Informationen müssen geprüft, sortiert und den passenden Waren, Lieferanten und Zeiträumen zugeordnet werden.",
          "Die finale fachliche Bewertung kann bei Bedarf durch die zuständigen Berater erfolgen. Die organisatorische Vorarbeit sorgt dafür, dass diese Bewertung gezielt stattfinden kann."
        ]
      }
    ]
  },
  {
    slug: "cbam-registrierung-vorbereiten",
    title: "CBAM-Registrierung vorbereiten: Organisatorische Grundlagen schaffen",
    description:
      "Welche Informationen Unternehmen vor einer Registrierung strukturieren sollten und warum Vorbereitung mehr ist als das Ausfüllen eines Formulars.",
    date: "2025-09-24",
    readingTime: "5 Min.",
    category: "Registrierung",
    intro:
      "Die Vorbereitung einer CBAM-Registrierung beginnt nicht erst im Portal. Unternehmen sollten vorher klären, welche Daten, Rollen, Zuständigkeiten und internen Freigaben benötigt werden.",
    sections: [
      {
        title: "Interne Rollen klären",
        paragraphs: [
          "Vor einer Registrierung sollte klar sein, wer fachlich verantwortlich ist, wer Daten zuliefert und wer Entscheidungen freigibt.",
          "Gerade bei mehreren Gesellschaften oder Standorten verhindert eine klare Rollenstruktur spätere Reibung."
        ]
      },
      {
        title: "Daten und Nachweise vorbereiten",
        paragraphs: [
          "Organisatorische Angaben, Importübersichten, Ansprechpartner, Lieferantenlisten und bestehende Prozesse sollten geordnet vorliegen.",
          "Diese Vorbereitung ersetzt keine rechtliche oder zollrechtliche Bewertung, erleichtert aber die gezielte Abstimmung mit den zuständigen Fachberatern."
        ]
      },
      {
        title: "Registrierung in den Gesamtprozess einbetten",
        paragraphs: [
          "Die Registrierung ist kein isolierter Schritt. Sie sollte mit laufender Datenpflege, Lieferantenkommunikation und internen Fristen verbunden werden.",
          "So wird aus einer formalen Vorbereitung ein arbeitsfähiger CBAM-Prozess."
        ]
      }
    ]
  },
  {
    slug: "laufende-cbam-begleitung",
    title: "Laufende CBAM-Begleitung: Warum regelmäßige Datenpflege entscheidend ist",
    description:
      "Wie Unternehmen CBAM dauerhaft in Importprozesse integrieren und neue Waren, Lieferanten sowie Datenlücken fortlaufend im Blick behalten.",
    date: "2026-01-29",
    readingTime: "7 Min.",
    category: "Laufende Begleitung",
    intro:
      "Für Unternehmen mit regelmäßigen Importen ist CBAM keine einmalige Prüfung. Neue Lieferanten, geänderte Warencodes und zusätzliche Importe können laufend neue organisatorische Aufgaben auslösen.",
    sections: [
      {
        title: "Regelmäßige Importdaten prüfen",
        paragraphs: [
          "Monatliche oder quartalsweise Prüfungen helfen, neue CBAM-relevante Warenbewegungen früh zu erkennen.",
          "Wichtig ist ein klarer Abgleich zwischen aktuellen Importdaten, bestehenden Risikoeinschätzungen und offenen Lieferanteninformationen."
        ]
      },
      {
        title: "Datenlücken sichtbar halten",
        paragraphs: [
          "Offene Lieferantenantworten, unklare Codes oder fehlende Zuordnungen sollten nicht in E-Mails verschwinden. Sie gehören in eine zentrale Arbeitsübersicht.",
          "Dadurch können Einkauf, Zoll und Finanzen nachvollziehen, welche Punkte noch offen sind und wer den nächsten Schritt verantwortet."
        ]
      },
      {
        title: "Vorbereitung für interne und externe Abstimmung",
        paragraphs: [
          "Eine laufend gepflegte Datenstruktur erleichtert spätere Abstimmungen mit Rechts-, Steuer- oder Zollberatung.",
          "Sie schafft Transparenz darüber, welche Informationen belastbar vorliegen und welche Bewertungen noch gezielt eingeholt werden sollten."
        ]
      }
    ]
  }
];

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(`${date}T12:00:00Z`));
}
