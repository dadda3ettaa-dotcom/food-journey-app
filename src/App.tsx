import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  DayJourneyState,
  DayHistoryEntry,
  JourneyMode,
  Mission,
  Moment,
  MomentDetail,
  OnboardingData,
  ReportResult,
  BonusQuestionAnswer
} from './types';
import { MOMENTS } from './data/momentsData';
import { Navigation, NavTab } from './components/Navigation';
import { TodayHome } from './components/TodayHome';
import { JourneyTimeline } from './components/JourneyTimeline';
import { MomentCard } from './components/MomentCard';
import { BonusQuestionCard } from './components/BonusQuestionCard';
import { ReportScreen } from './components/ReportScreen';
import { HistoryCalendar } from './components/HistoryCalendar';
import { InsightsDashboard } from './components/InsightsDashboard';
import { ProfileView } from './components/ProfileView';
import { DeepReflectionModal } from './components/DeepReflectionModal';
import { AdaptiveQuestionCard } from './components/AdaptiveQuestionCard';
import { OnboardingModal } from './components/OnboardingModal';
import { CoachDashboard } from './components/CoachDashboard';
import {
  loadTodayJourney,
  saveTodayJourney,
  loadHistory,
  saveHistory,
  saveDayToHistory,
  loadOnboarding,
  saveOnboarding,
  loadMissions,
  saveMissions,
  loadSoundEnabled,
  saveSoundEnabled,
  loadCoachReviewState,
  saveCoachReviewState,
  clearAllAppData,
  getTodayDateStr,
  formatGermanDate
} from './utils/storage';
import { CoachReviewState } from './types';
import { calculateReport, determineColorStatus } from './utils/scoring';
import { selectDynamicBonusQuestion } from './data/bonusQuestionsData';
import { generateSampleHistory, generateAnnaExampleDay } from './utils/sampleData';
import { setAudioEnabled } from './utils/audio';
import { BookGuideModal } from './components/BookGuideModal';
import { AuthModal } from './components/AuthModal';
import { auth, logout, saveUserDataToCloud, loadUserDataFromCloud, saveUserProfile } from './lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('heute');
  const [todayState, setTodayState] = useState<DayJourneyState>(loadTodayJourney);
  const [history, setHistory] = useState<DayHistoryEntry[]>(loadHistory);
  const [missions, setMissions] = useState<Mission[]>(loadMissions);
  const [onboarding, setOnboarding] = useState<OnboardingData>(loadOnboarding);
  const [soundEnabled, setSoundState] = useState<boolean>(loadSoundEnabled);
  const [coachReviewState, setCoachReviewState] = useState<CoachReviewState>(loadCoachReviewState);
  const [isCoachViewOpen, setIsCoachViewOpen] = useState<boolean>(false);

  // Firebase Auth State
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const [deepReflectionMoment, setDeepReflectionMoment] = useState<Moment | null>(null);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(!onboarding.completed);
  const [showAdaptiveQuestion, setShowAdaptiveQuestion] = useState<boolean>(false);
  const [viewingReport, setViewingReport] = useState<boolean>(false);
  const [showBookGuide, setShowBookGuide] = useState<boolean>(false);
  const [inBonusStep, setInBonusStep] = useState<boolean>(false);

  // Firebase Auth State Listener & Cloud Sync on Login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setIsSyncing(true);
        try {
          await saveUserProfile(user);
          const cloudData = await loadUserDataFromCloud(user.uid);
          if (cloudData) {
            if (cloudData.history && cloudData.history.length > 0) {
              setHistory(cloudData.history);
              saveHistory(cloudData.history);
            } else if (history.length > 0) {
              // Local has data, sync up to cloud
              await saveUserDataToCloud(user.uid, { history });
            }

            if (cloudData.onboarding && cloudData.onboarding.completed) {
              setOnboarding(cloudData.onboarding);
              saveOnboarding(cloudData.onboarding);
            } else if (onboarding.completed) {
              await saveUserDataToCloud(user.uid, { onboarding });
            }

            if (cloudData.todayState && Object.keys(cloudData.todayState.answers || {}).length > 0) {
              setTodayState(cloudData.todayState);
              saveTodayJourney(cloudData.todayState);
            }

            if (cloudData.missions && cloudData.missions.length > 0) {
              setMissions(cloudData.missions);
              saveMissions(cloudData.missions);
            }

            if (cloudData.coachReviewState) {
              setCoachReviewState(cloudData.coachReviewState);
              saveCoachReviewState(cloudData.coachReviewState);
            }
          } else {
            // Initial upload of local state
            await saveUserDataToCloud(user.uid, {
              onboarding,
              todayState,
              history,
              missions,
              coachReviewState
            });
          }
        } catch (err) {
          console.error('Error during cloud data sync:', err);
        } finally {
          setIsSyncing(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Manual trigger to sync cloud data
  const handleSyncCloudNow = useCallback(async () => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    setIsSyncing(true);
    try {
      await saveUserDataToCloud(currentUser.uid, {
        onboarding,
        todayState,
        history,
        missions
      });
    } catch (err) {
      console.error('Manual sync failed:', err);
    } finally {
      setIsSyncing(false);
    }
  }, [currentUser, onboarding, todayState, history, missions]);

  // Sync audio enabled
  useEffect(() => {
    setAudioEnabled(soundEnabled);
  }, [soundEnabled]);

  // Save changes to today's state & sync to cloud
  useEffect(() => {
    saveTodayJourney(todayState);
    if (currentUser) {
      saveUserDataToCloud(currentUser.uid, { todayState }).catch(console.error);
    }
  }, [todayState, currentUser]);

  // Determine active moments based on mode
  const activeMoments = useMemo<Moment[]>(() => {
    if (todayState.mode === 'express') {
      return MOMENTS.filter((m) => m.isExpress);
    }
    return MOMENTS;
  }, [todayState.mode]);

  const currentMoment = activeMoments[todayState.currentStepIndex] || activeMoments[0];
  const isFirstStep = todayState.currentStepIndex === 0;
  const isLastStep = todayState.currentStepIndex === activeMoments.length - 1;

  const effectiveWakeTime = todayState.wakeTime || onboarding.defaultWakeTime || '07:00';
  const effectiveBedTime = todayState.bedTime || onboarding.defaultBedTime || '23:00';

  // Calculate streak
  const streakDays = useMemo(() => {
    return history.length + (todayState.isFinished ? 1 : 0);
  }, [history, todayState.isFinished]);

  // Check if adaptive question should appear (if afternoon snack observed multiple times)
  useEffect(() => {
    if (todayState.currentStepIndex === 1 && !todayState.adaptiveAnswer && history.length >= 2) {
      const snackPastDays = history.filter((h) => h.answers[5] === 'm5_opt2').length;
      if (snackPastDays >= 1) {
        setShowAdaptiveQuestion(true);
      }
    }
  }, [todayState.currentStepIndex, todayState.adaptiveAnswer, history]);

  // Report calculation for today
  const todayReport = useMemo<ReportResult>(() => {
    return calculateReport(
      todayState.answers,
      todayState.momentDetails,
      history.length + 1,
      effectiveWakeTime,
      effectiveBedTime,
      todayState.bonusAnswer,
      onboarding.age,
      onboarding.gender
    );
  }, [todayState.answers, todayState.momentDetails, history.length, effectiveWakeTime, effectiveBedTime, todayState.bonusAnswer, onboarding.age, onboarding.gender]);

  // Selected dynamic bonus question based on user profile and primary archetype
  const dynamicBonusQuestion = useMemo(() => {
    return selectDynamicBonusQuestion({
      primaryArchetype: todayReport.primary.id,
      age: onboarding.age || 28,
      gender: onboarding.gender || 'unspecified',
      wakeTime: effectiveWakeTime,
      bedTime: effectiveBedTime,
      cycleAwareness: onboarding.cycleAwareness || false
    });
  }, [todayReport.primary.id, onboarding.age, onboarding.gender, effectiveWakeTime, effectiveBedTime, onboarding.cycleAwareness]);

  // Handle selecting an option on current moment
  const handleSelectOption = useCallback((optionId: string) => {
    setTodayState((prev) => {
      const updatedAnswers = {
        ...prev.answers,
        [currentMoment.id]: optionId
      };
      const answeredCount = Object.keys(updatedAnswers).length;
      const xpEarned = answeredCount * 10;

      return {
        ...prev,
        answers: updatedAnswers,
        xp: xpEarned
      };
    });
  }, [currentMoment.id]);

  // Finish journey and persist to history
  const finishJourney = useCallback((customBonusAnswer?: BonusQuestionAnswer) => {
    const finalBonusAnswer = customBonusAnswer || todayState.bonusAnswer;
    const finalReport = calculateReport(
      todayState.answers,
      todayState.momentDetails,
      history.length + 1,
      effectiveWakeTime,
      effectiveBedTime,
      finalBonusAnswer,
      onboarding.age,
      onboarding.gender
    );
    const colorStatus = determineColorStatus(todayState.answers);
    const dateStr = todayState.activeDateStr || getTodayDateStr();

    const historyEntry: DayHistoryEntry = {
      id: dateStr,
      dateFormatted: formatGermanDate(dateStr),
      dayOfWeek: new Date().toLocaleDateString('de-DE', { weekday: 'short' }),
      mode: todayState.mode,
      answers: todayState.answers,
      momentDetails: todayState.momentDetails,
      xp: (activeMoments.length + (finalBonusAnswer ? 1 : 0)) * 10,
      isFinished: true,
      primaryArchetypeId: finalReport.primary.id,
      secondaryArchetypeId: finalReport.secondary?.id,
      colorStatus,
      summaryObservation: finalReport.observations[0] || 'Ausgeglichener Tag.',
      missionsCompleted: missions.filter((m) => m.status === 'done').map((m) => m.id),
      report: finalReport
    };

    const updatedHistory = saveDayToHistory(historyEntry);
    setHistory(updatedHistory);

    const nextTodayState: DayJourneyState = {
      ...todayState,
      isFinished: true,
      xp: (activeMoments.length + (finalBonusAnswer ? 1 : 0)) * 10,
      wakeTime: effectiveWakeTime,
      bedTime: effectiveBedTime,
      bonusAnswer: finalBonusAnswer
    };
    setTodayState(nextTodayState);

    if (currentUser) {
      saveUserDataToCloud(currentUser.uid, {
        history: updatedHistory,
        todayState: nextTodayState
      }).catch(console.error);
    }

    setInBonusStep(false);
    setViewingReport(true);
  }, [todayState, history.length, activeMoments.length, missions, effectiveWakeTime, effectiveBedTime, onboarding.age, onboarding.gender, currentUser]);

  // Advance to next step or transition to dynamic bonus question
  const handleNextStep = useCallback(() => {
    if (isLastStep) {
      setInBonusStep(true);
    } else {
      setTodayState((prev) => ({
        ...prev,
        currentStepIndex: Math.min(prev.currentStepIndex + 1, activeMoments.length - 1)
      }));
    }
  }, [isLastStep, activeMoments.length]);

  // Go to previous step
  const handlePrevStep = useCallback(() => {
    setTodayState((prev) => ({
      ...prev,
      currentStepIndex: Math.max(prev.currentStepIndex - 1, 0)
    }));
  }, []);

  // Jump to specific step index
  const handleSelectStep = useCallback((index: number) => {
    setInBonusStep(false);
    setTodayState((prev) => ({
      ...prev,
      currentStepIndex: index
    }));
  }, []);

  // Mode change
  const handleChangeMode = (mode: JourneyMode) => {
    setInBonusStep(false);
    setTodayState((prev) => ({
      ...prev,
      mode,
      currentStepIndex: 0
    }));
  };

  // Deep reflection save
  const handleSaveDeepReflection = (detail: MomentDetail) => {
    if (deepReflectionMoment) {
      setTodayState((prev) => ({
        ...prev,
        momentDetails: {
          ...prev.momentDetails,
          [deepReflectionMoment.id]: detail
        }
      }));
    }
  };

  // Mission status update
  const handleUpdateMissionStatus = (missionId: string, status: Mission['status']) => {
    const updated = missions.map((m) => (m.id === missionId ? { ...m, status } : m));
    setMissions(updated);
    saveMissions(updated);
    if (currentUser) {
      saveUserDataToCloud(currentUser.uid, { missions: updated }).catch(console.error);
    }
  };

  const handleToggleMissionDone = (missionId: string) => {
    const mission = missions.find((m) => m.id === missionId);
    if (mission) {
      const nextStatus = mission.status === 'done' ? 'try' : 'done';
      handleUpdateMissionStatus(missionId, nextStatus);
    }
  };

  // Sound toggle
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundState(next);
    saveSoundEnabled(next);
  };

  // Load sample data for multi-day testing
  const handleLoadSampleData = () => {
    const sampleHistory = generateSampleHistory();
    setHistory(sampleHistory);
    saveHistory(sampleHistory);
    if (currentUser) {
      saveUserDataToCloud(currentUser.uid, { history: sampleHistory }).catch(console.error);
    }
  };

  // Load Anna's example day (Chapter 28 of the book)
  const handleLoadAnnaExampleDay = () => {
    const annaData = generateAnnaExampleDay();
    const updatedState: DayJourneyState = {
      ...todayState,
      mode: 'standard',
      currentStepIndex: 0,
      answers: annaData.answers,
      momentDetails: annaData.momentDetails,
      notes: annaData.notes,
      isFinished: true,
      xp: 100,
      wakeTime: '06:45',
      bedTime: '23:15'
    };
    setTodayState(updatedState);
    saveTodayJourney(updatedState);
    if (currentUser) {
      saveUserDataToCloud(currentUser.uid, { todayState: updatedState }).catch(console.error);
    }
    setInBonusStep(false);
    setViewingReport(true);
  };

  // Clear all data
  const handleClearAllData = () => {
    clearAllAppData();
    window.location.reload();
  };

  // Coach Review Handlers (7-Day Gate & Approval Flow)
  const handleSubmitReportToCoach = useCallback(() => {
    const updatedReview: CoachReviewState = {
      ...coachReviewState,
      status: 'submitted',
      submittedAt: new Date().toISOString()
    };
    setCoachReviewState(updatedReview);
    saveCoachReviewState(updatedReview);
    if (currentUser) {
      saveUserDataToCloud(currentUser.uid, { coachReviewState: updatedReview }).catch(console.error);
    }
  }, [coachReviewState, currentUser]);

  const handleApproveClientReview = useCallback((params: {
    approvedMissions: string[];
    approvedRecommendations: string[];
    coachNotes: string;
  }) => {
    const updatedReview: CoachReviewState = {
      ...coachReviewState,
      status: 'approved',
      approvedAt: new Date().toISOString(),
      coachNotes: params.coachNotes,
      approvedMissionIds: params.approvedMissions,
      approvedRecommendations: params.approvedRecommendations
    };
    setCoachReviewState(updatedReview);
    saveCoachReviewState(updatedReview);

    // Activate the approved missions in the user's mission list
    if (params.approvedMissions.length > 0) {
      const updatedMissions = missions.map((m) =>
        params.approvedMissions.includes(m.id) ? { ...m, status: 'try' as const } : m
      );
      setMissions(updatedMissions);
      saveMissions(updatedMissions);
      if (currentUser) {
        saveUserDataToCloud(currentUser.uid, { missions: updatedMissions, coachReviewState: updatedReview }).catch(console.error);
        return;
      }
    }

    if (currentUser) {
      saveUserDataToCloud(currentUser.uid, { coachReviewState: updatedReview }).catch(console.error);
    }
  }, [coachReviewState, missions, currentUser]);

  const handleResetClientReview = useCallback(() => {
    const resetReview: CoachReviewState = {
      status: 'collecting',
      coachName: 'Coach Martin (Senior Food Journey Mentor)',
      coachNotes: '',
      approvedMissionIds: [],
      approvedRecommendations: []
    };
    setCoachReviewState(resetReview);
    saveCoachReviewState(resetReview);
    if (currentUser) {
      saveUserDataToCloud(currentUser.uid, { coachReviewState: resetReview }).catch(console.error);
    }
  }, [currentUser]);

  // Onboarding completion
  const handleCompleteOnboarding = (data: OnboardingData) => {
    setOnboarding(data);
    saveOnboarding(data);
    setShowOnboarding(false);
    handleChangeMode(data.preferredMode);
    if (currentUser) {
      saveUserDataToCloud(currentUser.uid, { onboarding: data }).catch(console.error);
    }
  };

  const handleUpdateOnboarding = (partial: Partial<OnboardingData>) => {
    const updated: OnboardingData = {
      ...onboarding,
      ...partial
    };
    setOnboarding(updated);
    saveOnboarding(updated);
    if (currentUser) {
      saveUserDataToCloud(currentUser.uid, { onboarding: updated }).catch(console.error);
    }
  };

  // Active mission for the home screen
  const activeMission = missions.find((m) => m.status === 'try' || m.status === 'done') || missions[0];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-stone-900 flex flex-col font-sans selection:bg-rose-200">
      {/* Navigation */}
      <Navigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setIsCoachViewOpen(false);
          setViewingReport(false);
          setInBonusStep(false);
          setActiveTab(tab);
        }}
        xp={todayState.xp}
        streakDays={streakDays}
        journeyInProgress={Object.keys(todayState.answers).length > 0 && !todayState.isFinished}
        onOpenBookGuide={() => setShowBookGuide(true)}
        currentUser={currentUser}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenCoachView={() => setIsCoachViewOpen((prev) => !prev)}
        isCoachViewOpen={isCoachViewOpen}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 mb-16 md:mb-6">
        {/* COACH DASHBOARD VIEW */}
        {isCoachViewOpen ? (
          <CoachDashboard
            currentUser={currentUser}
            onboardingData={onboarding}
            todayState={todayState}
            history={history}
            missions={missions}
            coachReviewState={coachReviewState}
            onApproveReview={handleApproveClientReview}
            onResetReview={handleResetClientReview}
            onClose={() => setIsCoachViewOpen(false)}
          />
        ) : (
          <>
            {/* Tab 1: HEUTE */}
            {activeTab === 'heute' && !viewingReport && (
              <TodayHome
                todayState={todayState}
                activeMoments={activeMoments}
                streakDays={streakDays}
                activeMission={activeMission}
                onStartOrContinueJourney={() => setActiveTab('reise')}
                onViewReport={() => setViewingReport(true)}
                onChangeMode={handleChangeMode}
                onNavigateToTab={setActiveTab}
                onToggleMissionDone={handleToggleMissionDone}
                onOpenBookGuide={() => setShowBookGuide(true)}
              />
            )}

            {/* Tab 2: REISE / JOURNEY */}
            {activeTab === 'reise' && !viewingReport && (
              <div className="w-full max-w-2xl mx-auto space-y-4 animate-fade-in">
                {/* Timeline */}
                <JourneyTimeline
                  moments={activeMoments}
                  currentIndex={inBonusStep ? activeMoments.length - 1 : todayState.currentStepIndex}
                  answers={todayState.answers}
                  onSelectStep={handleSelectStep}
                />

                {/* Optional Adaptive Question Card */}
                {!inBonusStep && showAdaptiveQuestion && (
                  <AdaptiveQuestionCard
                    onSelectAnswer={(ans) => {
                      setTodayState((prev) => ({ ...prev, adaptiveAnswer: ans }));
                      setShowAdaptiveQuestion(false);
                    }}
                    onSkip={() => setShowAdaptiveQuestion(false)}
                  />
                )}

                {/* Step Content: Either Bonus Question or Regular Moment Card */}
                {inBonusStep ? (
                  <BonusQuestionCard
                    question={dynamicBonusQuestion}
                    selectedOptionId={todayState.bonusAnswer?.selectedOptionId}
                    onSelectOption={(optionId) => {
                      const opt = dynamicBonusQuestion.options.find((o) => o.id === optionId);
                      if (opt) {
                        const ans: BonusQuestionAnswer = {
                          questionId: dynamicBonusQuestion.id,
                          questionTitle: dynamicBonusQuestion.title,
                          dimensionBadge: dynamicBonusQuestion.dimensionBadge,
                          selectedOptionId: opt.id,
                          selectedOption: opt.text,
                          selectedOptionEmoji: opt.emoji,
                          insight: opt.insight
                        };
                        setTodayState((prev) => ({
                          ...prev,
                          bonusQuestionId: dynamicBonusQuestion.id,
                          bonusAnswer: ans
                        }));
                      }
                    }}
                    onComplete={() => finishJourney()}
                    onPrev={() => setInBonusStep(false)}
                    onSkip={() => finishJourney()}
                  />
                ) : (
                  <MomentCard
                    moment={currentMoment}
                    currentIndex={todayState.currentStepIndex}
                    totalMoments={activeMoments.length}
                    selectedOptionId={todayState.answers[currentMoment.id]}
                    momentDetail={todayState.momentDetails[currentMoment.id]}
                    actualWakeTime={effectiveWakeTime}
                    actualBedTime={effectiveBedTime}
                    onUpdateWakeTime={(time) => setTodayState((prev) => ({ ...prev, wakeTime: time }))}
                    onUpdateBedTime={(time) => setTodayState((prev) => ({ ...prev, bedTime: time }))}
                    onSelectOption={handleSelectOption}
                    onOpenDeepReflection={() => setDeepReflectionMoment(currentMoment)}
                    onSaveSpontaneousAnswer={(answer) => {
                      setTodayState((prev) => ({
                        ...prev,
                        momentDetails: {
                          ...prev.momentDetails,
                          [currentMoment.id]: {
                            ...prev.momentDetails[currentMoment.id],
                            note: prev.momentDetails[currentMoment.id]?.note
                              ? `${prev.momentDetails[currentMoment.id]?.note} | KI: ${answer}`
                              : `KI-Reflexion: ${answer}`
                          }
                        }
                      }));
                    }}
                    onNext={handleNextStep}
                    onPrev={handlePrevStep}
                    isFirst={isFirstStep}
                    isLast={isLastStep}
                  />
                )}
              </div>
            )}


            {/* Viewing Finished Report */}
            {viewingReport && (
              <ReportScreen
                report={todayReport}
                answers={todayState.answers}
                momentDetails={todayState.momentDetails}
                onBackToHome={() => {
                  setViewingReport(false);
                  setActiveTab('heute');
                }}
                onViewHistory={() => {
                  setViewingReport(false);
                  setActiveTab('verlauf');
                }}
                onRestartJourney={() => {
                  setViewingReport(false);
                  setInBonusStep(false);
                  setActiveTab('reise');
                }}
                observedDaysCount={history.length + 1}
                coachReviewState={coachReviewState}
                onSubmitReportToCoach={handleSubmitReportToCoach}
                onOpenCoachView={() => {
                  setViewingReport(false);
                  setIsCoachViewOpen(true);
                }}
              />
            )}

            {/* Tab 3: VERLAUF / HISTORY */}
            {activeTab === 'verlauf' && !viewingReport && (
              <HistoryCalendar
                history={history}
                onLoadSampleData={handleLoadSampleData}
              />
            )}

            {/* Tab 4: INSIGHTS */}
            {activeTab === 'insights' && !viewingReport && (
              <InsightsDashboard
                history={history}
                onLoadSampleData={handleLoadSampleData}
              />
            )}

            {/* Tab 5: PROFIL */}
            {activeTab === 'profil' && !viewingReport && (
              <ProfileView
                preferredMode={onboarding.preferredMode || todayState.mode}
                onChangePreferredMode={(mode) => {
                  handleChangeMode(mode);
                  handleUpdateOnboarding({ preferredMode: mode });
                }}
                onboardingData={onboarding}
                onUpdateOnboardingData={handleUpdateOnboarding}
                missions={missions}
                onUpdateMissionStatus={handleUpdateMissionStatus}
                soundEnabled={soundEnabled}
                onToggleSound={handleToggleSound}
                onRestartOnboarding={() => setShowOnboarding(true)}
                onLoadSampleData={handleLoadSampleData}
                onClearAllData={handleClearAllData}
                history={history}
                todayState={todayState}
                onOpenBookGuide={() => setShowBookGuide(true)}
                currentUser={currentUser}
                onOpenAuth={() => setShowAuthModal(true)}
                onLogout={async () => {
                  await logout();
                  setCurrentUser(null);
                }}
                onSyncCloudNow={handleSyncCloudNow}
                isSyncing={isSyncing}
              />
            )}
          </>
        )}
      </main>

      {/* Auth Modal for Google & Email Login */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          setShowAuthModal(false);
        }}
      />

      {/* Book & Principles Guide Modal */}
      {showBookGuide && (
        <BookGuideModal
          onClose={() => setShowBookGuide(false)}
          onLoadAnnaExampleDay={handleLoadAnnaExampleDay}
          observedDaysCount={streakDays}
        />
      )}

      {/* Deep Reflection Modal */}
      {deepReflectionMoment && (
        <DeepReflectionModal
          moment={deepReflectionMoment}
          initialDetail={todayState.momentDetails[deepReflectionMoment.id]}
          onSave={handleSaveDeepReflection}
          onClose={() => setDeepReflectionMoment(null)}
        />
      )}

      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingModal
          initialData={onboarding}
          onComplete={handleCompleteOnboarding}
          onSkip={() => setShowOnboarding(false)}
        />
      )}
    </div>
  );
}

export default App;

