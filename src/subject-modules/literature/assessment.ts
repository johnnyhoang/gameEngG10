import type { AssessmentInput, AssessmentResult } from '../contracts';

export async function assessLiteratureRubric(input: AssessmentInput): Promise<AssessmentResult> {
  const answers = Array.isArray(input.question.correctAnswer)
    ? input.question.correctAnswer
    : [input.question.correctAnswer];

  const response = await fetch(`${input.backendUrl}/api/ai/grade-literature`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${input.token}`,
      'X-Profile-Id': input.profileId,
    },
    body: JSON.stringify({
      promptText: input.question.prompt,
      essay: input.answer,
      keywords: answers,
      rubric: input.question.metadata?.solutionSteps || [],
    }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => '');
    throw new Error(`API error: ${response.status} ${details}`);
  }

  const payload = await response.json();
  if (!payload.success || !payload.result) throw new Error('Invalid response structure');

  return {
    score: payload.result.score,
    missingKeywords: payload.result.missingKeywords ?? [],
    feedback: payload.result.feedback ?? '',
    suggestions: payload.result.suggestions ?? [],
  };
}
