import { Project, SyntaxKind } from 'ts-morph';

const project = new Project();
const sourceFile = project.addSourceFileAtPath('src/store/index.ts');

const useGameStateDecl = sourceFile.getVariableDeclaration('useGameState');
if (useGameStateDecl) {
  const callExpr = useGameStateDecl.getInitializerIfKind(SyntaxKind.CallExpression);
  if (callExpr) {
    const persistCall = callExpr.getArguments()[0];
    if (persistCall && persistCall.getKind() === SyntaxKind.CallExpression) {
      const arrowFunc = persistCall.getArguments()[0];
      if (arrowFunc && arrowFunc.getKind() === SyntaxKind.ArrowFunction) {
        const returnStmts = arrowFunc.getBody().getDescendantsOfKind(SyntaxKind.ReturnStatement);
        for (const returnStmt of returnStmts) {
          try {
            const objLiteral = returnStmt.getExpressionIfKind(SyntaxKind.ObjectLiteralExpression);
            if (objLiteral) {
              // Check if this is the main state object
              if (objLiteral.getProperty('player') && objLiteral.getProperty('pet')) {
                const propertiesToRemove = [
                  // Auth
                  'currentUser', 'sessionAccountId', 'availableProfiles', 'setSessionAccountId', 'fetchProfiles', 'selectProfile', 'createProfile', 'login', 'logout',
                  // Family
                  'familyLinks', 'fetchFamily', 'sendInvite', 'respondInvite', 'leaveFamily',
                  // UI
                  'isSectModalOpen', 'currentSubject', 'activeGradeTier', 'uiTheme', 'uiThemesByUser', 'helpPageId', 'handbookPages', 'setSectModalOpen', 'setSubject', 'setGradeTier', 'setUiTheme', 'showHelp', 'closeHelp', 'addHandbookPage', 'initEventSubscriptions'
                ];
                
                for (const propName of propertiesToRemove) {
                  const prop = objLiteral.getProperty(propName);
                  if (prop) {
                    prop.remove();
                    console.log(`Removed ${propName}`);
                  }
                }
                break; // Stop after finding and processing the main object to avoid AST invalidation errors
              }
            }
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  }
}

sourceFile.saveSync();
console.log('Cleaned index.ts');
