import React, { useState } from 'react';
import { BOOK_CHAPTERS, BookChapter, FOURTEEN_DAYS_PROGRAM_STAGES } from '../data/bookChaptersData';
import { BookOpen, Search, Sparkles, X, ChevronRight, Bookmark, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { FoxMascot } from './FoxMascot';

interface BookGuideModalProps {
  onClose: () => void;
  onLoadAnnaExampleDay: () => void;
  observedDaysCount: number;
}

export const BookGuideModal: React.FC<BookGuideModalProps> = ({
  onClose,
  onLoadAnnaExampleDay,
  observedDaysCount
}) => {
  const [activeTab, setActiveTab] = useState<'chapters' | 'program' | 'principles'>('chapters');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');
  const [selectedChapter, setSelectedChapter] = useState<BookChapter>(BOOK_CHAPTERS[0]);

  const categories = ['Alle', 'Grundlagen', 'Körper & Signale', 'Methode & Praxis', 'Muster & Typen', 'Programm & Begleitung'];

  const filteredChapters = BOOK_CHAPTERS.filter((ch) => {
    const matchesCategory = selectedCategory === 'Alle' || ch.category === selectedCategory;
    const matchesSearch =
      ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-guide-title"
    >
      <div className="bg-white border border-[#E5DCCF] rounded-3xl w-full max-w-4xl max-h-[92vh] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EFE8DE] bg-[#FAF7F2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-xl">
              📖
            </div>
            <div>
              <h2 id="book-guide-title" className="font-extrabold text-base sm:text-lg text-[#1E2433] leading-tight">
                Food Journey — Das Buch & Konzept
              </h2>
              <p className="text-xs text-[#78716C]">
                30 Kapitel für mehr Gelassenheit, Achtsamkeit und Rhythmus im Alltag
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#78716C] hover:text-[#1E2433] hover:bg-white transition-all"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub Navigation Bar */}
        <div className="px-4 py-2.5 bg-white border-b border-[#EFE8DE] flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('chapters')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'chapters'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-[#FAF7F2] text-[#57534E] hover:bg-[#F2ECE1]'
              }`}
            >
              📚 Alle 30 Kapitel
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('program')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'program'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-[#FAF7F2] text-[#57534E] hover:bg-[#F2ECE1]'
              }`}
            >
              🗓️ 14-Tage-Programm
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('principles')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'principles'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-[#FAF7F2] text-[#57534E] hover:bg-[#F2ECE1]'
              }`}
            >
              🌿 8 Kernprinzipien
            </button>
          </div>

          {/* Anna Example Day Action */}
          <button
            type="button"
            onClick={() => {
              onLoadAnnaExampleDay();
              onClose();
            }}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-800 text-xs font-bold border border-violet-200 transition-all"
            title="Kapitel 28: Annas Beispieltag laden"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            <span>Annas Tag (Kapitel 28) testen</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF7F2]/50">
          {/* TAB 1: ALL 30 CHAPTERS */}
          {activeTab === 'chapters' && (
            <div className="space-y-4">
              {/* Filter & Search */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#78716C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Kapitel suchen (z. B. Hunger, Anna, Express, Typen)..."
                    className="w-full pl-9 pr-3 py-2 rounded-2xl border border-[#E5DCCF] bg-white text-xs text-[#1E2433] placeholder-[#78716C] focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all ${
                        selectedCategory === cat
                          ? 'bg-[#1E2433] text-white'
                          : 'bg-white text-[#57534E] border border-[#E5DCCF] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Master-Detail Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Chapters List */}
                <div className="lg:col-span-5 space-y-2 max-h-[460px] overflow-y-auto pr-1 no-scrollbar">
                  {filteredChapters.map((chapter) => {
                    const isSelected = selectedChapter.id === chapter.id;
                    return (
                      <button
                        key={chapter.id}
                        type="button"
                        onClick={() => setSelectedChapter(chapter)}
                        className={`w-full p-3 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'bg-white border-orange-500 shadow-md ring-2 ring-orange-300/40'
                            : 'bg-white hover:bg-[#FAF7F2] border-[#E5DCCF]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold text-orange-600 uppercase block">
                              {chapter.category}
                            </span>
                            <span className="font-bold text-xs sm:text-sm text-[#1E2433] block leading-tight">
                              {chapter.title}
                            </span>
                            <p className="text-[11px] text-[#78716C] line-clamp-1 mt-0.5">
                              {chapter.keyTakeaway}
                            </p>
                          </div>
                          <ChevronRight className={`w-4 h-4 text-[#78716C] flex-shrink-0 ${isSelected ? 'text-orange-600' : ''}`} />
                        </div>
                      </button>
                    );
                  })}
                  {filteredChapters.length === 0 && (
                    <div className="p-6 text-center text-xs text-[#78716C] bg-white rounded-2xl border border-[#E5DCCF]">
                      Keine Kapitel für diesen Suchbegriff gefunden.
                    </div>
                  )}
                </div>

                {/* Chapter Reader Card */}
                <div className="lg:col-span-7">
                  <div className="bg-white rounded-3xl border border-[#E5DCCF] p-5 sm:p-6 shadow-sm space-y-4 sticky top-0">
                    <div className="flex items-start justify-between gap-3 border-b border-[#EFE8DE] pb-3">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-[10px] font-bold uppercase">
                          {selectedChapter.category}
                        </span>
                        <h3 className="text-lg font-bold text-[#1E2433] mt-1.5">
                          {selectedChapter.title}
                        </h3>
                      </div>
                      <FoxMascot mood="avatar" size={48} id={`book-fox-${selectedChapter.id}`} />
                    </div>

                    {/* Summary */}
                    <div className="space-y-1.5 text-xs sm:text-sm text-[#57534E] leading-relaxed">
                      <h4 className="font-bold text-[#1E2433] text-xs uppercase tracking-wider">
                        Inhalt & Zusammenfassung:
                      </h4>
                      <p>{selectedChapter.summary}</p>
                    </div>

                    {/* Key Takeaway */}
                    <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-[#57534E] space-y-1">
                      <span className="font-bold text-amber-900 block flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                        <span>Kernaussage für die Praxis:</span>
                      </span>
                      <p className="font-medium text-[#1E2433]">{selectedChapter.keyTakeaway}</p>
                    </div>

                    {/* Quote */}
                    {selectedChapter.quote && (
                      <blockquote className="p-3 rounded-2xl bg-[#FAF7F2] border-l-4 border-orange-500 text-xs italic text-[#57534E] leading-relaxed">
                        „{selectedChapter.quote}“
                      </blockquote>
                    )}

                    {/* Special CTA for Chapter 28 (Anna's Beispieltag) */}
                    {selectedChapter.id === 28 && (
                      <button
                        type="button"
                        onClick={() => {
                          onLoadAnnaExampleDay();
                          onClose();
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 p-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20 transition-all"
                      >
                        <Sparkles className="w-4 h-4 fill-white" />
                        <span>Diesen Beispieltag jetzt in Food Journey laden</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 14-TAGE-PROGRAMM */}
          {activeTab === 'program' && (
            <div className="space-y-5">
              <div className="bg-white rounded-3xl border border-[#E5DCCF] p-5 sm:p-6 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">
                    Kapitel 29 • Schritt für Schritt
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    Dein Status: {observedDaysCount} {observedDaysCount === 1 ? 'Tag' : 'Tage'} beobachtet
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#1E2433]">
                  Das 14-Tage Food Journey Programm
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  Ziel ist nicht, nach 14 Tagen perfekt zu sein. Ziel ist, den eigenen Alltag klarer zu verstehen und nachhaltige Gelassenheit zu finden.
                </p>
              </div>

              {/* Program Stages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FOURTEEN_DAYS_PROGRAM_STAGES.map((stage) => {
                  const isActive = stage.isActive(observedDaysCount);
                  const isDone = stage.isCompleted(observedDaysCount);

                  return (
                    <div
                      key={stage.stageNumber}
                      className={`p-5 rounded-3xl border transition-all ${
                        isActive
                          ? 'bg-white border-orange-500 ring-2 ring-orange-300 shadow-md -translate-y-0.5'
                          : isDone
                          ? 'bg-[#FAF7F2] border-emerald-300'
                          : 'bg-white border-[#E5DCCF]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-lg bg-orange-100 text-orange-900 text-[10px] font-extrabold">
                              {stage.dayRange}
                            </span>
                            {isActive && (
                              <span className="px-2 py-0.5 rounded-lg bg-orange-600 text-white text-[10px] font-bold animate-pulse">
                                Aktuelle Phase
                              </span>
                            )}
                            {isDone && (
                              <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                Erreicht
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-sm sm:text-base text-[#1E2433]">
                            {stage.title}
                          </h4>
                        </div>
                        <span className="text-xl font-black text-stone-300">
                          0{stage.stageNumber}
                        </span>
                      </div>

                      <div className="mt-3 space-y-1.5 text-xs text-[#57534E]">
                        <p className="leading-relaxed">
                          <strong>Fokus:</strong> {stage.focus}
                        </p>
                        <p className="leading-relaxed text-[#78716C]">
                          <strong>Konkrete Aktion:</strong> {stage.action}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: 8 KERNPRINZIPIEN */}
          {activeTab === 'principles' && (
            <div className="space-y-5">
              <div className="bg-white rounded-3xl border border-[#E5DCCF] p-5 sm:p-6 shadow-sm space-y-2">
                <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">
                  Kapitel 30 • Leitgedanken
                </span>
                <h3 className="text-xl font-bold text-[#1E2433]">
                  Die 8 wichtigsten Prinzipien von Food Journey
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  Food Journey ist eine ruhige, bildbasierte Reise zu einem besseren Verständnis des eigenen Tages.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: '1. Beobachtung vor Verbot', desc: 'Wir zählen keine Kalorien und verbieten nichts. Wir beobachten, was passiert.' },
                  { title: '2. Alltag vor Perfektion', desc: 'Ein unruhiger Tag löscht keinen Fortschritt. Das echte Leben hat Vorrang.' },
                  { title: '3. Genuss ohne Schuld', desc: 'Dessert und Lieblingsgerichte sind kein Fehler, sondern Lebensqualität.' },
                  { title: '4. Kontext statt pauschaler Regeln', desc: 'Büro, Homeoffice, Reisen und Familie prägen unsere Essentscheidungen.' },
                  { title: '5. Schlaf und Energie mitdenken', desc: 'Müdigkeit ist oft die eigentliche Ursache für späte Heißhungerattacken.' },
                  { title: '6. Kleine Experimente statt Radikalität', desc: 'Freiwillige Alltags-Missionen ohne Scheitern oder Leistungsdruck.' },
                  { title: '7. Vorsichtige Muster statt Diagnosen', desc: 'Die App urteilt nicht über Personen, sondern spiegelt Situationen wider.' },
                  { title: '8. Datenschutz als Grundprinzip', desc: 'Alle Antworten bleiben lokal auf deinem Gerät gespeichert.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E5DCCF] shadow-sm space-y-1">
                    <h4 className="font-bold text-xs sm:text-sm text-[#1E2433]">{item.title}</h4>
                    <p className="text-xs text-[#57534E] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-amber-200 text-center text-xs text-[#57534E] italic font-medium">
                „Nicht jeder Tag muss verändert werden. Manchmal muss er zuerst verstanden werden.“
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EFE8DE] bg-[#FAF7F2] flex items-center justify-between">
          <div className="text-[11px] text-[#78716C]">
            Food Journey • Interaktives Buch & App-Konzept
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-all shadow-sm"
          >
            Verstanden & Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
