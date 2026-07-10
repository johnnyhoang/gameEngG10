import fs from 'fs';

let content = fs.readFileSync('src/hooks/useGameState.ts.bak', 'utf-8');

content = content.replace(/interface GameState \{[\s\S]*?\n\s*\}\s*\n/, "import { StoreState } from './types';\n");

const sliceImports = `
import { createAuthSlice } from './slices/createAuthSlice';
import { createFamilySlice } from './slices/createFamilySlice';
import { createUISlice } from './slices/createUISlice';
`;
content = content.replace("import { create } from 'zustand';", "import { create } from 'zustand';" + sliceImports);

// Fix the typing
content = content.replace("export const useGameState = create<GameState>()(", "export const useGameState = create<StoreState>()(");

// Add store to persist callback arguments
content = content.replace("persist(\n      (originalSet, get) => {", "persist(\n      (originalSet, get, store) => {");
content = content.replace("persist((originalSet, get) => {", "persist((originalSet, get, store) => {"); // fallback
content = content.replace("persist(\r\n      (originalSet, get) => {", "persist(\r\n      (originalSet, get, store) => {");

const target = "return get().getAdaptiveQuestion(selectedCategory);\r\n        }\r\n      };";
const target2 = "return get().getAdaptiveQuestion(selectedCategory);\n        }\n      };";

let insertPoint = content.indexOf(target);
let len = target.length;
if (insertPoint === -1) {
    insertPoint = content.indexOf(target2);
    len = target2.length;
}

if (insertPoint !== -1) {
    const before = content.substring(0, insertPoint + len - 2); // right before `};`
    const after = content.substring(insertPoint + len - 2);     // `};\n...`
    content = before + ",\n        ...createAuthSlice(set, get, store),\n        ...createFamilySlice(set, get, store),\n        ...createUISlice(set, get, store)\n      " + after;
} else {
    console.error("COULD NOT FIND INJECTION POINT!");
    process.exit(1);
}

fs.writeFileSync('src/store/index.ts', content);
console.log("Store generated successfully.");
