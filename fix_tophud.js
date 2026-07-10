import fs from 'fs';

const p = 'D:/Hoa Hoang/Apps/gameEngG10/src/components/TopHUD.tsx';
let txt = fs.readFileSync(p, 'utf-8');

txt = txt.replace(/\{!isAdmin &&/g, '{!isAdminUser &&');
txt = txt.replace(/\{isAdmin &&/g, '{isAdminUser &&');
txt = txt.replace(/isAdmin \? 'Thân Phận'/g, "isAdminUser ? 'Thân Phận'");

fs.writeFileSync(p, txt, 'utf-8');
console.log('Fixed TopHUD');
