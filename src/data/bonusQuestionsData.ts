import { DynamicBonusQuestion, ArchetypeId, GenderBioType, BonusQuestionAnswer, SleepCalculation } from '../types';

export const BONUS_QUESTIONS_POOL: DynamicBonusQuestion[] = [
  // 1. Lion + Young Adult / Adult (Early peak, work rhythm)
  {
    id: 'bq_lion_energy_dip',
    title: 'Dein Vormittagshoch & Nachmittags-Abfall',
    subtitle: 'Als Löwe startest du oft mit hoher Leistungsfähigkeit. Wie schützt du deine Energie für die zweite Tageshälfte?',
    dimensionBadge: '🦁 Löwe • Energie-Kurve',
    reasonBadge: 'Morgenmensch • Hohe Vormittags-Produktivität',
    targetArchetypes: ['lion'],
    options: [
      {
        id: 'opt_1',
        emoji: '🥗',
        text: 'Ein vollwertiges, nicht zu schweres Mittagessen einplanen',
        insight: 'Ein leichtes, proteinreiches Mittagessen verhindert das gefürchtete 14-Uhr-Koma nach einem starken Vormittag.'
      },
      {
        id: 'opt_2',
        emoji: '🚶',
        text: '10 Minuten Bildschirmpause vor dem nächsten Termin',
        insight: 'Aktives Umschalten vor dem Nachmittag senkt den Cortisolspiegel nachhaltig.'
      },
      {
        id: 'opt_3',
        emoji: '💧',
        text: 'Großes Glas Wasser vor dem ersten Nachmittagskaffee',
        insight: 'Hydration schützt vor scheinbarer Müdigkeit, die in Wahrheit oft nur Flüssigkeitsbedarf ist.'
      },
      {
        id: 'opt_4',
        emoji: '🌿',
        text: 'Wichtige Aufgaben vor 13:00 Uhr erledigen, danach Routinen',
        insight: 'Den Löwen-Vorteil nutzen: Komplexe Entscheidungen am Morgen fällen, am Nachmittag verwalten.'
      }
    ]
  },

  // 2. Wolf + Night Owl / Evening hunger
  {
    id: 'bq_wolf_evening_snack',
    title: 'Späte Kreativität & der Küchengang',
    subtitle: 'Als Wolf bist du abends oft am wachsten. Was bedeutet Essen am späten Abend für dich?',
    dimensionBadge: '🐺 Wolf • Abendrhythmus',
    reasonBadge: 'Spätaufsteher • Abends aktiv',
    targetArchetypes: ['wolf'],
    options: [
      {
        id: 'opt_1',
        emoji: '🍵',
        text: 'Gemütliches Ritual zum Runterkommen (z. B. warmer Tee / Nüsse)',
        insight: 'Warme, koffeinfreie Getränke signalisieren dem Nervensystem den Übergang zur Nachtruhe.'
      },
      {
        id: 'opt_2',
        emoji: '🍕',
        text: 'Kreativitäts-Treibstoff für späte Projekte',
        insight: 'Wenn du nachts arbeitest, braucht das Gehirn Glukose – leichte Snacks schonen den Tiefschlaf.'
      },
      {
        id: 'opt_3',
        emoji: '📱',
        text: 'Ablenkung beim Scrollen oder Serienschauen',
        insight: 'Oft ist späte Snacklust kein echter Hunger, sondern das Bedürfnis nach sensorischem Reiz.'
      },
      {
        id: 'opt_4',
        emoji: '🧘',
        text: 'Abschluss des Tages ohne starres Schlechtes-Gewissen',
        insight: 'Wölfe essen naturgemäß später. Wichtig ist, wie sich der Magen beim Einschlafen anfühlt.'
      }
    ]
  },

  // 3. Fox + Sensitive / Stress Transitions
  {
    id: 'bq_fox_stress_transition',
    title: 'Der Übergang vom Arbeitsmodus in die Entspannung',
    subtitle: 'Als Fuchs reagiert dein Essverhalten sensibel auf Umgebungswechsel und Reize. Wie fühlt sich dein Feierabend an?',
    dimensionBadge: '🦊 Fuchs • Feinfühligkeit & Reize',
    reasonBadge: 'Wechselnde Tagesform • Feinfühliger Appetit',
    targetArchetypes: ['fox'],
    options: [
      {
        id: 'opt_1',
        emoji: '🚪',
        text: 'Heimkommen = Sofort Appetit auf schnelle Belohnung',
        insight: 'Der Kühlschrank dient oft als Decke gegen den Übergangsstress. 5 Minuten Durchatmen vor dem Essen helfen.'
      },
      {
        id: 'opt_2',
        emoji: '🎧',
        text: 'Kopfhörer auf, Musik oder Ruhe zum Entladen',
        insight: 'Akustische Reizreduktion senkt das emotionale Verlangen nach schnellen Kohlenhydraten.'
      },
      {
        id: 'opt_3',
        emoji: '🛋️',
        text: 'Erst 15 Minuten liegen, bevor über Essen entschieden wird',
        insight: 'Körperliche Entlastung trennt echten Hunger von mentaler Erschöpfung.'
      },
      {
        id: 'opt_4',
        emoji: '🍲',
        text: 'Etwas Warmes und Tröstendes genießen',
        insight: 'Warme Mahlzeiten aktivieren den Parasympathikus und bringen innere Geborgenheit.'
      }
    ]
  },

  // 4. Bear + Daily Routine & Lunch Anchor
  {
    id: 'bq_bear_routine_social',
    title: 'Dein Mittagsanker & soziales Umfeld',
    subtitle: 'Als Bär synchronisiert sich dein Rhythmus gerne mit dem Sonnenverlauf und sozialen Mahlzeiten. Was prägt dein Mittagessen am meisten?',
    dimensionBadge: '🐻 Bär • Stetigkeit & Rhythmus',
    reasonBadge: 'Klassischer Tagestakt • Soziales Essen',
    targetArchetypes: ['bear'],
    options: [
      {
        id: 'opt_1',
        emoji: '👥',
        text: 'Gemeinsames Essen mit Kollegen oder Familie',
        insight: 'Sozialer Austausch fördert Genuss und verhindert hastiges Herunterschlingen.'
      },
      {
        id: 'opt_2',
        emoji: '⏱️',
        text: 'Feste Uhrzeit gibt mir Struktur für den Rest des Tages',
        insight: 'Feste Mahlzeitenzeiten stabilisieren die circadiane Insulinausschüttung ideal.'
      },
      {
        id: 'opt_3',
        emoji: '🥪',
        text: 'Praktisch und alltagstauglich, schnell weiter',
        insight: 'Auch schnelle Mahlzeiten nähren gut, wenn kurz in Ruhe gekaut wird.'
      },
      {
        id: 'opt_4',
        emoji: '😴',
        text: 'Nach dem Essen merke ich oft eine angenehme Trägheit',
        insight: 'Ein kurzer Spaziergang bringt den Bären-Stoffwechsel sofort wieder in Schwung.'
      }
    ]
  },

  // 5. Gender Bio Focus: Female / Cycle / Hormonal Awareness
  {
    id: 'bq_bio_female_cycle',
    title: 'Körperwahrnehmung & Hormonphasen',
    subtitle: 'Weibliche Stoffwechselrhythmen variieren über Wochen und Tage. Wie nimmst du deine aktuellen Appetit- und Energieschwankungen wahr?',
    dimensionBadge: '🌸 Bio-Rhythmus • Weibliche Balance',
    reasonBadge: 'Hormonelle & zyklische Feinfühligkeit',
    targetGender: ['female'],
    options: [
      {
        id: 'opt_1',
        emoji: '🍫',
        text: 'Phasenweise intensiverer Heißhunger auf Süßes/Fettiges',
        insight: 'In der zweiten Zyklushälfte steigt der Grundumsatz um bis zu 200 kcal – Heißhunger ist hier ein echtes Nährstoffsignal!'
      },
      {
        id: 'opt_2',
        emoji: '⚡',
        text: 'Tage mit enormer Power im Wechsel mit Tagen mit Ruhebedarf',
        insight: 'Östrogenspitzen bringen Fokus, Progesteron lädt zur Schonung ein. Beides darf sein.'
      },
      {
        id: 'opt_3',
        emoji: '🥑',
        text: 'Bewusst auf gesunde Fette und Magnesium achten',
        insight: 'Magnesium und Omega-3 unterstützen die hormonelle Ausgeglichenheit und Schlafqualität.'
      },
      {
        id: 'opt_4',
        emoji: '🌿',
        text: 'Meinen Körper nicht verurteilen, sondern liebevoll annehmen',
        insight: 'Akzeptanz nimmt den Druck raus und beendet den Teufelskreis aus Verzicht und Frust.'
      }
    ]
  },

  // 6. Gender Bio Focus: Male / Muscle & Cortisol / Fast Metabolism
  {
    id: 'bq_bio_male_recovery',
    title: 'Muskelregeneration & Tagesstress-Abbau',
    subtitle: 'Männliche Testosteron- und Cortisolkurven erreichen morgens ihren Höchststand und sinken abends. Wie lädst du deinen Akku wieder auf?',
    dimensionBadge: '⚡ Bio-Rhythmus • Männliche Regeneration',
    reasonBadge: 'Kraft- & Erholungsrhythmus',
    targetGender: ['male'],
    options: [
      {
        id: 'opt_1',
        emoji: '🥩',
        text: 'Ausreichend Proteine und komplexe Mahlzeiten für Sättigung',
        insight: 'Gleichmäßige Proteinzufuhr stabilisiert die Muskelsynthese und dämpft spätes Knabbern.'
      },
      {
        id: 'opt_2',
        emoji: '🏋️',
        text: 'Sport oder Bewegung zum Stressventil nutzen',
        insight: 'Physische Betätigung baut aufgestautes Cortisol ab, sollte aber 2h vor dem Schlaf enden.'
      },
      {
        id: 'opt_3',
        emoji: '🛋️',
        text: 'Ruhe am Abend, um das Nervensystem herunterzufahren',
        insight: 'Abendliches Abschalten ist der Schlüssel für die nächtliche Wachstumshormon-Ausschüttung.'
      },
      {
        id: 'opt_4',
        emoji: '💧',
        text: 'Auf genug Flüssigkeit über den Tag achten',
        insight: 'Schon 2% Dehydration senken Muskelkraft und mentale Konzentration spürbar.'
      }
    ]
  },

  // 7. Age Group: Young Adult (< 25) • Screens, Flexible Timing, Social Life
  {
    id: 'bq_age_young_flex',
    title: 'Flexibler Alltag & Bildschirmbegleitung',
    subtitle: 'Im Alter unter 25 ist der Tagesablauf oft dynamisch, mit späten Einschlafzeiten und viel Bildschirmzeit. Was fällt dir bei deinen Essgewohnheiten auf?',
    dimensionBadge: '📱 Alter: Junge Dynamik (< 25)',
    reasonBadge: 'Später Schlafdruck • Digitaler Alltag',
    maxAge: 25,
    options: [
      {
        id: 'opt_1',
        emoji: '📺',
        text: 'Essen ist fast immer mit YouTube, Netflix oder TikTok verknüpft',
        insight: 'Bildschirme dämpfen Sättigungssignale – 5 Minuten ohne Screen lassen dich den Geschmack intensiver erleben.'
      },
      {
        id: 'opt_2',
        emoji: '🥪',
        text: 'Mahlzeiten sind spontan und unregelmäßig',
        insight: 'Flexibilität ist toll – ein vorbereiteter Lieblingssnack rettet vor Notkäufen am Bahnhof.'
      },
      {
        id: 'opt_3',
        emoji: '🥤',
        text: 'Energy-Drinks oder Kaffee halten mich bis spät wach',
        insight: 'Koffein bis spät abends verschiebt den Melatonin-Ausstoß um 1-2 Stunden.'
      },
      {
        id: 'opt_4',
        emoji: '🌙',
        text: 'Nachts ist meine produktivste oder entspannteste Phase',
        insight: 'Der zirkadiane Rhythmus von jungen Erwachsenen ist biologisch nach hinten verschoben – das ist normal.'
      }
    ]
  },

  // 8. Age Group: Midlife / Career & Family (26 - 49) • Cortisol, Multitasking
  {
    id: 'bq_age_midlife_balance',
    title: 'Alltagsbelastung, Zeitmangel & bewusste Inseln',
    subtitle: 'Im aktiven Berufs- und Familienalltag wird Essen oft zur Nebensache. Wo schaffst du dir kleine Ruhemomente?',
    dimensionBadge: '⏳ Alter: 25–49 Jahre • Berufs- & Familienfokus',
    reasonBadge: 'Hohe Alltagsdichte • Zeitbudget',
    minAge: 26,
    maxAge: 49,
    options: [
      {
        id: 'opt_1',
        emoji: '☕',
        text: 'Die erste Tasse Kaffee/Tee am Morgen ganz in Ruhe',
        insight: 'Ein bewusster Start ohne Handy setzt einen ruhigen Grundton für den gesamten Tag.'
      },
      {
        id: 'opt_2',
        emoji: '🍱',
        text: 'Meal-Prep oder geplante Reste erleichtern mir den Tag',
        insight: 'Planung nimmt im stressigen Moment Entscheidungsmüdigkeit („Decision Fatigue“) ab.'
      },
      {
        id: 'opt_3',
        emoji: '🏃',
        text: 'Schnelles Essen im Stehen oder vor dem Computer',
        insight: 'Schon 3 tiefe Atemzüge vor dem ersten Bissen aktivieren die Magensäure- und Enzymproduktion.'
      },
      {
        id: 'opt_4',
        emoji: '🍷',
        text: 'Der Abend als Belohnungs- und Entspannungszone',
        insight: 'Rituale wie Dehnen, Lesen oder warme Duschen bieten dieselbe Entspannung ohne Magenbelastung.'
      }
    ]
  },

  // 9. Age Group: 50+ • Sleep Quality, Digestion & Longevity
  {
    id: 'bq_age_mature_recovery',
    title: 'Schlafqualität, Bekömmlichkeit & Erholung',
    subtitle: 'Mit den Jahren verändert sich die Verdauungsgeschwindigkeit und die Tiefschlafarchitektur. Was tut deinem Magen abends besonders gut?',
    dimensionBadge: '🌿 Alter: 50+ • Wohlbefinden & Tiefschlaf',
    reasonBadge: 'Stoffwechselreife • Erholungsfokus',
    minAge: 50,
    options: [
      {
        id: 'opt_1',
        emoji: '🍲',
        text: 'Leichte, warme Abendmahlzeiten mindestens 2-3h vor dem Schlafen',
        insight: 'Ein entlasteter Verdauungstrakt ermöglicht längere Tiefschlafphasen und stabilere Herzratenvariabilität.'
      },
      {
        id: 'opt_2',
        emoji: '🚶',
        text: 'Ein kleiner Spaziergang nach dem Abendessen',
        insight: 'Sanfte Bewegung senkt den postprandialen Glukosespiegel um bis zu 30%.'
      },
      {
        id: 'opt_3',
        emoji: '🍵',
        text: 'Kräutertees (Kamille, Melisse) als Schlafbegleiter',
        insight: 'Pflanzliche Helfer beruhigen den Magen-Darm-Trakt und fördern sanftes Einschlafen.'
      },
      {
        id: 'opt_4',
        emoji: '🥗',
        text: 'Auf gute Eiweißquellen und Ballaststoffe über den Tag achten',
        insight: 'Ballaststoffe nähren das Mikrobiom, das maßgeblich an der Serotonin- und Melatonin-Bildung beteiligt ist.'
      }
    ]
  },

  // 10. Short Sleep Window Trigger (< 6.5h calculated from Bed & Wake time)
  {
    id: 'bq_short_sleep_window',
    title: 'Kurzes Schlaffenster & Heißhunger-Signal',
    subtitle: 'Deine Aufsteh- und Bettzeit deuten auf eine kurze Nacht hin. Wie reagiert dein Körper auf Schlafmangel?',
    dimensionBadge: '⏰ Zeit & Schlaf • Erholungsdefizit',
    reasonBadge: 'Schlaffenster unter 7 Stunden',
    options: [
      {
        id: 'opt_1',
        emoji: '🥐',
        text: 'Mehr Appetit auf schnelle Kohlenhydrate und Zucker am Nachmittag',
        insight: 'Schlafmangel erhöht das Hungerhormon Ghrelin und senkt Leptin – der Körper sucht schlicht nach schneller Energie.'
      },
      {
        id: 'opt_2',
        emoji: '☕',
        text: 'Stärkerer Koffein-Konsum über den Tag',
        insight: 'Koffein blockiert Adenosin-Rezeptoren, baut aber die Schlafmüdigkeit nicht ab. Wasser und kurze Pausen helfen.'
      },
      {
        id: 'opt_3',
        emoji: '😴',
        text: 'Frühes Hinlegen heute Abend einplanen',
        insight: 'Schon 45 Minuten früher im Bett gleichen ein moderates Schlafdefizit spürbar aus.'
      },
      {
        id: 'opt_4',
        emoji: '🧘',
        text: 'Trotzdem sanft mit mir umgehen und keine Höchstleistungen erzwingen',
        insight: 'Tage mit wenig Schlaf sind da, um sie durchzustehen – nicht um Perfektion zu verlangen.'
      }
    ]
  }
];

