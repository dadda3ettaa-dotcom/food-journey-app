import React from 'react';
import { Moment } from '../types';
import { Check } from 'lucide-react';

interface JourneyTimelineProps {
  moments: Moment[];
  currentIndex: number;
  answers: Record<number, string>;
  onSelectStep: (index: number) => void;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  moments,
  currentIndex,
  answers,
  onSelectStep
}) => {
  return (
    <div className="w-full space-y-2 mb-2">
      {/* 1. Instagram Story Segmented Top Progress Bars */}
      <div className="flex items-center gap-1.5 w-full px-1">
        {moments.map((moment, idx) => {
          const isCompleted = Boolean(answers[moment.id]);
          const isCurrent = idx === currentIndex;

          return (
            <button
              key={moment.id}
              type="button"
              onClick={() => onSelectStep(idx)}
              className="flex-1 h-1 rounded-full overflow-hidden transition-all bg-stone-200 hover:h-1.5 focus:outline-none"
              title={`${moment.label} (${moment.time} Uhr)`}
            >
              <div
                className={`h-full transition-all duration-300 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 w-full animate-pulse'
                    : isCompleted
                    ? 'bg-stone-900 w-full'
                    : 'w-0'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* 2. Horizontal Story Capsule Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar px-1">
        {moments.map((moment, idx) => {
          const isCompleted = Boolean(answers[moment.id]);
          const isCurrent = idx === currentIndex;

          return (
            <button
              key={moment.id}
              type="button"
              id={`timeline-story-chip-${moment.id}`}
              onClick={() => onSelectStep(idx)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all focus:outline-none flex-shrink-0 ${
                isCurrent
                  ? 'bg-stone-900 text-white shadow-xs'
                  : isCompleted
                  ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  : 'bg-white text-stone-500 border border-stone-200/80 hover:border-stone-400'
              }`}
            >
              <span>{moment.icon}</span>
              <span>{moment.time}</span>
              {isCompleted && !isCurrent && (
                <Check className="w-3 h-3 text-emerald-600 stroke-[3] ml-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};


