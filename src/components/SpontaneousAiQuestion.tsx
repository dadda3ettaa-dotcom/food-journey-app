import React, { useState, useEffect } from 'react';
import { Sparkles, Send, Check, Loader2, MessageSquarePlus } from 'lucide-react';
import { Moment, AnswerOption, MomentDetail } from '../types';
import { fetchSpontaneousQuestion, SpontaneousQuestionResponse } from '../lib/geminiApi';
import { playSelectSound } from '../utils/audio';

interface SpontaneousAiQuestionProps {
  moment: Moment;
  selectedOption?: AnswerOption;
  momentDetail?: MomentDetail;
  onSaveSpontaneousAnswer: (answer: string) => void;
  wakeTime?: string;
}

export const SpontaneousAiQuestion: React.FC<SpontaneousAiQuestionProps> = ({
  moment,
  selectedOption,
  momentDetail,
  onSaveSpontaneousAnswer,
  wakeTime
}) => {
  const [data, setData] = useState<SpontaneousQuestionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [saved, setSaved] = useState<boolean>(false);

  // Load spontaneous question whenever selectedOption or moment changes
  useEffect(() => {
    let isMounted = true;
    setSaved(false);
    setSelectedChip(null);
    setCustomInput('');

    if (!selectedOption) {
      setData(null);
      return;
    }

    setLoading(true);
    fetchSpontaneousQuestion(moment, selectedOption, momentDetail, { wakeTime })
      .then((res) => {
        if (isMounted) {
          setData(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching spontaneous AI question:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [moment.id, selectedOption?.id]);

  const handleChipSelect = (chip: string) => {
    playSelectSound();
    setSelectedChip(chip);
    setSaved(true);
    onSaveSpontaneousAnswer(chip);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    playSelectSound();
    setSelectedChip(customInput.trim());
    setSaved(true);
    onSaveSpontaneousAnswer(customInput.trim());
    setCustomInput('');
  };

  if (!selectedOption) {
    return null;
  }

  return (
    <div
      id={`spontaneous-ai-question-${moment.id}`}
      className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-rose-500/5 border border-orange-200/80 space-y-3 animate-fade-in"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-orange-950">
          <Sparkles className="w-4 h-4 text-orange-600 animate-pulse" />
          <span>Spontane KI-Reflexion</span>
          <span className="text-[10px] font-semibold text-orange-700 bg-orange-100/80 px-2 py-0.5 rounded-full">
            Gemini
          </span>
        </div>

        {saved && (
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full animate-fade-in">
            <Check className="w-3 h-3" />
            <span>Erfasst</span>
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex items-center gap-2.5 py-3 text-xs text-stone-600 font-medium">
          <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
          <span>Gemini stellt eine spontane Anschlussfrage...</span>
        </div>
      ) : data ? (
        <div className="space-y-3">
          <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-snug">
            {data.spontaneousQuestion}
          </p>

          {/* Quick Choice Chips */}
          <div className="flex flex-wrap gap-1.5">
            {data.quickChips.map((chip, idx) => {
              const isChosen = selectedChip === chip;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleChipSelect(chip)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all text-left flex items-center gap-1 ${
                    isChosen
                      ? 'bg-stone-900 text-white shadow-xs scale-102 ring-1 ring-stone-900'
                      : 'bg-white hover:bg-orange-50/80 border border-stone-200/80 text-stone-800 hover:border-orange-300'
                  }`}
                >
                  <span>{chip}</span>
                  {isChosen && <Check className="w-3 h-3 text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {/* Custom text input */}
          <form onSubmit={handleCustomSubmit} className="flex gap-1.5 pt-1">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Oder ein eigener spontaner Gedanke..."
              className="flex-1 text-xs bg-white border border-stone-200/90 rounded-xl px-3 py-2 text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-orange-500 focus:ring-1 focus:ring-orange-400"
            />
            <button
              type="submit"
              disabled={!customInput.trim()}
              className="px-3 py-2 rounded-xl bg-orange-600 text-white text-xs font-semibold hover:bg-orange-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 transition-all"
            >
              <Send className="w-3 h-3" />
              <span>Senden</span>
            </button>
          </form>

          {/* Fox Thought Insight */}
          {data.foxThought && (
            <div className="text-[11px] text-stone-600 bg-white/70 rounded-xl p-2 border border-orange-100 flex items-start gap-1.5 leading-relaxed">
              <span className="text-xs">🦊</span>
              <span>
                <strong className="font-semibold text-stone-800">Fuchs-Impuls:</strong> {data.foxThought}
              </span>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
