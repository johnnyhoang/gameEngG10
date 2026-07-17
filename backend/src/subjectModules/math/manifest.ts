import { BackendSubjectModule } from '../contracts.js';
import { getMathIngestPrompt } from './ingest.js';

export const mathBackendModule: BackendSubjectModule = {
  subject: 'math',
  getIngestPrompt: getMathIngestPrompt,
  getDefaultSource: () => 'AI Ingested Math'
};
