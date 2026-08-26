import { Moment, AnswerOption, MomentDetail, ReportResult } from '../types';

export interface SpontaneousQuestionResponse {
  spontaneousQuestion: string;
  quickChips: string[];
  foxThought: string;
  isFallback?: boolean;
}

export interface DayAnalysisResponse {
  primaryArchetypeFeedback: string;
  rhythmEvaluation: string;
  strengths: string[];
  tailoredHebel: string;
  spontaneousEveningQuestion: string;
  isFallback?: boolean;
}

export interface AdaptiveQuestionResponse {
  title: string;
  question: string;
  options: Array<{ label: string; icon: string }>;
}

export async function fetchSpontaneousQuestion(
  moment: Moment,
  selectedOption?: AnswerOption,
  detail?: MomentDetail,
  dayContext?: { wakeTime?: string; answeredMomentsCount?: number }
): Promise<SpontaneousQuestionResponse> {
  try {
    const res = await fetch('/api/gemini/spontaneous-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        moment: {
          id: moment.id,
          time: moment.time,
          label: moment.label,
          title: moment.title
        },
        selectedOption: selectedOption
          ? {
              id: selectedOption.id,
              title: selectedOption.title,
              subtitle: selectedOption.subtitle
            }
          : undefined,
        detail,
        dayContext
      })
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.warn('Fallback spontaneous question used due to error:', error);
    return {
      spontaneousQuestion: `Was ging dir bei „${selectedOption?.title || moment.title}“ durch den Kopf?`,
      quickChips: ['Körperliches Bedürfnis 🥑', 'Gewohnheit ☕', 'Stress / Eile ⚡'],
      foxThought: 'Der Körper sendet feine Signale, bevor der Kopf reagiert.',
      isFallback: true
    };
  }
}

export async function fetchDayAnalysis(params: {
  report: ReportResult;
  answers: Record<number, string>;
  momentDetails: Record<number, MomentDetail>;
  wakeTime?: string;
  bedTime?: string;
  streakDays?: number;
  userAge?: number;
  userGender?: string;
}): Promise<DayAnalysisResponse> {
  try {
    const res = await fetch('/api/gemini/analyze-day', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.warn('Fallback day analysis used:', error);
    return {
      primaryArchetypeFeedback: `Dein Tag spiegelt den ${params.report.primary.germanName} wider: Hohe Flexibilität bei wechselnden Alltagsanforderungen.`,
      rhythmEvaluation: `Zwischen ${params.wakeTime || '07:00'} Uhr und ${params.bedTime || '23:00'} Uhr bildeten deine Mahlzeiten und Pausen klare Tagesanker.`,
      strengths: ['Aufmerksames Festhalten der Momente', 'Gutes Gespür für eigene Signale'],
      tailoredHebel: 'Trinke morgen vor dem ersten Kaffee oder Frühstück ein großes Glas lauwarmes Wasser.',
      spontaneousEveningQuestion: 'Welcher Moment hat sich heute am nährendsten für dich angefühlt?',
      isFallback: true
    };
  }
}

export async function fetchAdaptiveQuestion(params: {
  historyCount: number;
  commonTags?: string[];
  primaryArchetype?: string;
}): Promise<AdaptiveQuestionResponse> {
  try {
    const res = await fetch('/api/gemini/adaptive-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    return {
      title: 'Achtsamer Nachmittags-Impuls',
      question: 'Wie möchtest du deinen Rhythmus heute unterstützen?',
      options: [
        { label: '5 Minuten Frischluft & tief atmen', icon: '🍃' },
        { label: 'Ein Glas kaltes Wasser trinken', icon: '💧' },
        { label: 'Einen bewussten Snack genießen', icon: '🥜' },
        { label: 'Wertfrei wahrnehmen & weitergehen', icon: '🧘' }
      ]
    };
  }
}
