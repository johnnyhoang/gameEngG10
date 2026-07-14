import { pool } from './db.js';

const inspectLiteratureNull = async () => {
  try {
    const res = await pool.query(`
      SELECT id, type, category, LEFT(prompt, 80) as prompt_preview 
      FROM ge10_custom_questions 
      WHERE subject = 'literature' AND (topic_id IS NULL OR topic_id = 'misc' OR topic_id = '')
      LIMIT 60
    `);
    
    console.log(res.rows);
  } catch (error) {
    console.error('Error inspecting:', error);
  } finally {
    await pool.end();
    process.exit(0);
  }
};

inspectLiteratureNull();
