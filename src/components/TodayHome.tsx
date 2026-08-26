import React from 'react';
import { DayJourneyState, JourneyMode, Moment } from '../types';
import { FoxMascot } from './FoxMascot';
import { formatGermanDate } from '../utils/storage';
import {
  Sparkles,
  ArrowRight,
  Clock,
  Flame,
  CheckCircle2,
  Calendar,
  Check
} from 'lucide-react';

interface TodayHomeProps {
  todayState: DayJourneyState;
  activeMoments: Moment[];
  streakDays: number;
  lastObservation?: string;
  onStartOrContinueJourney: () => void;
  onViewReport: () => void;
  onChangeMode: (mode: JourneyMode) => void;
  onNavigateToTab: (tab: 'reise' | 'verlauf' | 'insights' | 'profil') => void;
  onToggleMissionDone?: (missionId: string) => void;
  onOpenBookGuide?: () => void;
  activeMission?: any;
}

export const TodayHome: React.FC<TodayHomeProps> = ({
  todayState,
  activeMoments,
  streakDays,
  onStartOrContinueJourney,
  onViewReport,
  onNavigateToTab
}) => {
  const dateStr = formatGermanDate(todayState.activeDateStr);
  const totalSteps = activeMoments.length;
  const answeredCount = Object.keys(todayState.answers).filter((k) =>
    activeMoments.some((m) => m.id === Number(k))
  ).length;

  const nextMomentIndex = activeMoments.findIndex((m) => !todayState.answers[m.id]);
  const activeIndex = nextMomentIndex >= 0 ? nextMomentIndex : 0;
  const nextMoment = activeMoments[activeIndex] || activeMoments[0];

  return (
    <div className="w-full max-w-lg mx-auto space-y-4 animate-fade-in pb-12 pt-2">
      {/* 1. Minimal Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
            {dateStr}
          </span>
          <h1 className="text-xl font-bold tracking-tight text-stone-900">
            Tages-Fokus
          </h1>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold shadow-xs">
          <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
          <span>Tag {streakDays} von 7</span>
        </div>
      </div>

      {/* 2. Main Focus Hub Card */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-xs space-y-5">
        {/* State Overview */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              <span>
                {todayState.isFinished
                  ? 'Alle 9 Momente erfasst'
                  : `${answeredCount} von ${totalSteps} Momenten`}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
              {todayState.isFinished
                ? 'Tagesprofil vollständig'
                : nextMoment
                ? `${nextMoment.time} Uhr • ${nextMoment.title}`
                : 'Tagesreise bereit'}
            </h2>

            <p className="text-xs text-stone-500 font-medium">
              {todayState.isFinished
                ? 'Dein Rhythmus-Bericht für heute ist fertig.'
                : nextMoment
                ? nextMoment.question
                : 'Erfasse deine Ess- und Rhythmusmomente.'}
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
            <FoxMascot mood={todayState.isFinished ? 'celebrating' : 'welcome'} size={40} id="hero-fox" />
          </div>
        </div>

        {/* 9 Rhythm Dots Indicator */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] font-semibold text-stone-500">
            <span>Rhythmus-Momente</span>
            <span className="font-bold text-stone-900">{answeredCount}/{totalSteps}</span>
          </div>

          <div className="grid grid-cols-9 gap-1.5">
            {activeMoments.map((moment, idx) => {
              const isDone = Boolean(todayState.answers[moment.id]);
              const isCurrent = !todayState.isFinished && idx === activeIndex;

              return (
                <button
                  key={moment.id}
                  type="button"
                  onClick={onStartOrContinueJourney}
                  className={`h-2.5 rounded-full transition-all ${
                    isDone
                      ? 'bg-stone-900'
                      : isCurrent
                      ? 'bg-amber-500 ring-2 ring-amber-300 ring-offset-1'
                      : 'bg-stone-200'
                  }`}
                  title={`${moment.time} Uhr: ${moment.label}`}
                />
              );
            })}
          </div>
        </div>

        {/* Primary Action Button */}
        <div>
          {todayState.isFinished ? (
            <button
              type="button"
              id="cta-view-report-btn"
              onClick={onViewReport}
              className="w-full py-3.5 rounded-2xl bg-stone-900 hover:bg-black text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99]"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Auswertung ansehen</span>
            </button>
          ) : (
            <button
              type="button"
              id="cta-start-journey-btn"
              onClick={onStartOrContinueJourney}
              className="w-full py-3.5 rounded-2xl bg-stone-900 hover:bg-black text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99]"
            >
              <span>{answeredCount > 0 ? 'Weiter dokumentieren' : 'Moment jetzt erfassen'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Compact 1-Click Moment Quick-Grid */}
      {!todayState.isFinished && (
        <div className="bg-white rounded-3xl border border-stone-200/90 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-stone-900">
            <span>Tages-Übersicht</span>
            <button
              type="button"
              onClick={onStartOrContinueJourney}
              className="text-stone-500 hover:text-stone-900 font-semibold"
            >
              Alle Momente →
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {activeMoments.map((moment, idx) => {
              const isDone = Boolean(todayState.answers[moment.id]);
              const isCurrent = idx === activeIndex;

              return (
                <button
                  key={moment.id}
                  type="button"
                  onClick={onStartOrContinueJourney}
                  className={`p-2.5 rounded-2xl border text-left flex flex-col justify-between h-18 transition-all ${
                    isCurrent
                      ? 'bg-amber-50/80 border-amber-300 text-stone-900'
                      : isDone
                      ? 'bg-stone-50 border-stone-200/80 text-stone-800'
                      : 'bg-white border-stone-200/60 text-stone-500 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold">{moment.time}</span>
                    {isDone ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <span className="text-xs">{moment.icon}</span>
                    )}
                  </div>
                  <span className="text-[10px] font-medium leading-tight truncate w-full">
                    {moment.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Minimal Bottom Quick Access */}
      <div className="flex items-center justify-between px-1 text-xs text-stone-500">
        <button
          type="button"
          onClick={() => onNavigateToTab('insights')}
          className="hover:text-stone-900 font-semibold transition-colors"
        >
          Muster & Insights →
        </button>

        <button
          type="button"
          onClick={() => onNavigateToTab('verlauf')}
          className="hover:text-stone-900 font-semibold transition-colors flex items-center gap-1"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Kalender</span>
        </button>
      </div>
    </div>
  );
};

