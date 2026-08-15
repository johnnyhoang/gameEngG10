import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { STANDARDIZED_MATH_QUESTIONS } from './standardizeAllMathData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function applyAllStandardizedData(): void {
  // 1. Update questionsData.json
  const questionsPath = path.join(__dirname, '..', 'questionsData.json');
  const questions: any[] = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

  let updatedCount = 0;
  questions.forEach((q: any) => {
    if (q.subject === 'math') {
      const baseId = q.id.replace(/-g\d+$/, '');
      const std = STANDARDIZED_MATH_QUESTIONS[baseId];
      if (std) {
        q.prompt = std.prompt;
        q.options = std.options ? [...std.options] : null;
        q.correctAnswer = Array.isArray(std.correctAnswer) ? [...std.correctAnswer] : std.correctAnswer;
        q.explanation = std.explanation;
        updatedCount++;
      } else {
        console.warn(`Warning: Missing standardized data for baseId: ${baseId} (id: ${q.id})`);
      }
    }
  });

  fs.writeFileSync(questionsPath, JSON.stringify(questions, null, 2), 'utf8');
  console.log(`Updated ${updatedCount} questions in questionsData.json with standardized math data.`);

  // 2. Regenerate 20260814_format_math_latex.sql
  const lessonsPath = path.join(__dirname, '..', 'lessonsData.ts');
  const lessonsContent = fs.readFileSync(lessonsPath, 'utf8');

  const sqlLines: string[] = [
    '-- Migration: Format Markdown LaTeX for Math Lessons and Questions',
    '-- Date: 2026-08-14',
    '',
    'BEGIN;',
    '',
    '-- 1. Update 32 Math Lessons Theory in ge10_lessons'
  ];

  const lessonsMatch = lessonsContent.matchAll(/id:\s*'(math-[a-z0-9-]+)'[\s\S]*?theory:\s*`([\s\S]*?)`/g);
  for (const m of lessonsMatch) {
    const id = m[1];
    const theory = m[2];
    const escapedTheory = "'" + theory.replace(/'/g, "''") + "'";
    sqlLines.push(`UPDATE ge10_lessons SET theory = ${escapedTheory} WHERE id = '${id}';`);
  }

  sqlLines.push('');
  sqlLines.push('-- 2. Update 497 Math Questions in ge10_custom_questions');

  questions.forEach((q: any) => {
    if (q.subject === 'math') {
      const escapeSql = (s: string) => (!s ? "''" : "'" + s.replace(/'/g, "''") + "'");
      const escapeArraySql = (arr: string[] | null) => {
        if (!arr) return 'NULL';
        const escapedItems = arr.map(item => `"${item.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`);
        return `'{${escapedItems.join(',')}}'`;
      };
      const optionsSql = escapeArraySql(q.options);
      const answerSql = escapeArraySql(Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer]);
      const promptSql = escapeSql(q.prompt);
      const expSql = escapeSql(q.explanation);

      sqlLines.push(
        `UPDATE ge10_custom_questions SET prompt = ${promptSql}, options = ${optionsSql}, correct_answer = ${answerSql}, explanation = ${expSql} WHERE id = '${q.id}';`
      );
    }
  });

  sqlLines.push('');
  sqlLines.push('COMMIT;');
  sqlLines.push('');

  const migrationPath = path.join(__dirname, '..', '..', 'migrations', '20260814_format_math_latex.sql');
  fs.writeFileSync(migrationPath, sqlLines.join('\n'), 'utf8');
  console.log(`Generated migration SQL file at: ${migrationPath}`);
}

applyAllStandardizedData();
