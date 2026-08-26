export type ArchetypeId = 'fox' | 'wolf' | 'lion' | 'bear';
export type JourneyMode = 'express' | 'standard' | 'deep';
export type GenderBioType = 'female' | 'male' | 'diverse' | 'unspecified';

export interface Archetype {
  id: ArchetypeId;
  name: string;
  emoji: string;
  germanName: string;
  themeColor: string;
  themeBg: string;
  themeBorder: string;
  signals: string[];
  characteristic: string;
  detailedAnalysis: string;
  recommendations: string[];
  habitFocus: string;
  rhythmDescription: string;
}

export interface AnswerOption {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  weights: Partial<Record<ArchetypeId, number>>;
  energyTag?: 'high' | 'low' | 'balanced' | 'seeking';
}

export interface Moment {
  id: number;
  time: string;
  icon: string;
  label: string;
  title: string;
  question: string;
  foxTip: string;
  isExpress?: boolean;
  options: AnswerOption[];
  optionalReasons?: string[];
  deepQuestionPrompt?: string;
  isWakeTimeMoment?: boolean;
  isBedTimeMoment?: boolean;
}

export interface MomentDetail {
  hungerBefore?: number; // 1: Kein Hunger, 2: Leicht, 3: Klar, 4: Sehr hungrig
  satietyAfter?: number; // 1: Noch hungrig, 2: Angenehm satt, 3: Sehr satt, 4: Unwohl/Übervoll
  context?: string; // Zuhause, Büro, Homeoffice, Unterwegs, Restaurant, Familie, Stressiger Tag
  foodFlexTags?: string[]; // Sättigend, Leicht, Genuss, Schnell, Sozial, Nebenbei, Spontan, Geplant
  note?: string;
  moodRating?: number; // 1 to 5
  sleepScore?: number; // 1 to 5
  approxWakeTime?: string;
  approxBedTime?: string;
  selectedMealMatrixId?: string;
  selectedMealHint?: string;
}

export type CoachReviewStatus = 'collecting' | 'submitted' | 'approved' | 'needs_review';

export interface CoachReviewState {
  status: CoachReviewStatus;
  submittedAt?: string;
  approvedAt?: string;
  coachName?: string;
  coachNotes?: string;
  approvedMissionIds?: string[];
  approvedRecommendations?: string[];
  reviewedDaysCount?: number;
}

export interface CoachClientProfile {
  id: string;
  name: string;
  email: string;
  avatarEmoji: string;
  age: number;
  gender: GenderBioType;
  history: DayHistoryEntry[];
  todayState?: DayJourneyState;
  reviewState: CoachReviewState;
  goals: string[];
}

export interface BonusOption {
  id: string;
  emoji: string;
  text: string;
  insight: string;
}

export interface DynamicBonusQuestion {
  id: string;
  title: string;
  subtitle: string;
  dimensionBadge: string;
  reasonBadge: string;
  targetArchetypes?: ArchetypeId[];
  minAge?: number;
  maxAge?: number;
  targetGender?: GenderBioType[];
  timeOfDayContext?: 'morning' | 'afternoon' | 'evening' | 'any';
  options: BonusOption[];
}

export interface BonusQuestionAnswer {
  questionId: string;
  questionTitle: string;
  dimensionBadge: string;
  selectedOptionId?: string;
  selectedOption: string;
  selectedOptionEmoji: string;
  insight: string;
}

export interface DayJourneyState {
  currentStepIndex: number;
  mode: JourneyMode;
  answers: Record<number, string>; // momentId -> optionId
  momentDetails: Record<number, MomentDetail>; // momentId -> MomentDetail
  wakeTime?: string; // e.g. "07:15"
  bedTime?: string; // e.g. "23:00"
  actualWakeTime?: string;
  actualBedTime?: string;
  bonusQuestionId?: string;
  bonusAnswer?: BonusQuestionAnswer;
  bonusQuestionAnswer?: BonusQuestionAnswer;
  xp: number;
  isFinished: boolean;
  activeDateStr: string; // e.g. "2026-08-20"
  adaptiveAnswer?: string;
}

export interface ArchetypeScore {
  archetypeId: ArchetypeId;
  name: string;
  emoji: string;
  score: number;
  percentage: number;
  color: string;
  bg: string;
}

export interface SleepCalculation {
  wakeTime: string;
  bedTime: string;
  durationHours: number;
  qualityFeedback: string;
  rhythmNote: string;
}

export interface ReportResult {
  scores: ArchetypeScore[];
  primary: Archetype;
  secondary?: Archetype;
  isMixed: boolean;
  mixedTitle?: string;
  mixedExplanation?: string;
  observations: string[];
  recommendations: string[];
  answeredMoments: {
    moment: Moment;
    selectedOption: AnswerOption;
    detail?: MomentDetail;
  }[];
  dataMaturityText: string;
  foodFlexSummary?: string[];
  wakeTime?: string;
  bedTime?: string;
  sleepMetrics?: SleepCalculation;
  sleepCalculation?: SleepCalculation;
  bonusAnswer?: BonusQuestionAnswer;
  bonusInsight?: BonusQuestionAnswer;
  genderBioInsight?: string;
  userAge?: number;
  userGender?: GenderBioType;
}

export interface DayHistoryEntry {
  id: string; // ISO date string "YYYY-MM-DD"
  dateFormatted: string; // "Donnerstag, 20. August"
  dayOfWeek: string; // "Do"
  mode: JourneyMode;
  answers: Record<number, string>;
  momentDetails: Record<number, MomentDetail>;
  wakeTime?: string;
  bedTime?: string;
  actualWakeTime?: string;
  actualBedTime?: string;
  bonusAnswer?: BonusQuestionAnswer;
  bonusQuestionAnswer?: BonusQuestionAnswer;
  xp: number;
  isFinished: boolean;
  primaryArchetypeId: ArchetypeId;
  secondaryArchetypeId?: ArchetypeId;
  colorStatus: 'green' | 'orange' | 'purple' | 'gray';
  summaryObservation: string;
  notes?: string;
  missionsCompleted: string[];
  report?: ReportResult;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  status: 'try' | 'done' | 'skip' | 'irrelevant';
  category: 'Achtsamkeit' | 'Pause' | 'Mahlzeiten' | 'Abend' | 'Rhythmus';
  icon: string;
}

export interface OnboardingData {
  completed: boolean;
  age: number; // e.g. 30
  gender: GenderBioType; // female, male, diverse, unspecified
  cycleAwareness?: boolean;
  defaultWakeTime: string; // "07:00"
  defaultBedTime: string; // "23:00"
  goals: string[];
  contexts: string[];
  preferredMode: JourneyMode;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface PatternCard {
  id: string;
  title: string;
  icon: string;
  description: string;
  frequency: string;
  typicalTime: string;
  lastOccurrence: string;
  neutralObservation: string;
  suggestedMission?: string;
  activeInUserDays: boolean;
}
