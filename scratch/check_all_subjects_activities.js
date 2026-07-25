import pg from 'pg';
import dotenv from 'dotenv';

const { Client } = pg;
dotenv.config({ path: 'd:/Hoa Hoang/Apps/gameEngG10/backend/.env' });

async function check() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  try {
    const subsRes = await client.query(
      `SELECT DISTINCT subject FROM ge10_lessons WHERE grade_tier = 9`
    );
    const subjects = subsRes.rows.map(r => r.subject);
    
    console.log('--- Lớp 9 Topics & Activities Check ---');
    for (const sub of subjects) {
      const topicsRes = await client.query(
        `SELECT id, name FROM ge10_topics WHERE grade_tier = 9 AND subject = $1`,
        [sub]
      );
      
      const quizzesRes = await client.query(
        `SELECT a.id, a.title 
         FROM ge10_activities a
         JOIN ge10_topics t ON a.topic_id = t.id
         WHERE t.grade_tier = 9 AND t.subject = $1 AND a.activity_type = 'quiz'`,
        [sub]
      );
      
      const bossesRes = await client.query(
        `SELECT a.id, a.title 
         FROM ge10_activities a
         JOIN ge10_topics t ON a.topic_id = t.id
         WHERE t.grade_tier = 9 AND t.subject = $1 AND a.activity_type = 'boss'`,
        [sub]
      );
      
      console.log(`\nMôn: ${sub}`);
      console.log(`  - Topics count: ${topicsRes.rows.length} (${topicsRes.rows.map(t => t.id).join(', ')})`);
      console.log(`  - Chuyên đề thử thách (Quiz) count: ${quizzesRes.rows.length}`);
      quizzesRes.rows.forEach(q => console.log(`    * [${q.id}] ${q.title}`));
      console.log(`  - Khoa thi (Boss) count: ${bossesRes.rows.length}`);
      bossesRes.rows.forEach(b => console.log(`    * [${b.id}] ${b.title}`));
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

check();