export function selectDynamicBonusQuestion(params: {
  primaryArchetype: ArchetypeId;
  age: number;
  gender: GenderBioType;
  wakeTime?: string;
  bedTime?: string;
  timeOfDayHours?: number;
  cycleAwareness?: boolean;
}): DynamicBonusQuestion {
  const { primaryArchetype, age, gender, wakeTime, bedTime, timeOfDayHours = new Date().getHours(), cycleAwareness = false } = params;

  // Calculate sleep hours if wake and bed times are provided
  let sleepDuration = 7.5;
  if (wakeTime && bedTime) {
    const [wH, wM] = wakeTime.split(':').map(Number);
    const [bH, bM] = bedTime.split(':').map(Number);
    const wakeMinutes = wH * 60 + (wM || 0);
    let bedMinutes = bH * 60 + (bM || 0);
    if (bedMinutes > wakeMinutes) {
      // Bedtime was yesterday (e.g. 23:00 to 07:00)
      sleepDuration = (24 * 60 - bedMinutes + wakeMinutes) / 60;
    } else {
      sleepDuration = (wakeMinutes - bedMinutes) / 60;
    }
  }

  // Priority 1: Short sleep window
  if (sleepDuration < 6.2 && sleepDuration > 2) {
    const sleepQ = BONUS_QUESTIONS_POOL.find((q) => q.id === 'bq_short_sleep_window');
    if (sleepQ) return sleepQ;
  }

  // Priority 2: Biological / Gender specific question if female and cycle relevant, or male
  if (gender === 'female' && Math.random() > 0.4) {
    const femaleQ = BONUS_QUESTIONS_POOL.find((q) => q.id === 'bq_bio_female_cycle');
    if (femaleQ) return femaleQ;
  } else if (gender === 'male' && Math.random() > 0.6) {
    const maleQ = BONUS_QUESTIONS_POOL.find((q) => q.id === 'bq_bio_male_recovery');
    if (maleQ) return maleQ;
  }

  // Priority 3: Age-specific question
  if (age > 0) {
    if (age <= 25) {
      const youngQ = BONUS_QUESTIONS_POOL.find((q) => q.id === 'bq_age_young_flex');
      if (youngQ && Math.random() > 0.3) return youngQ;
    } else if (age >= 50) {
      const matureQ = BONUS_QUESTIONS_POOL.find((q) => q.id === 'bq_age_mature_recovery');
      if (matureQ && Math.random() > 0.3) return matureQ;
    } else {
      const midlifeQ = BONUS_QUESTIONS_POOL.find((q) => q.id === 'bq_age_midlife_balance');
      if (midlifeQ && Math.random() > 0.5) return midlifeQ;
    }
  }

  // Priority 4: Archetype specific question
  const archetypeQ = BONUS_QUESTIONS_POOL.find(
    (q) => q.targetArchetypes && q.targetArchetypes.includes(primaryArchetype)
  );
  if (archetypeQ) return archetypeQ;

  // Fallback to first
  return BONUS_QUESTIONS_POOL[0];
}

