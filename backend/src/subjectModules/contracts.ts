export interface BackendSubjectModule {
  subject: string;
  getIngestPrompt(rawText: string): string;
  getDefaultSource(): string;
}
