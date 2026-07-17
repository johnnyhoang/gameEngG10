import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { Sparkles } from 'lucide-react';

import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = ''
}) => {
  return (
    <div className={`markdown-renderer max-w-none text-left select-text ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="font-orbitron font-black text-xl md:text-2xl text-white mt-6 mb-3 uppercase tracking-wide border-b border-white/10 pb-2" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="font-orbitron font-bold text-base md:text-lg text-synth-cyan mt-5 mb-2.5 uppercase tracking-wider" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="font-orbitron font-semibold text-sm md:text-base text-white mt-4 mb-2" {...props} />
          ),
          blockquote: ({ node, children, ...props }) => (
            <blockquote className="my-4 p-4 rounded-xl bg-synth-blue/15 border-l-4 border-synth-cyan text-xs md:text-sm text-slate-200 leading-relaxed italic shadow-[0_4px_12px_rgba(0,240,255,0.03)]" {...props}>
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-synth-cyan shrink-0 mt-0.5" />
                <div>{children}</div>
              </div>
            </blockquote>
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 space-y-1.5 my-3 text-slate-300" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 space-y-1.5 my-3 text-slate-300" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="text-sm leading-relaxed" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-sm md:text-base text-slate-300 mb-3.5 leading-relaxed" {...props} />
          ),
          code: ({ node, className, children, ...props }: any) => {
            const isInline = !className || !className.includes('language-');
            return isInline ? (
              <code className="px-1.5 py-0.5 rounded bg-synth-gray/30 text-synth-magenta text-xs font-mono font-bold border border-white/5 mx-0.5" {...props}>
                {children}
              </code>
            ) : (
              <code className={`${className} block p-4 rounded-xl bg-black/40 border border-white/5 text-xs md:text-sm font-mono overflow-x-auto`} {...props}>
                {children}
              </code>
            );
          },
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4 rounded-xl border border-white/10 bg-black/20">
              <table className="w-full text-left text-xs border-collapse" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-white/5 text-slate-400 font-orbitron uppercase text-[9px] border-b border-white/10" {...props} />
          ),
          tbody: ({ node, ...props }) => (
            <tbody className="divide-y divide-white/5" {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="hover:bg-white/[0.02] transition-colors" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="py-2.5 px-3 font-bold" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="py-2.5 px-3 text-slate-300 font-sans" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
