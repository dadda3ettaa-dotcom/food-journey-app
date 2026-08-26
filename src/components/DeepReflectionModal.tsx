import React, { useState } from 'react';
import { Moment, MomentDetail } from '../types';
import { X, Check, Smile, Sparkles } from 'lucide-react';

interface DeepReflectionModalProps {
  moment: Moment;
  initialDetail?: MomentDetail;
  onSave: (detail: MomentDetail) => void;
  onClose: () => void;
}

const HUNGER_LEVELS = [
  { val: 1, label: 'Kein Hunger', emoji: '🟢' },
  { val: 2, label: 'Leichter Hunger', emoji: '🟡' },
  { val: 3, label: 'Klarer Hunger', emoji: '🟠' },
  { val: 4, label: 'Sehr hungrig', emoji: '🔴' }
];

const SATIETY_LEVELS = [
  { val: 1, label: 'Noch hungrig', emoji: '🥣' },
  { val: 2, label: 'Angenehm satt', emoji: '🥗' },
  { val: 3, label: 'Sehr satt', emoji: '🍛' },
  { val: 4, label: 'Übervoll', emoji: '🫄' }
];

const CONTEXT_OPTIONS = [
  'Zuhause',
  'Büro',
  'Homeoffice',
  'Unterwegs',
  'Restaurant',
  'Familie / Sozial',
  'Stressiger Tag'
];

const FOOD_FLEX_TAGS = [
  'Sättigend',
  'Leicht',
  'Genuss',
  'Schnell',
  'Sozial',
  'Nebenbei',
  'Spontan',
  'Geplant'
];

