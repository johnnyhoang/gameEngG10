import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questionsPath = path.join(__dirname, '..', 'questionsData.json');
const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

const mathQuestions = questions.filter((q: any) => q.subject === 'math');
const baseMap = new Map<string, any>();

mathQuestions.forEach((q: any) => {
  const baseId = q.id.replace(/-g\d+$/, '');
  if (!baseMap.has(baseId)) {
    baseMap.set(baseId, q);
  }
});

const baseList = Array.from(baseMap.values());
console.log(`Found ${baseList.length} unique base math questions.`);

fs.writeFileSync(
  path.join(__dirname, '..', '..', 'scratch_base_math.json'),
  JSON.stringify(baseList, null, 2),
  'utf8'
);
