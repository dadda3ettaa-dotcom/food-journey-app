import { ArchetypeId } from '../types';

export interface MealMatrixItem {
  id: string;
  category: string;
  imageUrl: string;
  weights: Partial<Record<ArchetypeId, number>>;
  energyTag: 'balanced' | 'high' | 'low' | 'seeking';
  dishHint: string;
}

// 9 Frühstücks-Gerichte (3x3 Matrix ohne Worte)
export const BREAKFAST_MEAL_MATRIX: MealMatrixItem[] = [
  {
    id: 'bf_1',
    category: 'Haferflocken & Beeren',
    imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=400&q=80',
    weights: { bear: 3, lion: 1 },
    energyTag: 'balanced',
    dishHint: 'Porridge / Haferflocken-Bowl mit Beeren & Nüssen'
  },
  {
    id: 'bf_2',
    category: 'Eierspeise & Avocado',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80',
    weights: { lion: 3, bear: 1 },
    energyTag: 'high',
    dishHint: 'Rührei / Spiegelei mit Avocado & Toast'
  },
  {
    id: 'bf_3',
    category: 'Croissant & Gebäck',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80',
    weights: { wolf: 3, fox: 1 },
    energyTag: 'seeking',
    dishHint: 'Süßes Croissant / Gebäck'
  },
  {
    id: 'bf_4',
    category: 'Grüner Smoothie',
    imageUrl: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=400&q=80',
    weights: { bear: 2, lion: 2 },
    energyTag: 'balanced',
    dishHint: 'Frischer grüner Smoothie / Power-Drink'
  },
  {
    id: 'bf_5',
    category: 'Vollkornbrot & Käse',
    imageUrl: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80',
    weights: { bear: 3 },
    energyTag: 'balanced',
    dishHint: 'Belegtes Vollkornbrot mit Käse & Gemüse'
  },
  {
    id: 'bf_6',
    category: 'Joghurt & Granola',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80',
    weights: { bear: 2, wolf: 1 },
    energyTag: 'balanced',
    dishHint: 'Griechischer Joghurt / Quark mit Granola & Honig'
  },
  {
    id: 'bf_7',
    category: 'Pancakes & Früchte',
    imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80',
    weights: { wolf: 2, lion: 2 },
    energyTag: 'seeking',
    dishHint: 'Fluffige Pancakes mit Ahornsirup & Früchten'
  },
  {
    id: 'bf_8',
    category: 'Nur Kaffee / Espresso',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
    weights: { wolf: 3, fox: 2 },
    energyTag: 'low',
    dishHint: 'Nur Kaffee / Espresso am Morgen'
  },
  {
    id: 'bf_9',
    category: 'Warmes Herzhaftes Frühstück',
    imageUrl: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=400&q=80',
    weights: { lion: 3 },
    energyTag: 'high',
    dishHint: 'Warmes Pfannengericht / Shakshuka / English Breakfast'
  }
];

// 9 Mittags-Gerichte (3x3 Matrix ohne Worte)
export const LUNCH_MEAL_MATRIX: MealMatrixItem[] = [
  {
    id: 'lu_1',
    category: 'Bunte Salat-Bowl',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
    weights: { bear: 3, lion: 1 },
    energyTag: 'balanced',
    dishHint: 'Große bunte Salat-Bowl mit Quinoa / Hähnchen / Tofu'
  },
  {
    id: 'lu_2',
    category: 'Pasta & Tomatensauce',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d62810a9?auto=format&fit=crop&w=400&q=80',
    weights: { bear: 2, lion: 2 },
    energyTag: 'high',
    dishHint: 'Italienische Pasta mit mediterraner Sauce'
  },
  {
    id: 'lu_3',
    category: 'Gemüse-Curry & Reis',
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80',
    weights: { lion: 2, bear: 2 },
    energyTag: 'high',
    dishHint: 'Wärmendes Kokos-Gemüse-Curry mit Reis'
  },
  {
    id: 'lu_4',
    category: 'Burger & Pommes',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
    weights: { lion: 2, wolf: 2 },
    energyTag: 'high',
    dishHint: 'Burger mit Beilage'
  },
  {
    id: 'lu_5',
    category: 'Wrap & Sandwich',
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80',
    weights: { fox: 3, bear: 1 },
    energyTag: 'seeking',
    dishHint: 'Frischer Wrap / Sandwich to go'
  },
  {
    id: 'lu_6',
    category: 'Suppe & Eintopf',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80',
    weights: { bear: 3 },
    energyTag: 'balanced',
    dishHint: 'Kräftiger Eintopf / Suppe mit Vollkornbrot'
  },
  {
    id: 'lu_7',
    category: 'Protein-Teller mit Gemüse',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
    weights: { lion: 3 },
    energyTag: 'high',
    dishHint: 'Lachs / Geflügel mit Süßkartoffeln & Brokkoli'
  },
  {
    id: 'lu_8',
    category: 'Pizza / Flammkuchen',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
    weights: { wolf: 2, lion: 2 },
    energyTag: 'high',
    dishHint: 'Pizza aus dem Steinofen / Flammkuchen'
  },
  {
    id: 'lu_9',
    category: 'Sushi & Asian Bowl',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80',
    weights: { lion: 2, bear: 2 },
    energyTag: 'balanced',
    dishHint: 'Frische Sushi-Platte / Poke Bowl'
  }
];

