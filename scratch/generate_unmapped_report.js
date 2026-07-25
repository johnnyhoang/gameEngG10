import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';

const { Client } = pg;
dotenv.config({ path: 'd:/Hoa Hoang/Apps/gameEngG10/backend/.env' });

function getCleanTopicKey(key) {
  if (!key) return '';
  return key.replace(/-g\d+$/, '').toLowerCase().trim();
}

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  try {
    const lessonsRes = await client.query(
      `SELECT id, subject, topic_id, category, title, topic FROM ge10_lessons WHERE grade_tier = 9 ORDER BY subject, id`
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
      const rawKey = lesson.topic_id || lesson.category || '';
      const cleanKey = getCleanTopicKey(rawKey);
      const cleanCat = lesson.category ? getCleanTopicKey(lesson.category) : '';
      
      const sub = lesson.subject.toLowerCase().trim();
      const mapKey1 = `${sub}:${cleanKey}`;
      const mapKey2 = cleanCat ? `${sub}:${cleanCat}` : '';
      
      const match = mappingsMap.get(mapKey1) || (mapKey2 ? mappingsMap.get(mapKey2) : null);
      
      if (!match) {
        unmapped.push(lesson);
      } else {
        mapped.push({ lesson, match });
      }
    }
    
    let md = `# Báo cáo bài học lớp 9 chưa được map SGK\n\n`;
    md += `Tổng số bài học lớp 9: ${lessonsRes.rows.length}\n`;
    md += `Số bài đã map: ${mapped.length}\n`;
    md += `Số bài chưa map: ${unmapped.length}\n\n`;
    
    const bySubject = {};
    unmapped.forEach(item => {
      if (!bySubject[item.subject]) bySubject[item.subject] = [];
      bySubject[item.subject].push(item);
    });
    
    for (const sub in bySubject) {
      md += `## Môn: ${sub} (${bySubject[sub].length} bài)\n`;
      md += `| ID | Tiêu đề bài học | Chủ đề (Topic) | Category | Clean Key |\n`;
      md += `| --- | --- | --- | --- | --- |\n`;
      bySubject[sub].forEach(item => {
        const cleanKey = getCleanTopicKey(item.topic_id || item.category || '');
        md += `| \`${item.id}\` | ${item.title} | ${item.topic} | ${item.category} | \`${cleanKey}\` |\n`;
      });
      md += `\n`;
    }
    
    fs.writeFileSync('scratch/unmapped_report.md', md);
    console.log('Đã ghi báo cáo ra file scratch/unmapped_report.md');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

run();
