import React, { useState } from 'react';
import { JourneyMode, OnboardingData, GenderBioType } from '../types';
import { FoxMascot } from './FoxMascot';
import { Sparkles, ArrowRight, ArrowLeft, Check, X, User, Sun, Moon, Heart } from 'lucide-react';

interface OnboardingModalProps {
  initialData?: OnboardingData;
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
}

const STEP_2_GOALS = [
  'Meine Energie',
  'Mein Hunger',
  'Snacks zwischendurch',
  'Stress und Essen',
  'Mein Abendrhythmus',
  'Mein Schlaf & Aufstehen',
  'Alltagstaugliche Mahlzeiten'
];

const STEP_3_CONTEXTS = [
  'Büro',
  'Homeoffice',
  'Schichtarbeit',
  'Viel unterwegs',
  'Familie',
  'Häufige Restaurantbesuche',
  'Unregelmäßiger Tagesablauf'
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  initialData,
  onComplete,
  onSkip
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [age, setAge] = useState<number>(initialData?.age || 28);
  const [gender, setGender] = useState<GenderBioType>(initialData?.gender || 'unspecified');
  const [cycleAwareness, setCycleAwareness] = useState<boolean>(initialData?.cycleAwareness || false);
  const [defaultWakeTime, setDefaultWakeTime] = useState<string>(initialData?.defaultWakeTime || '07:00');
  const [defaultBedTime, setDefaultBedTime] = useState<string>(initialData?.defaultBedTime || '23:00');
  const [selectedGoals, setSelectedGoals] = useState<string[]>(initialData?.goals || ['Meine Energie', 'Snacks zwischendurch']);
  const [selectedContexts, setSelectedContexts] = useState<string[]>(initialData?.contexts || ['Büro']);
  const [preferredMode, setPreferredMode] = useState<JourneyMode>(initialData?.preferredMode || 'standard');

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const toggleContext = (ctx: string) => {
    if (selectedContexts.includes(ctx)) {
      setSelectedContexts(selectedContexts.filter((c) => c !== ctx));
    } else {
      setSelectedContexts([...selectedContexts, ctx]);
    }
  };

  const handleFinish = () => {
    onComplete({
      completed: true,
      age: Number(age) || 28,
      gender,
      cycleAwareness,
      defaultWakeTime,
      defaultBedTime,
      goals: selectedGoals,
      contexts: selectedContexts,
      preferredMode
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-step-title"
    >
      <div className="bg-white border border-[#E5DCCF] rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Progress & Skip */}
        <div className="p-4 sm:p-5 border-b border-[#EFE8DE] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <span className="text-xl" role="img" aria-hidden="true">🦊</span>
            <span className="font-bold text-xs sm:text-sm text-[#1E2433]">
              Schritt {step} von 4
            </span>
          </div>

          <button
            type="button"
            onClick={onSkip}
            className="text-xs font-semibold text-[#78716C] hover:text-[#1E2433] px-2.5 py-1 rounded-lg hover:bg-white transition-all"
          >
            Überspringen
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-7 overflow-y-auto flex-1 space-y-5">
          {/* Step 1: Profil, Alter, Geschlecht/Bio-Rhythmus, Schlafenszeiten */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Biologie & Schlafzeiten
                </span>
                <h2 id="onboarding-step-title" className="text-xl sm:text-2xl font-bold text-[#1E2433]">
                  Dein biologischer Rahmen
                </h2>
                <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
                  Alter, Geschlecht und typische Schlafenszeiten helfen, deine Beobachtungen und Bonusfragen wertfrei zu personalisieren.
                </p>
              </div>

              {/* Age and Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EFE8DE] space-y-1.5">
                  <label className="block text-xs font-bold text-[#1E2433]">
                    Dein Alter
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={12}
                      max={110}
                      value={age}
                      onChange={(e) => setAge(Math.max(12, Math.min(110, Number(e.target.value))))}
                      className="w-20 px-3 py-1.5 rounded-xl border border-orange-200 bg-white font-bold text-sm text-[#1E2433] focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <span className="text-xs text-[#78716C]">Jahre</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EFE8DE] space-y-1.5">
                  <label className="block text-xs font-bold text-[#1E2433]">
                    Biologisches Profil / Geschlecht
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as GenderBioType)}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-orange-200 bg-white text-xs font-bold text-[#1E2433] focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="female">Weiblich (Zyklus & Hormone)</option>
                    <option value="male">Männlich (Kraft & Stoffwechsel)</option>
                    <option value="diverse">Divers / Individuell</option>
                    <option value="unspecified">Keine Angabe</option>
                  </select>
                </div>
              </div>

              {/* Optional cycle awareness if female */}
              {gender === 'female' && (
                <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs text-rose-950 flex items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-600 fill-rose-500/20" />
                    <span>Zyklusbedingte Energie- & Heißhungermuster berücksichtigen</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={cycleAwareness}
                    onChange={(e) => setCycleAwareness(e.target.checked)}
                    className="w-4 h-4 text-rose-600 rounded focus:ring-rose-400"
                  />
                </div>
              )}

              {/* Default Wake & Bed times */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                <span className="text-xs font-bold text-amber-950 block">
                  Typische Schlaf- und Aufstehzeiten:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#57534E] flex items-center gap-1">
                      <Sun className="w-3.5 h-3.5 text-amber-600" />
                      <span>Aufstehzeit</span>
                    </label>
                    <input
                      type="time"
                      value={defaultWakeTime}
                      onChange={(e) => setDefaultWakeTime(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl border border-amber-300 bg-white text-xs font-bold text-[#1E2433] focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#57534E] flex items-center gap-1">
                      <Moon className="w-3.5 h-3.5 text-violet-600" />
                      <span>Bettzeit</span>
                    </label>
                    <input
                      type="time"
                      value={defaultBedTime}
                      onChange={(e) => setDefaultBedTime(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl border border-violet-300 bg-white text-xs font-bold text-[#1E2433] focus:outline-none focus:ring-2 focus:ring-violet-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Fokus & Neugier */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Fokus & Neugier
                </span>
                <h2 id="onboarding-step-title" className="text-xl sm:text-2xl font-bold text-[#1E2433]">
                  Was möchtest du besser verstehen?
                </h2>
                <p className="text-xs sm:text-sm text-[#78716C]">
                  Wähle alle Bereiche aus, die für deinen Alltag spannend sind.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {STEP_2_GOALS.map((goal) => {
                  const isChecked = selectedGoals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`p-3 rounded-2xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-orange-50 border-orange-500 text-orange-950 ring-2 ring-orange-200'
                          : 'bg-[#FAF7F2] text-[#57534E] border-[#EFE8DE] hover:border-orange-200 hover:bg-white'
                      }`}
                    >
                      <span>{goal}</span>
                      {isChecked ? (
                        <Check className="w-4 h-4 text-orange-600" />
                      ) : (
                        <span className="text-stone-300">+</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Kontext */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-violet-600">
                  Dein Lebensraum
                </span>
                <h2 id="onboarding-step-title" className="text-xl sm:text-2xl font-bold text-[#1E2433]">
                  Wie sieht dein Alltag aus?
                </h2>
                <p className="text-xs sm:text-sm text-[#78716C]">
                  Dein Rhythmus hängt eng mit deinen täglichen Rahmenbedingungen zusammen.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {STEP_3_CONTEXTS.map((ctx) => {
                  const isChecked = selectedContexts.includes(ctx);
                  return (
                    <button
                      key={ctx}
                      type="button"
                      onClick={() => toggleContext(ctx)}
                      className={`p-3 rounded-2xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-violet-50 border-violet-500 text-violet-950 ring-2 ring-violet-200'
                          : 'bg-[#FAF7F2] text-[#57534E] border-[#EFE8DE] hover:border-violet-200 hover:bg-white'
                      }`}
                    >
                      <span>{ctx}</span>
                      {isChecked ? (
                        <Check className="w-4 h-4 text-violet-600" />
                      ) : (
                        <span className="text-stone-300">+</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Zeitbudget */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  Zeitbudget
                </span>
                <h2 id="onboarding-step-title" className="text-xl sm:text-2xl font-bold text-[#1E2433]">
                  Wie viel Zeit hast du täglich?
                </h2>
                <p className="text-xs sm:text-sm text-[#78716C]">
                  Du kannst den Modus jederzeit flexibel ändern.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPreferredMode('express')}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    preferredMode === 'express'
                      ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-200 shadow-sm'
                      : 'bg-[#FAF7F2] border-[#EFE8DE] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1E2433]">⚡ Express</span>
                    <span className="text-xs font-bold text-orange-700">2 Minuten</span>
                  </div>
                  <p className="text-xs text-[#78716C] mt-1">
                    3 Kern-Momente: Aufstehen, Nachmittag, Tagesende + Bonusfrage.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPreferredMode('standard')}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    preferredMode === 'standard'
                      ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-200 shadow-sm'
                      : 'bg-[#FAF7F2] border-[#EFE8DE] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1E2433]">🌿 Standard</span>
                    <span className="text-xs font-bold text-orange-700">5 Minuten</span>
                  </div>
                  <p className="text-xs text-[#78716C] mt-1">
                    Alle 9 Tagesmomente von morgens bis zum Schlafengehen + dynamische Bonusfrage.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPreferredMode('deep')}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    preferredMode === 'deep'
                      ? 'bg-violet-50 border-violet-500 ring-2 ring-violet-200 shadow-sm'
                      : 'bg-[#FAF7F2] border-[#EFE8DE] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1E2433]">🔍 Tiefenreflexion</span>
                    <span className="text-xs font-bold text-violet-700">10 Minuten</span>
                  </div>
                  <p className="text-xs text-[#78716C] mt-1">
                    9 Momente + Zusatzfragen zu Hunger, Sättigung, Schlafenszeit & Kontext + Bonusfrage.
                  </p>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 sm:p-5 border-t border-[#EFE8DE] bg-[#FAF7F2] flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((step - 1) as any)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#57534E] hover:bg-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zurück</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((step + 1) as any)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20 transition-all"
            >
              <span>Weiter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>Reise beginnen</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

