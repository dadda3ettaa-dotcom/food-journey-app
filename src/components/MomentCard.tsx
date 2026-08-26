import React, { useEffect, useCallback, useRef } from 'react';
import { Moment, AnswerOption, MomentDetail } from '../types';
import { FoxMascot, FoxMood } from './FoxMascot';
import { SlidersHorizontal, Check, Sun, Moon, Sparkles } from 'lucide-react';
import { playSelectSound, playNextStepSound } from '../utils/audio';
import { getMealMatrixForMoment, MealMatrixItem } from '../data/mealMatrixData';
import { MealPhotoMatrix } from './MealPhotoMatrix';
import { SpontaneousAiQuestion } from './SpontaneousAiQuestion';

interface MomentCardProps {
  moment: Moment;
  currentIndex: number;
  totalMoments: number;
  selectedOptionId?: string;
  momentDetail?: MomentDetail;
  onSelectOption: (optionId: string) => void;
  onOpenDeepReflection: () => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  actualWakeTime?: string;
  actualBedTime?: string;
  onUpdateWakeTime?: (time: string) => void;
  onUpdateBedTime?: (time: string) => void;
  onSaveSpontaneousAnswer?: (answer: string) => void;
}

const COMMON_WAKE_TIMES = ['06:00', '06:30', '07:00', '07:30', '08:00'];
const COMMON_BED_TIMES = ['22:00', '22:30', '23:00', '23:30', '00:00'];

