import { Mission } from '../types';

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'm-screen-free',
    title: 'Eine Mahlzeit ohne Bildschirm',
    description: 'Probiere heute eine Mahlzeit (z.B. Mittag- oder Abendessen) ganz ohne Smartphone, Laptop oder Fernseher.',
    status: 'try',
    category: 'Achtsamkeit',
    icon: '📵'
  },
  {
    id: 'm-afternoon-pause',
    title: 'Echte 10-Minuten-Pause am Nachmittag',
    description: 'Teste gegen 15:30 Uhr eine kurze 10-minütige Pause mit Dehnen oder frischer Luft, bevor du zu Kaffee oder Snack greifst.',
    status: 'try',
    category: 'Pause',
    icon: '🪑'
  },
  {
    id: 'm-water-first',
    title: 'Erst Wasser, dann Kaffee',
    description: 'Trinke morgens nach dem Aufstehen zuerst ein großes Glas warmes oder kühles Wasser, bevor der Kaffee folgt.',
    status: 'try',
    category: 'Rhythmus',
    icon: '💧'
  },
  {
    id: 'm-home-prep',
    title: 'Einfache Option für den Heimweg',
    description: 'Bereite eine einfache, nahrhafte Option (Nüsse, Obst oder vorbereitetes Essen) für den Moment des Ankommens vor.',
    status: 'try',
    category: 'Mahlzeiten',
    icon: '🏠'
  },
  {
    id: 'm-hunger-check',
    title: 'Hunger vor dem Abendessen beobachten',
    description: 'Halte vor dem ersten Bissen 10 Sekunden inne: Ist es körperlicher Hunger, Stressabbau oder pure Vorfreude?',
    status: 'try',
    category: 'Achtsamkeit',
    icon: '🍽️'
  },
  {
    id: 'm-evening-reflection',
    title: 'Tagesabschluss mit einem positiven Satz',
    description: 'Beende den Tag vor dem Einschlafen mit der Notiz: „Was hat heute in meinem Rhythmus gut funktioniert?“',
    status: 'try',
    category: 'Abend',
    icon: '✨'
  }
];
