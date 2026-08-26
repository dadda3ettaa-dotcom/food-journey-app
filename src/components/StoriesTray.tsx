import React from 'react';
import { Moment } from '../types';
import { Check, Clock, Sparkles } from 'lucide-react';
import { FoxMascot } from './FoxMascot';

interface StoriesTrayProps {
  moments: Moment[];
  currentIndex?: number;
  answers: Record<number, string>;
  onSelectMoment: (index: number) => void;
  onOpenDayStory?: () => void;
  isFinished?: boolean;
}

export const StoriesTray: React.FC<StoriesTrayProps> = ({
  moments,
  currentIndex = 0,
  answers,
  onSelectMoment,
  onOpenDayStory,
  isFinished
}) => {
  const completedCount = Object.keys(answers).length;

  return (
    <div className="w-full bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-stone-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
            Tages-Rhythmus
          </span>
        </div>
        <span className="text-xs font-semibold text-stone-500">
          {completedCount} von {moments.length} erfasst
        </span>
      </div>

      {/* Horizontal Moment Timeline Bar */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
        {moments.map((moment, idx) => {
          const isCompleted = Boolean(answers[moment.id]);
          const isCurrent = idx === currentIndex;

          return (
            <button
              key={moment.id}
              type="button"
              id={`moment-chip-${moment.id}`}
              onClick={() => onSelectMoment(idx)}
              className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl transition-all border text-left focus:outline-none ${
                isCurrent
                  ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                  : isCompleted
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 hover:bg-emerald-100/60'
                  : 'bg-stone-50 border-stone-200/70 text-stone-700 hover:bg-stone-100/80'
              }`}
            >
              <div className="text-base flex-shrink-0">
                {moment.icon}
              </div>
              <div className="flex flex-col pr-1">
                <span className={`text-[11px] font-bold leading-tight ${isCurrent ? 'text-white' : 'text-stone-900'}`}>
                  {moment.time}
                </span>
                <span className={`text-[10px] leading-tight truncate max-w-[70px] ${
                  isCurrent ? 'text-stone-300' : isCompleted ? 'text-emerald-700' : 'text-stone-500'
                }`}>
                  {moment.label}
                </span>
              </div>
              {isCompleted && (
                <Check className={`w-3.5 h-3.5 flex-shrink-0 ${isCurrent ? 'text-emerald-400' : 'text-emerald-600'}`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

