import { BackendSubjectModule } from '../contracts.js';
import { getLiteratureIngestPrompt } from './ingest.js';

export const literatureBackendModule: BackendSubjectModule = {
  subject: 'literature',
  getIngestPrompt: getLiteratureIngestPrompt,
  getDefaultSource: () => 'AI Ingested Literature'
};
