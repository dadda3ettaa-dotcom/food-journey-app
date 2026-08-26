export interface BookChapter {
  id: number;
  title: string;
  category: 'Grundlagen' | 'Körper & Signale' | 'Methode & Praxis' | 'Muster & Typen' | 'Programm & Begleitung';
  summary: string;
  keyTakeaway: string;
  quote?: string;
}

export const BOOK_CHAPTERS: BookChapter[] = [
  {
    id: 1,
    title: '1. Vorwort',
    category: 'Grundlagen',
    summary: 'Viele Menschen beginnen eine Ernährungsumstellung mit Druck. Doch der Alltag ist selten so ordentlich wie ein Plan. Food Journey setzt bei Beobachtung statt Verboten an.',
    keyTakeaway: 'Kleine Momente im Alltag bewusst wahrnehmen, ohne Schuldgefühle.',
    quote: 'Nicht bei Verboten ansetzen, sondern bei Beobachtung.'
  },
  {
    id: 2,
    title: '2. Die Grundidee',
    category: 'Grundlagen',
    summary: 'Food Journey ist keine Diät-App und kein Kalorienzähler, sondern eine persönliche Tagesreise rund um Essen, Hunger, Energie, Schlaf, Stress, Stimmung und Gewohnheiten.',
    keyTakeaway: 'Die App bewertet nicht, ob ein Tag gut oder schlecht war. Sie sammelt Hinweise für wiederkehrende Muster.',
    quote: 'Kleine Beobachtungen. Weniger Verbote. Mehr Verständnis für den eigenen Alltag.'
  },
  {
    id: 3,
    title: '3. Warum Diäten oft scheitern',
    category: 'Grundlagen',
    summary: 'Diäten funktionieren meist nur unter Laborbedingungen. Wenn das echte Leben einsetzt (Arbeit, Familie, Reisen, Müdigkeit), bricht der starre Plan zusammen.',
    keyTakeaway: 'Frage nicht „Hast du dich an den Plan gehalten?“, sondern „Was hat deinen Tag beeinflusst?“',
    quote: 'Ein nachhaltiger Ansatz muss auch an schwierigen Tagen eine praktikable Version anbieten.'
  },
  {
    id: 4,
    title: '4. Essen ist persönlich',
    category: 'Grundlagen',
    summary: 'Vorlieben, Arbeitszeiten und soziales Umfeld sind individuell. Food Journey betrachtet Zeitpunkt, Hunger, Sättigung, Energie, Emotionen und Alltagstauglichkeit.',
    keyTakeaway: 'Individuelle Beobachtung schlägt allgemeine Vorschriften.',
    quote: 'Entscheidend ist, ob das Muster für diese Person funktioniert.'
  },
  {
    id: 5,
    title: '5. Nachhaltigkeit statt Perfektion',
    category: 'Grundlagen',
    summary: 'Perfektionismus führt bei Abweichungen schnell zu Frust. Ein unruhiger Tag oder eine spontane Mahlzeit ist eine wertvolle Information, kein moralisches Urteil.',
    keyTakeaway: 'Die wichtigste Frage: „Was hat heute funktioniert, und was möchte ich morgen beobachten?“',
    quote: 'Jeder Tag ist eine neue Beobachtung. Ein Restaurantbesuch zerstört keine Entwicklung.'
  },
  {
    id: 6,
    title: '6. Hunger verstehen',
    category: 'Körper & Signale',
    summary: 'Hunger ist ein biologisches Signal, das oft mit Zeit, Gewohnheit oder Langeweile vermischt wird. Eine nicht-wertende 4-Stufen-Skala schafft Klarheit.',
    keyTakeaway: 'Skala: Kein Hunger • Leichter Hunger • Klarer Hunger • Sehr hungrig.',
    quote: 'Die App behauptet nicht, warum das passiert. Sie macht sichtbar, wann es passiert.'
  },
  {
    id: 7,
    title: '7. Sättigung beobachten',
    category: 'Körper & Signale',
    summary: 'Das Gefühl nach dem Essen liefert wertvolles Feedback. Schnelles Essen neben Bildschirmen führt oft dazu, dass man sich danach noch hungrig fühlt.',
    keyTakeaway: 'Sättigung: Noch hungrig • Angenehm satt • Sehr satt • Unwohl oder übervoll.',
    quote: 'Sättigung ohne Bewertung beobachten, um Zusammenhänge mit dem Esstempo zu erkennen.'
  },
  {
    id: 8,
    title: '8. Genuss ohne Schuld',
    category: 'Körper & Signale',
    summary: 'Dessert, Restaurantbesuche und Lieblingsgerichte gehören zum Leben. Food Journey teilt Essen in Kontexte ein (sozial, geplant, spontan, Genuss) statt in „gut“ und „schlecht“.',
    keyTakeaway: 'Keine moralische Rangliste bei Lebensmitteln.',
    quote: 'Eine App, die Genuss pauschal als Fehler darstellt, erzeugt unnötigen Druck.'
  },
  {
    id: 9,
    title: '9. Die Rolle der Umgebung',
    category: 'Körper & Signale',
    summary: 'Zuhause, Büro, Homeoffice, Reisen oder Familie beeinflussen, wie spontan oder geplant wir essen.',
    keyTakeaway: 'Muster hängen oft eng am Ort: Homeoffice begünstigt Snack-Gänge, Büro feste Pausen.',
    quote: 'Wie passt dieser Moment in deinen Alltag?'
  },
  {
    id: 10,
    title: '10. Schlaf und Energie',
    category: 'Körper & Signale',
    summary: 'Schlafdauer und Aufstehgefühl bestimmen Heißhunger und Willenskraft am Nachmittag. Vorsichtige Verknüpfungen statt medizinischer Diagnosen.',
    keyTakeaway: 'Einschlafzeit, Erholungsgefühl und Koffeinzeitpunkte im Blick behalten.',
    quote: 'Schlaf nicht als medizinisches Tracking, sondern als persönliche Alltagserfahrung.'
  },
  {
    id: 11,
    title: '11. Der persönliche Tagesrhythmus',
    category: 'Muster & Typen',
    summary: 'Keine starren Chronotyp-Etiketten, sondern vier spielerische Tierbilder für beobachtete Rhythmen: Löwe, Bär, Wolf und Fuchs.',
    keyTakeaway: 'Kein Typ ist besser, Mischbilder sind völlig normal.',
    quote: 'Die App zeigt eher eine Momentaufnahme als eine endgültige Identität.'
  },
  {
    id: 12,
    title: '12. Stress und Essen',
    category: 'Körper & Signale',
    summary: 'Übergänge wie der Heimweg nach der Arbeit oder der späte Abend sind anfällig für unbewusstes Essen unter Erschöpfung.',
    keyTakeaway: 'Statt „Warum isst du so?“ fragen: „Wie fühlst du dich und was brauchst du im Übergang?“',
    quote: 'Die App darf keine Ursache festlegen, sondern hilft Kombinationen zu erkennen.'
  },
  {
    id: 13,
    title: '13. Die Food-Journey-Methode',
    category: 'Methode & Praxis',
    summary: 'Der 5-Schritte-Kern: 1. Wahrnehmen → 2. Auswählen → 3. Kontext ergänzen → 4. Wiederholungen beobachten → 5. Ein kleines Experiment ausprobieren.',
    keyTakeaway: 'Einfache tägliche Struktur mit maximaler Erkenntnistiefe.',
    quote: 'Wahrnehmen. Auswählen. Kontext ergänzen. Wiederholungen beobachten. Experimentieren.'
  },
  {
    id: 14,
    title: '14. Die neun Tagesmomente',
    category: 'Methode & Praxis',
    summary: 'Die Reise bildet den Tag ab: 07:30 Aufstehen, 08:00 Frühstück, 10:30 Vormittag, 12:30 Mittag, 15:30 Nachmittag, 18:00 Heimkommen, 19:30 Abendessen, 21:30 Abendmoment, 22:30 Tagesende.',
    keyTakeaway: 'Jeder Moment hat 4 Antwortkarten, Zeitleiste und freundliche Rückmeldung in wenigen Sekunden.',
    quote: 'Die Standardinteraktion bleibt in wenigen Sekunden möglich.'
  },
  {
    id: 15,
    title: '15. Der Express-Modus',
    category: 'Methode & Praxis',
    summary: 'An hektischen Tagen reichen 2 Minuten mit den 3 Kernmomenten: Aufstehen, Nachmittag, Tagesende.',
    keyTakeaway: 'Ein kurzer Check-in ist wertvoller als ein System, das an stressigen Tagen aufgegeben wird.',
    quote: 'Ein kurzer Check-in ist wertvoller als ein System, das nur an perfekten Tagen verwendet wird.'
  },
  {
    id: 16,
    title: '16. Die vollständige Reise',
    category: 'Methode & Praxis',
    summary: 'Die Standardreise durch alle 9 Momente mit XP, Zeitlinie, klaren Antwortkarten und Vor-Zurück-Navigation.',
    keyTakeaway: 'Große, klare Bedienelemente ohne Datenverlust beim Hin- und Herwechseln.',
    quote: 'Die Reise kann jederzeit pausiert und später fortgesetzt werden.'
  },
  {
    id: 17,
    title: '17. Die Tiefenreflexion',
    category: 'Methode & Praxis',
    summary: 'Optionale Zusatzfragen zu Hunger, Sättigung, Stimmung, Stress, Schlaf und freien Notizen für maximales Verständnis.',
    keyTakeaway: 'Niemals verpflichtend – der Ablauf bleibt leicht und flexibel.',
    quote: 'Tiefenreflexion nur dann anbieten, wenn sie relevant ist.'
  },
  {
    id: 18,
    title: '18. Das Food-Flex-System',
    category: 'Körper & Signale',
    summary: 'Neutrale Kontextbegriffe (sättigend, leicht, Genuss, schnell, sozial, nebenbei, spontan, geplant) statt Lebensmittel-Verboten.',
    keyTakeaway: 'Keine roten Verbotsschilder oder Kalorien-Strafen.',
    quote: 'Das ist eine Beobachtung, keine Anweisung.'
  },
  {
    id: 19,
    title: '19. Das Typenmodell',
    category: 'Muster & Typen',
    summary: 'Löwe (früh, strukturiert), Bär (mittig, alltagstauglich), Wolf (spät, kreativ), Fuchs (sensibel, wechselnd).',
    keyTakeaway: 'Vier Archetypen als Orientierungshilfe für Energie- und Essmuster.',
    quote: 'Das Modell beschreibt keine festen Persönlichkeiten, sondern unterstützt eine spielerische Sprache.'
  },
  {
    id: 20,
    title: '20. Der Tagesreport',
    category: 'Muster & Typen',
    summary: 'Ganzheitliche Zusammenfassung: Momente, XP, Typ-Mischung, wichtigste Beobachtung und ein freiwilliger Impuls.',
    keyTakeaway: 'Der Report ist ein spiegelndes Feedback, kein Richter.',
    quote: 'Die Formulierung bleibt vorsichtig. Der Report ist ein Spiegel, kein Urteil.'
  },
  {
    id: 21,
    title: '21. Muster über mehrere Tage',
    category: 'Muster & Typen',
    summary: 'Datenreife: Nach 1 Tag: „Erster Eindruck“ • Nach 3 Tagen: „Erste Tendenz“ • Nach 7 Tagen: „Wiederkehrendes Muster“ • Nach 14 Tagen: „Stabileres persönliches Bild“.',
    keyTakeaway: 'Keine falschen Schlüsse aus Einzeltagen ziehen.',
    quote: 'Die App soll keine Erkenntnis erzeugen, wenn die Datenlage nicht ausreicht.'
  },
  {
    id: 22,
    title: '22. Insights und Kalender',
    category: 'Muster & Typen',
    summary: 'Farbkodierter Verlauf (Grün: ruhig, Orange: wechselnd, Violett: Stress/Snack, Grau: unvollständig) & Spitzenzeiten-Dashboard.',
    keyTakeaway: 'Erkenntnisse über Wochentage, Arbeitsorte und Snack-Zeiten.',
    quote: 'Sammle noch zwei weitere Tage, bevor wir echte Wiederholungen anzeigen.'
  },
  {
    id: 23,
    title: '23. Missionen statt Verbote',
    category: 'Programm & Begleitung',
    summary: 'Freiwillige Experimente: Mahlzeit ohne Bildschirm, echte Nachmittagspause, Snack vorbereiten, Handy-Auszeit am Abend.',
    keyTakeaway: 'Status: Ausprobieren • Heute erledigt • Überspringen • Nicht relevant. Kein Scheitern möglich!',
    quote: 'Es gibt kein Scheitern. Eine Mission ist eine Einladung zur Beobachtung.'
  },
  {
    id: 24,
    title: '24. Das persönliche Tagebuch',
    category: 'Programm & Begleitung',
    summary: 'Momente mit Notiz, Stimmung 1-5, Hunger 1-5, Sättigung 1-5 und Tags anreichern.',
    keyTakeaway: 'Privates Journal auf dem eigenen Gerät.',
    quote: 'Die Einträge bleiben standardmäßig auf dem Gerät.'
  },
  {
    id: 25,
    title: '25. Onboarding und Ziele',
    category: 'Programm & Begleitung',
    summary: 'Drei kurze Fragen: 1. Was möchtest du verstehen? 2. Wie sieht dein Alltag aus? 3. Welches Zeitbudget hast du?',
    keyTakeaway: 'Jederzeit überspringbar und im Profil anpassbar.',
    quote: 'Einfacher Einstieg ohne Hürden.'
  },
  {
    id: 26,
    title: '26. Datenschutz und Verantwortung',
    category: 'Grundlagen',
    summary: 'Lokale Speicherung, kein Tracking, kein Zwang zur Registrierung, voller Datenexport und klarer Hinweis auf Nicht-Medizin.',
    keyTakeaway: 'Deine Daten gehören dir.',
    quote: 'Deine Antworten bleiben auf diesem Gerät, solange du keine Synchronisierung aktivierst.'
  },
  {
    id: 27,
    title: '27. Die technische Produktvision',
    category: 'Programm & Begleitung',
    summary: 'Komponentenbasierte Architektur, verlässlicher State, Offline-Tauglichkeit, leere Ansichten und barrierefreie UX.',
    keyTakeaway: 'Modernes, robustes Web-Produkt mit klaren Zuständen.',
    quote: 'Wie ein echtes modernes Produkt aufgebaut.'
  },
  {
    id: 28,
    title: '28. Ein Beispieltag (Anna)',
    category: 'Programm & Begleitung',
    summary: 'Anna (07:30 müde, nur Kaffee, 10:30 Energietief, 12:30 schnelles Mittagessen, 15:30 Snack-Lust, 18:00 hungrig & gestresst, 19:30 TV-Essen). Report & sanfte Mission.',
    keyTakeaway: 'Konkreter Anwendungsfall zeigt, wie verständnisvoll das Feedback funktioniert.',
    quote: 'Diese Sprache beschuldigt Anna nicht. Sie zeigt eine mögliche Stelle für ein Experiment.'
  },
  {
    id: 29,
    title: '29. Ein 14-Tage-Programm',
    category: 'Programm & Begleitung',
    summary: 'Strukturierte 2-Wochen-Begleitung: Tage 1-3 Beobachten → Tage 4-6 Kontext → Tag 7 Wochenreport → Tage 8-10 Mission → Tage 11-13 Vergleichen → Tag 14 Persönlicher Report.',
    keyTakeaway: 'Ziel ist nicht Perfektion, sondern tieferes Alltagsverständnis.',
    quote: 'Ziel ist nicht, nach 14 Tagen perfekt zu sein. Ziel ist, den Alltag klarer zu verstehen.'
  },
  {
    id: 30,
    title: '30. Ausblick',
    category: 'Grundlagen',
    summary: 'Food Journey verbindet einfache tägliche Reflexion mit langfristiger Gelassenheit. Nicht der Mensch wird bewertet, sondern Situationen werden sichtbar.',
    keyTakeaway: 'Achtsamkeit, Gelassenheit und Selbstvertrauen beim Essen.',
    quote: 'Nicht jeder Tag muss verändert werden. Manchmal muss er zuerst verstanden werden.'
  }
];

