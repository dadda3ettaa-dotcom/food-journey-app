import { ARCHETYPES } from '../data/archetypesData';
import { MOMENTS } from '../data/momentsData';
import { ArchetypeId, ArchetypeScore, MomentDetail, ReportResult, BonusQuestionAnswer, GenderBioType, AnswerOption } from '../types';
import { calculateSleepMetrics } from '../data/bonusQuestionsData';
import { getMealMatrixForMoment } from '../data/mealMatrixData';

export function calculateReport(
  answers: Record<number, string>,
  momentDetails: Record<number, MomentDetail> = {},
  observedDaysCount: number = 1,
  wakeTime?: string,
  bedTime?: string,
  bonusAnswer?: BonusQuestionAnswer,
  userAge?: number,
  userGender?: GenderBioType
): ReportResult {
  const scoresMap: Record<ArchetypeId, number> = {
    fox: 0,
    wolf: 0,
    lion: 0,
    bear: 0
  };

  const answeredMoments: ReportResult['answeredMoments'] = [];
  const foodFlexSummary: string[] = [];

  MOMENTS.forEach((moment) => {
    const selectedOptionId = answers[moment.id];
    if (!selectedOptionId) return;

    let selectedOption: AnswerOption | undefined = moment.options.find((o) => o.id === selectedOptionId);

    // If answer came from 9-meal-matrix
    const mealMatrix = getMealMatrixForMoment(moment.id);
    if (mealMatrix) {
      const mealItem = mealMatrix.find((m) => m.id === selectedOptionId);
      if (mealItem) {
        selectedOption = {
          id: mealItem.id,
          emoji: '🍽️',
          title: mealItem.category,
          subtitle: mealItem.dishHint,
          weights: mealItem.weights,
          energyTag: mealItem.energyTag
        };
      }
    }

    if (selectedOption) {
      const detail = momentDetails[moment.id];
      answeredMoments.push({
        moment,
        selectedOption,
        detail
      });

      if (detail?.foodFlexTags) {
        detail.foodFlexTags.forEach((tag) => {
          if (!foodFlexSummary.includes(tag)) {
            foodFlexSummary.push(tag);
          }
        });
      }

      Object.entries(selectedOption.weights).forEach(([key, weight]) => {
        if (key in scoresMap && typeof weight === 'number') {
          scoresMap[key as ArchetypeId] += weight;
        }
      });
    }
  });

  const totalRawPoints = Object.values(scoresMap).reduce((a, b) => a + b, 0);
  const safeTotal = totalRawPoints === 0 ? 1 : totalRawPoints;

  const sortedArchetypes = (Object.keys(scoresMap) as ArchetypeId[]).sort(
    (a, b) => scoresMap[b] - scoresMap[a]
  );

  const scores: ArchetypeScore[] = sortedArchetypes.map((id) => {
    const archetype = ARCHETYPES[id];
    const rawScore = scoresMap[id];
    const percentage = Math.round((rawScore / safeTotal) * 100);
    return {
      archetypeId: id,
      name: archetype.germanName,
      emoji: archetype.emoji,
      score: rawScore,
      percentage: totalRawPoints === 0 ? 25 : percentage,
      color: archetype.themeColor,
      bg: archetype.themeBg
    };
  });

  const firstId = sortedArchetypes[0];
  const secondId = sortedArchetypes[1];
  const firstScore = scoresMap[firstId];
  const secondScore = scoresMap[secondId];

  // If top two are tied or within close difference
  const isMixed = firstScore > 0 && (firstScore - secondScore <= 1 || (firstScore > 0 && (firstScore - secondScore) / firstScore < 0.25));

  const primary = ARCHETYPES[firstId];
  const secondary = isMixed ? ARCHETYPES[secondId] : undefined;

  let mixedTitle: string | undefined;
  let mixedExplanation: string | undefined;

  if (isMixed && secondary) {
    mixedTitle = `Mischbild: ${primary.germanName} ${primary.emoji} & ${secondary.germanName} ${secondary.emoji}`;
    mixedExplanation = `Heute zeigen sich zwei gleichwertige Facetten: Einerseits Merkmale des ${primary.germanName}s (${primary.rhythmDescription}), andererseits Tendenzen des ${secondary.germanName}s (${secondary.rhythmDescription}). Dies ist völlig natürlich – dein Rhythmus passt sich deinem Alltag an.`;
  }

  // Data-dependent formulation required by concept:
  let dataMaturityText = 'Erster Eindruck (1 Tag)';
  if (observedDaysCount >= 14) {
    dataMaturityText = 'Stabileres persönliches Bild (14+ Tage)';
  } else if (observedDaysCount >= 7) {
    dataMaturityText = 'Wiederkehrendes Muster (7+ Tage)';
  } else if (observedDaysCount >= 3) {
    dataMaturityText = 'Erste Tendenz (3+ Tage)';
  }

  // Calculate sleep metrics
  const sleepMetrics = calculateSleepMetrics(wakeTime, bedTime);

  // Generate personalized friendly observations based on real answers
  const observations: string[] = [];

  // Sleep observation
  if (sleepMetrics) {
    if (sleepMetrics.durationHours < 6.5) {
      observations.push(`Kompaktes Schlaffenster (~${sleepMetrics.durationHours}h von ${bedTime} bis ${wakeTime} Uhr): Schlafmangel verstärkt biologisch oft Nachmittags-Snackimpulse.`);
    } else {
      observations.push(`Solides Schlaffenster (~${sleepMetrics.durationHours}h von ${bedTime} bis ${wakeTime} Uhr) unterstützt deinen circadianen Energiestoffwechsel.`);
    }
  }

  // Morning observation
  const morningAns = answers[1];
  if (morningAns === 'm1_opt3' || morningAns === 'm1_opt2') {
    observations.push('Du bist heute mit wenig Schwung gestartet — Erholung und Anlaufzeit standen im Vordergrund.');
  } else if (morningAns === 'm1_opt4') {
    observations.push('Dein Morgen begann mit reger Gedankenaktivität und innerer Unruhe.');
  } else if (morningAns === 'm1_opt1') {
    observations.push('Ein klarer, wacher Start in den Vormittag hat dir heute frühen Schwung gegeben.');
  }

  // Breakfast / Coffee
  const breakfastAns = answers[2];
  if (breakfastAns === 'm2_opt3') {
    observations.push('Am Morgen stand nur Kaffee im Zentrum – der erste Hunger setzte erst später ein.');
  } else if (breakfastAns === 'm2_opt4') {
    observations.push('Früher, kräftiger Appetit am Morgen hat dir reichlich Energie geliefert.');
  }

  // Midday
  const lunchAns = answers[4];
  if (lunchAns === 'm4_opt3') {
    observations.push('Das Mittagessen fand schnell zwischen Terminen statt.');
  } else if (lunchAns === 'm4_opt1') {
    observations.push('Eine leichte Mittagsmahlzeit hat dir geholfen, den Nachmittag ohne Schwere zu beginnen.');
  }

  // Afternoon / Snacks
  const snackAns = answers[5];
  if (snackAns === 'm5_opt2') {
    observations.push('Gegen 15:30 Uhr tauchten Snack-Lust und der Impuls nach süßen/herzhaften Bissen gemeinsam auf.');
  } else if (snackAns === 'm5_opt3') {
    observations.push('Das typische Nachmittagstief wurde heute mit Kaffee überbrückt.');
  } else if (snackAns === 'm5_opt1') {
    observations.push('Eine kurze Pause am Nachmittag hat dir geholfen, durchzuatmen.');
  }

  // Evening / Screen
  const dinnerAns = answers[7];
  if (dinnerAns === 'm7_opt4') {
    observations.push('Abendessen und Bildschirmmedien waren heute eng miteinander verbunden.');
  }

  // Late Evening
  const eveningAns = answers[8];
  if (eveningAns === 'm8_opt4') {
    observations.push('Spät abends war Knabbern ein willkommener Begleiter zum gemütlichen Ausklingen.');
  } else if (eveningAns === 'm8_opt1') {
    observations.push('Der späte Abend gehörte der Ruhe, dem Lesen oder bewusstem Abschalten.');
  }

  // Bonus Question reflection observation
  if (bonusAnswer) {
    observations.push(`Bonusfrage (${bonusAnswer.dimensionBadge}): Du hast gewählt: „${bonusAnswer.selectedOption}“.`);
  }

  if (observations.length === 0) {
    observations.push('Dein Tagesablauf wirkte heute insgesamt ausgeglichen und flexibel.');
  }

  const recommendations = isMixed && secondary
    ? [primary.recommendations[0], secondary.recommendations[0], primary.recommendations[1]]
    : [...primary.recommendations];

  return {
    scores,
    primary,
    secondary,
    isMixed,
    mixedTitle,
    mixedExplanation,
    observations,
    recommendations,
    answeredMoments,
    dataMaturityText,
    foodFlexSummary,
    wakeTime,
    bedTime,
    sleepMetrics,
    bonusAnswer,
    userAge,
    userGender
  };
}

