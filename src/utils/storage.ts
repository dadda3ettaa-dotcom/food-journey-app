import { DayHistoryEntry, DayJourneyState, Mission, OnboardingData, CoachReviewState } from '../types';
import { INITIAL_MISSIONS } from '../data/missionsData';

const STORAGE_KEYS = {
  TODAY_JOURNEY: 'food_journey_today_state_v2',
  HISTORY: 'food_journey_history_v2',
  ONBOARDING: 'food_journey_onboarding_v2',
  MISSIONS: 'food_journey_missions_v2',
  SOUND_ENABLED: 'food_journey_sound_v2',
  COACH_REVIEW: 'food_journey_coach_review_v2'
};

export function getTodayDateStr(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatGermanDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
}

export function getDefaultTodayState(): DayJourneyState {
  return {
    currentStepIndex: 0,
    mode: 'standard',
    answers: {},
    momentDetails: {},
    xp: 0,
    isFinished: false,
    activeDateStr: getTodayDateStr()
  };
}

export function loadTodayJourney(): DayJourneyState {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TODAY_JOURNEY);
    if (!raw) return getDefaultTodayState();
    const parsed = JSON.parse(raw);
    const today = getTodayDateStr();

    // If day changed, reset today's active journey
    if (parsed.activeDateStr !== today) {
      return {
        ...getDefaultTodayState(),
        activeDateStr: today
      };
    }
    return {
      ...getDefaultTodayState(),
      ...parsed
    };
  } catch (e) {
    console.error('Failed to load today journey', e);
    return getDefaultTodayState();
  }
}

export function saveTodayJourney(state: DayJourneyState): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TODAY_JOURNEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save today journey', e);
  }
}

export function loadHistory(): DayHistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load history', e);
    return [];
  }
}

export function saveHistory(history: DayHistoryEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save history', e);
  }
}

export function saveDayToHistory(entry: DayHistoryEntry): DayHistoryEntry[] {
  const currentHistory = loadHistory();
  const existingIdx = currentHistory.findIndex((h) => h.id === entry.id);
  let updated: DayHistoryEntry[];
  if (existingIdx >= 0) {
    updated = [...currentHistory];
    updated[existingIdx] = entry;
  } else {
    updated = [entry, ...currentHistory];
  }
  saveHistory(updated);
  return updated;
}

export function loadOnboarding(): OnboardingData {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ONBOARDING);
    if (!raw) {
      return {
        completed: false,
        age: 28,
        gender: 'unspecified',
        cycleAwareness: false,
        defaultWakeTime: '07:00',
        defaultBedTime: '23:00',
        goals: ['Meine Energie', 'Snacks zwischendurch'],
        contexts: ['Büro', 'Homeoffice'],
        preferredMode: 'standard'
      };
    }
    const parsed = JSON.parse(raw);
    return {
      completed: parsed.completed ?? false,
      age: parsed.age ?? 28,
      gender: parsed.gender ?? 'unspecified',
      cycleAwareness: parsed.cycleAwareness ?? false,
      defaultWakeTime: parsed.defaultWakeTime ?? '07:00',
      defaultBedTime: parsed.defaultBedTime ?? '23:00',
      goals: parsed.goals ?? ['Meine Energie'],
      contexts: parsed.contexts ?? ['Büro'],
      preferredMode: parsed.preferredMode ?? 'standard'
    };
  } catch (e) {
    return {
      completed: false,
      age: 28,
      gender: 'unspecified',
      cycleAwareness: false,
      defaultWakeTime: '07:00',
      defaultBedTime: '23:00',
      goals: [],
      contexts: [],
      preferredMode: 'standard'
    };
  }
}

export function saveOnboarding(data: OnboardingData): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save onboarding', e);
  }
}

export function loadMissions(): Mission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MISSIONS);
    if (!raw) return INITIAL_MISSIONS;
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_MISSIONS;
  }
}

export function saveMissions(missions: Mission[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(missions));
  } catch (e) {
    console.error('Failed to save missions', e);
  }
}

export function loadSoundEnabled(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
    return raw !== null ? JSON.parse(raw) : true;
  } catch (e) {
    return true;
  }
}

export function saveSoundEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, JSON.stringify(enabled));
  } catch (e) {
    console.error('Failed to save sound state', e);
  }
}

export function loadCoachReviewState(): CoachReviewState {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COACH_REVIEW);
    if (!raw) {
      return {
        status: 'collecting',
        coachName: 'Coach Martin (Senior Food Journey Mentor)',
        coachNotes: '',
        approvedMissionIds: [],
        approvedRecommendations: []
      };
    }
    return JSON.parse(raw);
  } catch (e) {
    return {
      status: 'collecting',
      coachName: 'Coach Martin (Senior Food Journey Mentor)',
      coachNotes: '',
      approvedMissionIds: [],
      approvedRecommendations: []
    };
  }
}

export function saveCoachReviewState(state: CoachReviewState): void {
  try {
    localStorage.setItem(STORAGE_KEYS.COACH_REVIEW, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save coach review state', e);
  }
}

export function clearAllAppData(): void {
  try {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  } catch (e) {
    console.error('Failed to clear app data', e);
  }
}