export interface ProgramStage {
  stageNumber: number;
  dayRange: string;
  title: string;
  focus: string;
  action: string;
  isActive: (daysCount: number) => boolean;
  isCompleted: (daysCount: number) => boolean;
}

export const FOURTEEN_DAYS_PROGRAM_STAGES: ProgramStage[] = [
  {
    stageNumber: 1,
    dayRange: 'Tage 1 bis 3',
    title: 'Reines Beobachten',
    focus: 'Keine Veränderung erzwingen. Nur die Reise täglich durchführen.',
    action: 'Erfasse deine Momente morgens, mittags und abends ohne Druck.',
    isActive: (days) => days >= 1 && days <= 3,
    isCompleted: (days) => days > 3
  },
  {
    stageNumber: 2,
    dayRange: 'Tage 4 bis 6',
    title: 'Kontext & Umgebung markieren',
    focus: 'Erkenne den Einfluss von Arbeit, Zuhause, Reise oder Wochenende.',
    action: 'Nutze die Food-Flex-Begriffe und notiere den Ort bei den Mahlzeiten.',
    isActive: (days) => days >= 4 && days <= 6,
    isCompleted: (days) => days > 6
  },
  {
    stageNumber: 3,
    dayRange: 'Tag 7',
    title: 'Erster Wochenreport',
    focus: 'Häufigste Tageszeiten und wiederkehrende Antworten prüfen.',
    action: 'Öffne das Insights-Dashboard und vergleiche Werktage mit dem Wochenende.',
    isActive: (days) => days === 7,
    isCompleted: (days) => days > 7
  },
  {
    stageNumber: 4,
    dayRange: 'Tage 8 bis 10',
    title: 'Ein Alltags-Experiment ausprobieren',
    focus: 'Nur eine einzige kleine Veränderung ohne Druck testen.',
    action: 'Wähle eine freiwillige Mission wie z. B. „Eine Mahlzeit ohne Bildschirm“.',
    isActive: (days) => days >= 8 && days <= 10,
    isCompleted: (days) => days > 10
  },
  {
    stageNumber: 5,
    dayRange: 'Tage 11 bis 13',
    title: 'Wirkung vergleichen',
    focus: 'Beobachten, ob sich der relevante Tagesmoment verändert hat.',
    action: 'Fühlt sich der Nachmittag oder das Heimkommen anders an?',
    isActive: (days) => days >= 11 && days <= 13,
    isCompleted: (days) => days > 13
  },
  {
    stageNumber: 6,
    dayRange: 'Tag 14',
    title: 'Persönlicher 14-Tage-Report',
    focus: 'Stabiles Bild von Energie, Hunger, Schlaf, Stress und Ritualen.',
    action: 'Sieh dein vollständiges persönliches Rhythmus-Profil und feiere deine Reise!',
    isActive: (days) => days >= 14,
    isCompleted: (days) => days >= 14
  }
];
