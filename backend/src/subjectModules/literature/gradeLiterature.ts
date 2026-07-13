import { callGeminiAPI } from '../../helpers/gemini.js';

export interface LiteratureAssessmentInput {
  promptText: string;
  essay: string;
  keywords: string[];
  rubric: string[];
}

export async function gradeLiteratureEssay(input: LiteratureAssessmentInput) {
  const prompt = `Bạn là giáo viên Ngữ Văn chuyên chấm thi tuyển sinh lớp 10 tại TP.HCM.
Chấm bài theo đề, các ý chính và rubric; đánh giá đúng ý nghĩa, không so khớp từ ngữ máy móc.

Yêu cầu:
1. Đánh giá mức độ đáp ứng đề và độ dài; nếu đề yêu cầu khoảng 500 chữ thì bài nên đạt tối thiểu 200-300 chữ và không vượt quá khoảng 600-700 chữ.
2. Chấp nhận từ đồng nghĩa hoặc cách diễn đạt khác nếu vẫn đủ ý; không chấm bằng so khớp chuỗi thô cứng.
3. Đánh giá bố cục, liên kết, hành văn và lập luận logic.
4. Cho điểm nguyên khách quan từ 0 đến 10.
5. Chỉ ra ý đạt (matchedKeywords), ý thiếu/mờ nhạt (missingKeywords), nhận xét ưu/nhược điểm và gợi ý cải thiện cụ thể.

Đề bài: ${input.promptText}
Bài làm: ${input.essay}
Ý chính: ${JSON.stringify(input.keywords)}
Rubric: ${JSON.stringify(input.rubric)}

Chỉ trả về JSON:
{
  "score": 8,
  "matchedKeywords": ["ý đạt"],
  "missingKeywords": ["ý thiếu"],
  "feedback": "Nhận xét ngắn gọn",
  "suggestions": ["gợi ý cụ thể"]
}
matchedKeywords và missingKeywords phải quy chiếu về các ý đầu vào tương ứng.`;

  const responseText = await callGeminiAPI(prompt, { responseMimeType: 'application/json', temperature: 0.2 });
  return JSON.parse(responseText.trim());
}
