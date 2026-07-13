import { isParentRole, isAdmin } from './utils/roleHelpers';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useGameState } from './hooks/useGameState';
import { TopHUD } from './components/TopHUD';
import { supabase } from './utils/supabaseClient';
import type { Session, AuthChangeEvent } from '@supabase/supabase-js';
import { useSect } from './contexts/SectContext';
import { PetStableOverlay } from './components/PetStableOverlay';
import { LevelUpCelebration } from './components/LevelUpCelebration';
import { WorldMap } from './components/WorldMap';
import { PlayArea } from './components/PlayArea';
import { ParentConsole } from './components/ParentConsole';
import { GoogleLoginScreen } from './components/GoogleLoginScreen';
import { GatekeeperModal } from './components/GatekeeperModal';
import { ProfileSelectionScreen } from './components/ProfileSelectionScreen';
import { GlobalSectModal } from './components/GlobalSectModal';
import { LogoutConfirmModal } from './components/Common/LogoutConfirmModal';
import { getSubjectToolIds } from './subject-modules/registry';

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

const PetSanctuary = withSuspense(lazy(() => import('./components/PetSanctuary').then(m => ({ default: m.PetSanctuary }))));
const Arena = withSuspense(lazy(() => import('./components/Arena').then(m => ({ default: m.Arena }))));
const ItemShop = withSuspense(lazy(() => import('./components/ItemShop').then(m => ({ default: m.ItemShop }))));
const ProfilePage = withSuspense(lazy(() => import('./components/ProfilePage').then(m => ({ default: m.ProfilePage }))));
const GiangHoCamNang = withSuspense(lazy(() => import('./components/GiangHoCamNang').then(m => ({ default: m.GiangHoCamNang }))), null);
const HangLuyenCong = withSuspense(lazy(() => import('./components/HangLuyenCong').then(m => ({ default: m.HangLuyenCong }))));
const HangMatThatPage = withSuspense(lazy(() => import('./components/HangMatThatPage').then(m => ({ default: m.HangMatThatPage }))));
const DesktopCentralNav = withSuspense(lazy(() => import('./components/DesktopCentralNav').then(m => ({ default: m.DesktopCentralNav }))), null);
const LessonStudyView = withSuspense(lazy(() => import('./components/LessonStudyView').then(m => ({ default: m.LessonStudyView }))));
const RelaxationZone = withSuspense(lazy(() => import('./components/RelaxationZone').then(m => ({ default: m.RelaxationZone }))));
const Biki3DStudio = withSuspense(lazy(() => import('./components/Biki3DStudio').then(m => ({ default: m.Biki3DStudio }))));
const BikiDoThiHamSo = withSuspense(lazy(() => import('./components/BikiDoThiHamSo').then(m => ({ default: m.BikiDoThiHamSo }))));
const BikiHinhHocPhang = withSuspense(lazy(() => import('./components/BikiHinhHocPhang').then(m => ({ default: m.BikiHinhHocPhang }))));

const APP_VERSION = 'fd44bc2';
const APP_PUSH_TIME = 'Tue, 7 Jul 2026 12:05 ICT';

