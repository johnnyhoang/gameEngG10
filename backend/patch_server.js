import fs from 'fs';

const filePath = 'D:/Hoa Hoang/Apps/gameEngG10/backend/src/server.ts';
let content = fs.readFileSync(filePath, 'utf-8');

// Replace general admin checks
content = content.replace(
  /if \(adminCheck\.rowCount === 0 \|\| adminCheck\.rows\[0\]\.role !== 'admin'\) \{/g,
  "if (adminCheck.rowCount === 0 || (adminCheck.rows[0].role !== 'truong_vien' && adminCheck.rows[0].role !== 'pho_vien')) {"
);

// Specifically for game-settings, revert to truong_vien only
// Wait, I will manually patch game-settings and promote later.
// Let's do the SQL queries first:
content = content.replace(
  /role = 'admin'/g,
  "role IN ('truong_vien', 'pho_vien')"
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Patch complete.');
