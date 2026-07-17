import React from 'react';
import { MarkdownRenderer } from '../Common/MarkdownRenderer';

interface SplitPassageViewProps {
  activeQuestion: any;
  passageText: string;
  questionText: string;
  mobilePassageTab: 'passage' | 'question';
  onTabChange: (tab: 'passage' | 'question') => void;
  renderAnswerForm: React.ReactNode;
}

export const SplitPassageView: React.FC<SplitPassageViewProps> = ({
  activeQuestion,
  passageText,
  questionText,
  mobilePassageTab,
  onTabChange,
  renderAnswerForm,
}) => {
  return (
    <div className="space-y-4">
      {/* Mobile Tab Selectors */}
      <div className="flex md:hidden border-b border-white/10 mb-2">
        <button
          type="button"
          onClick={() => onTabChange('passage')}
          className={`flex-1 py-2 text-xs font-orbitron font-bold uppercase tracking-wider border-b-2 text-center transition-colors ${
            mobilePassageTab === 'passage'
              ? 'border-synth-orange text-synth-orange'
              : 'border-transparent text-slate-400'
          }`}
        >
          📖 Bài Đọc
        </button>
        <button
          type="button"
          onClick={() => onTabChange('question')}
          className={`flex-1 py-2 text-xs font-orbitron font-bold uppercase tracking-wider border-b-2 text-center transition-colors ${
            mobilePassageTab === 'question'
              ? 'border-synth-cyan text-synth-cyan'
              : 'border-transparent text-slate-400'
          }`}
        >
          📝 Câu Hỏi
        </button>
      </div>

      {/* Desktop Layout (Split screen) */}
      <div className="hidden md:grid grid-cols-2 gap-6 items-start">
        {/* Passage Column */}
        <div className="glass-panel border border-synth-orange/30 p-4 rounded-xl space-y-2 bg-synth-orange/5 max-h-[350px] overflow-y-auto shadow-[0_0_15px_rgba(255,165,0,0.05)]">
          <span className="text-[10px] font-bold text-synth-orange font-orbitron uppercase tracking-wider block border-b border-synth-orange/20 pb-1.5 mb-2">
            📖 ĐOẠN TRÍCH ĐỌC HIỂU
          </span>
          <div className="text-xs text-white/90 leading-relaxed font-serif italic">
            <MarkdownRenderer
              content={passageText}
              className="font-serif italic text-xs text-white/90 leading-relaxed"
            />
          </div>
        </div>

        {/* Question & Options Column */}
        <div className="space-y-5">
          <div className="space-y-3">
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
                  className="rounded-lg max-h-[140px] object-contain border border-synth-orange/20 shadow-[0_0_15px_rgba(255,165,0,0.05)]"
                  alt="Question Illustration"
                />
              </div>
            )}
            <div className="text-sm text-white font-semibold leading-relaxed bg-synth-gray/20 border border-white/5 rounded-xl p-3.5 flex items-start gap-2">
              {activeQuestion.metadata?.isStandard && (
                <span
                  className="inline-flex items-center justify-center shrink-0 w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-black mt-0.5"
                  title="Câu hỏi đạt chuẩn"
                >
                  ✓
                </span>
              )}
              <MarkdownRenderer
                content={questionText}
                className="flex-1 text-sm text-white font-semibold leading-relaxed"
              />
            </div>
          </div>

          {/* Render MCQ / Essay / TextInput */}
          {renderAnswerForm}
        </div>
      </div>

      {/* Mobile Layout (Tabbed) */}
      <div className="block md:hidden">
        {mobilePassageTab === 'passage' ? (
          <div className="glass-panel border border-synth-orange/30 p-4 rounded-xl space-y-2 bg-synth-orange/5 max-h-[280px] overflow-y-auto shadow-[0_0_15px_rgba(255,165,0,0.05)]">
            <span className="text-[10px] font-bold text-synth-orange font-orbitron uppercase tracking-wider block border-b border-synth-orange/20 pb-1.5 mb-2">
              📖 ĐOẠN TRÍCH ĐỌC HIỂU
            </span>
            <div className="text-xs text-white/90 leading-relaxed font-serif italic">
              <MarkdownRenderer
                content={passageText}
                className="font-serif italic text-xs text-white/90 leading-relaxed"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-3">
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
                    className="rounded-lg max-h-[140px] object-contain border border-synth-orange/20 shadow-[0_0_15px_rgba(255,165,0,0.05)]"
                    alt="Question Illustration"
                  />
                </div>
              )}
              <div className="text-sm text-white font-semibold leading-relaxed bg-synth-gray/20 border border-white/5 rounded-xl p-3.5 flex items-start gap-2">
                {activeQuestion.metadata?.isStandard && (
                  <span
                    className="inline-flex items-center justify-center shrink-0 w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-black mt-0.5"
                    title="Câu hỏi đạt chuẩn"
                  >
                    ✓
                  </span>
                )}
                <MarkdownRenderer
                  content={questionText}
                  className="flex-1 text-sm text-white font-semibold leading-relaxed"
                />
              </div>
            </div>

            {/* Render MCQ / Essay / TextInput */}
            {renderAnswerForm}
          </div>
        )}
      </div>
    </div>
  );
};
