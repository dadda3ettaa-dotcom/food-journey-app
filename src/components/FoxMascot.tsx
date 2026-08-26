import React from 'react';

export type FoxMood = 'welcome' | 'curious' | 'thoughtful' | 'celebrating' | 'sleepy' | 'avatar';

interface FoxMascotProps {
  mood?: FoxMood;
  size?: number | string;
  className?: string;
  id?: string;
}

export const FoxMascot: React.FC<FoxMascotProps> = ({
  mood = 'welcome',
  size = 120,
  className = '',
  id
}) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      id={id}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
      role="img"
      aria-label={`Fuchs Maskottchen in der Stimmung: ${mood}`}
    >
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full drop-shadow-md transition-transform duration-300 hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="foxBodyGrad" x1="20" y1="20" x2="140" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FB923C" />
            <stop offset="1" stopColor="#EA580C" />
          </linearGradient>
          <linearGradient id="foxEarInner" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FED7AA" />
            <stop offset="1" stopColor="#FDBA74" />
          </linearGradient>
          <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#EA580C" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Ambient Halo behind head */}
        <circle cx="80" cy="80" r="70" fill="#FFF7ED" className="opacity-80" />

        {/* Tail (visible in celebrating, sleepy, welcome) */}
        {mood === 'celebrating' && (
          <path
            d="M 125 110 C 145 95 155 120 135 135 C 120 145 105 135 110 120 Z"
            fill="url(#foxBodyGrad)"
          />
        )}
        {mood === 'sleepy' && (
          <path
            d="M 130 95 C 150 110 140 140 100 140 C 70 140 60 125 70 115 Z"
            fill="url(#foxBodyGrad)"
          />
        )}

        {/* Ears */}
        {/* Left Ear */}
        <path
          d="M 36 68 L 22 24 C 36 28 54 42 58 56 Z"
          fill="url(#foxBodyGrad)"
        />
        <path
          d="M 33 60 L 26 32 C 34 35 46 45 49 53 Z"
          fill="url(#foxEarInner)"
        />
        <path
          d="M 22 24 L 27 34 L 21 38 Z"
          fill="#1E293B"
          opacity="0.85"
        />

        {/* Right Ear */}
        <path
          d="M 124 68 L 138 24 C 124 28 106 42 102 56 Z"
          fill="url(#foxBodyGrad)"
        />
        <path
          d="M 127 60 L 134 32 C 126 35 114 45 111 53 Z"
          fill="url(#foxEarInner)"
        />
        <path
          d="M 138 24 L 133 34 L 139 38 Z"
          fill="#1E293B"
          opacity="0.85"
        />

        {/* Main Head Shape */}
        <path
          d="M 32 75 C 32 50 52 38 80 38 C 108 38 128 50 128 75 C 128 98 108 124 80 128 C 52 124 32 98 32 75 Z"
          fill="url(#foxBodyGrad)"
          filter="url(#softGlow)"
        />

        {/* White Cheeks / Muzzle Shape */}
        <path
          d="M 33 78 C 34 94 48 116 80 128 C 112 116 126 94 127 78 C 122 82 108 86 98 76 C 88 66 84 66 80 66 C 76 66 72 66 62 76 C 52 86 38 82 33 78 Z"
          fill="#FFFFFF"
        />

        {/* Rosy Cheeks */}
        <ellipse cx="48" cy="88" rx="7" ry="4.5" fill="#FCA5A5" opacity="0.65" />
        <ellipse cx="112" cy="88" rx="7" ry="4.5" fill="#FCA5A5" opacity="0.65" />

        {/* Eyes based on mood */}
        {mood === 'sleepy' ? (
          <>
            {/* Sleepy curved lines */}
            <path d="M 52 74 Q 60 82 68 74" stroke="#1E2433" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 92 74 Q 100 82 108 74" stroke="#1E2433" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </>
        ) : mood === 'celebrating' ? (
          <>
            {/* Joyful arches */}
            <path d="M 50 78 Q 60 66 70 78" stroke="#1E2433" strokeWidth="3.8" strokeLinecap="round" fill="none" />
            <path d="M 90 78 Q 100 66 110 78" stroke="#1E2433" strokeWidth="3.8" strokeLinecap="round" fill="none" />
          </>
        ) : mood === 'thoughtful' ? (
          <>
            {/* Thinking look */}
            <ellipse cx="61" cy="74" rx="4.5" ry="5.5" fill="#1E2433" />
            <circle cx="63" cy="72" r="1.8" fill="#FFFFFF" />
            <ellipse cx="99" cy="71" rx="4.5" ry="5.5" fill="#1E2433" />
            <circle cx="101" cy="69" r="1.8" fill="#FFFFFF" />
            {/* Eyebrows */}
            <path d="M 54 65 Q 61 62 68 66" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 92 64 Q 99 60 106 63" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            {/* Standard bright friendly eyes */}
            <ellipse cx="58" cy="74" rx="4.8" ry="6" fill="#1E2433" />
            <circle cx="56.5" cy="72" r="2" fill="#FFFFFF" />
            <ellipse cx="102" cy="74" rx="4.8" ry="6" fill="#1E2433" />
            <circle cx="100.5" cy="72" r="2" fill="#FFFFFF" />
            {/* Subtle soft eyebrows */}
            <path d="M 52 64 Q 58 61 64 64" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 96 64 Q 102 61 108 64" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        )}

        {/* Cute Fox Nose */}
        <polygon points="74,86 86,86 80,94" fill="#1E2433" />
        <ellipse cx="80" cy="87.5" rx="2" ry="1" fill="#475569" opacity="0.6" />

        {/* Mouth */}
        {mood === 'celebrating' ? (
          <path
            d="M 72 96 Q 80 108 88 96"
            stroke="#1E2433"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="#F43F5E"
          />
        ) : (
          <path
            d="M 74 96 Q 80 102 86 96"
            stroke="#1E2433"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Small sparkle for celebrating */}
        {mood === 'celebrating' && (
          <>
            <path d="M 28 36 L 32 28 L 36 36 L 44 40 L 36 44 L 32 52 L 28 44 L 20 40 Z" fill="#F59E0B" />
            <path d="M 126 40 L 129 34 L 132 40 L 138 43 L 132 46 L 129 52 L 126 46 L 120 43 Z" fill="#F59E0B" />
          </>
        )}

        {/* Little zZz for sleepy */}
        {mood === 'sleepy' && (
          <>
            <text x="122" y="42" fill="#7C3AED" fontSize="16" fontWeight="bold" fontFamily="system-ui">z</text>
            <text x="134" y="30" fill="#7C3AED" fontSize="20" fontWeight="bold" fontFamily="system-ui">Z</text>
          </>
        )}
      </svg>
    </div>
  );
};