export const MomentCard: React.FC<MomentCardProps> = ({
  moment,
  currentIndex,
  totalMoments,
  selectedOptionId,
  momentDetail,
  onSelectOption,
  onOpenDeepReflection,
  onNext,
  onPrev,
  isFirst,
  isLast,
  actualWakeTime = '07:00',
  actualBedTime = '23:00',
  onUpdateWakeTime,
  onUpdateBedTime,
  onSaveSpontaneousAnswer
}) => {
  const hasSelected = Boolean(selectedOptionId);
  const advanceTimerRef = useRef<number | null>(null);

  const mealMatrixItems = getMealMatrixForMoment(moment.id);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) {
        window.clearTimeout(advanceTimerRef.current);
      }
    };
  }, [currentIndex]);

  const getFoxMood = (): FoxMood => {
    if (moment.id === 1) return 'welcome';
    if (moment.id === 5) return 'thoughtful';
    if (moment.id === 9) return 'sleepy';
    return 'curious';
  };

  const currentSelectedOption: AnswerOption | undefined = React.useMemo(() => {
    if (!selectedOptionId) return undefined;
    const found = moment.options.find((o) => o.id === selectedOptionId);
    if (found) return found;
    if (mealMatrixItems) {
      const mealItem = mealMatrixItems.find((m) => m.id === selectedOptionId);
      if (mealItem) {
        return {
          id: mealItem.id,
          emoji: '🍽️',
          title: mealItem.category,
          subtitle: mealItem.dishHint,
          weights: {}
        };
      }
    }
    return undefined;
  }, [moment.options, mealMatrixItems, selectedOptionId]);

  const handleMealItemClick = (mealItem: MealMatrixItem) => {
    playSelectSound();
    onSelectOption(mealItem.id);
  };

  const handleOptionClick = (option: AnswerOption) => {
    playSelectSound();
    onSelectOption(option.id);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (mealMatrixItems && mealMatrixItems.length > 0) {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= 9 && mealMatrixItems[num - 1]) {
          handleMealItemClick(mealMatrixItems[num - 1]);
        }
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (moment.options[idx]) {
          handleOptionClick(moment.options[idx]);
        }
      } else if (e.key === 'ArrowLeft' && !isFirst) {
        onPrev();
      }
    },
    [moment.options, mealMatrixItems, isFirst, onPrev]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const hasDeepData = Boolean(
    momentDetail && (
      momentDetail.hungerBefore ||
      momentDetail.satietyAfter ||
      momentDetail.context ||
      (momentDetail.foodFlexTags && momentDetail.foodFlexTags.length > 0) ||
      momentDetail.note
    )
  );

  return (
    <div
      id={`moment-card-container-${moment.id}`}
      className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden animate-fade-in p-6 sm:p-8 space-y-5"
    >
      {/* Step Info Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-sm">
            {moment.icon}
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-tight">
              <span className="font-bold text-xs text-stone-900">{moment.label}</span>
              <span className="text-[11px] text-amber-700 font-semibold">• {moment.time} Uhr</span>
            </div>
          </div>
        </div>

        <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full">
          {currentIndex + 1} / {totalMoments}
        </span>
      </div>

      {/* Title & Question */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
          {moment.title}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-medium">
          {moment.question}
        </p>
      </div>

      {/* Aufstehzeit Section in Moment 1 */}
      {moment.isWakeTimeMoment && onUpdateWakeTime && (
        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-950">
            <span className="flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-600" />
              <span>Aufstehzeit:</span>
            </span>
            <input
              type="time"
              value={actualWakeTime}
              onChange={(e) => onUpdateWakeTime(e.target.value)}
              className="text-xs font-bold bg-white border border-amber-300 px-2 py-0.5 rounded-lg text-stone-900"
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {COMMON_WAKE_TIMES.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => onUpdateWakeTime(time)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all ${
                  actualWakeTime === time
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-amber-200 hover:bg-amber-100/50'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bettzeit Section in Moment 9 */}
      {moment.isBedTimeMoment && onUpdateBedTime && (
        <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/70 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-indigo-950">
            <span className="flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
              <span>Bettzeit:</span>
            </span>
            <input
              type="time"
              value={actualBedTime}
              onChange={(e) => onUpdateBedTime(e.target.value)}
              className="text-xs font-bold bg-white border border-indigo-300 px-2 py-0.5 rounded-lg text-stone-900"
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {COMMON_BED_TIMES.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => onUpdateBedTime(time)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all ${
                  actualBedTime === time
                    ? 'bg-indigo-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-indigo-200 hover:bg-indigo-100/50'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Options: Photo Matrix or Standard 4 options */}
      {mealMatrixItems && mealMatrixItems.length > 0 ? (
        <div>
          <MealPhotoMatrix
            items={mealMatrixItems}
            selectedItemId={selectedOptionId}
            onSelectItem={handleMealItemClick}
            momentId={moment.id}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {moment.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;

            return (
              <button
                key={option.id}
                id={`moment-${moment.id}-option-${idx + 1}`}
                onClick={() => handleOptionClick(option)}
                className={`text-left p-4 rounded-3xl border transition-all duration-150 relative cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-tr from-stone-900 to-stone-800 text-white border-stone-900 shadow-md ring-2 ring-rose-400 scale-[1.01]'
                    : 'bg-stone-50 hover:bg-stone-100/80 border-stone-200/80 text-stone-900 hover:border-stone-400'
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0" role="img" aria-hidden="true">
                    {option.emoji}
                  </span>
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="font-bold text-sm leading-snug">
                      {option.title}
                    </div>
                    <p className={`text-xs mt-0.5 leading-relaxed ${
                      isSelected ? 'text-stone-300' : 'text-stone-500'
                    }`}>
                      {option.subtitle}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Spontaneous AI Question (Gemini) */}
      {hasSelected && currentSelectedOption && (
        <SpontaneousAiQuestion
          moment={moment}
          selectedOption={currentSelectedOption}
          momentDetail={momentDetail}
          wakeTime={actualWakeTime}
          onSaveSpontaneousAnswer={(ans) => {
            if (onSaveSpontaneousAnswer) {
              onSaveSpontaneousAnswer(ans);
            }
          }}
        />
      )}

      {/* Footer Navigation & Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-stone-100 gap-2">
        <button
          id="journey-prev-btn"
          onClick={onPrev}
          disabled={isFirst}
          className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            isFirst
              ? 'opacity-20 cursor-not-allowed text-stone-400'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          ← Zurück
        </button>

        {/* Deep Reflection Trigger */}
        <button
          id="journey-deepen-btn"
          onClick={onOpenDeepReflection}
          className={`inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
            hasDeepData
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-stone-50 border-stone-200/80 text-stone-600 hover:text-stone-900 hover:border-stone-400'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{hasDeepData ? 'Details erfasst ✓' : 'Details / Hunger'}</span>
        </button>

        {/* Next Step Button */}
        <button
          id="journey-next-btn"
          onClick={() => {
            playNextStepSound();
            onNext();
          }}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
            hasSelected
              ? 'bg-stone-900 text-white hover:bg-black hover:scale-101'
              : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
          }`}
        >
          <span>{isLast ? 'Zur Auswertung' : 'Weiter'}</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};


