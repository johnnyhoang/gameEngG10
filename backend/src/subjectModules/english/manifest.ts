import { BackendSubjectModule } from '../contracts.js';
import { getEnglishIngestPrompt } from './ingest.js';

export const englishBackendModule: BackendSubjectModule = {
  subject: 'english',
  getIngestPrompt: getEnglishIngestPrompt,
  getDefaultSource: () => 'AI Ingested English'
};
