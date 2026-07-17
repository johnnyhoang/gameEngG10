export function getLiteratureIngestPrompt(rawText: string): string {
  return `Bạn là một chuyên gia ôn thi môn Ngữ văn lớp 10 TP.HCM. Hãy phân tích đoạn văn bản sau đây và trích xuất/tạo ra các câu hỏi theo đúng cấu trúc đề tuyển sinh lớp 10 TP.HCM môn Ngữ văn. Ngân hàng câu hỏi phải bao phủ đủ 4 lớp nội dung:
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
}
