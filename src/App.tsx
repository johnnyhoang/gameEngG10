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
import { supabase } from './utils/supabaseClient';
import type { UserProfile } from './types/game';

function App() {
  const currentUser = useGameState(state => state.currentUser);
  const checkDailyReset = useGameState(state => state.checkDailyReset);
  const initEventSubscriptions = useGameState(state => state.initEventSubscriptions);
  const openMysteryBox = useGameState(state => state.openMysteryBox);
  const spinWheel = useGameState(state => state.spinWheel);
  const activeHelp = useGameState(state => state.activeHelp);
  const closeHelp = useGameState(state => state.closeHelp);

  // Screen routing state
  const [screen, setScreen] = useState<'map' | 'play' | 'shop' | 'parent' | 'pet' | 'logs'>('map');
  const [playMode, setPlayMode] = useState<'grammar' | 'reading' | 'vocabulary' | 'mixed' | 'revenge' | 'boss'>('mixed');
  const [bossId, setBossId] = useState<string | undefined>(undefined);

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

  // Listen for Supabase Auth state changes globally immediately on app mount
  useEffect(() => {
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
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
    mode: 'grammar' | 'reading' | 'vocabulary' | 'mixed' | 'revenge' | 'boss',
    id?: string
  ) => {
    setPlayMode(mode);
    setBossId(id);
    setScreen('play');
  };

  const isDungeonScreen = screen === 'play';

  return (
    <div className="min-h-screen synth-grid-bg bg-synth-bg flex flex-col text-slate-100">
      {/* Top Header HUD */}
      <TopHUD 
        onOpenParent={() => setScreen('parent')}
        onOpenShop={() => setScreen('shop')}
        onBackToMap={() => setScreen('map')}
        currentScreen={screen}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:py-8 flex flex-col lg:flex-row gap-6 items-stretch pb-20 lg:pb-8">
        
        {/* Left Companion Panel (Hidden in play area, hidden on mobile) */}
        {!isDungeonScreen && currentUser?.role !== 'admin' && (
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
            />
          )}

          {screen === 'play' && (
            <PlayArea 
              mode={playMode}
              bossId={bossId}
              onFinish={() => setScreen('map')}
            />
          )}

          {screen === 'shop' && <ItemShop />}

          {screen === 'parent' && <ParentConsole />}

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
        {!isDungeonScreen && currentUser?.role !== 'admin' && (
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

      {/* Mobile Bottom Navigation Bar */}
      {currentUser && currentUser.role !== 'admin' && screen !== 'play' && (
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
      <footer className="py-6 border-t border-synth-gray/30 text-center text-[10px] text-synth-text-muted font-semibold tracking-wider uppercase font-orbitron">
        © 2026 MICA ENGLISH GRADE 10. ALL RIGHTS RESERVED. RUNNING_LOCAL_LOCALFORAGE_INDEXEDDB.
      </footer>
    </div>
  );
}

export default App;
