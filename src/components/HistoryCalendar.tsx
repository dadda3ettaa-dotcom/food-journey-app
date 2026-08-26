import React, { useState } from 'react';
import { DayHistoryEntry } from '../types';
import { ARCHETYPES } from '../data/archetypesData';
import { MOMENTS } from '../data/momentsData';
import { Calendar as CalendarIcon, Sparkles, ChevronRight, X, Flame, CheckCircle2, SlidersHorizontal, PlusCircle } from 'lucide-react';

interface HistoryCalendarProps {
  history: DayHistoryEntry[];
  onLoadSampleData: () => void;
  onSelectDayForReview?: (entry: DayHistoryEntry) => void;
}

const COLOR_MAP = {
  green: {
    bg: 'bg-emerald-500',
    border: 'border-emerald-600',
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    label: 'Ruhig & Zufrieden'
  },
  orange: {
    bg: 'bg-amber-500',
    border: 'border-amber-600',
    badge: 'bg-amber-100 text-amber-800 border-amber-300',
    label: 'Wechselhafte Energie'
  },
  purple: {
    bg: 'bg-violet-500',
    border: 'border-violet-600',
    badge: 'bg-violet-100 text-violet-800 border-violet-300',
    label: 'Stress- & Snack-Signale'
  },
  gray: {
    bg: 'bg-stone-400',
    border: 'border-stone-500',
    badge: 'bg-stone-100 text-stone-700 border-stone-300',
    label: 'Unvollständig'
  }
};

