import React from 'react';
import { Volume2, VolumeX, Flame } from 'lucide-react';
import type { PlayAreaHeaderProps } from './types';
import { ENGLISH_ANSWER_MODE_LABELS, ENGLISH_SKILL_LABELS, ENGLISH_TASK_LABELS } from '../../data/englishExamBlueprint';
import { MATH_ANSWER_MODE_LABELS } from '../../data/mathExamBlueprint';
import { getQuestionPresentation, hasSubjectUtility } from '../../subject-modules/registry';
import type { SubjectId } from '../../types/game';

export const PlayAreaHeader: React.FC<PlayAreaHeaderProps> = ({
  modeLabel,
  activeQuestion,
  currentIndex,
  totalQuestions,
  isMuted,
  activeCombo,
  timeLeft,
  activeSectId,
  onToggleMute,
  onShowScratchpad,
  formatTime
}) => {
  const subjectId = activeSectId as SubjectId;
  const modulePresentation = getQuestionPresentation(subjectId, activeQuestion);
  return (
    <div className="flex justify-between items-center border-b border-synth-gray pb-4">
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-synth-cyan font-orbitron uppercase tracking-wider">
          {modeLabel}
        </span>
        <div className="flex flex-wrap gap-1.5 mt-1 mb-1">
          {activeQuestion.metadata?.examPart && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-synth-magenta/15 border border-synth-magenta/30 text-synth-magenta font-orbitron font-bold uppercase tracking-wider">
              {activeQuestion.metadata.examPart}
            </span>
          )}
          {activeQuestion.metadata?.answerMode && activeQuestion.subject !== 'literature' && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-synth-cyan/15 border border-synth-cyan/30 text-synth-cyan font-orbitron font-bold uppercase tracking-wider">
              {(activeQuestion.subject === 'english'
                ? ENGLISH_ANSWER_MODE_LABELS
                : MATH_ANSWER_MODE_LABELS)[activeQuestion.metadata.answerMode] || activeQuestion.metadata.answerMode}
            </span>
          )}
          {activeQuestion.subject === 'english' && activeQuestion.metadata?.englishPart && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-synth-magenta/15 border border-synth-magenta/30 text-synth-magenta font-orbitron font-bold uppercase tracking-wider">
              {activeQuestion.metadata.englishPart}
            </span>
          )}
          {activeQuestion.subject === 'english' && activeQuestion.metadata?.englishTask && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white font-orbitron font-bold uppercase tracking-wider">
              {ENGLISH_TASK_LABELS[activeQuestion.metadata.englishTask] || activeQuestion.metadata.englishTask}
            </span>
          )}
          {activeQuestion.subject === 'english' && activeQuestion.metadata?.englishSkill && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-synth-cyan/15 border border-synth-cyan/30 text-synth-cyan font-orbitron font-bold uppercase tracking-wider">
              {ENGLISH_SKILL_LABELS[activeQuestion.metadata.englishSkill] || activeQuestion.metadata.englishSkill}
            </span>
          )}
          {modulePresentation.metadataLabels?.map((label, index) => (
            <span key={`${label.value}-${index}`} className={`text-[10px] px-2 py-0.5 rounded-full border font-orbitron font-bold uppercase tracking-wider ${
              label.tone === 'accent'
                ? 'bg-synth-orange/15 border-synth-orange/30 text-synth-orange'
                : label.tone === 'primary'
                  ? 'bg-synth-cyan/15 border-synth-cyan/30 text-synth-cyan'
                  : 'bg-white/5 border-white/10 text-white'
            }`}>
              {label.value}
            </span>
          ))}
        </div>
        <span className="text-sm font-semibold text-white">
          Câu {currentIndex + 1}/{totalQuestions}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* Mute/Unmute sound button */}
        <button
          onClick={onToggleMute}
          className="px-2.5 py-1 rounded bg-synth-gray/50 border border-white/10 hover:bg-synth-gray text-white cursor-pointer transition-colors flex items-center justify-center"
          title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-synth-magenta mr-1" /> : <Volume2 className="w-3.5 h-3.5 text-synth-cyan mr-1" />}
          <span className="font-orbitron font-bold text-[9px] tracking-wide uppercase">
            {isMuted ? 'MUTE' : 'SOUND'}
          </span>
        </button>

        {/* Bảng Nháp button */}
        {hasSubjectUtility(subjectId, 'scratchpad') && (
          <button
            onClick={onShowScratchpad}
            className="px-2.5 py-1 rounded bg-synth-magenta/20 border border-synth-magenta/40 hover:bg-synth-magenta/40 text-[10px] text-synth-magenta font-bold cursor-pointer transition-colors font-orbitron"
            title="Mở bảng nháp để tính toán"
          >
            SỔ NHÁP ✏️
          </button>
        )}

        {/* Combo Multiplier */}
        {activeCombo > 0 && (
          <div className="flex items-center gap-1 px-3 py-1 rounded bg-synth-magenta/15 border border-synth-magenta text-synth-magenta font-orbitron font-bold text-xs animate-pulse">
            <Flame className="w-4 h-4 fill-synth-magenta" /> COMBO {activeCombo}
          </div>
        )}
      </div>

      {/* Timer */}
      {timeLeft > 0 && (
        <div className="px-3 py-1 rounded bg-synth-gray border border-white/10 text-xs font-orbitron text-white">
          Thời hạn: {formatTime(timeLeft)}
        </div>
      )}
    </div>
  );
};
