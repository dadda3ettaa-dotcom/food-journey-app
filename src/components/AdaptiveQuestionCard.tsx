import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, X, Loader2 } from 'lucide-react';
import { fetchAdaptiveQuestion } from '../lib/geminiApi';

interface AdaptiveQuestionCardProps {
  onSelectAnswer: (answer: string) => void;
  onSkip: () => void;
  historyCount?: number;
  primaryArchetype?: string;
}

const DEFAULT_OPTIONS = [
  { label: 'Eine kurze 10-Minuten-Pause einlegen', icon: '🪑' },
  { label: 'Einen nahrhaften Snack bereitlegen', icon: '🥜' },
  { label: 'Zuerst ein großes Glas Wasser trinken', icon: '💧' },
  { label: 'Den Moment einfach bewusst und wertfrei beobachten', icon: '🧘' },
  { label: 'Heute alles genau so belassen wie es ist', icon: '🌿' }
];

export const AdaptiveQuestionCard: React.FC<AdaptiveQuestionCardProps> = ({
  onSelectAnswer,
  onSkip,
  historyCount = 3,
  primaryArchetype = 'Fuchs'
}) => {
  const [title, setTitle] = useState<string>('In den letzten Tagen tauchte öfter Snack-Lust am Nachmittag auf.');
  const [question, setQuestion] = useState<string>('Wie möchtest du diesen Moment heute oder morgen ganz ungezwungen ausprobieren?');
  const [options, setOptions] = useState<Array<{ label: string; icon: string }>>(DEFAULT_OPTIONS);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    fetchAdaptiveQuestion({
      historyCount,
      commonTags: ['Nachmittagssnack', 'Kaffee am Vormittag'],
      primaryArchetype
    })
      .then((res) => {
        if (isMounted && res.options && res.options.length > 0) {
          setTitle(res.title || 'Spontaner Rhythmus-Impuls');
          setQuestion(res.question);
          setOptions(res.options);
        }
      })
      .catch((err) => {
        console.warn('Using default adaptive options:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [historyCount, primaryArchetype]);

  return (
    <div
      id="adaptive-question-card"
      className="bg-gradient-to-br from-orange-50 via-[#FFF7ED] to-violet-50 rounded-3xl p-5 sm:p-6 border border-orange-200/80 shadow-md relative animate-fade-in mb-6"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2 text-orange-700 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-orange-500 fill-orange-500" />
          <span>Adaptive KI-Beobachtung (Gemini)</span>
        </div>
        <button
          onClick={onSkip}
          className="text-[#78716C] hover:text-[#1E2433] text-xs font-semibold p-1 rounded-lg hover:bg-orange-100/50 flex items-center gap-1"
          aria-label="Frage überspringen"
        >
          <X className="w-3.5 h-3.5" />
          <span>Überspringen</span>
        </button>
      </div>

      <h3 className="font-bold text-base sm:text-lg text-[#1E2433] leading-snug mb-2">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-[#57534E] mb-4">
        {question}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectAnswer(opt.label)}
            className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/90 hover:bg-white border border-orange-100 hover:border-orange-300 text-left text-xs font-semibold text-[#1E2433] shadow-sm hover:shadow transition-all group"
          >
            <span className="text-base" role="img" aria-hidden="true">{opt.icon}</span>
            <span className="flex-1">{opt.label}</span>
            <ArrowRight className="w-3.5 h-3.5 text-orange-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        ))}
      </div>
    </div>
  );
};
