import pg from 'pg';
import dotenv from 'dotenv';

const { Client } = pg;
dotenv.config({ path: 'd:/Hoa Hoang/Apps/gameEngG10/backend/.env' });

function getCleanTopicKey(key) {
  if (!key) return '';
  return key.replace(/-g\d+$/, '').toLowerCase().trim();
}

async function check() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  try {
    const lessonsRes = await client.query(
      `SELECT id, subject, topic_id, category, title, topic FROM ge10_lessons WHERE grade_tier = 9 AND subject = 'math' ORDER BY id`
    );
    
    const mappingsRes = await client.query(
      `SELECT category_key, subject, loai, bai, ham FROM ge10_textbook_mappings WHERE subject = 'math'`
    );
    
    const mappingsMap = new Map();
    mappingsRes.rows.forEach(r => {
      mappingsMap.set(r.category_key.toLowerCase(), r);
    });
    
    console.log(`--- Math Grade 9 Lessons Mapping Check ---`);
    console.log(`Total lessons: ${lessonsRes.rows.length}`);
    
    lessonsRes.rows.forEach((l, idx) => {
      const cleanKey = getCleanTopicKey(l.id);
      const cleanCat = l.category ? getCleanTopicKey(l.category) : '';
      
      const match = mappingsMap.get(cleanKey) || (cleanCat ? mappingsMap.get(cleanCat) : null);
      
      console.log(`${idx + 1}. ID: ${l.id} | Title: "${l.title}" | Map Key: ${match ? match.category_key : 'None'} | Bai: ${match ? match.bai : 'None'} | Loai: ${match ? match.loai : 'None'}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

check();
