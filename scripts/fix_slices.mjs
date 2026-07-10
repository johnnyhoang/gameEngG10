import fs from 'fs';

for (const file of ['src/store/slices/createPlayerSlice.ts', 'src/store/slices/createAdminSlice.ts', 'src/store/slices/createAuthSlice.ts']) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Fix logActivity calls
    content = content.replace(/logActivity\(/g, "logActivity(get, set, ");
    
    // Fix checkLevelUp calls
    content = content.replace(/checkLevelUp\(/g, "checkLevelUp(get, set, ");
    
    // Fix implicit any state
    content = content.replace(/set\(state =>/g, "set((state: any) =>");
    content = content.replace(/set\(\(state\) =>/g, "set((state: any) =>");
    
    fs.writeFileSync(file, content);
}
console.log("Fixed helpers calls in slices");
