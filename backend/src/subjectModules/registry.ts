import { BackendSubjectModule } from './contracts.js';
import { englishBackendModule } from './english/manifest.js';
import { mathBackendModule } from './math/manifest.js';
import { literatureBackendModule } from './literature/manifest.js';

const MODULES = new Map<string, BackendSubjectModule>([
  ['english', englishBackendModule],
  ['math', mathBackendModule],
  ['literature', literatureBackendModule]
]);

export function getBackendSubjectModule(subject: string): BackendSubjectModule | undefined {
  return MODULES.get(subject);
}
