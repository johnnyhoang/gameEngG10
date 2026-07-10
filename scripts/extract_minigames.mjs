import fs from 'fs';
import path from 'path';

const games = [
    { name: 'ReadingGame', kebab: 'reading' },
    { name: 'StoryGame', kebab: 'story' },
    { name: 'AdventureGame', kebab: 'adventure' },
    { name: 'DiagramGame', kebab: 'diagram' },
    { name: 'ExplainGame', kebab: 'explain' },
    { name: 'MindmapGame', kebab: 'mindmap' },
    { name: 'StepBuilderGame', kebab: 'step-builder' }
];

for (const game of games) {
    const srcPath = `src/components/games/${game.name}.tsx`;
    const destAppPath = `src/miniapps/${game.kebab}/${game.name.replace('Game', 'App')}.tsx`;
    const destIndexPath = `src/miniapps/${game.kebab}/index.ts`;

    if (!fs.existsSync(srcPath)) continue;

    let content = fs.readFileSync(srcPath, 'utf8');

    // 1. Fix toast import
    content = content.replace(/import toast from 'react-hot-toast';/g, "import { toast } from '../../utils/toast';");
    content = content.replace(/import \{ toast \} from 'react-hot-toast';/g, "import { toast } from '../../utils/toast';");
    
    // Remove useGameState import
    content = content.replace(/import \{ useGameState \} from '\.\.\/\.\.\/hooks\/useGameState';\n/g, '');

    // Import UiThemeId if needed
    if (!content.includes('UiThemeId')) {
        content = content.replace(/(import .* from '\.\.\/\.\.\/types\/game';)/, "$1\nimport type { UiThemeId } from '../../types/game';");
        if (!content.includes('import type { UiThemeId }')) {
             content = content.replace(/import React/, "import type { UiThemeId } from '../../types/game';\nimport React");
        }
    }

    const appName = game.name.replace('Game', 'App');

    // Define props interface
    const propsInterface = `
export interface ${appName}Props {
  activeSectId?: string;
  uiTheme: UiThemeId;
  onReward: (coins: number, xp: number, type: string, detail: string) => void;
  onGameComplete?: (result: any) => void;
  onGameStart?: () => void;
}
`;

    // Replace component declaration
    const compRegex = new RegExp(`export const ${game.name}: React.FC(?:<.*?>)? = \\((.*?)\\) => \\{`);
    content = content.replace(compRegex, `${propsInterface}\nexport const ${appName}: React.FC<${appName}Props> = ({ activeSectId, uiTheme, onReward, onGameComplete, onGameStart }) => {`);

    // Remove useGameState hook calls
    content = content.replace(/.*useGameState\(.*awardCoinsAndXp.*\n/g, '');
    content = content.replace(/.*useGameState\(.*uiTheme.*\n/g, '');
    content = content.replace(/.*useGameState\(.*questions.*\n/g, '');

    // Replace awardCoinsAndXp with onReward
    content = content.replace(/awardCoinsAndXp\(/g, 'onReward(');

    fs.writeFileSync(destAppPath, content);
    fs.writeFileSync(destIndexPath, `export * from './${appName}';\n`);

    // Generate Adapter
    const adapterCode = `import React, { useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { ${appName} } from '../../miniapps/${game.kebab}';
import type { MiniGameProps } from '../../types/minigame';

export const ${game.name}: React.FC<MiniGameProps> = ({ activeSectId, onGameStart, onGameComplete }) => {
  const awardCoinsAndXp = useGameState(state => state.awardCoinsAndXp);
  const uiTheme = useGameState(state => state.uiTheme);

  useEffect(() => {
    onGameStart?.();
  }, [onGameStart]);

  return (
    <${appName}
      activeSectId={activeSectId}
      uiTheme={uiTheme}
      onReward={awardCoinsAndXp}
      onGameComplete={onGameComplete}
      onGameStart={onGameStart}
    />
  );
};
`;
    fs.writeFileSync(srcPath, adapterCode);
    console.log(`Migrated ${game.name}`);
}
