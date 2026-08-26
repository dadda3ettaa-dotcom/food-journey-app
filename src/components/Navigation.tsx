import React from 'react';
import {
  Home,
  Clock,
  BarChart3,
  Calendar,
  User as UserIcon,
  Flame,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

export type NavTab = 'heute' | 'reise' | 'verlauf' | 'insights' | 'profil';

interface NavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  xp?: number;
  streakDays?: number;
  journeyInProgress: boolean;
  onOpenBookGuide?: () => void;
  currentUser?: FirebaseUser | null;
  onOpenAuth?: () => void;
  onOpenCoachView?: () => void;
  isCoachViewOpen?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  journeyInProgress,
  streakDays = 1,
  currentUser,
  onOpenAuth,
  onOpenCoachView,
  isCoachViewOpen
}) => {
  const tabs = [
    { id: 'heute' as NavTab, label: 'Heute', icon: Home },
    { id: 'reise' as NavTab, label: 'Momente', icon: Clock },
    { id: 'insights' as NavTab, label: 'Insights', icon: BarChart3 },
    { id: 'verlauf' as NavTab, label: 'Kalender', icon: Calendar },
    { id: 'profil' as NavTab, label: 'Profil', icon: UserIcon }
  ];

  return (
    <>
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/80">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            id="brand-logo-btn"
            onClick={() => onTabChange('heute')}
            className="flex items-center gap-2 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-sm">
              🦊
            </div>
            <span className="font-serif italic font-extrabold text-xl tracking-tight text-stone-900">
              Food<span className="text-amber-700">Journey</span>
            </span>
          </button>

          {/* Right Header Action Icons */}
          <div className="flex items-center gap-2.5">
            {/* Streak Flame */}
            <button
              type="button"
              onClick={() => onTabChange('verlauf')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold hover:bg-amber-100/70 transition-colors"
              title="Tages-Streak"
            >
              <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>{streakDays}d</span>
            </button>

            {/* Coach View Toggle */}
            {onOpenCoachView && (
              <button
                type="button"
                id="header-coach-view-btn"
                onClick={onOpenCoachView}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isCoachViewOpen
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
                title="Coach-Bereich öffnen"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Coach</span>
              </button>
            )}

            {/* Auth / Avatar */}
            {currentUser ? (
              <button
                type="button"
                id="header-user-profile-btn"
                onClick={() => onTabChange('profil')}
                className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xs hover:bg-black transition-all"
                title={currentUser.displayName || currentUser.email || 'Profil'}
              >
                {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
              </button>
            ) : onOpenAuth ? (
              <button
                type="button"
                id="header-login-btn"
                onClick={onOpenAuth}
                className="px-3.5 py-1 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-semibold transition-all shadow-xs"
              >
                Login
              </button>
            ) : null}
          </div>
        </div>
      </header>

      {/* Mobile & Desktop Clean Bottom Navigation Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone-200/80 px-2 py-1.5"
        aria-label="Hauptnavigation"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`nav-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all focus:outline-none ${
                  isActive
                    ? 'text-stone-900 font-bold'
                    : 'text-stone-400 hover:text-stone-700 font-medium'
                }`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={tab.label}
              >
                <div className={`p-1 rounded-xl transition-all ${
                  isActive ? 'bg-stone-100 text-stone-900' : 'text-stone-500'
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                </div>
                <span className="text-[10px] mt-0.5">{tab.label}</span>
                {tab.id === 'reise' && journeyInProgress && (
                  <span className="absolute top-1.5 right-3 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};



