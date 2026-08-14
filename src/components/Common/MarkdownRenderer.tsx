import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { Sparkles } from 'lucide-react';

import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';

/**
 * Robustly preprocesses raw text/markdown to convert Vietnamese math notations,
 * sub-part letterings (a), b), c)), unicode symbols, subscripts, superscripts,
 * arrows, degrees, and un-bracketed math expressions into clean LaTeX math syntax ($...$).
 * Also protects against markdown italic parser eating asterisks (*) and underscores (_) in math.
 */
export function preprocessMathContent(raw: string): string {
  if (!raw) return '';

  let text = raw;

  // 1. Normalize LaTeX delimiters \( ... \) and \[ ... \] to $ ... $ and $$ ... $$
  text = text.replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$');
  text = text.replace(/\\\[([\s\S]*?)\\\]/g, '$$$$$1$$$$');

  // 2. Convert sub-parts like "a) ", "b) ", "c) ", "d) " into distinct new paragraph blocks if concatenated in plain text
  text = text.replace(/([.!?;\n]|\b)\s*([a-dA-D1-9])\)\s+(?=[A-Z0-9\$\\áàảãạăắằẳẵặâấầnẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ])/g, (_match, p1, p2, offset) => {
    if (offset === 0 || p1 === '\n') {
      return `\n\n**${p2})** `;
    }
    return `${p1}\n\n**${p2})** `;
  });

  // 3. Process non-math parts (outside existing $...$ and $$...$$)
  const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g);

  const processedParts = parts.map((part, index) => {
    // If this part is already wrapped in $...$ or $$...$$, clean internal escape issues
    if (index % 2 === 1) {
      let inner = part;
      // Convert unicode superscripts/subscripts inside LaTeX
      inner = inner.replace(/²/g, '^2').replace(/³/g, '^3').replace(/⁴/g, '^4');
      inner = inner.replace(/₁/g, '_1').replace(/₂/g, '_2').replace(/₃/g, '_3');
      // Convert plain * to \cdot inside math
      inner = inner.replace(/\s*\*\s*/g, ' \\cdot ');
      return inner;
    }

    let s = part;

    // Convert unicode superscripts (e.g. AD² -> $AD^2$, x³ -> $x^3$)
    s = s.replace(/²/g, '^2');
    s = s.replace(/³/g, '^3');
    s = s.replace(/⁴/g, '^4');

    // Convert unicode subscripts (e.g. x₁ -> x_1, x₂ -> x_2)
    s = s.replace(/₁/g, '_1');
    s = s.replace(/₂/g, '_2');
    s = s.replace(/₃/g, '_3');

    // Convert arrows
    s = s.replace(/==>/g, '$\\Rightarrow$');
    s = s.replace(/(?<=\s|^)=>(?=\s|$)/g, '$\\Rightarrow$');
    s = s.replace(/<==>/g, '$\\Leftrightarrow$');
    s = s.replace(/(?<=\s|^)<=>\s*/g, '$\\Leftrightarrow$ ');
    s = s.replace(/(?<=\s|^)->(?=\s|$)/g, '$\\rightarrow$');

    // Convert degrees: "90 độ" -> "$90^\circ$", "90°" -> "$90^\circ$"
    s = s.replace(/\b(\d+(?:[.,]\d+)?)\s*độ\b/gi, '$$$1^\\circ$$');
    s = s.replace(/\b(\d+(?:[.,]\d+)?)\s*°(?!\w)/g, '$$$1^\\circ$$');

    // Convert delta words: "Delta phẩy" / "delta phẩy" / "Delta'" -> "$\Delta'$"
    s = s.replace(/\b(?:Delta|delta)\s*(?:phẩy|')\b/gi, '$$\\Delta\'$$');
    s = s.replace(/\b(?:Delta|delta)\b/gi, '$$\\Delta$$');
    s = s.replace(/Δ'/g, '$$\\Delta\'$$');
    s = s.replace(/Δ/g, '$$\\Delta$$');

    // Convert angle notation: "góc ACB" -> "$\widehat{ACB}$"
    s = s.replace(/\bgóc\s+([A-Z]{1,4})\b/gi, '$$\\widehat{$1}$$');

    // Convert triangle notation: "tam giác ABC" -> "$\Delta ABC$"
    s = s.replace(/\btam giác\s+([A-Z]{3})\b/gi, '$$\\Delta $1$$');

    // Convert middle dot / cross products: "DC . DB" or "DC · DB" -> "$DC \cdot DB$"
    s = s.replace(/\b([A-Z]{1,3})\s*[·\.]\s*([A-Z]{1,3})\b/g, '$$$1 \\cdot $2$$');

    // Convert unicode symbols
    s = s.replace(/π/g, '$\\pi$');
    s = s.replace(/≤/g, '$\\le$');
    s = s.replace(/≥/g, '$\\ge$');
    s = s.replace(/≠/g, '$\\ne$');
    s = s.replace(/≈/g, '$\\approx$');
    s = s.replace(/±/g, '$\\pm$');

    // Convert sqrt functions: "sqrt(41)" -> "$\sqrt{41}$", "√3" -> "$\sqrt{3}$"
    s = s.replace(/sqrt\(([^)]+)\)/gi, '$$\\sqrt{$1}$$');
    s = s.replace(/√(\d+|[A-Za-z])/g, '$$\\sqrt{$1}$$');

    // Convert variables with index like x1, x2 (when not part of a normal word)
    s = s.replace(/\b([xXyYzZstmnukabcpqrS])([12345])\b/g, '$$$1_$2$$');

    // Convert unbracketed LaTeX commands like \sqrt{3}, \frac{1}{2}, \cdot, etc. that lack $...$
    s = s.replace(/([A-Za-z0-9_\^]*\\[a-zA-Z]+(?:\{[^{}]*\}|\[[^[\]]*\]|[\w\^]+)*(?:\s*[\/\+\-\=\*]\s*[A-Za-z0-9_\^\.]*)?)/g, (m) => {
      const trimmed = m.trim();
      if (trimmed && !trimmed.startsWith('$') && !trimmed.endsWith('$')) {
        return ` $${trimmed}$ `;
      }
      return m;
    });

    // Protect math multiplications with * (e.g. 5 * 3, x_1 * x_2) so markdown italic doesn't swallow them
    s = s.replace(/([A-Za-z0-9_\^\)\$\}]+)\s*\*\s*([A-Za-z0-9_\^\(\$\{\\]+)/g, '$$$1 \\cdot $2$$');

    return s;
  });

  let result = processedParts.join('');

  // Clean up any double dollar collisions created by consecutive replacements: "$$a$ $b$$" -> "$$a b$$" or "$a$$b$" -> "$a b$"
  result = result.replace(/\$\s*\$/g, ' ');

  return result;
}

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = ''
}) => {
  const formattedContent = useMemo(() => preprocessMathContent(content), [content]);

  return (
    <div className={`markdown-renderer max-w-none text-left select-text ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[
          [rehypeKatex, { throwOnError: false, strict: false }],
          rehypeHighlight
        ]}
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
          code: ({ node, className: codeClassName, children, ...props }: any) => {
            const isInline = !codeClassName || !codeClassName.includes('language-');
            return isInline ? (
              <code className="px-1.5 py-0.5 rounded bg-synth-gray/30 text-synth-magenta text-xs font-mono font-bold border border-white/5 mx-0.5" {...props}>
                {children}
              </code>
            ) : (
              <code className={`${codeClassName} block p-4 rounded-xl bg-black/40 border border-white/5 text-xs md:text-sm font-mono overflow-x-auto`} {...props}>
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
        {formattedContent}
      </ReactMarkdown>
    </div>
  );
};

