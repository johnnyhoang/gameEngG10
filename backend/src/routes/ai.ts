import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { callGeminiAPI, GeminiExhaustedError } from '../helpers/gemini.js';
import { persistCustomQuestion } from '../helpers/questions.js';

const router = express.Router();

// POST /api/ai/ingest: Uses Gemini API to parse raw text into structured grade 10 questions (English or Math)
router.post('/ai/ingest', authMiddleware, async (req: any, res) => {
  const userId = req.user.sub;
  const { rawText, subject = 'english' } = req.body;
  if (!rawText) return res.status(400).json({ error: 'Missing rawText.' });

  try {
    let prompt = '';
    if (subject === 'math') {
      prompt = `Bạn là một chuyên gia ôn thi môn Toán lớp 10 TP.HCM. Hãy phân tích đoạn văn bản sau đây và trích xuất/tạo ra câu hỏi theo đúng cấu trúc đề tuyển sinh Toán 10 TP.HCM. Đề thật thường chia theo 8 cụm nội dung: parabol/đồ thị, Vi-ét, hàm số bậc nhất/đổi đơn vị, tăng trưởng theo tỉ lệ phần trăm, giảm giá lũy tiến, hình học thể tích/dâng nước, mua hàng khuyến mãi, hình học phẳng chứng minh.

      Trả về kết quả duy nhất là một mảng JSON các đối tượng theo schema sau, không kèm theo markdown hay phần giải thích ngoài JSON:
      [
        {
          "id": "chuỗi ngẫu nhiên duy nhất",
          "type": "mcq" | "short-answer" | "proof" | "multi-part",
          "category": "parabol-line" | "viet-relation" | "linear-function" | "growth-modeling" | "percentage-discount" | "volume-displacement" | "shopping-discount" | "tangent-geometry" | "real-equations" | "real-geometry" | "real-finance" | "plane-geometry" | "statistics-probability" | "modeling",
          "prompt": "Đề bài câu hỏi. Nếu là bài chứng minh hoặc nhiều ý, hãy giữ nguyên a/b/c rõ ràng.",
          "options": ["Lựa chọn A", "Lựa chọn B", "Lựa chọn C", "Lựa chọn D"],
          "correctAnswer": "Đáp án đúng hoặc mảng các đáp án được chấp nhận",
          "explanation": "Giải thích chi tiết từng bước. Với bài hình hoặc chứng minh, tách các bước logic rõ ràng.",
          "difficulty": số từ 1 đến 10,
          "source": "AI Ingested Math",
          "metadata": {
            "examPart": "Bài 1|Bài 2|...",
            "mathTopic": "function-graph" | "quadratic-equation" | "linear-function" | "growth-modeling" | "percentage-discount" | "volume-displacement" | "shopping-discount" | "tangent-geometry" | "statistics-probability" | "modeling" | "solid-geometry" | "finance" | "plane-geometry" | "mixed",
            "answerMode": "single-choice" | "short-answer" | "proof" | "multi-part" | "numeric" | "expression",
            "solutionStyle": "direct" | "worked" | "proof-outline" | "diagram" | "table",
            "subparts": ["a", "b", "c"],
            "solutionSteps": ["Bước 1...", "Bước 2..."],
            "formulaHints": ["..."],
            "diagramHint": "...",
            "tags": ["official-exam", "hcmc-2026"]
          }
        }
      ]

      Văn bản cần phân tích:
      ${rawText}`;
    } else if (subject === 'literature') {
      prompt = `Bạn là một chuyên gia ôn thi môn Ngữ văn lớp 10 TP.HCM. Hãy phân tích đoạn văn bản sau đây và trích xuất/tạo ra các câu hỏi theo đúng cấu trúc đề tuyển sinh lớp 10 TP.HCM môn Ngữ văn. Ngân hàng câu hỏi phải bao phủ đủ 4 lớp nội dung:
      - "literature-reading-poetry": Đọc hiểu thơ.
      - "literature-reading-prose": Đọc hiểu truyện, kí, tản văn.
      - "literature-reading-argument": Đọc hiểu văn bản nghị luận hoặc văn bản thông tin.
      - "literature-vietnamese": Tiếng Việt thực hành: phương thức biểu đạt, biện pháp tu từ, thành phần câu, nghĩa từ, liên kết.
      - "literature-writing": Nghị luận xã hội và nghị luận văn học.

      Gợi ý phân tầng metadata để UI và CRUD hiểu đúng bank:
      - Phần I: reading, dùng cho câu nhận biết/thông hiểu/vận dụng đọc hiểu.
      - Phần II: vietnamese, dùng cho câu tiếng Việt thực hành.
      - Phần III: social-essay, dùng cho bài nghị luận xã hội.
      - Phần IV: literary-essay, dùng cho bài nghị luận văn học.
      - textGenre: poetry | prose | argument | informative | mixed.
      - literatureTask: main-idea | detail | rhetoric | vocabulary | message | social-essay | poetry-analysis | prose-analysis | character-analysis | comparison.
      - answerMode: single-choice | short-answer | multi-part.
      - solutionStyle: direct | worked | rubric.

      Lưu ý đặc biệt đối với đọc hiểu văn bản:
      Nếu câu hỏi có đi kèm một văn bản đọc hiểu (đoạn trích thơ/văn), hãy đặt văn bản đọc hiểu đó ở đầu thuộc tính "prompt" theo mẫu định dạng:
      "**Đọc đoạn trích sau và trả lời câu hỏi:**
[Đoạn văn bản trích dẫn]

[Câu hỏi cụ thể...]"

      Với câu nghị luận, hãy trả về các ý chấm/rubric dưới dạng mảng trong correctAnswer và solutionSteps để có thể tái dùng cho CRUD và hiển thị đáp án mẫu.

      Trả về kết quả duy nhất là một mảng JSON các đối tượng theo schema sau, không kèm theo markdown hay phần giải thích ngoài JSON:
      [
        {
          "id": "chuỗi ngẫu nhiên duy nhất",
          "type": "mcq" | "short-answer" | "multi-part",
          "category": "literature-reading-poetry" | "literature-reading-prose" | "literature-reading-argument" | "literature-vietnamese" | "literature-writing",
          "prompt": "Đề bài câu hỏi (kèm đoạn văn bản trích dẫn nếu có)...",
          "options": ["Lựa chọn A", "Lựa chọn B", "Lựa chọn C", "Lựa chọn D"],
          "correctAnswer": "Lựa chọn chính xác hoặc mảng các ý/keyword được chấp nhận",
          "explanation": "Giải thích chi tiết tại sao chọn đáp án đó hoặc rubric chấm bài...",
          "difficulty": số từ 1 đến 10,
          "source": "AI Ingested Literature",
          "metadata": {
            "examPart": "Phần I|Phần II|Phần III|Phần IV",
            "literatureTrack": "reading" | "vietnamese" | "social-essay" | "literary-essay",
            "literatureTask": "main-idea" | "detail" | "rhetoric" | "vocabulary" | "message" | "social-essay" | "poetry-analysis" | "prose-analysis" | "character-analysis" | "comparison",
            "textGenre": "poetry" | "prose" | "argument" | "informative" | "mixed",
            "answerMode": "single-choice" | "short-answer" | "multi-part",
            "solutionStyle": "direct" | "worked" | "rubric",
            "subparts": ["mở bài", "thân bài", "kết bài"],
            "solutionSteps": ["Bước 1...", "Bước 2..."],
            "tags": ["official-exam", "hcmc-2026"]
          }
        }
      ]

      Văn bản cần phân tích:
      ${rawText}`;
    } else {
      prompt = `Bạn là một chuyên gia ôn thi tiếng Anh lớp 10 TP.HCM. Hãy phân tích đoạn văn bản sau đây và trích xuất/tạo ra câu hỏi theo đúng cấu trúc đề tuyển sinh lớp 10 TP.HCM môn Tiếng Anh. Đề chuẩn hóa có 6 phần:
      - Part I: Multiple Choice (grammar, vocabulary, pronunciation, stress, communication, signs).
      - Part II: Guided Cloze.
      - Part III: Reading Comprehension (true/false, main idea, detail, reference).
      - Part IV: Word Forms.
      - Part V: Sentence Rearrangement.
      - Part VI: Sentence Transformation.

      Gợi ý phân tầng metadata để UI và CRUD hiểu đúng bank:
      - englishPart: Part I | Part II | Part III | Part IV | Part V | Part VI.
      - englishTask: grammar | vocabulary | pronunciation | stress | guided-cloze | reading-true-false | reading-mcq | word-form | rearrangement | transformation.
      - englishSkill: multiple-choice | guided-cloze | reading | word-form | rearrangement | transformation.
      - answerMode: single-choice | short-answer | multi-part.
      - solutionStyle: direct | worked | rubric.

      Trả về kết quả duy nhất là một mảng JSON các đối tượng theo schema sau, không kèm theo markdown hay phần giải thích ngoài JSON:
      [
        {
          "id": "chuỗi ngẫu nhiên duy nhất",
          "type": "mcq" | "wordform" | "rewrite" | "cloze" | "short-answer" | "multi-part",
          "category": "grammar" | "reading" | "vocabulary" | "wordform" | "pronunciation" | "stress" | "tenses" | "passive-voice" | "relative-clauses" | "rewrite",
          "prompt": "Đề bài câu hỏi...",
          "options": ["Lựa chọn A", "Lựa chọn B", "Lựa chọn C", "Lựa chọn D"],
          "correctAnswer": "Đáp án đúng hoặc mảng các đáp án được chấp nhận",
          "explanation": "Giải thích chi tiết tại sao chọn đáp án đó...",
          "difficulty": số từ 1 đến 10,
          "source": "AI Ingested English",
          "metadata": {
            "examPart": "Part I|Part II|Part III|Part IV|Part V|Part VI",
            "englishPart": "Part I|Part II|Part III|Part IV|Part V|Part VI",
            "englishTask": "grammar|vocabulary|pronunciation|stress|guided-cloze|reading-true-false|reading-mcq|word-form|rearrangement|transformation",
            "englishSkill": "multiple-choice|guided-cloze|reading|word-form|rearrangement|transformation",
            "answerMode": "single-choice|short-answer|multi-part",
            "solutionStyle": "direct|worked|rubric",
            "subparts": ["a", "b", "c"],
            "solutionSteps": ["Step 1...", "Step 2..."],
            "tags": ["official-exam", "hcmc-2026"]
          }
        }
      ]

      Văn bản cần phân tích:
      ${rawText}`;
    }

    const responseText = await callGeminiAPI(prompt, { responseMimeType: 'application/json' });
    const questions = JSON.parse(responseText.trim());

    // Save custom questions to PG custom_questions table
    for (const q of questions) {
      await persistCustomQuestion(userId, {
        id: q.id || `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...q,
        source: q.source || (subject === 'math' ? 'AI Ingested Math' : subject === 'literature' ? 'AI Ingested Literature' : 'AI Ingested English'),
        subject
      });
    }

    res.json({ success: true, questionsCount: questions.length, questions });
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
router.post('/api/ai/geometry-plane', authMiddleware, async (req: any, res) => {
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
router.post('/api/ai/function-graph', authMiddleware, async (req: any, res) => {
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
    const prompt = `Bạn là một giáo viên dạy Văn trung học phổ thông, chuyên chấm thi tuyển sinh lớp 10 môn Ngữ văn tại TP.HCM.
Nhiệm vụ của bạn là chấm điểm bài làm văn nghị luận của học sinh dựa trên đề bài, các từ khóa/ý chính cần có, và các bước giải quyết đề (rubric).

Yêu cầu chấm điểm và nhận xét:
1. Đánh giá xem bài làm có đáp ứng đề bài không, độ dài có phù hợp không (ví dụ đề yêu cầu khoảng 500 chữ thì bài làm cần đủ dung lượng tối thiểu 200-300 chữ, tối đa khoảng 600-700 chữ).
2. Kiểm tra xem học sinh có đưa vào bài viết các ý chính/từ khóa quan trọng hay không. Cần đánh giá theo mặt ý nghĩa/khái niệm chứ không chỉ so khớp từ ngữ thô cứng (ví dụ: học sinh dùng từ đồng nghĩa, diễn đạt khác nhưng vẫn đầy đủ ý thì vẫn tính là đạt).
3. Đánh giá tính liên kết, mạch lạc, lập luận logic của bài viết.
4. Đưa ra điểm số khách quan từ 0 đến 10 (chỉ lấy số nguyên).
5. Chỉ ra các ý chính cụ thể nào học sinh đã viết tốt (matchedKeywords) và các ý chính nào học sinh bị thiếu hoặc diễn đạt quá mờ nhạt (missingKeywords).
6. Viết một đoạn nhận xét chung ngắn gọn bằng tiếng Việt về ưu/nhược điểm (bố cục, hành văn, lập luận).
7. Đưa ra một vài gợi ý cụ thể để học sinh cải thiện.

Thông tin đầu vào:
- Đề bài: ${promptText}
- Bài làm của học sinh: ${essay}
- Các từ khóa/ý chính cần có: ${JSON.stringify(keywords)}
- Dàn ý/Rubric các bước gợi ý: ${JSON.stringify(rubric)}

Hãy trả về kết quả dưới dạng JSON duy nhất khớp chính xác với cấu trúc dưới đây:
{
  "score": 8,
  "matchedKeywords": ["ý 1", "ý 2"],
  "missingKeywords": ["ý 3", "ý 4"],
  "feedback": "Nhận xét chung ngắn gọn...",
  "suggestions": ["gợi ý 1", "gợi ý 2"]
}
Lưu ý: các phần tử trong matchedKeywords và missingKeywords phải lấy chính xác từ danh sách từ khóa/ý chính cần có đầu vào nếu chúng tương ứng với ý đó.`;

    const responseText = await callGeminiAPI(prompt, { responseMimeType: 'application/json', temperature: 0.2 });
    const parsed = JSON.parse(responseText.trim());
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
