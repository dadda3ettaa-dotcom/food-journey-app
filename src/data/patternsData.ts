import { PatternCard } from '../types';

export const BASE_PATTERNS: PatternCard[] = [
  {
    id: 'pat-afternoon-dip',
    title: 'Nachmittagstief & Snack-Lust',
    icon: '⚡',
    description: 'Rund um 15:30 Uhr tauchen bei dir häufiger Müdigkeit oder das Verlangen nach einem schnellen Snack oder Kaffee auf.',
    frequency: 'Häufig (ca. 65 % deiner Tage)',
    typicalTime: '15:00 – 16:00 Uhr',
    lastOccurrence: 'Gestern',
    neutralObservation: 'Der Nachmittag ist ein klassischer biologischer Übergangsmoment. Oft sucht der Körper nach Entspannung oder Sauerstoff.',
    suggestedMission: 'Teste morgen eine echte 10-Minuten-Pause am Nachmittag.',
    activeInUserDays: true
  },
  {
    id: 'pat-home-hunger',
    title: 'Hunger beim Heimkommen',
    icon: '🏠',
    description: 'Beim Betreten der Wohnung meldet sich sofort ein starker Hunger oder der Wunsch nach schneller Belohnung.',
    frequency: 'Regelmäßig an Arbeitstagen',
    typicalTime: '18:00 – 18:30 Uhr',
    lastOccurrence: 'Vor 2 Tagen',
    neutralObservation: 'Der Übergang zwischen Arbeitsmodus und Feierabend bringt oft aufgestauten Appetit oder Entlastungsdrang mit sich.',
    suggestedMission: 'Bereite eine einfache Option für den Heimweg vor.',
    activeInUserDays: true
  },
  {
    id: 'pat-screen-eating',
    title: 'Essen neben dem Bildschirm',
    description: 'Mahlzeiten am Abend oder Mittag finden häufig parallel zu Laptop, Fernseher oder Smartphone statt.',
    icon: '📺',
    frequency: 'Ca. 50 % der Abendessen',
    typicalTime: '19:30 – 20:30 Uhr',
    lastOccurrence: 'Heute',
    neutralObservation: 'Medien können entspannen, lenken aber die Aufmerksamkeit vom natürlichen Sättigungssignal ab.',
    suggestedMission: 'Iss eine Mahlzeit ohne Bildschirm.',
    activeInUserDays: true
  },
  {
    id: 'pat-morning-coffee-only',
    title: 'Nur Kaffee am Morgen',
    icon: '☕',
    description: 'Der Tag beginnt oft ohne feste Nahrung und der eigentliche Hunger setzt erst am späten Vormittag ein.',
    frequency: 'An 4 von 7 Tagen',
    typicalTime: '07:30 – 08:30 Uhr',
    lastOccurrence: 'Heute früh',
    neutralObservation: 'Ein späterer Frühstückszeitpunkt ist für viele Wolf- und Bären-Rhythmen völlig natürlich, solange die Energie stabil bleibt.',
    suggestedMission: 'Trinke zuerst Wasser und entscheide dann über Kaffee.',
    activeInUserDays: true
  },
  {
    id: 'pat-late-snack',
    title: 'Spätes Knabbern & Entspannen',
    icon: '🍿',
    description: 'Am späteren Abend (ab 21:30 Uhr) gehört ein Snack oft als gemütliches Ritual zur Entspannung dazu.',
    frequency: 'An gemütlichen Abenden',
    typicalTime: '21:30 – 22:30 Uhr',
    lastOccurrence: 'Vor 3 Tagen',
    neutralObservation: 'Spätes Knabbern ist meist ein emotionales Gemütlichkeits- oder Belohnungssignal und selten echter physiologischer Hunger.',
    suggestedMission: 'Beobachte wertfrei das Gefühl von Gemütlichkeit vs. Hunger am Abend.',
    activeInUserDays: false
  },
  {
    id: 'pat-active-mind-bed',
    title: 'Unruhiger Tagesabschluss',
    icon: '🧠',
    description: 'Vor dem Einschlafen sind noch viele Gedanken aktiv oder der Tag fühlt sich noch nicht ganz abgeschlossen an.',
    frequency: 'Gelegentlich bei stressigen Tagen',
    typicalTime: '22:30 – 23:00 Uhr',
    lastOccurrence: 'Vor 4 Tagen',
    neutralObservation: 'Ein kurzer schriftlicher Satz oder 3 tiefe Atemzüge können helfen, den Kopf zu entlasten.',
    suggestedMission: 'Beende den Tag mit einem Satz: Was hat heute gut funktioniert?',
    activeInUserDays: false
  }
];