export const DeepReflectionModal: React.FC<DeepReflectionModalProps> = ({
  moment,
  initialDetail,
  onSave,
  onClose
}) => {
  const [hungerBefore, setHungerBefore] = useState<number | undefined>(initialDetail?.hungerBefore);
  const [satietyAfter, setSatietyAfter] = useState<number | undefined>(initialDetail?.satietyAfter);
  const [context, setContext] = useState<string | undefined>(initialDetail?.context);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialDetail?.foodFlexTags || []);
  const [note, setNote] = useState<string>(initialDetail?.note || '');
  const [moodRating, setMoodRating] = useState<number | undefined>(initialDetail?.moodRating);
  const [sleepScore, setSleepScore] = useState<number | undefined>(initialDetail?.sleepScore);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSave = () => {
    onSave({
      hungerBefore,
      satietyAfter,
      context,
      foodFlexTags: selectedTags,
      note: note.trim() || undefined,
      moodRating,
      sleepScore
    });
    onClose();
  };

  const isMealMoment = [2, 4, 7].includes(moment.id);
  const isMorningMoment = moment.id === 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deep-reflection-title"
    >
      <div className="bg-[#FAF7F2] border border-[#E5DCCF] rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#EFE8DE] flex items-center justify-between sticky top-0 bg-[#FAF7F2]/95 backdrop-blur z-10">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl" role="img" aria-hidden="true">{moment.icon}</span>
            <div>
              <h3 id="deep-reflection-title" className="font-bold text-lg text-[#1E2433]">
                Vertiefung: {moment.label}
              </h3>
              <p className="text-xs text-[#78716C]">
                Optionale Selbstbeobachtung • Kein Zwang
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EFE8DE] text-[#78716C] hover:text-[#1E2433] transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-5 text-sm">
          {/* Morning: Sleep rating */}
          {isMorningMoment && (
            <div className="bg-white p-4 rounded-2xl border border-[#EFE8DE]">
              <label className="block font-semibold text-[#1E2433] mb-2">
                Wie erholt fühlst du dich heute? (Schlafgefühl)
              </label>
              <div className="flex items-center justify-between gap-1">
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setSleepScore(score)}
                    className={`flex-1 py-2 rounded-xl text-center font-bold text-sm transition-all ${
                      sleepScore === score
                        ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-300'
                        : 'bg-[#FAF7F2] text-[#57534E] hover:bg-[#F2ECE1] border border-[#E5DCCF]'
                    }`}
                  >
                    {score === 1 && '🥱 1'}
                    {score === 2 && '😴 2'}
                    {score === 3 && '🙂 3'}
                    {score === 4 && '😊 4'}
                    {score === 5 && '🌟 5'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Meals: Hunger Before */}
          {isMealMoment && (
            <div className="bg-white p-4 rounded-2xl border border-[#EFE8DE]">
              <label className="block font-semibold text-[#1E2433] mb-2">
                Hunger vor der Mahlzeit:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {HUNGER_LEVELS.map((lvl) => (
                  <button
                    key={lvl.val}
                    type="button"
                    onClick={() => setHungerBefore(lvl.val)}
                    className={`p-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                      hungerBefore === lvl.val
                        ? 'bg-orange-100 text-orange-900 border-2 border-orange-500 shadow-sm'
                        : 'bg-[#FAF7F2] text-[#57534E] hover:bg-[#F2ECE1] border border-[#E5DCCF]'
                    }`}
                  >
                    <span>{lvl.emoji}</span>
                    <span>{lvl.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Meals: Satiety After */}
          {isMealMoment && (
            <div className="bg-white p-4 rounded-2xl border border-[#EFE8DE]">
              <label className="block font-semibold text-[#1E2433] mb-2">
                Sättigung nach der Mahlzeit:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SATIETY_LEVELS.map((lvl) => (
                  <button
                    key={lvl.val}
                    type="button"
                    onClick={() => setSatietyAfter(lvl.val)}
                    className={`p-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                      satietyAfter === lvl.val
                        ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-500 shadow-sm'
                        : 'bg-[#FAF7F2] text-[#57534E] hover:bg-[#F2ECE1] border border-[#E5DCCF]'
                    }`}
                  >
                    <span>{lvl.emoji}</span>
                    <span>{lvl.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Context of the situation */}
          <div className="bg-white p-4 rounded-2xl border border-[#EFE8DE]">
            <label className="block font-semibold text-[#1E2433] mb-2">
              Wo oder wie fand dieser Moment statt? (Kontext)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CONTEXT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setContext(context === opt ? undefined : opt)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    context === opt
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'bg-[#FAF7F2] text-[#57534E] hover:bg-[#F2ECE1] border border-[#E5DCCF]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Food-Flex System (Neutral tags) */}
          <div className="bg-white p-4 rounded-2xl border border-[#EFE8DE]">
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold text-[#1E2433]">
                Food-Flex Tags (Wertfrei):
              </label>
              <span className="text-[11px] text-[#78716C]">Mehrfachauswahl</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {FOOD_FLEX_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-amber-100 text-amber-900 border border-amber-400 font-bold'
                        : 'bg-[#FAF7F2] text-[#57534E] hover:bg-[#F2ECE1] border border-[#E5DCCF]'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mood rating (1 to 5) */}
          <div className="bg-white p-4 rounded-2xl border border-[#EFE8DE]">
            <label className="block font-semibold text-[#1E2433] mb-2">
              Stimmung / Wohlbefinden in diesem Moment:
            </label>
            <div className="flex items-center justify-between gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setMoodRating(star)}
                  className={`flex-1 py-2 rounded-xl text-center text-xs font-bold transition-all ${
                    moodRating === star
                      ? 'bg-orange-500 text-white ring-2 ring-orange-300'
                      : 'bg-[#FAF7F2] text-[#57534E] hover:bg-[#F2ECE1] border border-[#E5DCCF]'
                  }`}
                >
                  {star === 1 && '🌧️ 1'}
                  {star === 2 && '⛅ 2'}
                  {star === 3 && '🌤️ 3'}
                  {star === 4 && '☀️ 4'}
                  {star === 5 && '✨ 5'}
                </button>
              ))}
            </div>
          </div>

          {/* Free note */}
          <div className="bg-white p-4 rounded-2xl border border-[#EFE8DE]">
            <label htmlFor="deep-note-input" className="block font-semibold text-[#1E2433] mb-1.5">
              Freie Notiz oder Gedanke (optional):
            </label>
            <textarea
              id="deep-note-input"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="z.B. Was war los? Welche Gefühle oder Termine spielten mit?"
              rows={3}
              className="w-full p-3 rounded-xl border border-[#E5DCCF] bg-[#FAF7F2] text-[#1E2433] placeholder-[#A8A29E] text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#EFE8DE] bg-white rounded-b-3xl flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#78716C] hover:bg-[#FAF7F2] border border-transparent hover:border-[#E5DCCF]"
          >
            Abbrechen
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-xs shadow-md shadow-orange-600/20"
          >
            <Check className="w-4 h-4" />
            <span>Vertiefung speichern</span>
          </button>
        </div>
      </div>
    </div>
  );
};
