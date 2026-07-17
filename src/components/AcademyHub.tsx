import React, { lazy, Suspense } from 'react';
import { useGameState } from '../hooks/useGameState';
import { isLightTheme } from '../theme/uiThemes';
import { useTranslate } from '../hooks/useTranslate';
import { filterLessonsInScope } from '../utils/learningScope';
import { useSect } from '../contexts/SectContext';
import { AcademyTab } from './AcademyTab';
import { FunzoneTab } from './FunzoneTab';

const PracticeHall = lazy(() => import('./PracticeHall').then(m => ({ default: m.PracticeHall })));
const Arena = lazy(() => import('./Arena').then(m => ({ default: m.Arena })));
const RelaxationZone = lazy(() => import('./RelaxationZone').then(m => ({ default: m.RelaxationZone })));

export type AcademyTabId = 'academy' | 'knowledge' | 'challenge' | 'adventure' | 'funzone';

interface AcademyHubProps {
  activeTab: AcademyTabId;
  onTabChange: (tab: AcademyTabId) => void;
  onStartPlay: (
    mode: 'grammar' | 'reading' | 'vocabulary' | 'pronunciation' | 'mixed' | 'revenge' | 'boss' | 'lesson' | 'survival',
    id?: string,
    backTarget?: 'map' | 'arena' | 'practice'
  ) => void;
  onStudyLesson: (lessonId: string) => void;
  onStartLessonPractice: (lessonId: string) => void;
  onSpinWheel: () => void;
  onOpenWorkshop3D: () => void;
  onOpenWorkshopPlane: () => void;
  onOpenWorkshopGraph: () => void;
  learningContextKey: string;
}

const TabLoadingFallback = () => (
  <div className="flex-1 flex items-center justify-center min-h-[200px] py-10">
    <div className="text-center space-y-3">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-synth-cyan mx-auto" />
      <p className="font-orbitron text-[10px] text-synth-cyan tracking-widest uppercase animate-pulse">Đang nạp...</p>
    </div>
  </div>
);

export const AcademyHub: React.FC<AcademyHubProps> = ({
  activeTab, onTabChange,
  onStartPlay, onStudyLesson, onStartLessonPractice, onSpinWheel,
  onOpenWorkshop3D, onOpenWorkshopPlane, onOpenWorkshopGraph,
  learningContextKey,
}) => {
  const { t } = useTranslate();
  const uiTheme = useGameState(state => state.uiTheme);
  const isUnicorn = isLightTheme(uiTheme);
  const { activeSectId, activeGradeTier } = useSect();
  const lessons = useGameState(state => state.lessons);
  const closeHelp = useGameState(state => state.closeHelp);

  const subjectLessons = filterLessonsInScope(lessons, activeSectId as any, activeGradeTier);

  const TABS: { id: AcademyTabId; icon: string; label: string; labelEn: string }[] = [
    { id: 'academy',   icon: '🏫', label: 'Học Viện',      labelEn: 'Academy' },
    { id: 'knowledge', icon: '📚', label: 'Phòng Luyện Tập',    labelEn: 'Practice Hall' },
    { id: 'challenge', icon: '⚔️', label: 'Trường Thi',    labelEn: 'Challenge Hall' },
    { id: 'adventure', icon: '🧭', label: 'Khu Thám Hiểm', labelEn: 'Adventure Zone' },
    { id: 'funzone',   icon: '🎮', label: 'Funzone',       labelEn: 'Funzone' },
  ];

  const handleStartPractice = () => {
    closeHelp();
    const progress = useGameState.getState().lessonsProgress;
    const uncompleted = subjectLessons.find(l => !progress[l.id]);
    const target = uncompleted || subjectLessons[0];
    if (target) {
      onStudyLesson(target.id);
    } else {
      onStartPlay('mixed');
    }
  };

  return (
    <div className="space-y-0">
      {/* ── Desktop Tab Bar ── */}
      <nav
        className={`hidden lg:flex items-center gap-1 rounded-2xl border p-1.5 mb-5 ${
          isUnicorn
            ? 'glass-panel border-violet-200/35 bg-white/40'
            : 'glass-panel border-synth-cyan/20 bg-black/40'
        }`}
        role="tablist"
        aria-label="Academy navigation"
      >
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-orbitron font-bold text-[10px] xl:text-[11px] uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                isActive
                  ? (isUnicorn
                      ? 'bg-gradient-to-r from-fuchsia-200 via-violet-200 to-cyan-100 text-violet-900 shadow-[0_0_10px_rgba(192,132,252,0.3)] border-violet-300/50'
                      : 'bg-synth-cyan text-black shadow-[0_0_10px_#00f0ff] border-transparent')
                  : (isUnicorn
                      ? 'text-violet-600/70 hover:bg-white/60 border-transparent'
                      : 'text-slate-400 hover:bg-white/5 hover:text-synth-cyan border-transparent')
              }`}
            >
              <span className="text-base leading-none">{tab.icon}</span>
              <span>{t(tab.label, tab.labelEn)}</span>
            </button>
          );
        })}
      </nav>

      {/* ── Tab Content ── */}
      <div role="tabpanel">
        {activeTab === 'academy' && (
          <AcademyTab
            key={learningContextKey}
            onStudyLesson={onStudyLesson}
            onStartLessonPractice={onStartLessonPractice}
            onNavigateToFunzone={() => onTabChange('funzone')}
          />
        )}

        {activeTab === 'knowledge' && (
          <Suspense fallback={<TabLoadingFallback />}>
            <PracticeHall
              key={learningContextKey}
              onStartPractice={handleStartPractice}
              onStudyLesson={(lessonId) => onStudyLesson(lessonId)}
              onOpenWorkshop3D={onOpenWorkshop3D}
              onOpenWorkshopPlane={onOpenWorkshopPlane}
              onOpenWorkshopGraph={onOpenWorkshopGraph}
              onStartLessonPractice={onStartLessonPractice}
            />
          </Suspense>
        )}

        {activeTab === 'challenge' && (
          <Suspense fallback={<TabLoadingFallback />}>
            <Arena
              key={learningContextKey}
              onStartPlay={onStartPlay}
            />
          </Suspense>
        )}

        {activeTab === 'adventure' && (
          <Suspense fallback={<TabLoadingFallback />}>
            <RelaxationZone
              key={learningContextKey}
              onBack={() => onTabChange('academy')}
            />
          </Suspense>
        )}

        {activeTab === 'funzone' && (
          <FunzoneTab
            key={learningContextKey}
            onSpinWheel={onSpinWheel}
          />
        )}
      </div>
    </div>
  );
};
