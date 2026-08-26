import React, { useState } from 'react';
import { DayHistoryEntry, Mission, CoachReviewState, CoachClientProfile } from '../types';
import { ARCHETYPES } from '../data/archetypesData';
import { generateSampleHistory, generateAnnaExampleDay } from '../utils/sampleData';
import {
  UserCheck,
  ShieldCheck,
  Sparkles,
  Send,
  CheckCircle2,
  Clock,
  Calendar,
  Layers,
  AlertCircle,
  FileText,
  MessageSquare,
  Award,
  ChevronRight,
  Sun,
  Moon,
  Coffee,
  Check
} from 'lucide-react';
import { playCelebrationSound, playSelectSound } from '../utils/audio';

interface CoachDashboardProps {
  currentClientHistory: DayHistoryEntry[];
  currentClientReviewState: CoachReviewState;
  onApproveClientSuggestions: (data: {
    approvedMissions: string[];
    approvedRecommendations: string[];
    coachNotes: string;
  }) => void;
  onResetClientReview: () => void;
  onCloseCoachView: () => void;
  currentUserEmail?: string | null;
  currentUserName?: string | null;
  availableMissions: Mission[];
}

export const CoachDashboard: React.FC<CoachDashboardProps> = ({
  currentClientHistory,
  currentClientReviewState,
  onApproveClientSuggestions,
  onResetClientReview,
  onCloseCoachView,
  currentUserEmail,
  currentUserName,
  availableMissions
}) => {
  // Pre-seed mock clients for coach testing
  const [selectedClientId, setSelectedClientId] = useState<string>('current_user');

  // Coach custom feedback message
  const [coachNotes, setCoachNotes] = useState<string>(
    currentClientReviewState.coachNotes ||
      'Hallo! Deine 7-Tage-Dokumentation zeigt ein klares Bild: Ein starker Start am Vormittag und das klassische biologische Energietief gegen 15:30 Uhr. Wir starten sanft mit zwei gezielten Alltags-Experimenten.'
  );

  // Selected recommendations to approve
  const defaultRecs = [
    '5 Minuten Atempause vor dem ersten Bissen am Mittag einlegen',
    'Am Nachmittag bewusst zwischen echtem Hunger und Kaffeelust unterscheiden',
    'Den Abend mit warmem Kräutertee statt spätem Knabbern ausklingen lassen'
  ];

  const [selectedRecs, setSelectedRecs] = useState<string[]>(
    currentClientReviewState.approvedRecommendations && currentClientReviewState.approvedRecommendations.length > 0
      ? currentClientReviewState.approvedRecommendations
      : defaultRecs
  );

  // Selected mission IDs
  const [selectedMissionIds, setSelectedMissionIds] = useState<string[]>(
    currentClientReviewState.approvedMissionIds && currentClientReviewState.approvedMissionIds.length > 0
      ? currentClientReviewState.approvedMissionIds
      : [availableMissions[0]?.id || 'm_pause_1', availableMissions[1]?.id || 'm_meal_1']
  );

  const [approvalFeedback, setApprovalFeedback] = useState<boolean>(false);

  // Active client history depending on selected client
  const activeHistory = selectedClientId === 'current_user' ? currentClientHistory : generateSampleHistory();
  const totalDays = activeHistory.length;
  const isSevenDaysReached = totalDays >= 7;

  // Archetype distribution
  const counts: Record<string, number> = { fox: 0, wolf: 0, lion: 0, bear: 0 };
  activeHistory.forEach((h) => {
    if (h.primaryArchetypeId && counts[h.primaryArchetypeId] !== undefined) {
      counts[h.primaryArchetypeId]++;
    }
  });

  const dominantArchetypeId = (Object.keys(counts) as Array<keyof typeof counts>).reduce((a, b) =>
    counts[a] >= counts[b] ? a : b
  );
  const dominantArchetype = ARCHETYPES[dominantArchetypeId];

  // Toggle mission selection
  const handleToggleMission = (id: string) => {
    playSelectSound();
    if (selectedMissionIds.includes(id)) {
      setSelectedMissionIds(selectedMissionIds.filter((m) => m !== id));
    } else {
      setSelectedMissionIds([...selectedMissionIds, id]);
    }
  };

  // Toggle recommendation
  const handleToggleRec = (rec: string) => {
    playSelectSound();
    if (selectedRecs.includes(rec)) {
      setSelectedRecs(selectedRecs.filter((r) => r !== rec));
    } else {
      setSelectedRecs([...selectedRecs, rec]);
    }
  };

  // Submit Approval
  const handleApprove = () => {
    playCelebrationSound();
    onApproveClientSuggestions({
      approvedMissions: selectedMissionIds,
      approvedRecommendations: selectedRecs,
      coachNotes: coachNotes.trim()
    });
    setApprovalFeedback(true);
    setTimeout(() => setApprovalFeedback(false), 4000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-fade-in pb-16">
      {/* Top Coach Portal Bar */}
      <div className="bg-gradient-to-r from-[#1E2433] via-[#2A3447] to-[#1E2433] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-xs font-bold text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Coach-Portal & Freigabezentrum</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              7-Tage-Dossier & Klienten-Freigabe
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Prüfe die 7-Tage-Dokumentation deiner Klienten, passe Alltags-Impulse an und gib die personalisierten Experimente für die Klienten-App frei.
            </p>
          </div>

          <button
            type="button"
            onClick={onCloseCoachView}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all self-end md:self-center"
          >
            <span>← Zurück zur Klienten-Sicht</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {approvalFeedback && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white shadow-lg flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-bold">
              Erfolgreich freigegeben! Die personalisierten Impulse und Missions sind nun sofort für den Klienten in der App aktiv.
            </span>
          </div>
        </div>
      )}

      {/* Client Selector Bar */}
      <div className="bg-white rounded-3xl border border-[#E5DCCF] p-4 sm:p-5 shadow-sm space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-[#78716C] px-1">
          Klienten auswählen:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Real User Client */}
          <button
            type="button"
            onClick={() => setSelectedClientId('current_user')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              selectedClientId === 'current_user'
                ? 'bg-orange-50/90 border-orange-500 ring-2 ring-orange-400/40 shadow-sm'
                : 'bg-[#FAF7F2] hover:bg-white border-[#E5DCCF]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1E2433] flex items-center gap-1.5">
                <span>👤</span>
                <span>{currentUserName || 'Aktueller Nutzer'}</span>
              </span>
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  currentClientReviewState.status === 'approved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : currentClientReviewState.status === 'submitted'
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-stone-100 text-stone-700'
                }`}
              >
                {currentClientReviewState.status === 'approved'
                  ? 'Freigegeben ✓'
                  : currentClientReviewState.status === 'submitted'
                  ? 'Eingereicht ⏳'
                  : `${currentClientHistory.length}/7 Tage`}
              </span>
            </div>
            <p className="text-[11px] text-[#78716C] mt-1 truncate">
              {currentUserEmail || 'Lokal gespeicherter Klient'}
            </p>
          </button>

          {/* Anna Becker Sample Client */}
          <button
            type="button"
            onClick={() => setSelectedClientId('sample_anna')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              selectedClientId === 'sample_anna'
                ? 'bg-orange-50/90 border-orange-500 ring-2 ring-orange-400/40 shadow-sm'
                : 'bg-[#FAF7F2] hover:bg-white border-[#E5DCCF]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1E2433] flex items-center gap-1.5">
                <span>👩‍💼</span>
                <span>Anna Becker (Buch-Beispiel)</span>
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                7/7 Tage Bereit
              </span>
            </div>
            <p className="text-[11px] text-[#78716C] mt-1">
              34 Jahre • Büro & Vormittagshunger
            </p>
          </button>

          {/* Lukas Sample Client */}
          <button
            type="button"
            onClick={() => setSelectedClientId('sample_lukas')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              selectedClientId === 'sample_lukas'
                ? 'bg-orange-50/90 border-orange-500 ring-2 ring-orange-400/40 shadow-sm'
                : 'bg-[#FAF7F2] hover:bg-white border-[#E5DCCF]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1E2433] flex items-center gap-1.5">
                <span>👨‍💻</span>
                <span>Lukas Meyer</span>
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                4/7 Tage
              </span>
            </div>
            <p className="text-[11px] text-[#78716C] mt-1">
              29 Jahre • Spätabend-Snacker
            </p>
          </button>
        </div>
      </div>

      {/* 7-Day Dossier Analysis Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Card */}
        <div className="bg-white rounded-3xl border border-[#E5DCCF] p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#78716C] uppercase">
            <span>Dossier-Status</span>
            <Calendar className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-xl font-extrabold text-[#1E2433] flex items-center gap-2">
            <span>{totalDays} von 7 Tagen</span>
            {isSevenDaysReached && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Vollständig ✓
              </span>
            )}
          </div>
          <p className="text-xs text-[#78716C]">
            {isSevenDaysReached
              ? 'Volles 7-Tage-Ernährungsprofil liegt vor.'
              : `Noch ${7 - totalDays} Tage bis zur vollständigen 7-Tage-Erstanalyse.`}
          </p>
        </div>

        {/* Dominant Pattern Card */}
        <div
          className="rounded-3xl border p-5 shadow-sm space-y-2"
          style={{ backgroundColor: dominantArchetype.themeBg, borderColor: dominantArchetype.themeBorder }}
        >
          <div className="flex items-center justify-between text-xs font-bold text-[#78716C] uppercase">
            <span>Dominantes Muster</span>
            <span className="text-xl">{dominantArchetype.emoji}</span>
          </div>
          <div className="text-xl font-extrabold text-[#1E2433]">
            {dominantArchetype.germanName}
          </div>
          <p className="text-xs text-[#57534E]">
            {dominantArchetype.rhythmDescription}
          </p>
        </div>

        {/* Review State Card */}
        <div className="bg-white rounded-3xl border border-[#E5DCCF] p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#78716C] uppercase">
            <span>Freigabe-Status</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-[#1E2433]">
            {currentClientReviewState.status === 'approved' ? 'Freigegeben' : 'Prüfung offen'}
          </div>
          <p className="text-xs text-[#78716C]">
            {currentClientReviewState.status === 'approved'
              ? `Freigegeben durch ${currentClientReviewState.coachName || 'Coach'}`
              : 'Wartet auf Coach-Prüfung & Freigabe'}
          </p>
        </div>
      </div>

      {/* Review & Approval Console */}
      <div className="bg-white rounded-3xl border border-[#E5DCCF] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700 flex-shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#1E2433]">
              1. Individuelle Impulse auswählen & anpassen
            </h2>
            <p className="text-xs text-[#78716C]">
              Wähle aus, welche Impulse für diesen Klienten in der App freigeschaltet werden:
            </p>
          </div>
        </div>

        {/* Recommendations Checklist */}
        <div className="space-y-2.5">
          {defaultRecs.map((rec, index) => {
            const isChecked = selectedRecs.includes(rec);

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleToggleRec(rec)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                  isChecked
                    ? 'bg-amber-50/80 border-amber-300 ring-1 ring-amber-400'
                    : 'bg-[#FAF7F2] border-[#E5DCCF] opacity-60'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs flex-shrink-0 mt-0.5 ${
                    isChecked ? 'bg-amber-600 text-white' : 'bg-white border border-stone-300'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-amber-950 block">Impuls #{index + 1}</span>
                  <span className="text-xs sm:text-sm text-[#1E2433]">{rec}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Step 2: Select Approved Missions */}
        <div className="pt-4 border-t border-[#E5DCCF] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-700 flex-shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#1E2433]">
                2. Alltags-Experimente (Missions) freischalten
              </h2>
              <p className="text-xs text-[#78716C]">
                Aktiviere gezielte Micro-Habits, die der Klient in Woche 2 ausprobieren darf:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availableMissions.slice(0, 4).map((mission) => {
              const isSelected = selectedMissionIds.includes(mission.id);

              return (
                <button
                  key={mission.id}
                  type="button"
                  onClick={() => handleToggleMission(mission.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-violet-50/90 border-violet-400 ring-2 ring-violet-300/60 shadow-sm'
                      : 'bg-[#FAF7F2] border-[#E5DCCF] opacity-70'
                  }`}
                >
                  <span className="text-2xl" role="img" aria-hidden="true">{mission.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs sm:text-sm text-[#1E2433] truncate">
                        {mission.title}
                      </h4>
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center text-white text-[10px] ${
                          isSelected ? 'bg-violet-600' : 'border border-stone-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-xs text-[#78716C] mt-1 line-clamp-2">
                      {mission.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Coach Personal Note */}
        <div className="pt-4 border-t border-[#E5DCCF] space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-[#1E2433]">
            <MessageSquare className="w-4 h-4 text-orange-600" />
            <span>3. Persönliches Coach-Feedback an den Klienten</span>
          </div>

          <textarea
            rows={4}
            value={coachNotes}
            onChange={(e) => setCoachNotes(e.target.value)}
            placeholder="Schreibe ein motivierendes, wertfreies Feedback zur 7-Tage-Analyse..."
            className="w-full p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DCCF] text-xs sm:text-sm text-[#1E2433] focus:outline-none focus:ring-2 focus:ring-orange-500 leading-relaxed"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-[#E5DCCF] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={onResetClientReview}
            className="px-4 py-2.5 rounded-2xl bg-[#FAF7F2] hover:bg-stone-200 text-stone-700 font-bold text-xs border border-stone-300 transition-all"
          >
            Freigabe zurücksetzen
          </button>

          <button
            type="button"
            onClick={handleApprove}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01]"
          >
            <Send className="w-4 h-4" />
            <span>Vorschläge jetzt freigeben & an Klient übermitteln</span>
          </button>
        </div>
      </div>
    </div>
  );
};
