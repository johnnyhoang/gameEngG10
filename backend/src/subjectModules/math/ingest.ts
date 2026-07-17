export function getMathIngestPrompt(rawText: string): string {
  return `Bạn là một chuyên gia ôn thi môn Toán lớp 10 TP.HCM. Hãy phân tích đoạn văn bản sau đây và trích xuất/tạo ra câu hỏi theo đúng cấu trúc đề tuyển sinh Toán 10 TP.HCM. Đề thật thường chia theo 8 cụm nội dung: parabol/đồ thị, Vi-ét, hàm số bậc nhất/đổi đơn vị, tăng trưởng theo tỉ lệ phần trăm, giảm giá lũy tiến, hình học thể tích/dâng nước, mua hàng khuyến mãi, hình học phẳng chứng minh.

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
}
