import { pool } from './db.js';

const inspectMathLitNull = async () => {
  try {
    const mathRes = await pool.query(`
      SELECT id, type, category, prompt, metadata 
      FROM ge10_custom_questions 
      WHERE subject = 'math' AND (topic_id IS NULL OR topic_id = 'misc' OR topic_id = '')
      LIMIT 20
    `);
    
    const litRes = await pool.query(`
      SELECT id, type, category, prompt, metadata 
      FROM ge10_custom_questions 
      WHERE subject = 'literature' AND (topic_id IS NULL OR topic_id = 'misc' OR topic_id = '')
      LIMIT 20
    `);

    console.log('--- MATH QUESTIONS ---');
    console.log(JSON.stringify(mathRes.rows, null, 2));

    console.log('--- LITERATURE QUESTIONS ---');
    console.log(JSON.stringify(litRes.rows, null, 2));
  } catch (error) {
    console.error('Error inspecting:', error);
  } finally {
    await pool.end();
    process.exit(0);
  }
};

inspectMathLitNull();