export function determineColorStatus(answers: Record<number, string>): 'green' | 'orange' | 'purple' | 'gray' {
  const answeredCount = Object.keys(answers).length;
  if (answeredCount === 0) return 'gray';
  if (answeredCount < 3) return 'gray';

  // Check signals
  // Purple: viele Stress- oder Snack-Signale (m1_opt4, m3_opt4, m5_opt2, m6_opt4, m8_opt4)
  const stressOrSnackCount = [
    answers[1] === 'm1_opt4',
    answers[3] === 'm3_opt4',
    answers[5] === 'm5_opt2',
    answers[6] === 'm6_opt4',
    answers[8] === 'm8_opt4',
    answers[7] === 'm7_opt4'
  ].filter(Boolean).length;

  if (stressOrSnackCount >= 2) return 'purple';

  // Green: ruhig oder zufrieden (m1_opt1, m3_opt1, m6_opt1, m9_opt1, m9_opt2)
  const calmCount = [
    answers[1] === 'm1_opt1',
    answers[3] === 'm3_opt1',
    answers[6] === 'm6_opt1',
    answers[9] === 'm9_opt1',
    answers[9] === 'm9_opt2'
  ].filter(Boolean).length;

  if (calmCount >= 2) return 'green';

  // Orange: wechselhafte Energie
  return 'orange';
}
