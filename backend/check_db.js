import pg from 'pg';
import dotenv from 'dotenv';

const { Client } = pg;
dotenv.config();

async function check() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  try {
    // 1. Chèn connect giả lập
    const id1 = '788e3bc5-9dd4-498c-9234-c163e3b693d5'; // Hoa HOANG (truong_vien)
    const id2 = 'u-1784249372384-vwtl35toc'; // Jessica (pho_vien)
    const linkId = 'lnk-test-admin-conn';

    // Xóa link cũ nếu có
    await client.query("DELETE FROM ge10_class_links WHERE id = $1", [linkId]);

    // Insert link test
    await client.query(
      `INSERT INTO ge10_class_links (id, tutor_id, student_id, status, link_type) 
       VALUES ($1, $2, $3, 'active', 'admin_connection')`,
      [linkId, id1, id2]
    );
    console.log("Inserted test admin connection link.");

    // 2. Chạy query của backend với profileId = id1 (Hoa HOANG)
    const res1 = await client.query(`
      SELECT l.id, l.status, l.link_type, l.created_at,
             u.id as peer_id, u.name as peer_name, u.email as peer_email, u.avatar_url as peer_avatar, u.role as peer_role,
             l.tutor_id as sender_id
      FROM ge10_class_links l
      JOIN ge10_users u ON (l.tutor_id = u.id AND l.student_id = $1) OR (l.student_id = u.id AND l.tutor_id = $1)
      WHERE l.link_type = 'admin_connection'
    `, [id1]);
    console.log("Query result for Hoa HOANG:", JSON.stringify(res1.rows, null, 2));

    // 3. Chạy query của backend với profileId = id2 (Jessica)
    const res2 = await client.query(`
      SELECT l.id, l.status, l.link_type, l.created_at,
             u.id as peer_id, u.name as peer_name, u.email as peer_email, u.avatar_url as peer_avatar, u.role as peer_role,
             l.tutor_id as sender_id
      FROM ge10_class_links l
      JOIN ge10_users u ON (l.tutor_id = u.id AND l.student_id = $1) OR (l.student_id = u.id AND l.tutor_id = $1)
      WHERE l.link_type = 'admin_connection'
    `, [id2]);
    console.log("Query result for Jessica:", JSON.stringify(res2.rows, null, 2));

    // Cleanup link test
    await client.query("DELETE FROM ge10_class_links WHERE id = $1", [linkId]);
    console.log("Cleaned up test link.");

  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

check();
