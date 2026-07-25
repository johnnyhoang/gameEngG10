import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';

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
      `SELECT id, subject, topic_id, category, title, topic FROM ge10_lessons WHERE grade_tier = 9`
    );
    
    const mappingsRes = await client.query(
      `SELECT category_key, subject, loai, bai, ham FROM ge10_textbook_mappings`
    );
    
    const mappingsMap = new Map();
    mappingsRes.rows.forEach(r => {
      mappingsMap.set(`${r.subject.toLowerCase()}:${r.category_key.toLowerCase()}`, r);
    });
    
    const unmapped = [];
    const mapped = [];
    
    for (const lesson of lessonsRes.rows) {
      // Logic tra cứu SGK của bài học trên Frontend: 
      // Gọi enrichTextbookAttributes(lesson.id, lesson.category, lesson.subject)
      // Trong đó, topicId nhận giá trị lesson.id. 
      // Do đó, rawKey = topicId = lesson.id.
      const rawKey = lesson.id; 
      const cleanKey = getCleanTopicKey(rawKey);
      const cleanCat = lesson.category ? getCleanTopicKey(lesson.category) : '';
      
      const sub = lesson.subject.toLowerCase().trim();
      const mapKey1 = `${sub}:${cleanKey}`;
      const mapKey2 = cleanCat ? `${sub}:${cleanCat}` : '';
      
      // Khớp theo cleanKey trước (chính là lesson.id), sau đó mới fall back về cleanCat
      const match = mappingsMap.get(mapKey1) || (mapKey2 ? mappingsMap.get(mapKey2) : null);
      
      if (!match) {
        unmapped.push({
          id: lesson.id,
          subject: lesson.subject,
          topic_id: lesson.topic_id,
          category: lesson.category,
          title: lesson.title,
          topic: lesson.topic,
          cleanKey: cleanKey
        });
      } else {
        mapped.push({
          id: lesson.id,
          title: lesson.title,
          mapping: match
        });
      }
    }
    
    const result = {
      totalLessons: lessonsRes.rows.length,
      totalMappings: mappingsRes.rows.length,
      mappedCount: mapped.length,
      unmappedCount: unmapped.length,
      unmapped: unmapped
    };
    
    fs.writeFileSync('scratch/unmapped_g9.json', JSON.stringify(result, null, 2));
    console.log(`Kiểm tra lại theo đúng logic Frontend:`);
    console.log(`- Tổng số bài học lớp 9: ${lessonsRes.rows.length}`);
    console.log(`- Số bài đã map: ${mapped.length}`);
    console.log(`- Số bài chưa map: ${unmapped.length}`);
    
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

check();
