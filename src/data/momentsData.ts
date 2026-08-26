import { Moment } from '../types';

export const MOMENTS: Moment[] = [
  {
    id: 1,
    time: '07:30',
    icon: '☀️',
    label: 'Aufstehen',
    title: 'Du bist gerade auf.',
    question: 'Wie ist dein Start in den Tag?',
    foxTip: 'Der Morgen zeigt oft, wie viel Erholung du aus der Nacht mitgenommen hast.',
    isExpress: true,
    isWakeTimeMoment: true,
    deepQuestionPrompt: 'Wie war dein Schlafgefühl und wie schätzt du deinen Rhythmus heute ein?',
    optionalReasons: ['Ausgeschlafen', 'Wenig Schlaf', 'Gedankenkarussell', 'Früher Wecker', 'Entspannt'],
    options: [
      {
        id: 'm1_opt1',
        emoji: '🌞',
        title: 'Wach',
        subtitle: 'Ich bin schnell da.',
        weights: { lion: 3, bear: 1 },
        energyTag: 'high'
      },
      {
        id: 'm1_opt2',
        emoji: '😴',
        title: 'Müde',
        subtitle: 'Ich brauche Anlauf.',
        weights: { wolf: 2, bear: 2 },
        energyTag: 'low'
      },
      {
        id: 'm1_opt3',
        emoji: '🥱',
        title: 'Erschöpft',
        subtitle: 'Der Tag fühlt sich schon schwer an.',
        weights: { bear: 3, fox: 1 },
        energyTag: 'low'
      },
      {
        id: 'm1_opt4',
        emoji: '🌀',
        title: 'Unruhig',
        subtitle: 'Mein Kopf ist sofort aktiv.',
        weights: { fox: 3, wolf: 1 },
        energyTag: 'seeking'
      }
    ]
  },
  {
    id: 2,
    time: '08:00',
    icon: '☕',
    label: 'Frühstück',
    title: 'Frühstückszeit!',
    question: 'Was passiert heute wirklich?',
    foxTip: 'Kein Plan ist perfekt – wichtig ist nur, was sich für deinen Körper heute stimmig anfühlte.',
    isExpress: false,
    deepQuestionPrompt: 'Was war der eigentliche Grund für deine Frühstückswahl?',
    optionalReasons: ['Kein Hunger', 'Zeitmangel', 'Gewohnheit', 'Bewusste Mahlzeit', 'Nur Getränk'],
    options: [
      {
        id: 'm2_opt1',
        emoji: '🥗',
        title: 'Ich frühstücke',
        subtitle: 'Ich esse eine richtige Mahlzeit.',
        weights: { bear: 2, lion: 2 },
        energyTag: 'balanced'
      },
      {
        id: 'm2_opt2',
        emoji: '🥐',
        title: 'Etwas Süßes',
        subtitle: 'Gebäck oder etwas Süßes passt.',
        weights: { wolf: 2, fox: 1 },
        energyTag: 'seeking'
      },
      {
        id: 'm2_opt3',
        emoji: '☕',
        title: 'Nur Kaffee',
        subtitle: 'Ich esse erst später.',
        weights: { wolf: 2, fox: 2 },
        energyTag: 'low'
      },
      {
        id: 'm2_opt4',
        emoji: '🍽️',
        title: 'Sehr hungrig',
        subtitle: 'Ich brauche jetzt viel.',
        weights: { lion: 3 },
        energyTag: 'high'
      }
    ]
  },
  {
    id: 3,
    time: '10:30',
    icon: '💼',
    label: 'Vormittag',
    title: 'Du bist mitten im Vormittag.',
    question: 'Wie läuft dieser Moment?',
    foxTip: 'Am Vormittag zeigen sich erste Tendenzen: Konzentration, Ablenkung oder Druck.',
    isExpress: false,
    deepQuestionPrompt: 'Was prägt diesen Vormittag besonders?',
    optionalReasons: ['Konzentration', 'Müdigkeit', 'Stress', 'Koffein', 'Ablenkung'],
    options: [
      {
        id: 'm3_opt1',
        emoji: '🎯',
        title: 'Im Flow',
        subtitle: 'Ich bin konzentriert.',
        weights: { lion: 3, bear: 1 },
        energyTag: 'balanced'
      },
      {
        id: 'm3_opt2',
        emoji: '💤',
        title: 'Energie sinkt',
        subtitle: 'Ich werde langsamer.',
        weights: { bear: 2, wolf: 2 },
        energyTag: 'low'
      },
      {
        id: 'm3_opt3',
        emoji: '📱',
        title: 'Ablenkung',
        subtitle: 'Ich springe zwischen Dingen.',
        weights: { fox: 2, wolf: 2 },
        energyTag: 'seeking'
      },
      {
        id: 'm3_opt4',
        emoji: '🧠',
        title: 'Unter Druck',
        subtitle: 'Es ist gerade viel.',
        weights: { fox: 3 },
        energyTag: 'seeking'
      }
    ]
  },
  {
    id: 4,
    time: '12:30',
    icon: '🥗',
    label: 'Mittag',
    title: 'Mittagszeit.',
    question: 'Was passt zu deiner Situation?',
    foxTip: 'Das Mittagessen teilt den Tag. Achte darauf, wie voll oder leicht dein Kopf danach ist.',
    isExpress: false,
    deepQuestionPrompt: 'Wie war dein Sättigungsgefühl und der Essenskontext?',
    optionalReasons: ['Allein am Schreibtisch', 'Mit Kollegen', 'In Ruhe', 'Unter Zeitdruck', 'Selbstgekocht'],
    options: [
      {
        id: 'm4_opt1',
        emoji: '🥗',
        title: 'Leicht',
        subtitle: 'Eine leichte Mahlzeit passt.',
        weights: { bear: 2, lion: 1 },
        energyTag: 'balanced'
      },
      {
        id: 'm4_opt2',
        emoji: '🍛',
        title: 'Herzhaft',
        subtitle: 'Ich möchte etwas Kräftiges.',
        weights: { lion: 2, bear: 1 },
        energyTag: 'high'
      },
      {
        id: 'm4_opt3',
        emoji: '🥪',
        title: 'Schnell',
        subtitle: 'Ich esse zwischen Terminen.',
        weights: { fox: 3 },
        energyTag: 'seeking'
      },
      {
        id: 'm4_opt4',
        emoji: '😋',
        title: 'Sehr hungrig',
        subtitle: 'Ich komme mit viel Hunger an.',
        weights: { lion: 3, wolf: 1 },
        energyTag: 'high'
      }
    ]
  },
  {
    id: 5,
    time: '15:30',
    icon: '⚡',
    label: 'Nachmittag',
    title: 'Das Nachmittagstief kommt.',
    question: 'Was passiert jetzt?',
    foxTip: 'Gegen 15:30 sucht der Körper oft entweder Ruhe, Zucker, Koffein oder frische Luft.',
    isExpress: true,
    deepQuestionPrompt: 'Was steckt hinter deinem Nachmittagsimpuls?',
    optionalReasons: ['Echter Hunger', 'Energieabfall', 'Snack-Verlangen', 'Koffeinimpuls', 'Bedürfnis nach Pause'],
    options: [
      {
        id: 'm5_opt1',
        emoji: '🪑',
        title: 'Pause',
        subtitle: 'Ich mache kurz etwas anderes.',
        weights: { bear: 2, lion: 1 },
        energyTag: 'balanced'
      },
      {
        id: 'm5_opt2',
        emoji: '🍫',
        title: 'Snack-Lust',
        subtitle: 'Ich bekomme Lust auf etwas.',
        weights: { wolf: 3, fox: 1 },
        energyTag: 'seeking'
      },
      {
        id: 'm5_opt3',
        emoji: '☕',
        title: 'Kaffee',
        subtitle: 'Ein Kaffee wäre jetzt dran.',
        weights: { bear: 2, wolf: 1, fox: 1 },
        energyTag: 'low'
      },
      {
        id: 'm5_opt4',
        emoji: '✅',
        title: 'Weiter',
        subtitle: 'Ich denke gerade nicht ans Essen.',
        weights: { lion: 2 },
        energyTag: 'high'
      }
    ]
  },
  {
    id: 6,
    time: '18:00',
    icon: '🏠',
    label: 'Heimkommen',
    title: 'Du kommst nach Hause.',
    question: 'Was bringst du aus dem Tag mit?',
    foxTip: 'Der Moment des Ankommens entscheidet oft, wie sich der Abend gestaltet.',
    isExpress: false,
    deepQuestionPrompt: 'Wie gelingt dir der Übergang von Arbeit zu Feierabend?',
    optionalReasons: ['Arbeit-zu-Zuhause-Übergang', 'Großer Hunger', 'Stress im Kopf', 'Erschöpfung', 'Belohnungswunsch'],
    options: [
      {
        id: 'm6_opt1',
        emoji: '💚',
        title: 'Entspannt',
        subtitle: 'Ich kann gut abschalten.',
        weights: { bear: 2, lion: 1 },
        energyTag: 'balanced'
      },
      {
        id: 'm6_opt2',
        emoji: '😋',
        title: 'Hungrig',
        subtitle: 'Jetzt merke ich den Hunger.',
        weights: { lion: 3, wolf: 1 },
        energyTag: 'high'
      },
      {
        id: 'm6_opt3',
        emoji: '🥱',
        title: 'Erschöpft',
        subtitle: 'Ich bin ziemlich leer.',
        weights: { bear: 3, fox: 1 },
        energyTag: 'low'
      },
      {
        id: 'm6_opt4',
        emoji: '😵',
        title: 'Gestresst',
        subtitle: 'Der Tag hängt noch nach.',
        weights: { fox: 3 },
        energyTag: 'seeking'
      }
    ]
  },
  {
    id: 7,
    time: '19:30',
    icon: '🍽️',
    label: 'Abendessen',
    title: 'Abendessen.',
    question: 'Was ist heute dein typischer Abend?',
    foxTip: 'Ein bewusstes Abendessen hilft dem Körper, in den Ruhemodus überzugehen.',
    isExpress: false,
    deepQuestionPrompt: 'Wie hast du das Essen erlebt?',
    optionalReasons: ['Sättigend', 'Leicht', 'Genuss', 'Schnell', 'Sozial', 'Nebenbei', 'Spontan', 'Geplant'],
    options: [
      {
        id: 'm7_opt1',
        emoji: '🥗',
        title: 'Leicht',
        subtitle: 'Ich möchte danach angenehm satt sein.',
        weights: { bear: 2, lion: 1 },
        energyTag: 'balanced'
      },
      {
        id: 'm7_opt2',
        emoji: '🍝',
        title: 'Herzhaft',
        subtitle: 'Heute darf es kräftig sein.',
        weights: { lion: 2, wolf: 1 },
        energyTag: 'high'
      },
      {
        id: 'm7_opt3',
        emoji: '🥪',
        title: 'Schnell',
        subtitle: 'Ich möchte es einfach halten.',
        weights: { bear: 1, fox: 2 },
        energyTag: 'balanced'
      },
      {
        id: 'm7_opt4',
        emoji: '📺',
        title: 'Nebenbei',
        subtitle: 'Essen und Bildschirm gehören zusammen.',
        weights: { wolf: 3, fox: 1 },
        energyTag: 'seeking'
      }
    ]
  },
  {
    id: 8,
    time: '21:30',
    icon: '🌙',
    label: 'Abendmoment',
    title: 'Der Tag wird ruhig.',
    question: 'Was machst du jetzt?',
    foxTip: 'Hier trennt sich oft körperlicher Hunger von der Lust nach Gemütlichkeit.',
    isExpress: false,
    deepQuestionPrompt: 'Was suchst du in diesem späten Abendmoment?',
    optionalReasons: ['Entspannung', 'Unterhaltung', 'Social Media', 'Snack-Ritual', 'Offene Gedanken'],
    options: [
      {
        id: 'm8_opt1',
        emoji: '📖',
        title: 'Abschalten',
        subtitle: 'Lesen, Musik oder Ruhe.',
        weights: { lion: 2, bear: 2 },
        energyTag: 'balanced'
      },
      {
        id: 'm8_opt2',
        emoji: '📱',
        title: 'Handy',
        subtitle: 'Ich scrolle oder schreibe.',
        weights: { wolf: 2, fox: 2 },
        energyTag: 'seeking'
      },
      {
        id: 'm8_opt3',
        emoji: '🎬',
        title: 'Serie',
        subtitle: 'Ich mache es mir gemütlich.',
        weights: { wolf: 2, bear: 1 },
        energyTag: 'balanced'
      },
      {
        id: 'm8_opt4',
        emoji: '🍿',
        title: 'Noch etwas essen',
        subtitle: 'Ein Snack gehört zu diesem Moment.',
        weights: { wolf: 3, fox: 1 },
        energyTag: 'seeking'
      }
    ]
  },
  {
    id: 9,
    time: '22:30',
    icon: '😴',
    label: 'Tagesende',
    title: 'Du gehst ins Bett.',
    question: 'Wie fühlt sich dein Tag jetzt an?',
    foxTip: 'Der Tag ist geschafft. Jeder Tag ist ein neuer Entdeckungsraum.',
    isExpress: true,
    isBedTimeMoment: true,
    deepQuestionPrompt: 'Wie lautet dein freier Gedanke oder Fazit zum Tag?',
    optionalReasons: ['Zufriedenheit', 'Gute Energie', 'Unruhe', 'Schlafbereit', 'Dankbar'],
    options: [
      {
        id: 'm9_opt1',
        emoji: '😊',
        title: 'Zufrieden',
        subtitle: 'Ich kann den Tag loslassen.',
        weights: { lion: 2, bear: 2 },
        energyTag: 'balanced'
      },
      {
        id: 'm9_opt2',
        emoji: '🙂',
        title: 'Okay',
        subtitle: 'Ein normaler Tag.',
        weights: { bear: 2 },
        energyTag: 'balanced'
      },
      {
        id: 'm9_opt3',
        emoji: '🧠',
        title: 'Kopf aktiv',
        subtitle: 'Ich denke noch weiter.',
        weights: { fox: 3, wolf: 2 },
        energyTag: 'seeking'
      },
      {
        id: 'm9_opt4',
        emoji: '😴',
        title: 'Erschöpft',
        subtitle: 'Ich will nur noch schlafen.',
        weights: { bear: 3, wolf: 1 },
        energyTag: 'low'
      }
    ]
  }
];
