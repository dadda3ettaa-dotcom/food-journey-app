import React, { useState } from 'react';
import { JourneyMode, Mission, DayHistoryEntry, DayJourneyState, OnboardingData } from '../types';
import { FoxMascot } from './FoxMascot';
import { User, Target, Download, Trash2, Volume2, VolumeX, RefreshCw, Shield, Sparkles, Check, CheckCircle2, Sliders, ExternalLink, BookOpen, Cloud, LogIn, LogOut, ShieldCheck, RefreshCw as SyncIcon } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface ProfileViewProps {
  preferredMode: JourneyMode;
  onChangePreferredMode: (mode: JourneyMode) => void;
  onboardingData?: OnboardingData;
  onUpdateOnboardingData?: (data: Partial<OnboardingData>) => void;
  missions: Mission[];
  onUpdateMissionStatus: (missionId: string, status: Mission['status']) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onRestartOnboarding: () => void;
  onLoadSampleData: () => void;
  onClearAllData: () => void;
  history: DayHistoryEntry[];
  todayState: DayJourneyState;
  onOpenBookGuide?: () => void;
  currentUser?: FirebaseUser | null;
  onOpenAuth?: () => void;
  onLogout?: () => void;
  onSyncCloudNow?: () => Promise<void>;
  isSyncing?: boolean;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  preferredMode,
  onChangePreferredMode,
  onboardingData,
  onUpdateOnboardingData,
  missions,
  onUpdateMissionStatus,
  soundEnabled,
  onToggleSound,
  onRestartOnboarding,
  onLoadSampleData,
  onClearAllData,
  history,
  todayState,
  onOpenBookGuide,
  currentUser,
  onOpenAuth,
  onLogout,
  onSyncCloudNow,
  isSyncing = false
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState(false);

  const currentAge = onboardingData?.age || 28;
  const currentGender = onboardingData?.gender || 'unspecified';
  const currentCycle = onboardingData?.cycleAwareness || false;
  const currentWake = onboardingData?.defaultWakeTime || '07:00';
  const currentBed = onboardingData?.defaultBedTime || '23:00';

  const handleExportJson = () => {
    const exportData = {
      app: 'Food Journey',
      exportedAt: new Date().toISOString(),
      todayState,
      history,
      missions
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `food-journey-daten-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl border border-[#E5DCCF] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-orange-800">
            <User className="w-3.5 h-3.5 text-orange-600" />
            <span>Persönlicher Bereich & Einstellungen</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1E2433] tracking-tight">
            Dein Food Journey Profil
          </h1>
          <p className="text-xs sm:text-sm text-[#78716C]">
            Passe deine tägliche Reisezeit an, verwalte Alltags-Experimente und exportiere deine Daten.
          </p>
        </div>

        <div className="flex-shrink-0 self-center sm:self-auto">
          <FoxMascot mood="avatar" size={88} id="profile-fox" />
        </div>
      </div>

      {/* Cloud Account & Synchronization Card */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 rounded-3xl p-6 sm:p-7 text-white shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-2xl object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Cloud className="w-6 h-6 text-orange-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-white">
                  {currentUser ? (currentUser.displayName || currentUser.email) : 'Cloud-Synchronisation'}
                </h3>
                {currentUser && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Aktiv
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-300 mt-0.5">
                {currentUser
                  ? `Angemeldet via ${currentUser.providerData[0]?.providerId === 'google.com' ? 'Google' : 'E-Mail'}`
                  : 'Sichere deine Tagebücher, XP und Reflexionen dauerhaft in der Cloud.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {currentUser ? (
              <>
                {onSyncCloudNow && (
                  <button
                    type="button"
                    onClick={async () => {
                      await onSyncCloudNow();
                      setSyncFeedback(true);
                      setTimeout(() => setSyncFeedback(false), 3000);
                    }}
                    disabled={isSyncing}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/20 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <SyncIcon className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Synchronisiert...' : 'Jetzt synchronisieren'}</span>
                  </button>
                )}
                {onLogout && (
                  <button
                    type="button"
                    onClick={onLogout}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/30 text-xs font-bold transition-all active:scale-95"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Abmelden</span>
                  </button>
                )}
              </>
            ) : onOpenAuth ? (
              <button
                type="button"
                onClick={onOpenAuth}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-md transition-all active:scale-95"
              >
                <LogIn className="w-4 h-4" />
                <span>Konto verbinden / Anmelden</span>
              </button>
            ) : null}
          </div>
        </div>

        {syncFeedback && (
          <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Alle Tagesreisen und Profileinstellungen wurden erfolgreich mit der Google Cloud synchronisiert!</span>
          </div>
        )}
      </div>

      {/* Mode Preference */}
      <div className="bg-white rounded-3xl border border-[#E5DCCF] p-6 sm:p-7 shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-base text-[#1E2433]">
            Bevorzugter Reise-Modus
          </h3>
          <p className="text-xs text-[#78716C] mt-0.5">
            Wähle, wie detailliert du deinen Tag standardmäßig reflektieren möchtest:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onChangePreferredMode('express')}
            className={`p-4 rounded-2xl border text-left transition-all relative ${
              preferredMode === 'express'
                ? 'bg-orange-50/90 border-orange-500 ring-2 ring-orange-300 shadow-sm'
                : 'bg-[#FAF7F2] hover:bg-white border-[#E5DCCF]'
            }`}
          >
            <span className="font-bold text-sm text-[#1E2433] block">⚡ Express</span>
            <span className="text-xs font-semibold text-orange-700 block mt-0.5">ca. 2 Minuten</span>
            <p className="text-[11px] text-[#78716C] mt-1">
              3 Kern-Momente: Aufstehen, Nachmittag, Tagesende.
            </p>
            {preferredMode === 'express' && (
              <span className="absolute top-3 right-3 text-orange-600">✓</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onChangePreferredMode('standard')}
            className={`p-4 rounded-2xl border text-left transition-all relative ${
              preferredMode === 'standard'
                ? 'bg-orange-50/90 border-orange-500 ring-2 ring-orange-300 shadow-sm'
                : 'bg-[#FAF7F2] hover:bg-white border-[#E5DCCF]'
            }`}
          >
            <span className="font-bold text-sm text-[#1E2433] block">🌿 Standard</span>
            <span className="text-xs font-semibold text-orange-700 block mt-0.5">ca. 5 Minuten</span>
            <p className="text-[11px] text-[#78716C] mt-1">
              Alle 9 Tagesmomente von morgens bis abends.
            </p>
            {preferredMode === 'standard' && (
              <span className="absolute top-3 right-3 text-orange-600">✓</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onChangePreferredMode('deep')}
            className={`p-4 rounded-2xl border text-left transition-all relative ${
              preferredMode === 'deep'
                ? 'bg-violet-50 border-violet-500 ring-2 ring-violet-300 shadow-sm'
                : 'bg-[#FAF7F2] hover:bg-white border-[#E5DCCF]'
            }`}
          >
            <span className="font-bold text-sm text-[#1E2433] block">🔍 Tiefenreflexion</span>
            <span className="text-xs font-semibold text-violet-700 block mt-0.5">ca. 10 Minuten</span>
            <p className="text-[11px] text-[#78716C] mt-1">
              9 Momente + Zusatzangaben zu Hunger, Sättigung & Kontext.
            </p>
            {preferredMode === 'deep' && (
              <span className="absolute top-3 right-3 text-violet-600">✓</span>
            )}
          </button>
        </div>
      </div>

      {/* Biological & Circadian Profile Settings */}
      {onUpdateOnboardingData && (
        <div className="bg-white rounded-3xl border border-[#E5DCCF] p-6 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#1E2433] flex items-center gap-2">
                <span className="text-xl">🧬</span>
                <span>Biologischer Rahmen & Schlafzeiten</span>
              </h3>
              <p className="text-xs text-[#78716C] mt-0.5">
                Wird für deine personalisierte Tages-Bonusfrage und Schlafauswertung genutzt:
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              Lokal gespeichert
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
            {/* Age */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EFE8DE] space-y-1.5">
              <label className="block text-xs font-bold text-[#1E2433]">
                Alter
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={12}
                  max={110}
                  value={currentAge}
                  onChange={(e) => onUpdateOnboardingData({ age: Math.max(12, Math.min(110, Number(e.target.value))) })}
                  className="w-20 px-3 py-1.5 rounded-xl border border-orange-200 bg-white font-bold text-sm text-[#1E2433] focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <span className="text-xs text-[#78716C]">Jahre</span>
              </div>
            </div>

            {/* Gender / Bio profile */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EFE8DE] space-y-1.5">
              <label className="block text-xs font-bold text-[#1E2433]">
                Biologisches Profil
              </label>
              <select
                value={currentGender}
                onChange={(e) => onUpdateOnboardingData({ gender: e.target.value as any })}
                className="w-full px-2.5 py-1.5 rounded-xl border border-orange-200 bg-white text-xs font-bold text-[#1E2433] focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="female">Weiblich</option>
                <option value="male">Männlich</option>
                <option value="diverse">Divers</option>
                <option value="unspecified">Keine Angabe</option>
              </select>
            </div>

            {/* Default wake time */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EFE8DE] space-y-1.5">
              <label className="block text-xs font-bold text-[#1E2433]">
                Standard Aufstehzeit
              </label>
              <input
                type="time"
                value={currentWake}
                onChange={(e) => onUpdateOnboardingData({ defaultWakeTime: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-xl border border-amber-300 bg-white text-xs font-bold text-[#1E2433] focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Default bed time */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EFE8DE] space-y-1.5">
              <label className="block text-xs font-bold text-[#1E2433]">
                Standard Bettzeit
              </label>
              <input
                type="time"
                value={currentBed}
                onChange={(e) => onUpdateOnboardingData({ defaultBedTime: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-xl border border-violet-300 bg-white text-xs font-bold text-[#1E2433] focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </div>
          </div>

          {currentGender === 'female' && (
            <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs text-rose-950 flex items-center justify-between gap-3">
              <span>Zyklusbezogene Reflexionsimpulse und Heißhunger-Achtsamkeit aktivieren</span>
              <input
                type="checkbox"
                checked={currentCycle}
                onChange={(e) => onUpdateOnboardingData({ cycleAwareness: e.target.checked })}
                className="w-4 h-4 text-rose-600 rounded focus:ring-rose-400"
              />
            </div>
          )}
        </div>
      )}

      {/* Book & Method Guide Card (30 Chapters & 14-Day Program) */}
      {onOpenBookGuide && (
        <div className="bg-gradient-to-r from-orange-50 via-amber-50/50 to-white rounded-3xl border border-orange-200/90 p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4 max-w-xl">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-2xl flex-shrink-0">
              📖
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-orange-700 uppercase tracking-wider">
                Wissen & Methodik • 30 Kapitel
              </span>
              <h3 className="font-bold text-base text-[#1E2433]">
                Das Food Journey Buch & 14-Tage-Programm
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Entdecke alle 30 Kapitel, die 8 Kernprinzipien, das 14-Tage-Programm und teste Annas Beispieltag (Kapitel 28) mit einem Klick.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenBookGuide}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-xs shadow-md shadow-orange-600/20 transition-all flex-shrink-0"
          >
            <BookOpen className="w-4 h-4 fill-white/20" />
            <span>Buch jetzt öffnen</span>
          </button>
        </div>
      )}

      {/* Missions & Experiments Manager */}
      <div className="bg-white rounded-3xl border border-[#E5DCCF] p-6 sm:p-7 shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-base text-[#1E2433] flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-600" />
            <span>Alltags-Experimente (Missionen)</span>
          </h3>
          <p className="text-xs text-[#78716C] mt-0.5">
            Kleine, freiwillige Tests für mehr Achtsamkeit ohne Erfolgs- oder Versagensdruck.
          </p>
        </div>

        <div className="space-y-3">
          {missions.map((mission) => {
            return (
              <div
                key={mission.id}
                className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EFE8DE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl p-1.5 rounded-xl bg-white border border-[#E5DCCF]" role="img" aria-hidden="true">
                    {mission.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-[#1E2433]">
                        {mission.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded-md bg-white border border-[#E5DCCF] text-[10px] font-semibold text-[#78716C]">
                        {mission.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#57534E] mt-0.5 leading-relaxed">
                      {mission.description}
                    </p>
                  </div>
                </div>

                {/* Status Switcher */}
                <div className="flex items-center gap-1.5 self-end sm:self-center flex-shrink-0 bg-white p-1 rounded-xl border border-[#E5DCCF] text-xs">
                  <button
                    type="button"
                    onClick={() => onUpdateMissionStatus(mission.id, 'try')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                      mission.status === 'try'
                        ? 'bg-amber-100 text-amber-900 font-bold'
                        : 'text-[#78716C] hover:text-[#1E2433]'
                    }`}
                  >
                    Ausprobieren
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateMissionStatus(mission.id, 'done')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                      mission.status === 'done'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'text-[#78716C] hover:text-[#1E2433]'
                    }`}
                  >
                    Erledigt ✓
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateMissionStatus(mission.id, 'skip')}
                    className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      mission.status === 'skip'
                        ? 'bg-stone-200 text-stone-800'
                        : 'text-[#A8A29E] hover:text-[#78716C]'
                    }`}
                  >
                    Überspringen
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* App Preferences & Data Tools */}
      <div className="bg-white rounded-3xl border border-[#E5DCCF] p-6 sm:p-7 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-[#1E2433]">
          Funktionen & Datenverwaltung
        </h3>

        <div className="divide-y divide-[#EFE8DE] text-xs sm:text-sm">
          {/* Sound Toggle */}
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-orange-600" />
              ) : (
                <VolumeX className="w-5 h-5 text-[#78716C]" />
              )}
              <div>
                <span className="font-bold text-[#1E2433] block">Akustisches Feedback</span>
                <span className="text-xs text-[#78716C]">Sanfte Töne beim Auswählen von Antworten</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleSound}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all ${
                soundEnabled
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-[#FAF7F2] text-[#78716C] border border-[#E5DCCF]'
              }`}
            >
              {soundEnabled ? 'Aktiviert' : 'Stumm'}
            </button>
          </div>

          {/* Onboarding Restart */}
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-violet-600" />
              <div>
                <span className="font-bold text-[#1E2433] block">Onboarding & Ziele anpassen</span>
                <span className="text-xs text-[#78716C]">Fragen zu Alltag und Schwerpunkten wiederholen</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onRestartOnboarding}
              className="px-3.5 py-1.5 rounded-xl font-semibold text-xs bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#1E2433] border border-[#E5DCCF]"
            >
              Starten
            </button>
          </div>

          {/* Load Sample Data */}
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <div>
                <span className="font-bold text-[#1E2433] block">Beispieldaten für Tests laden</span>
                <span className="text-xs text-[#78716C]">Fügt 4 Tage hinzu, um Insights und Kalender sofort zu erleben</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onLoadSampleData}
              className="px-3.5 py-1.5 rounded-xl font-semibold text-xs bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
            >
              Daten laden
            </button>
          </div>

          {/* JSON Data Export */}
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-emerald-600" />
              <div>
                <span className="font-bold text-[#1E2433] block">Tagesbuch exportieren (JSON)</span>
                <span className="text-xs text-[#78716C]">Lade alle deine Einträge als lokale Datei herunter</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleExportJson}
              className="px-3.5 py-1.5 rounded-xl font-semibold text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200"
            >
              Exportieren
            </button>
          </div>

          {/* Clear All Data */}
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-rose-600" />
              <div>
                <span className="font-bold text-[#1E2433] block">Alle lokalen Daten löschen</span>
                <span className="text-xs text-[#78716C]">Setzt Verlauf, heutigen Tag und Missionen vollständig zurück</span>
              </div>
            </div>
            {showClearConfirm ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClearAllData();
                    setShowClearConfirm(false);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
                >
                  Ja, löschen
                </button>
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(false)}
                  className="px-2.5 py-1.5 rounded-xl text-xs text-[#78716C]"
                >
                  Abbrechen
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="px-3.5 py-1.5 rounded-xl font-semibold text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200"
              >
                Zurücksetzen
              </button>
            )}
          </div>
        </div>

        {exportNotice && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Datei wurde erfolgreich heruntergeladen.</span>
          </div>
        )}
      </div>

      {/* Privacy Pledge Banner */}
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#E5DCCF] p-5 text-xs text-[#57534E] flex items-start gap-3 leading-relaxed">
        <Shield className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#1E2433] block">Datenschutz & Privatsphäre:</strong>
          Deine Antworten bleiben auf diesem Gerät gespeichert, solange du keine Synchronisierung aktivierst. Keine Pflicht-Registrierung, kein Tracking, volle Kontrolle.
        </div>
      </div>
    </div>
  );
};
