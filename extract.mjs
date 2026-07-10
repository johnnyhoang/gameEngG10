import fs from 'fs';

const src = fs.readFileSync('src/hooks/useGameState.ts.bak', 'utf-8');

// The file has export const useGameState = create<GameState>()((set, get) => ({ ... }))
// We will just find the start of the return object
const startIdx = src.indexOf('return {');
if (startIdx === -1) process.exit(1);

const body = src.substring(startIdx);
// body contains all the methods.
fs.writeFileSync('store_body.txt', body);
console.log("Written to store_body.txt");