// 9 Snack-Optionen (3x3 Matrix ohne Worte für Vormittags/Nachmittags-Snack)
export const SNACK_MEAL_MATRIX: MealMatrixItem[] = [
  {
    id: 'sn_1',
    category: 'Frisches Obst & Beeren',
    imageUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=400&q=80',
    weights: { bear: 3 },
    energyTag: 'balanced',
    dishHint: 'Apfel, Banane oder Beeren'
  },
  {
    id: 'sn_2',
    category: 'Handvoll Nüsse & Kerne',
    imageUrl: 'https://images.unsplash.com/photo-1536591375315-1b8368157761?auto=format&fit=crop&w=400&q=80',
    weights: { bear: 2, lion: 2 },
    energyTag: 'balanced',
    dishHint: 'Mandeln, Walnüsse oder Studentenfutter'
  },
  {
    id: 'sn_3',
    category: 'Schokolade & Kekse',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80',
    weights: { wolf: 3, fox: 1 },
    energyTag: 'seeking',
    dishHint: 'Dunkle/Helle Schokolade oder Feingebäck'
  },
  {
    id: 'sn_4',
    category: 'Kaffee / Cappuccino',
    imageUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80',
    weights: { bear: 2, wolf: 1 },
    energyTag: 'low',
    dishHint: 'Cremiger Cappuccino / Latte'
  },
  {
    id: 'sn_5',
    category: 'Proteinriegel / Shake',
    imageUrl: 'https://images.unsplash.com/photo-1622484216834-080c98f8fc68?auto=format&fit=crop&w=400&q=80',
    weights: { lion: 3 },
    energyTag: 'high',
    dishHint: 'Proteinriegel oder Fitness-Shake'
  },
  {
    id: 'sn_6',
    category: 'Salzige Cracker / Chips',
    imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80',
    weights: { wolf: 2, fox: 2 },
    energyTag: 'seeking',
    dishHint: 'Knusprige Chips oder Salzgebäck'
  },
  {
    id: 'sn_7',
    category: 'Joghurt-Dessert',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80',
    weights: { bear: 2, wolf: 1 },
    energyTag: 'balanced',
    dishHint: 'Fruchtjoghurt oder Dessert'
  },
  {
    id: 'sn_8',
    category: 'Brezel & Minibrötchen',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80',
    weights: { fox: 2, bear: 1 },
    energyTag: 'balanced',
    dishHint: 'Kleine Laugenbrezel oder Snack-Brötchen'
  },
  {
    id: 'sn_9',
    category: 'Gemüsesticks & Hummus',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
    weights: { bear: 3 },
    energyTag: 'balanced',
    dishHint: 'Karotten- & Gurkensticks mit cremigen Hummus'
  }
];

// 9 Abendessens-Gerichte (3x3 Matrix ohne Worte)
export const DINNER_MEAL_MATRIX: MealMatrixItem[] = [
  {
    id: 'di_1',
    category: 'Deutsches Abendbrot',
    imageUrl: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80',
    weights: { bear: 3, lion: 1 },
    energyTag: 'balanced',
    dishHint: 'Klassisches Abendbrot mit Brot, Käse, Schinken & Rohkost'
  },
  {
    id: 'di_2',
    category: 'Wok-Gemüse-Pfanne',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80',
    weights: { bear: 3, lion: 1 },
    energyTag: 'balanced',
    dishHint: 'Knackige bunte Wok-Gemüsepfanne mit Reis'
  },
  {
    id: 'di_3',
    category: 'Großer Salatteller',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
    weights: { bear: 3 },
    energyTag: 'balanced',
    dishHint: 'Mediterraner Salatteller mit Schafskäse & Oliven'
  },
  {
    id: 'di_4',
    category: 'Auflauf & Pasta',
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80',
    weights: { lion: 2, bear: 2 },
    energyTag: 'high',
    dishHint: 'Herzhafte Lasagne / Nudelauflauf'
  },
  {
    id: 'di_5',
    category: 'Ofengericht / Fisch & Gemüse',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
    weights: { lion: 3, bear: 1 },
    energyTag: 'high',
    dishHint: 'Gebratener Fisch / Fleisch mit feinem Ofengemüse'
  },
  {
    id: 'di_6',
    category: 'Lieferdienst Pizza / Fastfood',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
    weights: { wolf: 3, fox: 1 },
    energyTag: 'seeking',
    dishHint: 'Pizza vom Lieferdienst / Gemütliches Couch-Essen'
  },
  {
    id: 'di_7',
    category: 'Warme Ramen / Nudelsuppe',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80',
    weights: { bear: 2, lion: 1 },
    energyTag: 'balanced',
    dishHint: 'Dampfende asiatische Nudelsuppe / Ramen'
  },
  {
    id: 'di_8',
    category: 'Cremesuppe & Röstbrot',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80',
    weights: { bear: 3 },
    energyTag: 'balanced',
    dishHint: 'Cremige Kürbis- / Gemüsesuppe mit geröstetem Brot'
  },
  {
    id: 'di_9',
    category: 'Leichte Snack-Platte',
    imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=400&q=80',
    weights: { fox: 2, wolf: 2 },
    energyTag: 'seeking',
    dishHint: 'Kleine Fingerfood-Platte oder Snack-Reste'
  }
];

export function getMealMatrixForMoment(momentId: number): MealMatrixItem[] | null {
  if (momentId === 2) return BREAKFAST_MEAL_MATRIX; // Frühstück
  if (momentId === 4) return LUNCH_MEAL_MATRIX;     // Mittag
  if (momentId === 5) return SNACK_MEAL_MATRIX;     // Nachmittags-Snack
  if (momentId === 7) return DINNER_MEAL_MATRIX;    // Abendessen
  return null;
}
