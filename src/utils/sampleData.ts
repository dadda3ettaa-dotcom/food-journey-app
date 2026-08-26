import { DayHistoryEntry } from '../types';
import { calculateReport, determineColorStatus } from './scoring';

export function generateAnnaExampleDay(): {
  answers: Record<number, string>;
  momentDetails: Record<number, any>;
  notes: string;
  reportSummary: string;
} {
  return {
    answers: {
      1: 'm1_opt2', // 07:30 Müde
      2: 'm2_opt3', // 08:00 Nur Kaffee
      3: 'm3_opt2', // 10:30 Energie sinkt
      4: 'm4_opt3', // 12:30 Schnell
      5: 'm5_opt2', // 15:30 Snack-Lust
      6: 'm6_opt4', // 18:00 Gestresst & hungrig
      7: 'm7_opt4', // 19:30 Nebenbei / vor Bildschirm
      8: 'm8_opt4', // 21:30 Noch etwas essen
      9: 'm9_opt4'  // 22:30 Erschöpft
    },
    momentDetails: {
      4: { hungerBefore: 3, satietyAfter: 1, context: 'Büro', foodFlexTags: ['Schnell', 'Nebenbei'] },
      5: { hungerBefore: 2, foodFlexTags: ['Spontan', 'Snack-Impuls'] },
      7: { hungerBefore: 4, satietyAfter: 3, context: 'Zuhause', foodFlexTags: ['Nebenbei', 'Genuss'] }
    },
    notes: 'Kapitel 28 (Anna): Schneller Bürotag, Übergang am Nachmittag und Bildschirm-Abendessen.',
    reportSummary: 'Heute zeigen sich mehrere Übergangsmomente: ein schwieriger Start, ein Energieabfall am Vormittag und Snack-Lust am Nachmittag. Beobachte morgen besonders den Übergang zwischen Arbeit und Abendessen.'
  };
}

export function generateSampleHistory(): DayHistoryEntry[] {
  const days: DayHistoryEntry[] = [];
  const now = new Date();

  // 5 sample days spanning past week
  const sampleConfigs = [
    {
      offsetDays: 4,
      mode: 'standard' as const,
      answers: {
        1: 'm1_opt1', // Wach (Lion)
        2: 'm2_opt1', // Frühstücken (Lion/Bear)
        3: 'm3_opt1', // Im Flow (Lion)
        4: 'm4_opt2', // Herzhaft
        5: 'm5_opt4', // Weiter
        6: 'm6_opt1', // Entspannt
        7: 'm7_opt1', // Leicht
        8: 'm8_opt1', // Abschalten
        9: 'm9_opt1'  // Zufrieden
      },
      notes: 'Sehr strukturierter Tag im Büro mit früher Energie und klaren Essenszeiten.',
      missionsCompleted: ['m-screen-free'],
      context: 'Büro'
    },
    {
      offsetDays: 3,
      mode: 'standard' as const,
      answers: {
        1: 'm1_opt4', // Unruhig (Fox)
        2: 'm2_opt3', // Nur Kaffee
        3: 'm3_opt4', // Unter Druck (Fox)
        4: 'm4_opt3', // Schnell
        5: 'm5_opt2', // Snack-Lust (Fox/Wolf)
        6: 'm6_opt4', // Gestresst (Fox)
        7: 'm7_opt4', // Nebenbei
        8: 'm8_opt2', // Handy
        9: 'm9_opt3'  // Kopf aktiv (Fox)
      },
      notes: 'Viele Termine im Homeoffice, Essen oft nebenbei am Laptop.',
      missionsCompleted: [],
      context: 'Homeoffice'
    },
    {
      offsetDays: 2,
      mode: 'standard' as const,
      answers: {
        1: 'm1_opt2', // Müde (Wolf/Bear)
        2: 'm2_opt2', // Etwas Süßes
        3: 'm3_opt2', // Energie sinkt
        4: 'm4_opt1', // Leicht
        5: 'm5_opt2', // Snack-Lust (Wolf)
        6: 'm6_opt2', // Hungrig
        7: 'm7_opt2', // Herzhaft
        8: 'm8_opt4', // Noch etwas essen (Wolf)
        9: 'm9_opt4'  // Erschöpft
      },
      notes: 'Später Feierabend mit gemütlichem Knabbern bei einer Serie.',
      missionsCompleted: ['m-water-first'],
      context: 'Zuhause'
    },
    {
      offsetDays: 1,
      mode: 'standard' as const,
      answers: {
        1: 'm1_opt2', // Müde
        2: 'm2_opt1', // Ich frühstücke (Bear)
        3: 'm3_opt1', // Im Flow
        4: 'm4_opt1', // Leicht (Bear)
        5: 'm5_opt1', // Pause (Bear)
        6: 'm6_opt1', // Entspannt (Bear)
        7: 'm7_opt1', // Leicht (Bear)
        8: 'm8_opt3', // Serie
        9: 'm9_opt2'  // Okay
      },
      notes: 'Schöner ausgeglichener Tag mit echter Pause um 15:30 Uhr.',
      missionsCompleted: ['m-afternoon-pause', 'm-screen-free'],
      context: 'Büro'
    }
  ];

  sampleConfigs.forEach((cfg) => {
    const d = new Date(now);
    d.setDate(d.getDate() - cfg.offsetDays);
    const dateStr = d.toISOString().split('T')[0];
    const dateFormatted = d.toLocaleDateString('de-DE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
    const dayOfWeek = d.toLocaleDateString('de-DE', { weekday: 'short' });

    const momentDetails: Record<number, any> = {
      4: {
        hungerBefore: 3,
        satietyAfter: 2,
        context: cfg.context,
        foodFlexTags: ['Sättigend', 'Geplant']
      },
      5: {
        hungerBefore: 2,
        foodFlexTags: ['Snack-Impuls', 'Pause']
      },
      7: {
        hungerBefore: 3,
        satietyAfter: 2,
        context: cfg.context,
        foodFlexTags: ['Genuss', 'Sozial']
      }
    };

    const report = calculateReport(cfg.answers, momentDetails, 4);
    const colorStatus = determineColorStatus(cfg.answers);

    days.push({
      id: dateStr,
      dateFormatted,
      dayOfWeek,
      mode: cfg.mode,
      answers: cfg.answers,
      momentDetails,
      xp: 90,
      isFinished: true,
      primaryArchetypeId: report.primary.id,
      secondaryArchetypeId: report.secondary?.id,
      colorStatus,
      summaryObservation: report.observations[0] || 'Ausgeglichener Tag.',
      notes: cfg.notes,
      missionsCompleted: cfg.missionsCompleted,
      report
    });
  });

  return days;
}
