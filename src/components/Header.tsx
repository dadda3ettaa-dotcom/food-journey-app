import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, RotateCcw } from 'lucide-react';
import { isSoundActive, toggleSound } from '../utils/audio';

interface HeaderProps {
  xp: number;
  onReset: () => void;
  showResetButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ xp, onReset, showResetButton = false }) => {
  const [soundOn, setSoundOn] = useState(isSoundActive());
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
  };

  return (
    <header id="app-header" className="w-full border-b border-[#EFE8DE] bg-[#FAF7F2]/90 backdrop-blur-md sticky top-0 z-30 transition-all">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-sm text-lg font-bold">
            🦊
          </div>
          <div className="flex flex-col">
            <span className="font-editorial text-lg font-bold tracking-tight text-[#1E2433] leading-none">
              FOOD JOURNEY
            </span>
            <span className="text-[11px] text-[#64748B] font-medium tracking-wide uppercase mt-0.5">
              Tagesreise & Achtsamkeit
            </span>
          </div>
        </div>

        {/* Action Controls & XP */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* XP Pill */}
          <div
            id="xp-counter-pill"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs sm:text-sm font-semibold transition-transform hover:scale-105"
            title="Deine gesammelten Reflexions-Punkte"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500 fill-orange-400" />
            <span>{xp} XP</span>
          </div>

          {/* Sound Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={handleSoundToggle}
            className="w-9 h-9 rounded-full bg-white border border-[#E5DCCF] text-[#475569] hover:text-orange-600 hover:border-orange-200 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400/40"
            aria-label={soundOn ? 'Ton ausschalten' : 'Ton einschalten'}
            title={soundOn ? 'Ton ausschalten' : 'Ton einschalten'}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-[#94A3B8]" />}
          </button>

          {/* Reset Button (when in journey or report) */}
          {showResetButton && (
            <div className="relative">
              <button
                id="header-restart-btn"
                onClick={() => setShowConfirmReset(true)}
                className="w-9 h-9 rounded-full bg-white border border-[#E5DCCF] text-[#475569] hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-red-400/40"
                aria-label="Tagesreise neu starten"
                title="Neu starten"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Confirm Dialog */}
              {showConfirmReset && (
                <div className="absolute right-0 top-12 w-64 p-3.5 bg-white rounded-2xl shadow-xl border border-[#E5DCCF] z-50 animate-in fade-in zoom-in-95">
                  <p className="text-xs font-semibold text-[#1E2433] mb-2">
                    Möchtest du deinen Tag neu beginnen?
                  </p>
                  <p className="text-[11px] text-[#64748B] mb-3">
                    Deine bisherigen Antworten werden zurückgesetzt.
                  </p>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setShowConfirmReset(false)}
                      className="px-2.5 py-1 text-xs text-[#64748B] hover:text-[#1E2433] rounded-lg"
                    >
                      Abbrechen
                    </button>
                    <button
                      onClick={() => {
                        setShowConfirmReset(false);
                        onReset();
                      }}
                      className="px-3 py-1 text-xs bg-red-50 text-red-700 hover:bg-red-100 font-medium rounded-lg"
                    >
                      Ja, neu starten
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
