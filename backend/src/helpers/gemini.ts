import dotenv from 'dotenv';

dotenv.config();

export const AI_EXHAUSTED_MESSAGE = 'Các sư phụ đã hết công lực AI rồi, phải nhờ đại sư phụ nạp thêm tiền để hồi phục công lực thì mới chấm bài bằng AI được!';

export class GeminiExhaustedError extends Error {
  constructor() {
    super(AI_EXHAUSTED_MESSAGE);
    this.name = 'GeminiExhaustedError';
  }
}

export const getGeminiApiKeys = (): string[] => {
  return [process.env.GEMINI_API_KEY, process.env.GEMINI_API_KEY2, process.env.GEMINI_API_KEY3]
    .filter((key): key is string => !!key && key.trim() !== '' && !key.toLowerCase().includes('your_gemini_api_key'));
};

export const callGeminiAPI = async (prompt: string, generationConfig: Record<string, any> = { responseMimeType: 'application/json' }): Promise<string> => {
  const keys = getGeminiApiKeys();
  if (keys.length === 0) {
    throw new GeminiExhaustedError();
  }

  let lastError: Error | null = null;
  for (let i = 0; i < keys.length; i++) {
    try {
      const apiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${keys[i]}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig
        })
      });

      if (!apiRes.ok) {
        const errText = await apiRes.text();
        lastError = new Error(`Gemini key #${i + 1} thất bại: ${errText}`);
        console.error(lastError.message);
        continue;
      }

      const apiData = await apiRes.json() as any;
      const responseText = apiData.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!responseText) {
        lastError = new Error(`Gemini key #${i + 1} trả về response rỗng.`);
        console.error(lastError.message);
        continue;
      }

      return responseText;
    } catch (err: any) {
      lastError = err;
      console.error(`Gemini key #${i + 1} lỗi:`, err.message);
    }
  }

  console.error('Tất cả Gemini API keys đều thất bại:', lastError?.message);
  throw new GeminiExhaustedError();
};
