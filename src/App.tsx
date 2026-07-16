import { isParentRole, isAdmin } from './utils/roleHelpers';
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useGameState } from './hooks/useGameState';
import { TopHUD } from './components/TopHUD';
import { supabase } from './utils/supabaseClient';
import type { Session, AuthChangeEvent } from '@supabase/supabase-js';
import { useSect } from './contexts/SectContext';
import { PetStableOverlay } from './components/PetStableOverlay';
import { LevelUpCelebration } from './components/LevelUpCelebration';
import { PlayArea } from './components/PlayArea';
import { TutorConsole } from './components/TutorConsole';
import { GoogleLoginScreen } from './components/GoogleLoginScreen';
import { ProfileSelectionScreen } from './components/ProfileSelectionScreen';
import { GlobalSectModal } from './components/GlobalSectModal';
import { LogoutConfirmModal } from './components/Common/LogoutConfirmModal';
import { getSubjectToolIds } from './subject-modules/registry';
import { recordMissionEvent } from './services/missionLedgerService';
import { AcademyHub, type AcademyTabId } from './components/AcademyHub';
import { FullscreenModal } from './components/Common/FullscreenModal';

// Helper decorator to encapsulate Suspense for each lazy component individually, avoiding app-wide unmount loops
const withSuspense = <P extends object>(
  LazyComponent: React.ComponentType<P>,
  fallback: React.ReactNode = (
    <div className="flex-1 flex items-center justify-center min-h-[200px] py-10">
      <div className="text-center space-y-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-synth-cyan mx-auto"></div>
        <p className="font-orbitron text-[10px] text-synth-cyan tracking-widest uppercase animate-pulse">Đang nạp...</p>
      </div>
    </div>
  )
) => {
  return (props: P) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

const AcademyHandbook = withSuspense(lazy(() => import('./components/AcademyHandbook').then(m => ({ default: m.AcademyHandbook }))), null);
const SubjectWorkshopPage = withSuspense(lazy(() => import('./components/SubjectWorkshopPage').then(m => ({ default: m.SubjectWorkshopPage }))));
const LessonStudyView = withSuspense(lazy(() => import('./components/LessonStudyView').then(m => ({ default: m.LessonStudyView }))));
const GeometryApp = withSuspense(lazy(() => import('./miniapps/geometry').then(m => ({ default: m.GeometryApp }))));
const GraphHandbook = withSuspense(lazy(() => import('./components/GraphHandbook').then(m => ({ default: m.GraphHandbook }))));

const APP_VERSION = 'fd44bc2';
const APP_PUSH_TIME = 'Tue, 7 Jul 2026 12:05 ICT';

function App() {
  const currentUser = useGameState(state => state.currentUser);
  const checkDailyReset = useGameState(state => state.checkDailyReset);
  const tickEnergyRegen = useGameState(state => state.tickEnergyRegen);
  const initEventSubscriptions = useGameState(state => state.initEventSubscriptions);
  const spinWheel = useGameState(state => state.spinWheel);
  const helpPageId = useGameState(state => state.helpPageId);
  const closeHelp = useGameState(state => state.closeHelp);
  const uiTheme = useGameState(state => state.uiTheme);

  const { activeSectId, activeGradeTier } = useSect();
  const isSwitchingContext = useGameState(state => state.isSwitchingContext);
  const classLinks = useGameState(state => state.classLinks);

  // Screen routing state — only for transient full-screen overlays
  const [screen, setScreen] = useState<'academy' | 'play' | 'tutor' | 'workshop-3d' | 'workshop-plane' | 'workshop-graph' | 'lesson-study'>(
    () => {
      const saved = localStorage.getItem('cyber-app-screen') as any;
      // Migrate legacy screen values to new 'academy'
      const legacyScreens = ['map', 'arena', 'shop', 'pet', 'profile', 'practice', 'relax', 'logs'];
      if (legacyScreens.includes(saved)) return 'academy';
      return saved || 'academy';
    }
  );

  // Tab state for AcademyHub
  const [activeTab, setActiveTab] = useState<AcademyTabId>(
    () => {
      const saved = localStorage.getItem('cyber-app-tab') as AcademyTabId | null;
      if (saved && ['academy', 'knowledge', 'challenge', 'adventure', 'funzone'].includes(saved)) return saved;
      // Migrate legacy screen → tab
      const legacyScreen = localStorage.getItem('cyber-app-screen');
      const legacyMap: Record<string, AcademyTabId> = {
        map: 'academy', profile: 'academy', arena: 'challenge',
        practice: 'knowledge', relax: 'adventure', pet: 'funzone', shop: 'funzone'
      };
      return legacyMap[legacyScreen ?? ''] ?? 'academy';
    }
  );

  useEffect(() => {
    localStorage.setItem('cyber-app-screen', screen);
  }, [screen]);

  useEffect(() => {
    localStorage.setItem('cyber-app-tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    const mathOnlyScreens = new Set(['workshop-3d', 'workshop-plane', 'workshop-graph']);
    if (getSubjectToolIds(activeSectId).length === 0 && mathOnlyScreens.has(screen)) {
      setScreen('academy');
      setActiveTab('knowledge');
    }
  }, [activeSectId, screen]);

  // Đổi môn/lớp: dọn sạch state gắn với môn cũ (bài giảng đang mở, phòng đang làm)
  // để không render nhầm nội dung môn cũ sau khi chuyển.
  const learningContextRef = useRef(`${activeSectId}::${activeGradeTier}`);
  useEffect(() => {
    const contextKey = `${activeSectId}::${activeGradeTier}`;
    if (learningContextRef.current === contextKey) return;
    learningContextRef.current = contextKey;
    setSelectedLessonId(null);
    setBossId(undefined);
    setScreen(current => (current === 'lesson-study' || current === 'play') ? 'academy' : current);
  }, [activeSectId, activeGradeTier]);

  useEffect(() => {
    if (!currentUser?.id || currentUser.id.startsWith('mock-')) return;
    const activeLink = classLinks.find((link: any) => link.status === 'active');
    if (!activeLink) return;
    void recordMissionEvent({
      profileId: currentUser.id,
      idempotencyKey: `teacher-link:${activeLink.id}`,
      eventType: 'teacher_link_activated',
      gradeTier: activeGradeTier,
      subjectId: activeSectId,
      entityType: 'class-link',
      entityId: activeLink.id,
    });
  }, [activeGradeTier, activeSectId, currentUser?.id, classLinks]);

  useEffect(() => {
    if (screen !== 'workshop-3d' || !currentUser?.id) return;
    void recordMissionEvent({
      profileId: currentUser.id,
      idempotencyKey: 'feature-opened:math-3d-studio',
      eventType: 'feature_opened',
      gradeTier: activeGradeTier,
      subjectId: activeSectId,
      entityType: 'subject-tool',
      entityId: 'math-3d-studio',
      metadata: { featureKey: 'math-3d-studio' },
    });
  }, [activeGradeTier, activeSectId, currentUser?.id, screen]);

  useEffect(() => {
    const applyMissionProgress = (event: Event) => {
      const progress = (event as CustomEvent).detail?.progress;
      if (!progress) return;
      useGameState.setState(state => ({
        player: {
          ...state.player,
          level: progress.level ?? state.player.level,
          xp: progress.xp ?? state.player.xp,
          streak: progress.streak ?? state.player.streak,
          ruby: progress.ruby ?? state.player.ruby,
        },
      }));
    };
    window.addEventListener('mission-ledger-updated', applyMissionProgress);
    return () => window.removeEventListener('mission-ledger-updated', applyMissionProgress);
  }, []);
  const [playMode, setPlayMode] = useState<'grammar' | 'reading' | 'vocabulary' | 'pronunciation' | 'mixed' | 'revenge' | 'boss' | 'lesson' | 'survival'>('mixed');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const masterLesson = useGameState(state => state.masterLesson);
  const [bossId, setBossId] = useState<string | undefined>(undefined);
  const [_lessonBackTarget, setLessonBackTarget] = useState<'map' | 'practice' | 'academy'>('academy');
  const [authLoading, setAuthLoading] = useState(true);

  const logout = useGameState(state => state.logout);
  const sessionAccountId = useGameState(state => state.sessionAccountId);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutIntercept = () => {
    setShowLogoutConfirm(true);
  };

  // Auto-switch screen for admin/parent users on login
  useEffect(() => {
    if (currentUser) {
      if (isParentRole(currentUser.role) || isAdmin(currentUser.role)) {
        setScreen('tutor');
      } else if (currentUser.role === 'student') {
        setScreen('academy');
      }
    }
  }, [currentUser]);

  // Route protection
  useEffect(() => {
    if (!currentUser) return;
    const role = currentUser.role;
    if (isParentRole(role) || isAdmin(role)) {
      if (screen !== 'tutor') {
        setScreen('tutor');
      }
    } else if (role === 'student') {
      if (screen === 'tutor') {
        setScreen('academy');
      }
    }
  }, [screen, currentUser]);

  // Modal alert animations
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    title?: string;
    message: string;
    type: string;
    buttonText?: string;
    onConfirm?: () => void;
  } | null>(null);

  const navigateWithWarning = (targetScreen: typeof screen, targetTab?: AcademyTabId) => {
    if (screen === 'play') {
      setModalData({
        isOpen: true,
        type: 'warning',
        message: 'Nếu con không hoàn tất, vài hôm nữa khu vực này sẽ bị sương mù che phủ lại đấy!',
        buttonText: 'Vẫn thoát',
        onConfirm: () => {
          setScreen(targetScreen);
          if (targetTab) setActiveTab(targetTab);
        }
      });
    } else {
      setScreen(targetScreen);
      if (targetTab) setActiveTab(targetTab);
    }
  };

  // Initialize event subscriptions & daily checks on mount
  useEffect(() => {
    if (!currentUser) return;

    // Run daily resets
    checkDailyReset();
    // Hồi Năng Lượng ngay nếu đã cạn đủ resetHours trong lúc app đóng (SUB_SPEC_ENERGY §5).
    tickEnergyRegen();

    // Subscribe to Event Bus listeners
    const unsub = initEventSubscriptions();

    // Check reset every 5 minutes (đồng thời tick Năng Lượng để mở khóa đúng giờ hồi)
    const interval = setInterval(() => {
      checkDailyReset();
      tickEnergyRegen();
    }, 5 * 60 * 1000);

    return () => {
      unsub();
      clearInterval(interval);
    };
  }, [currentUser]);

  useEffect(() => {
    document.documentElement.dataset.theme = uiTheme;
    document.body.dataset.theme = uiTheme;
  }, [uiTheme]);

  // Listen for Supabase Auth state changes globally immediately on app mount
  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      // QUAN TRỌNG: không gọi lại các method supabase.auth.* (getSession/signOut...) TRỰC TIẾP
      // trong callback này — onAuthStateChange chạy trong lúc GoTrueClient đang giữ internal
      // lock, rõ nhất ở sự kiện INITIAL_SESSION (bắn ra ngay trong initialize() khi F5 lại trang
      // đã có session cũ). Gọi lại getSession()/signOut() lồng vào sẽ deadlock vô thời hạn —
      // treo mãi ở màn hình loading, không log/lỗi gì (đúng bug OOM-khi-refresh đã gặp).
      // Fix chính thức theo khuyến nghị của Supabase: defer ra khỏi lock bằng setTimeout(0).
      setTimeout(async () => {
        if (session && session.user) {
          const state = useGameState.getState();
          if (state.sessionAccountId !== session.user.id) {
            state.setSessionAccountId(session.user.id);
            // Clear currentUser to force profile selection when switching or logging in to a new account
            useGameState.setState({ currentUser: null });
            await state.fetchProfiles();

            // Auto-select saved profile if available
            const savedProfileId = localStorage.getItem('ge10_selected_profile_id');
            if (savedProfileId) {
              const profiles = useGameState.getState().availableProfiles;
              const hasProfile = profiles.some((p: any) => p.id === savedProfileId);
              if (hasProfile) {
                await state.selectProfile(savedProfileId);
              } else {
                localStorage.removeItem('ge10_selected_profile_id');
              }
            }
          }
        } else {
          const state = useGameState.getState();
          if (state.sessionAccountId && !state.sessionAccountId.startsWith('mock-')) {
            state.logout();
          }
        }

        if (mounted) {
          setAuthLoading(false);
        }
      }, 0);
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && mounted) {
        setAuthLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen synth-grid-bg bg-synth-bg flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-synth-cyan mx-auto"></div>
          <p className="font-orbitron text-xs text-synth-cyan font-bold tracking-widest uppercase animate-pulse">
            Welcome to Maikawaii academy...
          </p>
        </div>
      </div>
    );
  }

  if (!sessionAccountId) {
    return <GoogleLoginScreen />;
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen synth-grid-bg bg-synth-bg flex items-center justify-center relative overflow-hidden">
        <div className="text-center space-y-2 pointer-events-none select-none">
          <h1 className="font-orbitron text-5xl font-black bg-gradient-to-r from-synth-cyan to-synth-magenta bg-clip-text text-transparent tracking-widest uppercase animate-pulse">
            MIKAWAII
          </h1>
          <p className="font-orbitron text-[10px] text-synth-cyan tracking-widest uppercase opacity-40">
            SYSTEM CORE :: ONLINE
          </p>
        </div>
        <ProfileSelectionScreen />
      </div>
    );
  }

  const triggerSpinWheel = () => {
    const outcome = spinWheel();
    setModalData({
      isOpen: true,
      title: 'VÒNG QUAY MAY MẮN 🎡',
      message: outcome.message,
      type: 'wheel'
    });
  };

  const handleStartPlay = (
    mode: 'grammar' | 'reading' | 'vocabulary' | 'pronunciation' | 'mixed' | 'revenge' | 'boss' | 'lesson' | 'survival',
    id?: string,
    backTarget?: 'map' | 'arena' | 'practice'
  ) => {
    setPlayMode(mode);
    setLessonBackTarget(backTarget === 'arena' ? 'academy' : (backTarget ?? 'academy'));
    if (mode === 'lesson') {
      setSelectedLessonId(id || null);
      setBossId(undefined);
    } else {
      setBossId(id);
    }
    setScreen('play');
  };

  const handleStudyLessonFromMap = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setScreen('lesson-study');
  };

  const handleStartLessonPracticeFromMap = (lessonId: string) => {
    handleStartPlay('lesson', lessonId);
  };

  const isDungeonScreen = screen === 'play';

  // Key remount theo môn+lớp
  const learningContextKey = `${activeSectId}-${activeGradeTier}`;
  const isWorkshopScreen = screen === 'workshop-3d' || screen === 'workshop-plane' || screen === 'workshop-graph';
  // Map activeTab/screen → topHUD screen prop
  const topHudTabToScreen: Record<AcademyTabId, 'map' | 'arena' | 'practice' | 'shop' | 'pet' | 'profile'> = {
    academy: 'map', knowledge: 'practice', challenge: 'arena',
    adventure: 'map', funzone: 'shop'
  };
  const topHudScreen = (screen === 'play' || screen === 'lesson-study' || isWorkshopScreen) ? 'play'
    : screen === 'tutor' ? 'tutor'
      : topHudTabToScreen[activeTab] ?? 'map';

  return (
    <div className="app-shell min-h-screen flex flex-col text-slate-100" data-theme={uiTheme}>

      {/* Top Header HUD */}
      <TopHUD
        onOpenParent={() => navigateWithWarning('tutor')}
        onOpenShop={() => { navigateWithWarning('academy'); setActiveTab('funzone'); }}
        onOpenPet={() => { navigateWithWarning('academy'); setActiveTab('funzone'); }}
        onOpenProfile={() => navigateWithWarning('academy')}
        onBackToMap={() => navigateWithWarning('academy')}
        onLogout={handleLogoutIntercept}
        currentScreen={topHudScreen}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:py-8 flex flex-col gap-0 items-stretch pb-20 lg:pb-8">
        <section className="flex-1 min-w-0">

          {/* ── Tutor Console (admin/teacher) ── */}
          {screen === 'tutor' && <TutorConsole />}



          {/* ── Student Academy Hub (5-tab) ── */}
          {screen === 'academy' && currentUser?.role === 'student' && (
            <AcademyHub
              key={learningContextKey}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onStartPlay={handleStartPlay}
              onStudyLesson={handleStudyLessonFromMap}
              onStartLessonPractice={handleStartLessonPracticeFromMap}
              onSpinWheel={triggerSpinWheel}
              onOpenWorkshop3D={() => setScreen('workshop-3d')}
              onOpenWorkshopPlane={() => setScreen('workshop-plane')}
              onOpenWorkshopGraph={() => setScreen('workshop-graph')}
              learningContextKey={learningContextKey}
            />
          )}

        </section>
      </main>

      {/* ── Workshop Modals ── */}
      {/* ─── Play Area Modal ─── */}
      <FullscreenModal
        isOpen={screen === 'play'}
        onClose={() => { }}
        hideHeader={true}
        bodyClassName="p-0"
      >
        {screen === 'play' && (
          <PlayArea
            key={learningContextKey}
            mode={playMode}
            bossId={bossId}
            lessonId={selectedLessonId || undefined}
            onFinish={async (result) => {
              if (playMode === 'lesson' && selectedLessonId) {
                if (result.passed) {
                  await masterLesson(selectedLessonId, result.accuracyRatio);
                }
                setScreen('academy');
              } else {
                setScreen('academy');
              }
            }}
          />
        )}
      </FullscreenModal>

      {/* ─── Lesson Study View Modal ─── */}
      <FullscreenModal
        isOpen={screen === 'lesson-study'}
        onClose={() => setScreen('academy')}
        hideHeader={true}
        bodyClassName="p-0"
      >
        {screen === 'lesson-study' && selectedLessonId && (
          <LessonStudyView
            lessonId={selectedLessonId}
            onStartPractice={(lessonId) => handleStartPlay('lesson', lessonId)}
            onBack={() => setScreen('academy')}
          />
        )}
      </FullscreenModal>

      {/* ─── Workshop Modals ─── */}
      <FullscreenModal
        isOpen={isWorkshopScreen}
        onClose={() => setScreen('academy')}
        hideHeader={true}
        bodyClassName="p-0"
      >
        {isWorkshopScreen && (
          <div className="flex-1 flex flex-col h-full overflow-auto">
            {screen === 'workshop-3d' && (
              <SubjectWorkshopPage
                kind="3d"
                title="Xưởng Toán Hình 3D"
                subtitle="Không gian riêng cho hình học không gian lớp 9: dựng hình, xoay 360°, chọn góc nhìn và phân tích từng bước."
                onBack={() => setScreen('academy')}
                onSwitchTo3D={() => setScreen('workshop-3d')}
                onSwitchToPlane={() => setScreen('workshop-plane')}
                onSwitchToGraph={() => setScreen('workshop-graph')}
              >
                <GeometryApp mode="studio" dimension="3d" problemText="" />
              </SubjectWorkshopPage>
            )}
            {screen === 'workshop-plane' && (
              <SubjectWorkshopPage
                kind="plane"
                title="Xưởng Toán Hình"
                subtitle="Không gian riêng cho tam giác, tứ giác, đường tròn và các đường phụ."
                onBack={() => setScreen('academy')}
                onSwitchTo3D={() => setScreen('workshop-3d')}
                onSwitchToPlane={() => setScreen('workshop-plane')}
                onSwitchToGraph={() => setScreen('workshop-graph')}
              >
                <GeometryApp mode="studio" dimension="2d" problemText="" />
              </SubjectWorkshopPage>
            )}
            {screen === 'workshop-graph' && (
              <SubjectWorkshopPage
                kind="graph"
                title="Xưởng Toán Đồ Thị"
                subtitle="Không gian riêng cho bậc nhất và bậc hai, slider hệ số, giao điểm và đỉnh."
                onBack={() => setScreen('academy')}
                onSwitchTo3D={() => setScreen('workshop-3d')}
                onSwitchToPlane={() => setScreen('workshop-plane')}
                onSwitchToGraph={() => setScreen('workshop-graph')}
              >
                <GraphHandbook problemText="" />
              </SubjectWorkshopPage>
            )}
          </div>
        )}
      </FullscreenModal>


      {/* Reward/Notification Modal */}
      {modalData?.isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="glass-panel rounded-3xl border border-synth-magenta/40 p-6 max-w-sm w-full text-center space-y-4 shadow-[0_0_20px_rgba(255,0,127,0.4)] animate-in zoom-in duration-200">
            <div className="w-14 h-14 mx-auto rounded-full bg-synth-magenta/10 border border-synth-magenta/30 flex items-center justify-center text-3xl">
              {modalData.type === 'mystery' ? '🎁' : modalData.type === 'wheel' ? '🎡' : modalData.type === 'warning' ? '⚠️' : '🔔'}
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-semibold">
              {modalData.message}
            </p>

            <div className="flex gap-3 pt-2">
              {modalData.type === 'warning' && (
                <button
                  onClick={() => setModalData(null)}
                  className="flex-1 py-2.5 rounded-xl font-orbitron font-bold text-[10px] uppercase tracking-wider bg-slate-800 border border-slate-700 text-slate-300 cursor-pointer transition-all hover:bg-slate-700"
                >
                  Ở lại
                </button>
              )}
              <button
                onClick={() => {
                  if (modalData.onConfirm) modalData.onConfirm();
                  setModalData(null);
                }}
                className="flex-1 py-2.5 rounded-xl font-orbitron font-bold text-[10px] uppercase tracking-wider bg-gradient-to-r from-synth-purple to-synth-cyan text-black cursor-pointer transition-all hover:opacity-90"
              >
                {modalData.buttonText || 'Nhận Quà'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mọi "?" trong app đều mở thẳng trang tương ứng trong Cẩm Nang Học Đường — cốt lõi Cẩm Nang là help/guide (CORE_SPECS §2.7) */}
      {helpPageId && (
        <AcademyHandbook
          isOpen={true}
          initialPageId={helpPageId}
          onClose={closeHelp}
        />
      )}



      {/* Mobile Bottom Navigation Bar — 5 tabs (Chỉ hiển thị cho Học sinh) */}
      {currentUser && currentUser.role === 'student' && screen === 'academy' && (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-synth-bg/95 backdrop-blur-md border-t border-synth-cyan/20 px-2 py-2 pb-3 flex justify-around items-center z-50 shadow-[0_-4px_20px_rgba(0,240,255,0.15)]">
          {([
            { id: 'academy', icon: '🏫', label: 'Học Viện' },
            { id: 'knowledge', icon: '📚', label: 'Hang Luyện' },
            { id: 'challenge', icon: '⚔️', label: 'Thi' },
            { id: 'adventure', icon: '🧭', label: 'Thám Hiểm' },
            { id: 'funzone', icon: '🎮', label: 'Funzone' },
          ] as { id: AcademyTabId; icon: string; label: string }[]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[8px] uppercase tracking-wider transition-colors cursor-pointer ${activeTab === tab.id ? 'text-synth-cyan' : 'text-synth-text-muted hover:text-white'
                }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      )}

      {currentUser && currentUser.role === 'student' && (
        <>
          <PetStableOverlay isDungeonScreen={isDungeonScreen || isWorkshopScreen} />
          <LevelUpCelebration />
        </>
      )}

      {/* Bộ chọn và Màn chờ chuyển môn/lớp cho MỌI người dùng đã đăng nhập */}
      {currentUser && (
        <>
          <GlobalSectModal requireConfirm={screen === 'play' || screen === 'lesson-study'} />

          {/* Màn chờ chuyển môn/lớp — chặn thao tác đến khi ngữ cảnh mới nạp xong */}
          {isSwitchingContext && (
            <div className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-4 bg-black/70 backdrop-blur-sm">
              <span className="inline-block w-12 h-12 border-4 border-synth-cyan border-t-transparent rounded-full animate-spin" />
              <p className="font-orbitron font-bold text-sm text-synth-cyan uppercase tracking-wider">
                Đang chuyển ngữ cảnh học tập...
              </p>
              <p className="text-xs text-slate-400">Nạp lại bài giảng và ngân hàng đề theo môn/lớp mới</p>
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <footer className="py-6 border-t border-synth-gray/30 text-center space-y-2">
        <div className="text-[10px] text-synth-text-muted font-semibold tracking-wider uppercase font-orbitron">
          © 2026 MIKAWAII HỌC ĐƯỜNG. ALL RIGHTS RESERVED. RUNNING_LOCAL_LOCALFORAGE_INDEXEDDB.
        </div>
        <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase font-orbitron">
          Version {APP_VERSION} · Push {APP_PUSH_TIME}
        </div>
      </footer>

      <LogoutConfirmModal
        isOpen={showLogoutConfirm}
        onConfirm={logout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  );
}

export default App;