export const HistoryCalendar: React.FC<HistoryCalendarProps> = ({
  history,
  onLoadSampleData,
  onSelectDayForReview
}) => {
  const [selectedDay, setSelectedDay] = useState<DayHistoryEntry | null>(
    history.length > 0 ? history[0] : null
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header Card */}
      <div className="bg-white rounded-3xl border border-[#E5DCCF] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E5DCCF] text-xs font-semibold text-[#57534E] mb-2">
            <CalendarIcon className="w-3.5 h-3.5 text-orange-600" />
            <span>Tagebuch & Historie</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1E2433] tracking-tight">
            Dein Rhythmus-Verlauf
          </h1>
          <p className="text-xs sm:text-sm text-[#78716C] mt-1">
            Hier siehst du, wie sich deine Tage und Muster im Laufe der Zeit entwickeln.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold bg-[#FAF7F2] p-2 rounded-2xl border border-[#E5DCCF]">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Ruhig
          </span>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Wechselnd
          </span>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-violet-100 text-violet-800">
            <span className="w-2 h-2 rounded-full bg-violet-500" /> Stress/Snack
          </span>
        </div>
      </div>

      {/* Empty State */}
      {history.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E5DCCF] p-8 sm:p-12 text-center shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#FAF7F2] border border-[#E5DCCF] flex items-center justify-center text-3xl mx-auto">
            🌱
          </div>
          <h3 className="text-lg font-bold text-[#1E2433]">
            Noch kein Verlauf
          </h3>
          <p className="text-xs sm:text-sm text-[#78716C] max-w-md mx-auto leading-relaxed">
            Beobachte deinen ersten Tag und entdecke später die Wiederholungen. Oder lade Beispieldaten, um die Ansicht sofort zu testen.
          </p>
          <button
            type="button"
            onClick={onLoadSampleData}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-xs shadow-md shadow-orange-600/20 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Beispieldaten für 4 Tage laden</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Days List / Calendar Column */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#57534E] px-1">
              <span>Beobachtete Tage ({history.length})</span>
              <button
                type="button"
                onClick={onLoadSampleData}
                className="text-orange-600 hover:underline flex items-center gap-1"
                title="Beispieldaten hinzufügen"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Muster laden</span>
              </button>
            </div>

            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1 no-scrollbar">
              {history.map((entry) => {
                const archetype = ARCHETYPES[entry.primaryArchetypeId] || ARCHETYPES.bear;
                const isSelected = selectedDay?.id === entry.id;
                const colorCfg = COLOR_MAP[entry.colorStatus] || COLOR_MAP.green;

                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setSelectedDay(entry)}
                    className={`w-full p-4 rounded-3xl border text-left transition-all relative cursor-pointer ${
                      isSelected
                        ? 'bg-white border-orange-500 shadow-md ring-2 ring-orange-300/40 -translate-y-0.5'
                        : 'bg-white hover:bg-[#FAF7F2] border-[#E5DCCF] shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Status Color Dot */}
                        <div
                          className={`w-3.5 h-3.5 rounded-full ${colorCfg.bg} ring-2 ring-white shadow-sm flex-shrink-0`}
                          title={colorCfg.label}
                        />
                        <div>
                          <div className="font-bold text-sm text-[#1E2433]">
                            {entry.dateFormatted}
                          </div>
                          <div className="text-xs text-[#78716C] mt-0.5 flex items-center gap-1.5">
                            <span>{archetype.emoji} {archetype.germanName}</span>
                            <span>•</span>
                            <span>{entry.xp} XP</span>
                          </div>
                        </div>
                      </div>

                      <ChevronRight className={`w-4 h-4 text-[#78716C] transition-transform ${isSelected ? 'rotate-90 text-orange-600' : ''}`} />
                    </div>

                    {/* Summary Observation */}
                    {entry.summaryObservation && (
                      <p className="text-[11px] text-[#57534E] mt-2 line-clamp-1 italic bg-[#FAF7F2] p-1.5 rounded-xl border border-[#EFE8DE]">
                        „{entry.summaryObservation}“
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Day Inspector / Details */}
          <div className="lg:col-span-2">
            {selectedDay ? (
              <div className="bg-white rounded-3xl border border-[#E5DCCF] p-6 shadow-sm space-y-5 animate-fade-in sticky top-20">
                {/* Day Header */}
                <div className="flex items-start justify-between pb-4 border-b border-[#EFE8DE]">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border mb-2"
                      style={{
                        backgroundColor: COLOR_MAP[selectedDay.colorStatus]?.badge || '#F5F5F4'
                      }}
                    >
                      <span>{COLOR_MAP[selectedDay.colorStatus]?.label || 'Beobachtet'}</span>
                      <span>•</span>
                      <span>Modus: {selectedDay.mode}</span>
                    </div>
                    <h2 className="text-xl font-bold text-[#1E2433]">
                      {selectedDay.dateFormatted}
                    </h2>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-orange-600">
                      {selectedDay.xp} XP
                    </div>
                    <span className="text-[11px] text-[#78716C]">
                      {Object.keys(selectedDay.answers).length} Momente
                    </span>
                  </div>
                </div>

                {/* Primary Archetype Banner */}
                {(() => {
                  const arch = ARCHETYPES[selectedDay.primaryArchetypeId] || ARCHETYPES.bear;
                  return (
                    <div
                      className="p-4 rounded-2xl border flex items-center gap-3.5"
                      style={{ backgroundColor: arch.themeBg, borderColor: arch.themeBorder }}
                    >
                      <span className="text-3xl" role="img" aria-hidden="true">{arch.emoji}</span>
                      <div>
                        <span className="text-xs font-bold text-[#78716C] uppercase">Hauptmuster</span>
                        <div className="font-bold text-[#1E2433] text-base">{arch.germanName} ({arch.rhythmDescription})</div>
                      </div>
                    </div>
                  );
                })()}

                {/* Free Day Notes */}
                {selectedDay.notes && (
                  <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-amber-200 text-xs text-[#57534E] space-y-1">
                    <span className="font-bold text-amber-900 block">Notiz zum Tag:</span>
                    <p className="italic">„{selectedDay.notes}“</p>
                  </div>
                )}

                {/* Completed Missions */}
                {selectedDay.missionsCompleted && selectedDay.missionsCompleted.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>Erledigte Experimente:</strong> {selectedDay.missionsCompleted.length} Mission(en) abgeschlossen</span>
                  </div>
                )}

                {/* Answered Moments */}
                <div className="space-y-2">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#78716C]">
                    Beobachtete Momente:
                  </h3>
                  <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                    {MOMENTS.map((moment) => {
                      const ansId = selectedDay.answers[moment.id];
                      const option = moment.options.find((o) => o.id === ansId);
                      if (!option) return null;

                      const detail = selectedDay.momentDetails?.[moment.id];

                      return (
                        <div
                          key={moment.id}
                          className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EFE8DE] flex items-start justify-between gap-3 text-xs"
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="text-base" role="img" aria-hidden="true">{moment.icon}</span>
                            <div>
                              <div className="font-bold text-[#1E2433]">
                                {moment.label} <span className="text-[#78716C] font-normal">({moment.time})</span>
                              </div>
                              <div className="text-[#57534E] flex items-center gap-1.5 mt-0.5">
                                <span>{option.emoji}</span>
                                <span className="font-semibold">{option.title}</span>
                                <span className="text-[#78716C]">— {option.subtitle}</span>
                              </div>
                              {detail?.foodFlexTags && detail.foodFlexTags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {detail.foodFlexTags.map((t) => (
                                    <span key={t} className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 text-[10px]">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-[#E5DCCF] p-8 text-center text-[#78716C] text-sm">
                Wähle einen Tag links aus, um die Details anzusehen.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