export function calculateSleepMetrics(wakeTime?: string, bedTime?: string): SleepCalculation | undefined {
  if (!wakeTime || !bedTime) return undefined;

  const [wH, wM] = wakeTime.split(':').map(Number);
  const [bH, bM] = bedTime.split(':').map(Number);
  const wakeMinutes = wH * 60 + (wM || 0);
  let bedMinutes = bH * 60 + (bM || 0);

  let durationMinutes = 0;
  if (bedMinutes > wakeMinutes) {
    durationMinutes = 24 * 60 - bedMinutes + wakeMinutes;
  } else {
    durationMinutes = wakeMinutes - bedMinutes;
  }

  const durationHours = Math.round((durationMinutes / 60) * 10) / 10;

  let qualityFeedback = 'Ausgewogenes Schlaffenster';
  let rhythmNote = 'Dein Schlaf liegt im typischen empfohlenen Bereich für gute Alltagsregeneration.';

  if (durationHours < 6.5) {
    qualityFeedback = 'Kompaktes Schlaffenster (< 6.5h)';
    rhythmNote = 'Achte heute besonders auf Snack-Lust am Nachmittag – der Körper fordert Schlafmangel gern über schnelle Kalorien ein.';
  } else if (durationHours > 9) {
    qualityFeedback = 'Ausgedehnte Erholungsphase (> 9h)';
    rhythmNote = 'Dein Körper hat reichlich Schlafzeit erhalten. Sanfter Start am Morgen hilft beim Wachwerden.';
  } else {
    qualityFeedback = `Gutes Schlaffenster (~${durationHours}h)`;
    rhythmNote = `Von ${bedTime} bis ${wakeTime} Uhr: Dein Schlaffenster unterstützt deinen circadianen Stoffwechselrhythmus optimal.`;
  }

  return {
    wakeTime,
    bedTime,
    durationHours,
    qualityFeedback,
    rhythmNote
  };
}
