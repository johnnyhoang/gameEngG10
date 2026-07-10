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

// 1. App.tsx
patchFile('D:/Hoa Hoang/Apps/gameEngG10/src/App.tsx', content => {
  if (!content.includes("import { isParentRole, isSuperAdmin, isAdmin } from './utils/roleHelpers';")) {
     content = "import { isParentRole, isSuperAdmin, isAdmin } from './utils/roleHelpers';\n" + content;
  }
  content = content.replace(/currentUser\.role === 'admin' \|\| currentUser\.role === 'parent'/g, "isParentRole(currentUser.role) || isAdmin(currentUser.role)");
  content = content.replace(/role === 'admin' \|\| role === 'parent'/g, "isParentRole(role) || isAdmin(role)");
  return content;
});

// 2. GiangHoCamNang.tsx
patchFile('D:/Hoa Hoang/Apps/gameEngG10/src/components/GiangHoCamNang.tsx', content => {
  if (!content.includes("import { isSuperAdmin, isAdmin } from '../utils/roleHelpers';")) {
     content = "import { isSuperAdmin, isAdmin } from '../utils/roleHelpers';\n" + content;
  }
  content = content.replace(/currentUser\?\.role === 'admin'/g, "isSuperAdmin(currentUser?.role)");
  return content;
});

// 3. PetStableOverlay.tsx
patchFile('D:/Hoa Hoang/Apps/gameEngG10/src/components/PetStableOverlay.tsx', content => {
  if (!content.includes("import { isAdmin } from '../utils/roleHelpers';")) {
     content = "import { isAdmin } from '../utils/roleHelpers';\n" + content;
  }
  content = content.replace(/currentUser\.role === 'admin'/g, "isAdmin(currentUser.role)");
  return content;
});

// 4. TopHUD.tsx
patchFile('D:/Hoa Hoang/Apps/gameEngG10/src/components/TopHUD.tsx', content => {
  if (!content.includes("import { isAdmin } from '../utils/roleHelpers';")) {
     content = "import { isAdmin } from '../utils/roleHelpers';\n" + content;
  }
  content = content.replace(/currentUser\?\.role === 'admin'/g, "isAdmin(currentUser?.role)");
  return content;
});

// 5. ProfileSelectionScreen.tsx
patchFile('D:/Hoa Hoang/Apps/gameEngG10/src/components/ProfileSelectionScreen.tsx', content => {
  if (!content.includes("import { isAdmin, isSuperAdmin } from '../utils/roleHelpers';")) {
     content = "import { isAdmin, isSuperAdmin } from '../utils/roleHelpers';\n" + content;
  }
  content = content.replace(/profile\.role === 'admin' \? <span className="text-synth-magenta">Quản trị<\/span> :/g, 
    "isAdmin(profile.role) ? <span className=\"text-synth-magenta\">{isSuperAdmin(profile.role) ? 'Viện Trưởng' : 'Phó Viện'}</span> :");
  return content;
});

console.log("Done part 1");
