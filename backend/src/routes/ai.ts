import express from 'express';
import { activeProfileMiddleware, authMiddleware, requireProfileRoles } from '../middleware/auth.js';
import { callGeminiAPI, GeminiExhaustedError } from '../helpers/gemini.js';
import { gradeLiteratureEssay } from '../subjectModules/literature/gradeLiterature.js';
import { getBackendSubjectModule } from '../subjectModules/registry.js';

const router = express.Router();
router.use(authMiddleware, activeProfileMiddleware);

// POST /api/ai/ingest: Uses Gemini API to parse raw text into structured grade 10 questions (English or Math)
router.post('/ai/ingest', requireProfileRoles('truong_vien', 'pho_vien'), async (req: any, res) => {
  const userId = req.profile.id;
  const { rawText, subject = 'english', topicCatalog = [] } = req.body;
  if (!rawText) return res.status(400).json({ error: 'Missing rawText.' });

  const safeTopicCatalog = Array.isArray(topicCatalog)
    ? topicCatalog
        .filter((topic: any) => topic && typeof topic.id === 'string' && typeof topic.label === 'string')
        .slice(0, 200)
        .map((topic: any) => ({
          id: topic.id.slice(0, 100),
          label: topic.label.slice(0, 255),
          examRelevance: ['high', 'medium', 'low'].includes(topic.examRelevance) ? topic.examRelevance : 'medium'
        }))
    : [];

  try {
    const module = getBackendSubjectModule(subject);
    if (!module) {
      return res.status(400).json({ error: `Unsupported subject for Ingestion: ${subject}` });
    }

    const basePrompt = module.getIngestPrompt(rawText);
    const topicInstructions = safeTopicCatalog.length > 0
      ? `\n\nQUY TẮC PHÂN LOẠI CHUYÊN ĐỀ:\n- Với mỗi câu, bắt buộc đề xuất "topicId" từ đúng danh sách JSON sau: ${JSON.stringify(safeTopicCatalog)}.\n- Thêm "suggestedExamRelevance": "high" | "medium" | "low" theo mức độ thường xuất hiện trong đề thi.\n- Không tự tạo lựa chọn A/B/C/D để biến câu tự luận thành trắc nghiệm. Chỉ giữ câu trắc nghiệm nguyên bản hoặc các dạng hệ thống biểu diễn trọn vẹn.\n- Bỏ qua câu vẽ đồ thị, câu chứng minh, câu tự luận không thể biểu diễn trọn vẹn và câu thiếu dữ kiện/đáp án.\n- Không tự sửa nội dung, đáp án hoặc nguồn của câu gốc.`
      : '\n\nKhông tự biến câu tự luận thành trắc nghiệm. Bỏ qua câu không thể biểu diễn trọn vẹn hoặc thiếu dữ kiện/đáp án.';

    const responseText = await callGeminiAPI(`${basePrompt}${topicInstructions}`, { responseMimeType: 'application/json' });
    const parsedQuestions = JSON.parse(responseText.trim());
    if (!Array.isArray(parsedQuestions)) {
      return res.status(422).json({ error: 'AI response must be an array of questions.' });
    }

    const allowedTopics = new Map(safeTopicCatalog.map((topic: any) => [topic.id, topic]));
    const questions = parsedQuestions.map((question: any, index: number) => {
      const proposedTopic = allowedTopics.get(question.topicId);
      return {
        ...question,
        id: question.id || `ai-review-${Date.now()}-${index}`,
        subject,
        topicId: proposedTopic ? question.topicId : '',
        suggestedExamRelevance: ['high', 'medium', 'low'].includes(question.suggestedExamRelevance)
          ? question.suggestedExamRelevance
          : proposedTopic?.examRelevance || 'medium',
        source: question.source || module.getDefaultSource()
      };
    });

    // Chỉ trả đề xuất để Viện Trưởng review. Lưu DB diễn ra sau bước xác nhận ở frontend.
    res.json({ success: true, questionsCount: questions.length, questions, requiresReview: true, requestedBy: userId });
  } catch (error: any) {
    console.error('Lỗi gọi Gemini AI Ingest:', error.message);
    if (error instanceof GeminiExhaustedError) {
      return res.status(503).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to process AI Ingestion: ' + error.message });
  }
});

// POST /api/ai/geometry-3d: Uses Gemini API to analyze a grade 9 3D geometry problem and return structured drawing guidance
router.post('/ai/geometry-3d', authMiddleware, async (req: any, res) => {
  const { problemText, subjectHint = 'math', shapeHint = '' } = req.body || {};
  if (!problemText || !String(problemText).trim()) {
    return res.status(400).json({ error: 'Missing problemText.' });
  }

  try {
    const prompt = `Bạn là trợ lý Toán 9 chuyên về hình học không gian theo định hướng chấm của Sở GD&ĐT TP.HCM. Nhiệm vụ của bạn là phân tích một đề bài hình học 3D và trả về kết quả JSON duy nhất, không có markdown.

Yêu cầu:
- Nhận dạng đúng dạng hình: hình trụ, hình chóp, lăng trụ, tứ diện, hình hộp, hoặc unknown.
- Không bịa số đo hay quan hệ nếu đề không cung cấp.
- Nếu đề là hình trụ có mặt cắt song song với trục, hãy ưu tiên nhận dạng cylinder và mô tả rõ dây cung, tâm đáy, chiều cao và mặt cắt chữ nhật.
- Khi đề có nhắc đến đường cao, trung điểm, mặt phẳng, vuông góc, song song, phải nêu rõ cách dựng hình và ý nghĩa hình học.
- Phần lời giải phải theo kiểu Toán 9: giả thiết -> dựng hình -> lập luận -> kết luận.
- Cho phép đề xuất các thao tác vẽ đơn giản để học sinh thao tác trên bảng.
- Quan trọng: Phân chia quá trình vẽ thành các bước nhỏ (từ 0). Mỗi modelActions đều phải có trường "stepIndex" tương ứng với vị trí trong mảng stepByStep mà thao tác đó được thực hiện.
- Nếu không đủ dữ kiện, phải nói rõ thiếu gì cần bổ sung.

Trả về JSON theo schema:
{
  "detectedShape": "prism" | "cuboid" | "pyramid" | "tetrahedron" | "cylinder" | "unknown",
  "title": "chuỗi ngắn gọn",
  "summary": "tóm tắt cách nhìn nhanh",
  "assumptions": ["..."],
  "stepByStep": [
    { "title": "Bước 1", "body": "...", "command": "lệnh vẽ ngắn gọn để hiện caption" }
  ],
  "modelActions": [
    {
      "type": "drawAltitude" | "connectVertexToEdge" | "connectVertexToVertex" | "highlightFace" | "markPerpendicular" | "markParallel" | "markMidpoint",
      "from": "S",
      "to": "BC",
      "face": ["A", "B", "C"],
      "note": "ghi chú ngắn",
      "style": "solid" | "dashed",
      "color": "#00f0ff",
      "stepIndex": 1
    }
  ],
  "commands": ["vẽ đường cao từ S", "nối trung điểm BC với đỉnh S"],
  "warnings": ["..."]
}

Thông tin bài toán:
- subjectHint: ${subjectHint}
- shapeHint: ${shapeHint}
- problemText: ${problemText}`;

    const responseText = await callGeminiAPI(prompt, { responseMimeType: 'application/json', temperature: 0.2 });
    const parsed = JSON.parse(responseText.trim());
    res.json({ success: true, result: parsed });
  } catch (error: any) {
    console.error('Lỗi gọi Gemini AI Geometry 3D:', error.message);
    if (error instanceof GeminiExhaustedError) {
      return res.status(503).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to process geometry analysis: ' + error.message });
  }
});

// POST /api/ai/geometry-plane: Uses Gemini API to analyze a grade 9 plane geometry problem and return structured drawing guidance
router.post('/ai/geometry-plane', authMiddleware, async (req: any, res) => {
  const { problemText } = req.body || {};
  if (!problemText || !String(problemText).trim()) {
    return res.status(400).json({ error: 'Missing problemText.' });
  }

  try {
    const prompt = `Bạn là trợ lý Toán 9 chuyên về hình học phẳng theo chương trình Bộ GD&ĐT và cách trình bày chấm điểm của Sở GD&ĐT TP.HCM. Hãy phân tích đề bài hình học phẳng và trả về đúng một JSON duy nhất, không markdown.

Yêu cầu:
- Nhận dạng đúng dạng hình: tam giác, tứ giác, đường tròn, hỗn hợp hoặc unknown.
- Ưu tiên mô tả các yếu tố cơ bản mà học sinh cần dựng trên bảng.
- Có thể đề xuất các thao tác đơn giản như nối đỉnh với đỉnh, nối đỉnh với cạnh, dựng đường cao, trung tuyến, vuông góc, song song, đánh dấu góc.
- Quan trọng: Phân chia quá trình vẽ thành các bước nhỏ (từ 0). Mỗi đối tượng point, polygon, circle, overlay đều phải có trường "stepIndex" tương ứng với vị trí trong mảng stepByStep mà đối tượng đó bắt đầu xuất hiện.
- Không bịa quan hệ nếu đề không cho.
- Lời giải phải ngắn gọn, theo kiểu: giả thiết -> dựng hình -> lập luận -> kết luận.
- Mọi điểm và tọa độ nên nằm trong khoảng hợp lý trên bảng 800x560 để dựng trực quan.

Trả về JSON theo schema:
{
  "figureKind": "triangle" | "quadrilateral" | "circle" | "mixed" | "unknown",
  "title": "chuỗi ngắn gọn",
  "summary": "mô tả nhanh cách nhìn hình",
  "assumptions": ["..."],
  "stepByStep": [
    { "title": "Bước 1", "body": "...", "command": "lệnh vẽ ngắn gọn để hiện caption" }
  ],
  "scene": {
    "points": [
      { "id": "A", "x": 180, "y": 120, "label": "A", "locked": false, "stepIndex": 0 }
    ],
    "polygon": {
      "id": "tri",
      "points": ["A", "B", "C"],
      "fill": "#38bdf8",
      "opacity": 0.14,
      "stepIndex": 0
    },
    "circle": {
      "center": "O",
      "radiusPoint": "A",
      "fill": "#38bdf8",
      "opacity": 0.08,
      "stepIndex": 1
    },
    "overlays": [
      {
        "type": "segment" | "marker" | "parallel" | "angle",
        "from": "A",
        "to": "BC",
        "at": "A",
        "color": "#00f0ff",
        "label": "Đường cao",
        "dashed": true,
        "stepIndex": 1
      }
    ]
  },
  "commands": ["vẽ đường cao từ A", "nối trung điểm BC với đỉnh A"],
  "warnings": ["..."]
}

Thông tin bài toán:
${problemText}`;

    const responseText = await callGeminiAPI(prompt, { responseMimeType: 'application/json', temperature: 0.2 });
    const parsed = JSON.parse(responseText.trim());
    res.json({ success: true, result: parsed });
  } catch (error: any) {
    console.error('Lỗi gọi Gemini AI Geometry Plane:', error.message);
    if (error instanceof GeminiExhaustedError) {
      return res.status(503).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to process plane geometry analysis: ' + error.message });
  }
});

// POST /api/ai/function-graph: Uses Gemini API to analyze a grade 9 function graph problem and return structured guidance
router.post('/ai/function-graph', authMiddleware, async (req: any, res) => {
  const { problemText } = req.body || {};
  if (!problemText || !String(problemText).trim()) {
    return res.status(400).json({ error: 'Missing problemText.' });
  }

  try {
    const prompt = `Bạn là trợ lý Toán 9 chuyên về đồ thị hàm số theo chương trình Bộ GD&ĐT. Hãy phân tích đề bài và trả về đúng một JSON duy nhất, không markdown.

Yêu cầu:
- Nhận dạng đúng dạng hàm: bậc nhất, bậc hai hoặc unknown.
- Nếu là bậc nhất, ưu tiên hệ số m, n trong y = mx + n.
- Nếu là bậc hai, ưu tiên hệ số a, b, c trong y = ax^2 + bx + c.
- Có thể nêu các điểm đặc biệt: giao với Ox/Oy, đỉnh, trục đối xứng, xét chiều biến thiên cơ bản.
- Lời giải phải theo cách trình bày Toán 9: nhận dạng hàm -> nêu hệ số -> xác định điểm đặc biệt -> kết luận.

Trả về JSON theo schema:
{
  "functionKind": "linear" | "quadratic" | "unknown",
  "title": "chuỗi ngắn gọn",
  "summary": "mô tả nhanh",
  "assumptions": ["..."],
  "stepByStep": [
    { "title": "Bước 1", "body": "..." }
  ],
  "coefficients": {
    "m": 1,
    "n": 0,
    "a": 1,
    "b": 0,
    "c": 0
  },
  "commands": ["tăng a lên 2", "tìm giao điểm với Ox"],
  "warnings": ["..."]
}

Thông tin bài toán:
${problemText}`;

    const responseText = await callGeminiAPI(prompt, { responseMimeType: 'application/json', temperature: 0.2 });
    const parsed = JSON.parse(responseText.trim());
    res.json({ success: true, result: parsed });
  } catch (error: any) {
    console.error('Lỗi gọi Gemini AI Function Graph:', error.message);
    if (error instanceof GeminiExhaustedError) {
      return res.status(503).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to process function graph analysis: ' + error.message });
  }
});

// POST /api/ai/grade-literature: Uses Gemini API to evaluate and grade a student's literature essay
router.post('/ai/grade-literature', authMiddleware, async (req: any, res) => {
  const { promptText, essay, keywords = [], rubric = [] } = req.body || {};
  if (!promptText || !String(promptText).trim()) {
    return res.status(400).json({ error: 'Missing promptText.' });
  }
  if (!essay || !String(essay).trim()) {
    return res.status(400).json({ error: 'Missing essay.' });
  }

  try {
    const parsed = await gradeLiteratureEssay({ promptText, essay, keywords, rubric });
    res.json({ success: true, result: parsed });
  } catch (error: any) {
    console.error('Lỗi gọi Gemini AI Grade Literature:', error.message);
    if (error instanceof GeminiExhaustedError) {
      return res.status(503).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to process literature essay grading: ' + error.message });
  }
});

// POST /api/ai/grade-math: Uses Gemini API to evaluate and grade a student's math short answer
router.post('/ai/grade-math', authMiddleware, async (req: any, res) => {
  const { questionPrompt, correctAnswer, studentAnswer } = req.body;

  if (!questionPrompt || !correctAnswer || studentAnswer === undefined) {
    return res.status(400).json({ error: 'Missing questionPrompt, correctAnswer, or studentAnswer.' });
  }

  const prompt = `Bạn là một trợ lý ảo chấm bài Toán tự luận tuyển sinh 10 chuyên nghiệp.
Hãy so sánh câu trả lời của học sinh (studentAnswer) với đáp án chuẩn (correctAnswer) cho câu hỏi sau:
Đề bài: "${questionPrompt}"
Đáp án chuẩn: "${correctAnswer}"
Câu trả lời của học sinh: "${studentAnswer}"

Yêu cầu:
1. Đánh giá xem câu trả lời của học sinh có tương đương về mặt toán học với đáp án chuẩn hay không (ví dụ: x = 0.5 và x = 1/2 là tương đương, x = -1 và x = 1-2 là tương đương, cách viết tập nghiệm {1, 2} và x = 1 hoặc x = 2 là tương đương).
2. Bỏ qua các sai khác về khoảng trắng, cách viết hoa/thường, hoặc các ký tự trang trí không ảnh hưởng đến giá trị toán học.
3. Trả về định dạng JSON duy nhất như sau:
{
  "isCorrect": true/false,
  "explanation": "Lời giải thích ngắn gọn bằng tiếng Việt vì sao đúng/sai hoặc cách biến đổi tương đương."
}
Không thêm bất kỳ văn bản nào khác ngoài JSON này.`;

  try {
    const responseText = await callGeminiAPI(prompt, { responseMimeType: 'application/json', temperature: 0.1 });
    const result = JSON.parse(responseText.trim());
    res.json(result);
  } catch (error: any) {
    console.error('Lỗi gọi Gemini AI Grade Math:', error.message);
    if (error instanceof GeminiExhaustedError) {
      return res.status(503).json({ error: 'Gemini API keys exhausted. Please try again later.' });
    }
    // Fallback to exact match check
    const isExact = studentAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    res.json({
      isCorrect: isExact,
      explanation: 'Hệ thống AI bận, đã chấm điểm tự động qua so khớp chuỗi chính xác.'
    });
  }
});

export default router;
