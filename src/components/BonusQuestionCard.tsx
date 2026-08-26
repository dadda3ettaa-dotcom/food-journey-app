import React from 'react';
import { DynamicBonusQuestion, BonusOption } from '../types';
import { Sparkles, ArrowRight, CheckCircle2, Award, ArrowLeft } from 'lucide-react';
import { playSelectSound, playCelebrationSound } from '../utils/audio';

interface BonusQuestionCardProps {
  question: DynamicBonusQuestion;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
  onComplete: () => void;
  onPrev: () => void;
  onSkip?: () => void;
}

export const BonusQuestionCard: React.FC<BonusQuestionCardProps> = ({
  question,
  selectedOptionId,
  onSelectOption,
  onComplete,
  onPrev,
  onSkip
}) => {
  const handleSelectOption = (opt: BonusOption) => {
    playSelectSound();
    onSelectOption(opt.id);
  };

  const handleFinish = () => {
    playCelebrationSound();
    onComplete();
  };

  const selectedOpt = question.options.find((o) => o.id === selectedOptionId);

  return (
    <div
      id="bonus-question-container"
      className="w-full max-w-2xl mx-auto bg-gradient-to-b from-[#FFFDF9] via-white to-orange-50/40 rounded-3xl border-2 border-orange-200/90 shadow-xl overflow-hidden animate-fade-in relative p-6 sm:p-8"
    >
      {/* Top Navigation & Banner */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 text-xs font-bold transition-all shadow-2xs"
        >
          <span>👈</span>
          <span>Zurück</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-extrabold shadow-sm tracking-wide">
          <Sparkles className="w-3.5 h-3.5 fill-white" />
          <span>Tages-Bonusfrage</span>
          <span className="bg-white/25 px-1.5 py-0.5 rounded-full text-[10px] font-black">+20 XP</span>
        </div>

        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="text-xs text-stone-400 hover:text-stone-600 font-semibold underline decoration-dotted"
          >
            Überspringen
          </button>
        )}
      </div>

      {/* Dimension Badge */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-xl bg-orange-100 border border-orange-200 text-orange-950">
          <Award className="w-3.5 h-3.5 text-orange-600" />
          <span>{question.dimensionBadge}</span>
        </span>
        {question.reasonBadge && (
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
            {question.reasonBadge}
          </span>
        )}
      </div>

      {/* Main Question */}
      <div className="space-y-2 mb-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E2433] tracking-tight leading-snug">
          {question.title}
        </h2>
        <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
          {question.subtitle}
        </p>
      </div>

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {question.options.map((opt, idx) => {
          const isSelected = selectedOptionId === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              id={`bonus-option-${idx + 1}`}
              onClick={() => handleSelectOption(opt)}
              className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 relative group cursor-pointer ${
                isSelected
                  ? 'bg-orange-50 border-orange-500 shadow-md ring-2 ring-orange-400/50 -translate-y-0.5'
                  : 'bg-white hover:bg-[#FAF7F2] border-[#E8E2D7] hover:border-orange-300'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 transition-transform group-hover:scale-110 ${
                    isSelected
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-orange-50 border border-orange-200 text-orange-700'
                  }`}
                >
                  <span role="img" aria-hidden="true">
                    {opt.emoji}
                  </span>
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  <p className="font-bold text-sm sm:text-base text-[#1E2433] leading-snug">
                    {opt.text}
                  </p>
                  {isSelected && opt.insight && (
                    <div className="mt-2.5 pt-2.5 border-t border-orange-200/80 text-xs sm:text-sm text-orange-950 font-medium leading-relaxed bg-orange-100/50 p-2.5 rounded-xl animate-fade-in">
                      <span className="font-bold text-orange-800">💡 Wertfreier Impuls: </span>
                      {opt.insight}
                    </div>
                  )}
                </div>
              </div>

              {isSelected && (
                <div className="absolute top-4 right-4 text-orange-600 animate-scale-in">
                  <CheckCircle2 className="w-5 h-5 fill-orange-100" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#E8E2D7]">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#1E2433] font-bold text-xs border border-[#E5DCCF] transition-all"
        >
          <span>👈</span>
          <span>Zurück zu Moment 9</span>
        </button>

        <button
          type="button"
          id="finish-journey-btn"
          onClick={handleFinish}
          disabled={!selectedOpt}
          className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition-all ${
            selectedOpt
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-orange-600/25 active:scale-95'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
          }`}
        >
          <span>Tagesreport ansehen</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