function App() {
  const currentUser = useGameState(state => state.currentUser);
  const checkDailyReset = useGameState(state => state.checkDailyReset);
  const tickEnergyRegen = useGameState(state => state.tickEnergyRegen);
  const initEventSubscriptions = useGameState(state => state.initEventSubscriptions);
  const openMysteryBox = useGameState(state => state.openMysteryBox);
  const spinWheel = useGameState(state => state.spinWheel);
  const helpPageId = useGameState(state => state.helpPageId);
  const closeHelp = useGameState(state => state.closeHelp);
  const uiTheme = useGameState(state => state.uiTheme);
  const setUiTheme = useGameState(state => state.setUiTheme);
  
  const { activeSectId } = useSect();

  // Screen routing state
  const [screen, setScreen] = useState<'map' | 'arena' | 'play' | 'shop' | 'parent' | 'pet' | 'logs' | 'hang' | 'hang-3d' | 'hang-plane' | 'hang-graph' | 'lesson-study' | 'relax' | 'profile'>('map');

  useEffect(() => {
    const mathOnlyScreens = new Set(['hang-3d', 'hang-plane', 'hang-graph']);
    if (getSubjectToolIds(activeSectId).length === 0 && mathOnlyScreens.has(screen)) {
      setScreen('hang');
    }
  }, [activeSectId, screen]);
  const [playMode, setPlayMode] = useState<'grammar' | 'reading' | 'vocabulary' | 'pronunciation' | 'mixed' | 'revenge' | 'boss' | 'lesson' | 'survival'>('mixed');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const masterLesson = useGameState(state => state.masterLesson);
  const [bossId, setBossId] = useState<string | undefined>(undefined);
  // Track where to return after a lesson study (map or hang)
  const [lessonBackTarget, setLessonBackTarget] = useState<'map' | 'hang'>('hang');
  const [authLoading, setAuthLoading] = useState(true);

  const logout = useGameState(state => state.logout);
  const sessionAccountId = useGameState(state => state.sessionAccountId);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutIntercept = () => {
    setShowLogoutConfirm(true);
  };

  // Auto-switch screen for admin/parent users on login & show handbook on student login
  useEffect(() => {
    if (currentUser) {
      if (isParentRole(currentUser.role) || isAdmin(currentUser.role)) {
        setScreen('parent');
      } else if (currentUser.role === 'student') {
        setScreen('map');
      }
    }
  }, [currentUser]);

  // Route protection
  useEffect(() => {
    if (!currentUser) return;
    const role = currentUser.role;
    if (isParentRole(role) || isAdmin(role)) {
      if (screen !== 'parent') {
        setScreen('parent');
      }
    } else if (role === 'student') {
      if (screen === 'parent') {
        setScreen('map');
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

  const navigateWithWarning = (targetScreen: typeof screen) => {
    if (screen === 'play') {
      setModalData({
        isOpen: true,
        type: 'warning',
        message: 'Nếu con không hoàn tất, vài hôm nữa khu vực này sẽ bị sương mù che phủ lại đấy!',
        buttonText: 'Vẫn thoát',
        onConfirm: () => setScreen(targetScreen)
      });
    } else {
      setScreen(targetScreen);
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
            Đang tiến vào Thế Giới Học Tập...
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

  const triggerMysteryBox = () => {
    const outcome = openMysteryBox();
    setModalData({
      isOpen: true,
      title: 'HÒM BÍ MẬT 🎁',
      message: outcome.message,
      type: 'mystery'
    });
  };

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
    id?: string
  ) => {
    setPlayMode(mode);
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
    setLessonBackTarget('map');
    setScreen('lesson-study');
  };

  const handleStartLessonPracticeFromMap = (lessonId: string) => {
    setLessonBackTarget('map');
    handleStartPlay('lesson', lessonId);
  };

  const isDungeonScreen = screen === 'play';
  const isHangMatterScreen = screen === 'hang-3d' || screen === 'hang-plane' || screen === 'hang-graph';
  const topHudScreen = (isHangMatterScreen || screen === 'lesson-study') ? 'hang' : (screen === 'relax' ? 'map' : screen);

  return (
    <div className="app-shell min-h-screen flex flex-col text-slate-100" data-theme={uiTheme}>

      {/* Top Header HUD */}
      <TopHUD
        onOpenParent={() => navigateWithWarning('parent')}
        onOpenShop={() => navigateWithWarning('shop')}
        onOpenPet={() => navigateWithWarning('pet')}
        onOpenProfile={() => navigateWithWarning('profile')}
        onBackToMap={() => navigateWithWarning('map')}
        onLogout={handleLogoutIntercept}
        currentScreen={topHudScreen}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:py-8 flex flex-col lg:flex-row gap-6 items-stretch pb-20 lg:pb-8">
        
        {/* Dynamic Center Stage */}
        <section className="flex-1 min-w-0">
          
          {/* Desktop Central Navigation Hub - only on study screens */}
          {['arena', 'hang', 'relax'].includes(screen) && !isDungeonScreen && !isHangMatterScreen && !isAdmin(currentUser?.role) && (
            <DesktopCentralNav currentScreen={screen} onNavigate={(s) => setScreen(s)} />
          )}

          {screen === 'map' && (
            <WorldMap
              onOpenArena={() => setScreen('arena')}
              onOpenHang={() => setScreen('hang')}
              onOpenRelax={() => setScreen('relax')}
              onOpenShop={() => setScreen('shop')}
              onOpenPet={() => setScreen('pet')}
              onOpenMysteryBox={triggerMysteryBox}
              onSpinWheel={triggerSpinWheel}
              onStudyLesson={handleStudyLessonFromMap}
              onStartLessonPractice={handleStartLessonPracticeFromMap}
            />
          )}

          {screen === 'arena' && (
            <Arena
              onStartPlay={handleStartPlay}
              onStudyLesson={handleStudyLessonFromMap}
              onStartLessonPractice={handleStartLessonPracticeFromMap}
            />
          )}

          {screen === 'play' && (
            <PlayArea 
              mode={playMode}
              bossId={bossId}
              lessonId={selectedLessonId || undefined}
              onFinish={async (result) => {
                if (playMode === 'lesson' && selectedLessonId) {
                  // Only award mastery + fog unlock when the run actually passed
                  if (result.passed) {
                    await masterLesson(selectedLessonId, result.accuracyRatio);
                  }
                  setScreen('hang');
                } else {
                  setScreen('map');
                }
              }}
            />
          )}

          {screen === 'shop' && <ItemShop />}

          {screen === 'parent' && <ParentConsole />}

          {screen === 'hang' && (
            <HangLuyenCong
              onStartPractice={() => {
                closeHelp();
                // Find first uncompleted lesson of selected subject, or default to first
                const lessonsList = useGameState.getState().lessons;
                const progress = useGameState.getState().lessonsProgress;
                const gradeTier = useGameState.getState().activeGradeTier;
                const subLessons = lessonsList.filter(l =>
                  l.subject === activeSectId && (l.gradeTier ?? 9) === gradeTier
                );
                const uncompleted = subLessons.find(l => !progress[l.id]);
                const targetLesson = uncompleted || subLessons[0];
                if (targetLesson) {
                  setSelectedLessonId(targetLesson.id);
                  setScreen('lesson-study');
                } else {
                  handleStartPlay('mixed');
                }
              }}
              onStudyLesson={(lessonId) => {
                setSelectedLessonId(lessonId);
                setLessonBackTarget('hang');
                setScreen('lesson-study');
              }}
              onOpenMatThat3D={() => setScreen('hang-3d')}
              onOpenMatThatPlane={() => setScreen('hang-plane')}
              onOpenMatThatGraph={() => setScreen('hang-graph')}
              onStartLessonPractice={handleStartLessonPracticeFromMap}
            />
          )}

          {screen === 'lesson-study' && selectedLessonId && (
            <LessonStudyView
              lessonId={selectedLessonId}
              onStartPractice={(lessonId) => handleStartPlay('lesson', lessonId)}
              onBack={() => setScreen(lessonBackTarget)}
            />
          )}

          {screen === 'hang-3d' && (
            <HangMatThatPage
              kind="3d"
              title="Xưởng Toán Hình 3D"
              subtitle="Không gian riêng cho hình học không gian lớp 9: dựng hình, xoay 360°, chọn góc nhìn và phân tích từng bước mà không bị bó hẹp trong layout chung."
              onBack={() => setScreen('hang')}
              onSwitchTo3D={() => setScreen('hang-3d')}
              onSwitchToPlane={() => setScreen('hang-plane')}
              onSwitchToGraph={() => setScreen('hang-graph')}
            >
              <Biki3DStudio problemText="" />
            </HangMatThatPage>
          )}

          {screen === 'hang-plane' && (
            <HangMatThatPage
              kind="plane"
              title="Xưởng Toán Hình"
              subtitle="Không gian riêng cho tam giác, tứ giác, đường tròn và các đường phụ. Board rộng hơn để kéo thả, nối cạnh, dựng đường cao và đọc lời giải rõ ràng."
              onBack={() => setScreen('hang')}
              onSwitchTo3D={() => setScreen('hang-3d')}
              onSwitchToPlane={() => setScreen('hang-plane')}
              onSwitchToGraph={() => setScreen('hang-graph')}
            >
              <BikiHinhHocPhang problemText="" />
            </HangMatThatPage>
          )}

          {screen === 'hang-graph' && (
            <HangMatThatPage
              kind="graph"
              title="Xưởng Toán Đồ Thị"
              subtitle="Không gian riêng cho bậc nhất và bậc hai, slider hệ số, giao điểm, đỉnh và trục đối xứng. AI sẽ phân tích đề và điều khiển đồ thị theo lệnh."
              onBack={() => setScreen('hang')}
              onSwitchTo3D={() => setScreen('hang-3d')}
              onSwitchToPlane={() => setScreen('hang-plane')}
              onSwitchToGraph={() => setScreen('hang-graph')}
            >
              <BikiDoThiHamSo problemText="" />
            </HangMatThatPage>
          )}

          {screen === 'relax' && (
            <RelaxationZone onBack={() => setScreen('map')} />
          )}

          {screen === 'pet' && (
            <PetSanctuary variant="full" />
          )}

          {screen === 'profile' && currentUser && (
            <ProfilePage
              currentUser={currentUser}
              currentTheme={uiTheme}
              onSelectTheme={setUiTheme}
            />
          )}

        </section>
      </main>


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
        <GiangHoCamNang
          isOpen={true}
          initialPageId={helpPageId}
          onClose={closeHelp}
        />
      )}



      {/* Mobile Bottom Navigation Bar (Chỉ hiển thị cho Học sinh) */}
      {currentUser && currentUser.role === 'student' && screen !== 'play' && !isHangMatterScreen && (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-synth-bg/95 backdrop-blur-md border-t border-synth-cyan/20 px-3 py-2.5 pb-3 flex justify-around items-center z-50 shadow-[0_-4px_20px_rgba(0,240,255,0.15)]">
          <button
            onClick={() => setScreen('map')}
            className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer ${
              screen === 'map' ? 'text-synth-cyan' : 'text-synth-text-muted hover:text-white'
            }`}
          >
            <span className="text-lg">🗺️</span>
            <span>Bản đồ</span>
          </button>

          <button
            onClick={() => setScreen('shop')}
            className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer ${
              screen === 'shop' ? 'text-synth-cyan' : 'text-synth-text-muted hover:text-white'
            }`}
          >
            <span className="text-lg">🏮</span>
            <span>Bách Hóa</span>
          </button>

          <button
            onClick={() => setScreen('pet')}
            className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer ${
              screen === 'pet' ? 'text-synth-cyan' : 'text-synth-text-muted hover:text-white'
            }`}
          >
            <span className="text-lg">🐷</span>
            <span>Sân Thú</span>
          </button>

          <button
            onClick={() => setScreen('profile')}
            className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer ${
              screen === 'profile' ? 'text-synth-cyan' : 'text-synth-text-muted hover:text-white'
            }`}
          >
            <span className="text-lg">👑</span>
            <span>Học tịch</span>
          </button>
        </nav>
      )}

      {/* Các tính năng chỉ dành cho Học sinh */}
      {currentUser && currentUser.role === 'student' && (
        <>
          <PetStableOverlay isDungeonScreen={isDungeonScreen || isHangMatterScreen || screen === 'pet'} />
          <LevelUpCelebration />
          <GatekeeperModal />
          <GlobalSectModal />
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
