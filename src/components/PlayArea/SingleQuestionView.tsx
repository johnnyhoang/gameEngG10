import React from 'react';
import { MarkdownRenderer } from '../Common/MarkdownRenderer';
import { GeometryBoard } from './GeometryBoard';

interface SingleQuestionViewProps {
  activeQuestion: any;
  isGeometry: boolean;
  showHandbookBoard: boolean;
  onToggleBikiBoard: () => void;
  is3D: boolean;
  renderAnswerForm: React.ReactNode;
}

export const SingleQuestionView: React.FC<SingleQuestionViewProps> = ({
  activeQuestion,
  isGeometry,
  showHandbookBoard,
  onToggleBikiBoard,
  is3D,
  renderAnswerForm,
}) => {
  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center text-[10px] text-synth-text-muted font-bold">
          <span>Nguồn: {activeQuestion.source}</span>
          <span className="text-synth-cyan font-orbitron">
            Cấp độ khó: {activeQuestion.difficulty}/10
          </span>
        </div>
        {activeQuestion.imageUrl && (
          <div className="flex justify-center bg-synth-gray/10 border border-white/5 rounded-xl p-3">
            <img
              src={activeQuestion.imageUrl}
              className="rounded-lg max-h-[160px] md:max-h-[220px] object-contain border border-synth-orange/20 shadow-[0_0_15px_rgba(255,165,0,0.05)]"
              alt="Question Illustration"
            />
          </div>
        )}
        <div className="text-base text-white font-medium leading-relaxed bg-synth-gray/20 border border-white/5 rounded-xl p-4 flex items-start gap-2">
          {activeQuestion.metadata?.isStandard && (
            <span
              className="inline-flex items-center justify-center shrink-0 w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-black mt-1"
              title="Câu hỏi đạt chuẩn"
            >
              ✓
            </span>
          )}
          <MarkdownRenderer
            content={activeQuestion.prompt}
            className="flex-1 text-base text-white font-medium leading-relaxed"
          />
        </div>
      </div>

      {/* Geometry drawing board */}
      <GeometryBoard
        isGeometry={isGeometry}
        showHandbookBoard={showHandbookBoard}
        onToggleBikiBoard={onToggleBikiBoard}
        is3D={is3D}
        prompt={activeQuestion.prompt}
        sceneData={activeQuestion.metadata?.sceneData}
      />

      {/* Render MCQ / Essay / TextInput */}
      {renderAnswerForm}
    </>
  );
};
