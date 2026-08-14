# HANDOFF - GameEngG10

## Trạng thái hệ thống hiện tại
1. **Chuẩn Hóa Toàn Diện Markdown & LaTeX Cho Bài Giảng Và Câu Hỏi Môn Toán**:
   - **Thành phần hiển thị (`MarkdownRenderer.tsx`)**:
     - Cấu hình an toàn KaTeX: `[rehypeKatex, { throwOnError: false, strict: false }]` ngăn chặn crash component khi gặp biểu thức toán học đặc biệt.
     - Bộ tiền xử lý `preprocessMathContent` chuyển đổi ký hiệu toán học Unicode (`²`, `³`, `√`, `π`, `Δ`, `Δ'`, `≤`, `≥`, `≠`, `≈`, `±`, `90°`, `\widehat{ABC}`, `\Delta ABC`,...) sang chuẩn LaTeX.
     - Xử lý chống nuốt dấu `*` và `_` làm sai định dạng in nghiêng Markdown.
     - Tự động tách dòng đẹp mắt cho các ý câu hỏi `a)`, `b)`, `c)`, `d)`.
   - **Bài giảng môn Toán (`lessonsData.ts` & `ge10_lessons`)**:
     - Chuẩn hóa toàn bộ 32 bài giảng môn Toán (Parabol, Hệ thức Vi-ét, Tài chính & Phần trăm, Tứ giác nội tiếp, Hình học không gian trụ/nón/cầu, Công thức nghiệm, Lượng giác...).
     - Đã xác thực tự động bằng KaTeX validator đạt **0 lỗi parse**.
   - **Ngân hàng câu hỏi môn Toán (`questionsData.json` & `ge10_custom_questions`)**:
     - Chuẩn hóa toàn bộ 497 câu hỏi môn Toán từ 71 base questions (bao gồm đề thi tuyển sinh 10 TP.HCM chính thức 2024, 2025, 2026 và câu hỏi ôn tập các khối lớp).
     - Đồng bộ chuẩn hóa toàn diện `prompt`, `options`, `correctAnswer`, `explanation`, `solutionSteps`.
     - Đã xác thực tự động bằng KaTeX validator đạt **0 lỗi parse**.
   - **Cơ sở dữ liệu & Migration**:
     - Tạo file migration `backend/migrations/20260814_format_math_latex.sql` cập nhật dữ liệu vào PostgreSQL DB.
     - Đăng ký vào mảng `MIGRATION_FILES` trong `backend/src/migrationRunner.ts`.
   - **Miniapp Sơ đồ tri thức (`MindmapApp.tsx`)**:
     - Tích hợp `MarkdownRenderer` và chuẩn hóa công thức toán học LaTeX.

## Các file chính đã cập nhật
- [src/components/Common/MarkdownRenderer.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/Common/MarkdownRenderer.tsx): Bộ xử lý tiền xử lý và render KaTeX an toàn.
- [backend/src/lessonsData.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/lessonsData.ts): 32 bài giảng môn Toán chuẩn Markdown & LaTeX.
- [backend/src/questionsData.json](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/questionsData.json): 497 câu hỏi môn Toán chuẩn LaTeX.
- [backend/migrations/20260814_format_math_latex.sql](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/migrations/20260814_format_math_latex.sql): SQL Migration cập nhật `ge10_lessons` và `ge10_custom_questions`.
- [backend/src/migrationRunner.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/migrationRunner.ts): Đăng ký chuỗi migration.
- [src/miniapps/mindmap/MindmapApp.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/miniapps/mindmap/MindmapApp.tsx): Hiển thị công thức mindmap với LaTeX.

## Bước tiếp theo (Next Steps)
- Tiếp tục nạp dữ liệu danh mục Chương & Bài chuẩn SGK cho các môn học khác (Tiếng Anh, Ngữ Văn, Vật Lý, Hóa Học, Sinh Học...) từ Lớp 6 đến Lớp 12.

