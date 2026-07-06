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

function App() {
  const currentUser = useGameState(state => state.currentUser);
  const checkDailyReset = useGameState(state => state.checkDailyReset);
  const initEventSubscriptions = useGameState(state => state.initEventSubscriptions);
  const openMysteryBox = useGameState(state => state.openMysteryBox);
  const spinWheel = useGameState(state => state.spinWheel);

  // Screen routing state
  const [screen, setScreen] = useState<'map' | 'play' | 'shop' | 'parent'>('map');
  const [playMode, setPlayMode] = useState<'grammar' | 'reading' | 'vocabulary' | 'mixed' | 'revenge' | 'boss'>('mixed');
  const [bossId, setBossId] = useState<string | undefined>(undefined);

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

  if (!currentUser) {
    return <GoogleLoginScreen googleClientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} />;
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
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:py-8 flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* Left Companion Panel (Hidden in play area) */}
        {!isDungeonScreen && (
          <aside className="w-full lg:w-72 shrink-0 h-fit lg:sticky lg:top-24">
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
        </section>

        {/* Right Info Ledger (Hidden in play area) */}
        {!isDungeonScreen && (
          <aside className="w-full lg:w-80 shrink-0 h-fit lg:sticky lg:top-24">
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

      {/* Footer */}
      <footer className="py-6 border-t border-synth-gray/30 text-center text-[10px] text-synth-text-muted font-semibold tracking-wider uppercase font-orbitron">
        © 2026 CYBER_ENGLISH HCMC GRADE 10. ALL RIGHTS RESERVED. RUNNING_LOCAL_LOCALFORAGE_INDEXEDDB.
      </footer>
    </div>
  );
}

export default App;
