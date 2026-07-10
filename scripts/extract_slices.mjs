import { Project, SyntaxKind } from 'ts-morph';
import fs from 'fs';

const project = new Project();
const sourceFile = project.addSourceFileAtPath('src/hooks/useGameState.ts.bak');

const useGameStateDecl = sourceFile.getVariableDeclaration('useGameState');
const callExpr = useGameStateDecl.getInitializerIfKind(SyntaxKind.CallExpression);
const persistCall = callExpr.getArguments()[0];
const arrowFunc = persistCall.getArguments()[0];
const returnStmts = arrowFunc.getBody().getDescendantsOfKind(SyntaxKind.ReturnStatement);

let mainObjLiteral = null;
for (const returnStmt of returnStmts) {
    const objLiteral = returnStmt.getExpressionIfKind(SyntaxKind.ObjectLiteralExpression);
    if (objLiteral && objLiteral.getProperty('player') && objLiteral.getProperty('pet')) {
        mainObjLiteral = objLiteral;
        break;
    }
}

const playerProps = [
    'player', 'pet', 'questions', 'lessons', 'lessonsProgress', 'explorationProgress', 'pageExplorationStates',
    'categoryStats', 'rewards', 'challenges', 'dailyMission', 'logs', 'activeCombo', 'maxCombo', 'lastSyncTime',
    'profiles', 'petStates', 'categoryStatsAll', 'answerQuestion', 'useEnergy', 'addEnergy', 'buyStreakShield',
    'buyHeart', 'buyHint', 'buyTheme', 'claimParentReward', 'feedPet', 'spinWheel', 'openMysteryBox', 'masterLesson',
    'applyDefeatPenalty', 'completeBossVictory', 'completeLevel3Page', 'updatePendingKeyQuestion', 'awardCoinsAndXp',
    'clearExploration', 'resetProgress', 'checkDailyReset', 'getAdaptiveQuestion', 'getQuestionByWeight'
];

const adminProps = [
    'parentPIN', 'adminStudents', 'selectedStudentProfile', 'failedQuestionIds', 'recentlyPlayedQuestionIds', 'parentQuests',
    'verifyPIN', 'changePIN', 'approveReward', 'rejectReward', 'addParentReward', 'importQuestions', 'deleteQuestion',
    'updateQuestion', 'flagQuestionConfused', 'fetchAdminStudents', 'promoteUser', 'fetchStudentProfile', 'adminApproveReward',
    'adminRejectReward', 'adminDeductWallet', 'adminSetEnergy', 'updateGameSettings', 'addParentQuest', 'completeParentQuest',
    'deleteParentQuest', 'claimParentQuest'
];

function generateSlice(name, propsList, stateType) {
    let code = `import type { StateCreator } from 'zustand';\n`;
    code += `import type { StoreState } from '../types';\n`;
    code += `import { INITIAL_PLAYER, INITIAL_PET, INITIAL_QUESTIONS, INITIAL_LESSONS, DEFAULT_GAME_SETTINGS, INITIAL_CHALLENGES, DEFAULT_REWARDS, DEFAULT_UI_THEME } from '../../hooks/useGameState';\n`;
    code += `import { supabase } from '../../utils/supabaseClient';\n`;
    code += `import { logActivity, checkLevelUp } from '../helpers';\n`;
    code += `import { eventBus } from '../../utils/EventBus';\n`;
    code += `import toast from 'react-hot-toast';\n\n`;
    
    code += `export const ${name}: StateCreator<\n  StoreState,\n  [],\n  [],\n  Pick<StoreState, \n    ${propsList.map(p => `'${p}'`).join(' | ')}\n  >\n> = (set, get) => ({\n`;
    
    for (const propName of propsList) {
        const prop = mainObjLiteral.getProperty(propName);
        if (prop) {
            code += `  ${prop.getText()},\n\n`;
        } else {
            // Default placeholder if missing
            code += `  ${propName}: null as any,\n`;
        }
    }
    
    code += `});\n`;
    return code;
}

const playerCode = generateSlice('createPlayerSlice', playerProps, 'StoreState');
const adminCode = generateSlice('createAdminSlice', adminProps, 'StoreState');

fs.writeFileSync('src/store/slices/createPlayerSlice.ts', playerCode);
fs.writeFileSync('src/store/slices/createAdminSlice.ts', adminCode);

// Now generate a clean index.ts
let indexCode = `import { create } from 'zustand';\n`;
indexCode += `import { persist } from 'zustand/middleware';\n`;
indexCode += `import type { StoreState } from './types';\n`;
indexCode += `import { createAuthSlice } from './slices/createAuthSlice';\n`;
indexCode += `import { createFamilySlice } from './slices/createFamilySlice';\n`;
indexCode += `import { createUISlice } from './slices/createUISlice';\n`;
indexCode += `import { createPlayerSlice } from './slices/createPlayerSlice';\n`;
indexCode += `import { createAdminSlice } from './slices/createAdminSlice';\n\n`;

indexCode += `export const useGameState = create<StoreState>()(\n`;
indexCode += `  persist(\n`;
indexCode += `    (set, get, store) => ({\n`;
indexCode += `      ...createAuthSlice(set, get, store),\n`;
indexCode += `      ...createFamilySlice(set, get, store),\n`;
indexCode += `      ...createUISlice(set, get, store),\n`;
indexCode += `      ...createPlayerSlice(set, get, store),\n`;
indexCode += `      ...createAdminSlice(set, get, store),\n`;
indexCode += `    }),\n`;
indexCode += `    {\n`;
indexCode += `      name: 'cyber-english-state',\n`;

// Copy partialize and merge from original
const persistObj = persistCall.getArguments()[1];
if (persistObj) {
    const partialize = persistObj.getProperty('partialize');
    if (partialize) indexCode += `      ${partialize.getText()},\n`;
    const merge = persistObj.getProperty('merge');
    if (merge) indexCode += `      ${merge.getText()},\n`;
}

indexCode += `    }\n`;
indexCode += `  )\n`;
indexCode += `);\n`;

fs.writeFileSync('src/store/index.ts', indexCode);
console.log('Slices and index.ts generated successfully!');
