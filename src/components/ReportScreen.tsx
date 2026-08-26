import React, { useState, useEffect } from 'react';
import { ReportResult, CoachReviewState } from '../types';
import { FoxMascot } from './FoxMascot';
import {
  ArrowLeft,
  Calendar,
  Moon,
  Sun,
  Lock,
  Send,
  UserCheck,
  CheckCircle2,
  Info,
  Sparkles,
  Share2,
  Loader2,
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { fetchDayAnalysis, DayAnalysisResponse } from '../lib/geminiApi';

interface ReportScreenProps {
  report: ReportResult;
  onBackToHome: () => void;
  onViewHistory: () => void;
  onRestartJourney: () => void;
  observedDaysCount?: number;
  coachReviewState?: CoachReviewState;
  onSubmitReportToCoach?: () => void;
  onOpenCoachView?: () => void;
  answers?: Record<number, string>;
  momentDetails?: Record<number, any>;
}

export const ReportScreen: React.FC<ReportScreenProps> = ({
  report,
  onBackToHome,
  onViewHistory,
  observedDaysCount = 1,
  coachReviewState = {
    status: 'collecting',
    coachName: 'Coach Martin',
    coachNotes: '',
    approvedMissionIds: [],
    approvedRecommendations: []
  },
  onSubmitReportToCoach,
  onOpenCoachView,
  answers = {},
  momentDetails = {}
}) => {
  const {
    primary,
    secondary,
    isMixed,
    mixedTitle,
    mixedExplanation,
    scores,
    observations,
    recommendations,
    answeredMoments,
    wakeTime,
    bedTime,
    sleepMetrics,
    bonusAnswer,
    userAge,
    userGender
  } = report;

  const [aiAnalysis, setAiAnalysis] = useState<DayAnalysisResponse | null>(null);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);

  const loadAiAnalysis = () => {
    setLoadingAi(true);
    fetchDayAnalysis({
      report,
      answers,
      momentDetails,
      wakeTime,
      bedTime,
      streakDays: observedDaysCount,
      userAge,
      userGender
    })
      .then((res) => {
        setAiAnalysis(res);
      })
      .catch((err) => {
        console.error('Error fetching AI Day analysis:', err);
      })
      .finally(() => {
        setLoadingAi(false);
      });
  };

  useEffect(() => {
    loadAiAnalysis();
  }, [report.primary.id]);

  return (
    <div className="w-full max-w-xl mx-auto space-y-4 animate-fade-in pb-16">
      {/* 1. Primary Archetype Header Card */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 p-1">
            <FoxMascot mood="celebrating" size={48} id="report-fox" />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              Tages-Archetyp • Tag {observedDaysCount} von 7
            </span>
            <h1 className="font-bold text-lg sm:text-xl text-stone-900 leading-tight">
              {primary.germanName}
            </h1>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
          {primary.characteristic}
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={onSubmitReportToCoach}
            className="py-2.5 px-3 rounded-xl bg-stone-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs hover:bg-black transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>An Coach senden</span>
          </button>

          <button
            type="button"
            onClick={onViewHistory}
            className="py-2.5 px-3 rounded-xl bg-stone-100 text-stone-800 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-stone-200 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Kalender</span>
          </button>
        </div>
      </div>

      {/* 2. Gemini AI Deep Daily Evaluation */}
      <div className="bg-gradient-to-br from-amber-50/80 via-white to-orange-50/60 rounded-3xl border border-orange-200/80 p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-600/10 text-orange-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-stone-900">KI-Tagesauswertung</span>
                <span className="text-[10px] font-semibold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                  Gemini 3.7
                </span>
              </div>
              <span className="text-[11px] text-stone-500">Biologischer Rhythmus & Verhaltensmuster</span>
            </div>
          </div>

          <button
            type="button"
            onClick={loadAiAnalysis}
            disabled={loadingAi}
            className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-orange-100/60 transition-all disabled:opacity-40"
            title="KI-Analyse aktualisieren"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingAi ? 'animate-spin text-orange-600' : ''}`} />
          </button>
        </div>

        {loadingAi ? (
          <div className="flex flex-col items-center justify-center py-6 gap-2 text-stone-600 text-xs">
            <Loader2 className="w-5 h-5 animate-spin text-orange-600" />
            <span>Gemini analysiert deine 9 Momente, Essensfenster & Signale...</span>
          </div>
        ) : aiAnalysis ? (
          <div className="space-y-3.5 text-xs text-stone-800 animate-fade-in">
            {/* 1. Feedback to Archetype */}
            <div className="p-3.5 rounded-2xl bg-white/90 border border-orange-100/90 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider block">
                Rhythmus-Resonanz
              </span>
              <p className="leading-relaxed text-stone-700 font-medium">
                {aiAnalysis.primaryArchetypeFeedback}
              </p>
            </div>

            {/* 2. Rhythm & Windows Evaluation */}
            <div className="p-3.5 rounded-2xl bg-white/90 border border-orange-100/90 shadow-2xs space-y-1">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                Biologischer Takt & Essfenster
              </span>
              <p className="leading-relaxed text-stone-700">
                {aiAnalysis.rhythmEvaluation}
              </p>
            </div>

            {/* 3. Strengths */}
            {aiAnalysis.strengths && aiAnalysis.strengths.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Was heute intuitiv gut lief
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {aiAnalysis.strengths.map((str, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/60 text-emerald-950 font-medium flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. The Gentle Lever for Tomorrow */}
            {aiAnalysis.tailoredHebel && (
              <div className="p-3.5 rounded-2xl bg-amber-100/60 border border-amber-300/70 text-amber-950 space-y-1">
                <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                  <span>🌱</span>
                  <span>Der sanfte Hebel für morgen</span>
                </span>
                <p className="font-semibold text-xs leading-relaxed">
                  {aiAnalysis.tailoredHebel}
                </p>
              </div>
            )}

            {/* 5. Spontaneous Evening Question */}
            {aiAnalysis.spontaneousEveningQuestion && (
              <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200/70 text-indigo-950 space-y-1">
                <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1">
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Spontane Abendfrage</span>
                </span>
                <p className="font-medium text-xs italic leading-relaxed">
                  „{aiAnalysis.spontaneousEveningQuestion}“
                </p>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* 3. Sleep & Times Card */}
      {(wakeTime || bedTime || sleepMetrics) && (
        <div className="bg-white rounded-3xl border border-stone-200/80 p-4 sm:p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-stone-900">
            <span>Tages-Rhythmus Fenster</span>
            {sleepMetrics && (
              <span className="text-[11px] text-orange-600 font-semibold">{sleepMetrics.durationHours.toFixed(1)} Std. Schlaf</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200/60 flex items-center gap-2.5">
              <Sun className="w-4 h-4 text-amber-600" />
              <div>
                <span className="text-[10px] text-amber-800/80 block font-medium">Aufstehen</span>
                <span className="text-xs font-bold text-stone-900">{wakeTime || '07:00'} Uhr</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-stone-100/70 border border-stone-200/60 flex items-center gap-2.5">
              <Moon className="w-4 h-4 text-stone-600" />
              <div>
                <span className="text-[10px] text-stone-500 block font-medium">Bettzeit</span>
                <span className="text-xs font-bold text-stone-900">{bedTime || '23:00'} Uhr</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Distribution */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-4 sm:p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-stone-900">
          <span>Verteilung der Muster</span>
          <span className="text-[11px] text-stone-500 font-normal">{answeredMoments.length} Momente</span>
        </div>

        <div className="space-y-2.5">
          {scores.map((score) => (
            <div key={score.archetypeId} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-stone-800">{score.name}</span>
                <span className="text-stone-600">{score.percentage}%</span>
              </div>
              <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(score.percentage, 3)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Observations */}
      {observations && observations.length > 0 && (
        <div className="bg-white rounded-3xl border border-stone-200/80 p-4 sm:p-5 space-y-2.5 shadow-xs">
          <div className="text-xs font-bold text-stone-900">
            Beobachtungen des Tages
          </div>
          <ul className="space-y-1.5 text-xs text-stone-700">
            {observations.map((obs, idx) => (
              <li key={idx} className="p-3 rounded-2xl bg-stone-50 border border-stone-200/60 leading-relaxed font-medium">
                {obs}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 5. 7-Day Coach Gate */}
      {coachReviewState.status !== 'approved' ? (
        <div className="bg-white rounded-3xl border border-stone-200/80 p-4 sm:p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
            <Lock className="w-4 h-4 text-stone-600" />
            <span>7-Tage-Erstanalyse ({observedDaysCount} von 7 Tagen erfasst)</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Empfehlungen werden nach 7 erfassten Tagen gebündelt und von deinem Coach persönlich freigegeben.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onSubmitReportToCoach}
              className="px-4 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-black transition-all text-center"
            >
              {observedDaysCount >= 7 ? 'Dossier an Coach senden' : 'Vorab an Coach senden'}
            </button>
            {onOpenCoachView && (
              <button
                type="button"
                onClick={onOpenCoachView}
                className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 font-semibold text-xs hover:bg-stone-200 transition-all text-center"
              >
                Coach-Sicht öffnen
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-stone-200/80 p-4 sm:p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Vom Coach freigegebene Impulse</span>
          </div>
          {coachReviewState.coachNotes && (
            <p className="text-xs italic text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-200/60">
              „{coachReviewState.coachNotes}“
            </p>
          )}
          <div className="space-y-1.5">
            {(coachReviewState.approvedRecommendations && coachReviewState.approvedRecommendations.length > 0
              ? coachReviewState.approvedRecommendations
              : recommendations
            ).map((rec, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 text-xs text-stone-700 font-medium">
                {rec}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Zurück zum Feed</span>
        </button>

        <button
          onClick={onViewHistory}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 text-xs font-bold text-white hover:bg-black transition-all"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Kalender</span>
        </button>
      </div>
    </div>
  );
};



