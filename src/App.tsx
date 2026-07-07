import { useState, useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import { TopHUD } from './components/TopHUD';
import { PetSanctuary } from './components/PetSanctuary';
import { ActivityLog } from './components/ActivityLog';
import { GameMap } from './components/GameMap';
import { PlayArea } from './components/PlayArea';
import { ItemShop } from './components/ItemShop';
import { ParentConsole } from './components/ParentConsole';
import { GoogleLoginScreen } from './components/GoogleLoginScreen';
import { ProfileThemeModal } from './components/ProfileThemeModal';
import { HangLuyenCong } from './components/HangLuyenCong';
import { HangMatThatPage } from './components/HangMatThatPage';
import { LessonStudyView } from './components/LessonStudyView';
import { RelaxationZone } from './components/RelaxationZone';
import { Biki3DStudio } from './components/Biki3DStudio';
import { BikiDoThiHamSo } from './components/BikiDoThiHamSo';
import { BikiHinhHocPhang } from './components/BikiHinhHocPhang';
import { supabase } from './utils/supabaseClient';
import type { UserProfile } from './types/game';

const APP_VERSION = 'fd44bc2';
const APP_PUSH_TIME = 'Tue, 7 Jul 2026 12:05 ICT';

function App() {
  const currentUser = useGameState(state => state.currentUser);
  const checkDailyReset = useGameState(state => state.checkDailyReset);
  const initEventSubscriptions = useGameState(state => state.initEventSubscriptions);
  const openMysteryBox = useGameState(state => state.openMysteryBox);
  const spinWheel = useGameState(state => state.spinWheel);
  const activeHelp = useGameState(state => state.activeHelp);
  const closeHelp = useGameState(state => state.closeHelp);
  const uiTheme = useGameState(state => state.uiTheme);
  const setUiTheme = useGameState(state => state.setUiTheme);

  // Screen routing state
  const [screen, setScreen] = useState<'map' | 'play' | 'shop' | 'parent' | 'pet' | 'logs' | 'hang' | 'hang-3d' | 'hang-plane' | 'hang-graph' | 'lesson-study' | 'relax'>('map');
  const [playMode, setPlayMode] = useState<'grammar' | 'reading' | 'vocabulary' | 'mixed' | 'revenge' | 'boss' | 'lesson' | 'survival'>('mixed');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const masterLesson = useGameState(state => state.masterLesson);
  const [bossId, setBossId] = useState<string | undefined>(undefined);
  // Track where to return after a lesson study (map or hang)
  const [lessonBackTarget, setLessonBackTarget] = useState<'map' | 'hang'>('hang');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Auto-switch screen for admin users on login
  useEffect(() => {
    if (currentUser?.role === 'admin') {
      setScreen('parent');
    } else {
      setScreen('map');
    }
  }, [currentUser]);

  // Modal alert animations
  const [modalData, setModalData] = useState<{ isOpen: boolean; title: string; message: string; type: string } | null>(null);

  // Initialize event subscriptions & daily checks on mount
  useEffect(() => {
    if (!currentUser) return;

    // Run daily resets
    checkDailyReset();
    
    // Subscribe to Event Bus listeners
    const unsub = initEventSubscriptions();

    // Check reset every 5 minutes
    const interval = setInterval(() => {
      checkDailyReset();
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session && session.user) {
        const user: UserProfile = {
          id: session.user.id,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          avatar: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
        };

        const current = useGameState.getState().currentUser;
        if (!current || current.id !== user.id) {
          await useGameState.getState().login(user);
        }
      } else {
        const current = useGameState.getState().currentUser;
        if (current && !current.id.startsWith('mock-')) {
          useGameState.getState().logout();
        }
      }

      if (mounted) {
        setAuthLoading(false);
      }
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
            Đang kết nối đấu trường...
          </p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <GoogleLoginScreen />;
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
    mode: 'grammar' | 'reading' | 'vocabulary' | 'mixed' | 'revenge' | 'boss' | 'lesson' | 'survival',
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
        onOpenParent={() => setScreen('parent')}
        onOpenShop={() => setScreen('shop')}
        onOpenHang={() => setScreen('hang')}
        onOpenProfile={() => setIsProfileOpen(true)}
        onBackToMap={() => setScreen('map')}
        currentScreen={topHudScreen}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:py-8 flex flex-col lg:flex-row gap-6 items-stretch pb-20 lg:pb-8">
        
        {/* Left Companion Panel (Hidden in play area, hidden on mobile) */}
        {!isDungeonScreen && !isHangMatterScreen && currentUser?.role !== 'admin' && (
          <aside className="hidden lg:block w-72 shrink-0 h-fit lg:sticky lg:top-24">
            <PetSanctuary />
          </aside>
        )}

        {/* Dynamic Center Stage */}
        <section className="flex-1 min-w-0">
          {screen === 'map' && (
            <GameMap 
              onStartPlay={handleStartPlay}
              onOpenMysteryBox={triggerMysteryBox}
              onSpinWheel={triggerSpinWheel}
              onOpenHang={() => setScreen('hang')}
              onStudyLesson={handleStudyLessonFromMap}
              onStartLessonPractice={handleStartLessonPracticeFromMap}
              onOpenRelax={() => setScreen('relax')}
            />
          )}

          {screen === 'play' && (
            <PlayArea 
              mode={playMode}
              bossId={bossId}
              lessonId={selectedLessonId || undefined}
              onFinish={async () => {
                if (playMode === 'lesson' && selectedLessonId) {
                  await masterLesson(selectedLessonId);
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
                // Find first uncompleted lesson of selected subject, or default to first
                const currentSub = useGameState.getState().currentSubject;
                const lessonsList = useGameState.getState().lessons;
                const progress = useGameState.getState().lessonsProgress;
                const subLessons = lessonsList.filter(l => l.subject === currentSub);
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
              onBackToMap={() => setScreen('map')}
              onOpenMatThat3D={() => setScreen('hang-3d')}
              onOpenMatThatPlane={() => setScreen('hang-plane')}
              onOpenMatThatGraph={() => setScreen('hang-graph')}
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
              title="Mật thất 3D"
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
              title="Mật thất Hình học phẳng"
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
              title="Mật thất Đồ thị hàm số"
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
            <div className="lg:hidden">
              <PetSanctuary />
            </div>
          )}

          {screen === 'logs' && (
            <div className="lg:hidden">
              <ActivityLog />
            </div>
          )}
        </section>

        {/* Right Info Ledger (Hidden in play area, hidden on mobile) */}
        {!isDungeonScreen && !isHangMatterScreen && currentUser?.role !== 'admin' && (
          <aside className="hidden lg:block w-80 shrink-0 h-fit lg:sticky lg:top-24">
            <ActivityLog />
          </aside>
        )}
      </main>

      {/* Reward/Notification Modal */}
      {modalData?.isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="glass-panel rounded-3xl border border-synth-magenta/40 p-6 max-w-sm w-full text-center space-y-4 animate-float shadow-[0_0_20px_rgba(255,0,127,0.4)]">
            <div className="w-16 h-16 mx-auto rounded-full bg-synth-magenta/10 border border-synth-magenta/30 flex items-center justify-center text-4xl">
              {modalData.type === 'mystery' ? '🎁' : '🎡'}
            </div>

            <h3 className="font-orbitron font-black text-lg text-white tracking-wider">
              {modalData.title}
            </h3>

            <p className="text-sm text-slate-200 leading-relaxed font-semibold">
              {modalData.message}
            </p>

            <button
              onClick={() => setModalData(null)}
              className="w-full py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-synth-purple to-synth-cyan text-black hover:synth-glow-cyan cursor-pointer transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]"
            >
              Nhận Quà 
            </button>
          </div>
        </div>
      )}

      {/* Help Topic Modal */}
      {activeHelp && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-fade-in">
          <div className="glass-panel rounded-3xl border border-synth-cyan/40 p-6 max-w-md w-full space-y-4 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
            <h3 className="font-orbitron font-black text-base text-synth-cyan uppercase tracking-wider border-b border-synth-cyan/20 pb-2 flex items-center gap-2">
              💡 Hướng dẫn: {activeHelp.title}
            </h3>
            
            <div className="space-y-3 py-2">
              {activeHelp.bullets.map((b, i) => (
                <p key={i} className="text-xs text-slate-200 leading-relaxed font-medium">
                  {b}
                </p>
              ))}
            </div>

            <button
              onClick={closeHelp}
              className="w-full py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-cyan text-black hover:synth-glow-cyan cursor-pointer transition-all duration-300 shadow-[0_0_12px_rgba(0,240,255,0.3)]"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}

      {isProfileOpen && currentUser && (
        <ProfileThemeModal
          isOpen={isProfileOpen}
          currentUser={currentUser}
          currentTheme={uiTheme}
          onClose={() => setIsProfileOpen(false)}
          onSelectTheme={setUiTheme}
        />
      )}

      {/* Mobile Bottom Navigation Bar */}
      {currentUser && currentUser.role !== 'admin' && screen !== 'play' && !isHangMatterScreen && (
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
            onClick={() => setScreen('pet')}
            className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer ${
              screen === 'pet' ? 'text-synth-cyan' : 'text-synth-text-muted hover:text-white'
            }`}
          >
            <span className="text-lg">🐉</span>
            <span>Pet</span>
          </button>

          <button
            onClick={() => setScreen('shop')}
            className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer ${
              screen === 'shop' ? 'text-synth-cyan' : 'text-synth-text-muted hover:text-white'
            }`}
          >
            <span className="text-lg">🛒</span>
            <span>Shop</span>
          </button>

          <button
            onClick={() => setScreen('hang')}
            className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer ${
              screen === 'hang' ? 'text-synth-cyan' : 'text-synth-text-muted hover:text-white'
            }`}
          >
            <span className="text-lg">📚</span>
            <span>Hang</span>
          </button>

          <button
            onClick={() => setScreen('logs')}
            className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer ${
              screen === 'logs' ? 'text-synth-cyan' : 'text-synth-text-muted hover:text-white'
            }`}
          >
            <span className="text-lg">📊</span>
            <span>Nhật ký</span>
          </button>
        </nav>
      )}

      {/* Footer */}
      <footer className="py-6 border-t border-synth-gray/30 text-center space-y-2">
        <div className="text-[10px] text-synth-text-muted font-semibold tracking-wider uppercase font-orbitron">
          © 2026 MIKAWAII ENGLISH GRADE 10. ALL RIGHTS RESERVED. RUNNING_LOCAL_LOCALFORAGE_INDEXEDDB.
        </div>
        <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase font-orbitron">
          Version {APP_VERSION} · Push {APP_PUSH_TIME}
        </div>
      </footer>
    </div>
  );
}

export default App;
