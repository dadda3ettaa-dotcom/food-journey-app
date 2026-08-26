import React from 'react';
import { DayHistoryEntry, PatternCard as PatternCardType } from '../types';
import { BASE_PATTERNS } from '../data/patternsData';
import { ARCHETYPES } from '../data/archetypesData';
import { BarChart3, Sparkles, TrendingUp, Clock, Zap, Target, AlertCircle, PlusCircle, Check } from 'lucide-react';

interface InsightsDashboardProps {
  history: DayHistoryEntry[];
  onLoadSampleData: () => void;
}

export const InsightsDashboard: React.FC<InsightsDashboardProps> = ({
  history,
  onLoadSampleData
}) => {
  const totalDays = history.length;
  const isDataSufficient = totalDays >= 2;

  // Calculate archetype frequency
  const archetypeCounts: Record<string, number> = {
    fox: 0,
    wolf: 0,
    lion: 0,
    bear: 0
  };

  history.forEach((h) => {
    if (h.primaryArchetypeId && archetypeCounts[h.primaryArchetypeId] !== undefined) {
      archetypeCounts[h.primaryArchetypeId]++;
    }
  });

  // Calculate afternoon snack frequency
  const afternoonSnackDays = history.filter((h) => h.answers[5] === 'm5_opt2').length;
  const morningCoffeeOnlyDays = history.filter((h) => h.answers[2] === 'm2_opt3').length;
  const screenEatingDays = history.filter((h) => h.answers[7] === 'm7_opt4').length;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Top Banner Card */}
      <div className="bg-white rounded-3xl border border-[#E5DCCF] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-xs font-semibold text-violet-800 mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-violet-600" />
            <span>Muster-Erkennung & Rhythmen</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1E2433] tracking-tight">
            Deine Alltags-Insights
          </h1>
          <p className="text-xs sm:text-sm text-[#78716C] mt-1">
            Wiederkehrende Signale, Spitzenzeiten und Einblicke in deinen Rhythmus.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#FAF7F2] px-3.5 py-2 rounded-2xl border border-[#E5DCCF] text-xs font-bold text-[#57534E]">
          <Clock className="w-4 h-4 text-orange-600" />
          <span>Basis: {totalDays} {totalDays === 1 ? 'Tag' : 'Tage'} beobachtet</span>
        </div>
      </div>

      {/* Insufficient Data State Banner */}
      {!isDataSufficient && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl border border-amber-200 p-6 shadow-sm space-y-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-[#1E2433]">
                Sammle noch 2 weitere Tage für echte Wiederholungen
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Muster werden erst dann verlässlich sichtbar, wenn mindestens 2 bis 3 Tage erfasst sind.
                Du kannst sofort Beispieldaten laden, um das Insights-Dashboard in voller Aktion zu sehen.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onLoadSampleData}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-xs shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>4 Tage Beispieldaten für Insights laden</span>
          </button>
        </div>
      )}

      {/* Key Metric Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Snack Peak */}
        <div className="bg-white rounded-3xl border border-[#E5DCCF] p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-orange-700 uppercase">
            <span>Snack-Impulse</span>
            <span className="text-base" role="img" aria-hidden="true">🍫</span>
          </div>
          <div className="text-2xl font-black text-[#1E2433]">
            15:30 Uhr
          </div>
          <p className="text-xs text-[#78716C]">
            {afternoonSnackDays > 0
              ? `An ${afternoonSnackDays} von ${totalDays} Tagen nachmittags beobachtet.`
              : 'Typischerweise im biologischen Nachmittagstief.'}
          </p>
        </div>

        {/* Screen eating */}
        <div className="bg-white rounded-3xl border border-[#E5DCCF] p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-violet-700 uppercase">
            <span>Bildschirm-Essen</span>
            <span className="text-base" role="img" aria-hidden="true">📺</span>
          </div>
          <div className="text-2xl font-black text-[#1E2433]">
            19:30 Uhr
          </div>
          <p className="text-xs text-[#78716C]">
            {screenEatingDays > 0
              ? `An ${screenEatingDays} von ${totalDays} Tagen beim Abendessen notiert.`
              : 'Oft mit gemütlichem Ausklingen am Abend verknüpft.'}
          </p>
        </div>

        {/* Morning Rhythms */}
        <div className="bg-white rounded-3xl border border-[#E5DCCF] p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-amber-700 uppercase">
            <span>Nur Kaffee am Morgen</span>
            <span className="text-base" role="img" aria-hidden="true">☕</span>
          </div>
          <div className="text-2xl font-black text-[#1E2433]">
            08:00 Uhr
          </div>
          <p className="text-xs text-[#78716C]">
            {morningCoffeeOnlyDays > 0
              ? `An ${morningCoffeeOnlyDays} von ${totalDays} Tagen als erster Start erfasst.`
              : 'Verzögerter Hunger am Vormittag.'}
          </p>
        </div>
      </div>

      {/* Archetype Distribution Overview */}
      <div className="bg-white rounded-3xl border border-[#E5DCCF] p-6 sm:p-7 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-[#1E2433] flex items-center gap-2">
          <span>🦁🐻🐺🦊</span>
          <span>Rhythmus-Muster Verteilung über alle Tage</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(ARCHETYPES).map(([id, arch]) => {
            const count = archetypeCounts[id] || 0;
            const pct = totalDays > 0 ? Math.round((count / totalDays) * 100) : 25;

            return (
              <div
                key={id}
                className="p-4 rounded-2xl border text-center space-y-2"
                style={{ backgroundColor: arch.themeBg, borderColor: arch.themeBorder }}
              >
                <span className="text-2xl block" role="img" aria-hidden="true">{arch.emoji}</span>
                <div>
                  <span className="font-bold text-sm text-[#1E2433] block">{arch.germanName}</span>
                  <span className="text-xs text-[#78716C] block">{count} {count === 1 ? 'Tag' : 'Tage'} ({pct}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pattern Cards Section (Musterkarten) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="font-bold text-lg text-[#1E2433]">
              Erkannte Musterkarten
            </h3>
            <p className="text-xs text-[#78716C]">
              Typische Situationen mit wertfreien Beobachtungen und konkreten Experimenten.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BASE_PATTERNS.map((pattern) => (
            <div
              key={pattern.id}
              className="bg-white rounded-3xl border border-[#E5DCCF] p-5 sm:p-6 shadow-sm space-y-3 hover:border-orange-200 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 rounded-2xl bg-[#FAF7F2] border border-[#E5DCCF]" role="img" aria-hidden="true">
                      {pattern.icon}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-[#1E2433]">
                        {pattern.title}
                      </h4>
                      <span className="text-[11px] text-orange-700 font-semibold block">
                        Typische Zeit: {pattern.typicalTime}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#57534E] leading-relaxed">
                  {pattern.description}
                </p>

                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EFE8DE] text-xs text-[#57534E] space-y-1">
                  <span className="font-bold text-[#1E2433] block">💡 Neutrale Beobachtung:</span>
                  <p className="italic leading-relaxed">{pattern.neutralObservation}</p>
                </div>
              </div>

              {pattern.suggestedMission && (
                <div className="pt-2 border-t border-[#EFE8DE] flex items-center justify-between gap-2 text-xs">
                  <span className="text-[#78716C] truncate">
                    <strong>Experiment:</strong> {pattern.suggestedMission}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Context & Weekday comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Werktag vs. Wochenende */}
        <div className="bg-white rounded-3xl border border-[#E5DCCF] p-5 shadow-sm space-y-2.5">
          <h4 className="font-bold text-sm text-[#1E2433] flex items-center gap-2">
            <span>📅</span>
            <span>Werktag vs. Wochenende</span>
          </h4>
          <p className="text-xs text-[#57534E] leading-relaxed">
            An Werktagen dominieren oft strukturierte Zeitfenster und frühere Kaffeephasen. Am Wochenende verschieben sich Hunger- und Genussphasen natürlicherweise nach hinten.
          </p>
        </div>

        {/* Zuhause vs. Büro */}
        <div className="bg-white rounded-3xl border border-[#E5DCCF] p-5 shadow-sm space-y-2.5">
          <h4 className="font-bold text-sm text-[#1E2433] flex items-center gap-2">
            <span>🏢</span>
            <span>Zuhause vs. Büro</span>
          </h4>
          <p className="text-xs text-[#57534E] leading-relaxed">
            Im Homeoffice tauchen spontane Snack-Gänge zur Küche öfter als Pause auf. Im Büro sind Mahlzeiten meist geplanter und sozialer eingebunden.
          </p>
        </div>
      </div>
    </div>
  );
};
