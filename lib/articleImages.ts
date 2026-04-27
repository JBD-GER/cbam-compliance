import type { Article } from "@/lib/content";

const articleImageMap: Record<string, { src: string; alt: string }> = {
  "cbam-zertifikate-verkauf-termine-2027": {
    src: "/images/import_hamburg.jpg",
    alt: "Containerschiff im Hafen als Kontext für CBAM-Zertifikate und Importprozesse"
  },
  "erster-cbam-zertifikatspreis-q1-2026": {
    src: "/images/computer.jpg",
    alt: "Datenauswertung als Symbol für CBAM-Zertifikatspreise"
  },
  "cbam-antragstellung-vorlaeufige-einfuhr-31-maerz-2026": {
    src: "/images/beratung.jpg",
    alt: "Beratungssituation zur CBAM-Antragstellung"
  },
  "cbam-informationsveranstaltung-eu-kommission-maerz-2026": {
    src: "/images/office.jpg",
    alt: "Heller Arbeitsplatz als Kontext für CBAM-Informationsveranstaltungen"
  },
  "cbam-betroffenheit-pruefen": {
    src: "/images/import.jpg",
    alt: "Containerterminal als Kontext für die Prüfung der CBAM-Betroffenheit"
  },
  "cbam-readiness-prozess-aufbauen": {
    src: "/images/team.png",
    alt: "Teamarbeit als Symbol für CBAM-Readiness"
  },
  "lieferantendaten-cbam-strukturieren": {
    src: "/images/compliance.jpg",
    alt: "Beratung und Unterlagen als Kontext für Lieferantendaten"
  },
  "cbam-registrierung-vorbereiten": {
    src: "/images/office.jpg",
    alt: "Arbeitsplatz als Symbol für organisatorische CBAM-Registrierungsvorbereitung"
  },
  "laufende-cbam-begleitung": {
    src: "/images/green-economy.jpg",
    alt: "Windenergie als Kontext für laufende CBAM- und CO2-Prozesse"
  }
};

const fallback = {
  src: "/images/import_hamburg.jpg",
  alt: "Hafenlogistik als Kontext für CBAM und internationale Importe"
};

export function getArticleImage(article: Article) {
  return articleImageMap[article.slug] ?? fallback;
}
