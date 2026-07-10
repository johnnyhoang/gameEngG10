import fs from 'fs';
import path from 'path';

function patchFile(filePath, replacer) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf-8');
  let newContent = replacer(content);
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Patched ${filePath}`);
  } else {
    console.log(`No changes needed in ${filePath}`);
  }
}

patchFile('D:/Hoa Hoang/Apps/gameEngG10/src/components/ParentConsole.tsx', content => {
  // Imports
  if (!content.includes("import { isAdmin, isSuperAdmin, isParentRole } from '../utils/roleHelpers';")) {
     content = content.replace(
        "import React, { useState, useEffect } from 'react';",
        "import React, { useState, useEffect } from 'react';\nimport { isAdmin, isSuperAdmin, isParentRole } from '../utils/roleHelpers';"
     );
  }

  content = content.replace(/useState\(currentUser\?\.role === 'admin'\)/g, "useState(isAdmin(currentUser?.role))");
  content = content.replace(/if \(currentUser\?\.role === 'admin'\) \{/g, "if (isAdmin(currentUser?.role)) {");
  content = content.replace(/if \(currentUser\?\.role === 'parent' \|\| currentUser\?\.role === 'admin'\) \{/g, "if (isParentRole(currentUser?.role) || isAdmin(currentUser?.role)) {");
  content = content.replace(/s\.role !== 'admin'/g, "!isAdmin(s.role)");
  
  // Badge logic
  content = content.replace(
    /stud\.role === 'admin' \? 'bg-synth-magenta\/20 text-synth-magenta' : 'bg-synth-cyan\/20 text-synth-cyan'/g,
    "isSuperAdmin(stud.role) ? 'bg-synth-magenta/20 text-synth-magenta' : stud.role === 'pho_vien' ? 'bg-synth-yellow/20 text-synth-yellow' : 'bg-synth-cyan/20 text-synth-cyan'"
  );
  content = content.replace(
    /\{stud\.role === 'admin' \? 'Viện Chủ' : 'Thiếu Hiệp'\}/g,
    "{isSuperAdmin(stud.role) ? 'Viện Trưởng 👑' : stud.role === 'pho_vien' ? 'Phó Viện 🛡️' : 'Thiếu Hiệp'}"
  );

  // Admin users list visibility
  content = content.replace(
    /currentUser\?\.role === 'admin' && adminStudents\.map/g,
    "isAdmin(currentUser?.role) && adminStudents.map"
  );
  content = content.replace(
    /usr\.role === 'admin' \n/g,
    "isAdmin(usr.role) \n"
  );
  content = content.replace(
    /usr\.role === 'admin' \? 'Quản trị' : 'Tài khoản con'/g,
    "isSuperAdmin(usr.role) ? 'Viện Trưởng 👑' : usr.role === 'pho_vien' ? 'Phó Viện 🛡️' : 'Tài khoản con'"
  );
  
  // Promote logic - replace the entire promote block for superadmin
  content = content.replace(
    /const targetRole = usr\.role === 'admin' \? 'student' : 'admin';\n[ \t]*const actionText = targetRole === 'admin' \? 'nâng cấp tài khoản này làm Quản trị viên' : 'chuyển tài khoản này thành Tài khoản con';/g,
    `const isPromotingToPhoVien = usr.role === 'student' || isParentRole(usr.role);
                                  const targetRole = isPromotingToPhoVien ? 'pho_vien' : 'student';
                                  const actionText = isPromotingToPhoVien ? 'nâng cấp tài khoản này làm Phó Viện' : 'chuyển tài khoản này thành Tài khoản con';`
  );
  content = content.replace(
    /usr\.role === 'admin'\n[ \t]*\? 'bg-red-500\/20 text-red-400 hover:bg-red-500\/30'\n[ \t]*: 'bg-synth-cyan\/20 text-synth-cyan hover:bg-synth-cyan\/30'/g,
    "isAdmin(usr.role)\n                                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'\n                                    : 'bg-synth-cyan/20 text-synth-cyan hover:bg-synth-cyan/30'"
  );
  content = content.replace(
    /usr\.role === 'admin' \? 'Hạ cấp Student' : 'Cấp quyền Admin'/g,
    "isAdmin(usr.role) ? 'Hạ cấp Student' : 'Bổ nhiệm Phó Viện'"
  );

  return content;
});

console.log("Done part 2");
