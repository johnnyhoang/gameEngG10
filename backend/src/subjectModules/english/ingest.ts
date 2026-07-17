export function getEnglishIngestPrompt(rawText: string): string {
  return `Bạn là một chuyên gia ôn thi tiếng Anh lớp 10 TP.HCM. Hãy phân tích đoạn văn bản sau đây và trích xuất/tạo ra câu hỏi theo đúng cấu trúc đề tuyển sinh lớp 10 TP.HCM môn Tiếng Anh. Đề chuẩn hóa có 6 phần:
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
