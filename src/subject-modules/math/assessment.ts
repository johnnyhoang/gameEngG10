import type { AssessmentInput, AssessmentResult } from '../contracts';

export async function assessMathShortAnswer(input: AssessmentInput): Promise<AssessmentResult> {
  const correctAnsStr = Array.isArray(input.question.correctAnswer)
    ? input.question.correctAnswer[0]
    : input.question.correctAnswer;

  const response = await fetch(`${input.backendUrl}/api/ai/grade-math`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${input.token}`,
      'X-Profile-Id': input.profileId,
    },
    body: JSON.stringify({
      questionPrompt: input.question.prompt,
      correctAnswer: correctAnsStr,
      studentAnswer: input.answer,
    }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => '');
    throw new Error(`API error: ${response.status} ${details}`);
  }

  const payload = await response.json();
  
  return {
    score: payload.isCorrect ? 10 : 0,
    missingKeywords: [],
    feedback: payload.explanation ?? '',
    suggestions: [],
  };
}
