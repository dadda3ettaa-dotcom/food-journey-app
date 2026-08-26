import React from 'react';
import { FoxMascot } from './FoxMascot';
import { ArrowRight, Clock, ShieldCheck, Compass, Sparkles, Play } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  onResume?: () => void;
  savedAnswerCount?: number;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  onResume,
  savedAnswerCount = 0
}) => {
  return (
    <div id="welcome-screen" className="max-w-3xl mx-auto px-4 py-6 sm:py-10">
      {/* Hero Card Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE8DE] shadow-soft relative overflow-hidden">
        {/* Background decorative warm blob */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-orange-100/50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-purple-100/40 blur-3xl pointer-events-none" />

        {/* Top Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100/80 text-orange-900 border border-orange-200/60">
            <Sparkles className="w-3.5 h-3.5 text-orange-600 fill-orange-500" />
            <span>Achtsame Tagesreflexion</span>
          </span>
          <span className="text-xs text-[#64748B] font-medium hidden sm:inline">
            • 100% lokal & privat
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Text Content */}
          <div className="md:col-span-7 space-y-4">
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1E2433] leading-[1.1]">
              Wie war<br />
              <span className="text-orange-600 underline decoration-orange-300 decoration-wavy decoration-2">
                mein Tag?
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#475569] font-medium leading-relaxed">
              Deine Tagesreise durch Essen, Energie und Gewohnheiten.
            </p>

            {/* Core Promoted Statements */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EFE8DE] text-sm text-[#334155] space-y-2">
              <p className="font-medium text-[#1E2433] flex items-start gap-2">
                <span className="text-orange-500 text-base leading-none mt-0.5">✦</span>
                <span>
                  Keine Prüfung. Kein richtig oder falsch. Gehe in Bildern durch deinen echten Tag und beobachte, welche Momente sich wiederholen.
                </span>
              </p>
              <p className="text-xs text-[#64748B] pl-4">
                Du gehst in Bildern durch deinen echten Tag und entdeckst am Ende, welche Muster sich bei dir zeigen.
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              {savedAnswerCount > 0 && onResume ? (
                <>
                  <button
                    id="resume-journey-btn"
                    onClick={onResume}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold rounded-2xl shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-orange-300/40"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Reise fortsetzen ({savedAnswerCount}/9)</span>
                  </button>
                  <button
                    id="restart-journey-btn"
                    onClick={onStart}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#475569] font-semibold rounded-2xl border border-[#E5DCCF] transition-all focus:outline-none focus:ring-2 focus:ring-orange-300/40"
                  >
                    <span>Neu beginnen</span>
                  </button>
                </>
              ) : (
                <button
                  id="start-journey-btn"
                  onClick={onStart}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white text-base font-bold rounded-2xl shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-orange-300/50"
                >
                  <span>Meine Reise starten</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Fox Hero Illustration Card */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-full bg-gradient-to-b from-orange-50 to-orange-100/60 p-6 rounded-3xl border border-orange-200/70 text-center relative shadow-sm">
              <div className="animate-float-slow">
                <FoxMascot mood="welcome" size={160} className="mx-auto" />
              </div>
              <div className="mt-3">
                <span className="inline-block px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-semibold text-orange-900 border border-orange-200">
                  Dein achtsamer Begleiter 🦊
                </span>
                <p className="text-xs text-[#64748B] mt-2 italic px-2">
                  „Ich begleite dich durch deine 9 Tagesmomente — ohne Druck oder Wertung.“
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Kleine Informationskarten */}
        <div className="mt-8 pt-6 border-t border-[#EFE8DE] grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Card 1 */}
          <div
            id="info-card-moments"
            className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EFE8DE] transition-transform hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#1E2433]">9 Momente</div>
              <div className="text-xs text-[#64748B]">Von 07:30 bis 22:30 Uhr</div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            id="info-card-duration"
            className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EFE8DE] transition-transform hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#1E2433]">5 Minuten</div>
              <div className="text-xs text-[#64748B]">Kurz, bildhaft & intuitiv</div>
            </div>
          </div>

          {/* Card 3 */}
          <div
            id="info-card-no-judgement"
            className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EFE8DE] transition-transform hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#1E2433]">Keine Bewertung</div>
              <div className="text-xs text-[#64748B]">Kein Richtig oder Falsch</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
