# HANDOFF - GameEngG10

## Trạng thái hệ thống hiện tại
1. **Dữ liệu 100% Động từ Database**:
   - Đã tạo bảng `ge10_match_pairs` trong PostgreSQL và migrate 24 cặp thẻ bài cho Minigame Ghép Cặp Bài Trùng.
   - Loại bỏ 100% các mảng tĩnh `ENGLISH_PAIRS`, `MATH_PAIRS`, `LITERATURE_PAIRS`, `GENERAL_PAIRS` hardcode trong code.
2. **Khắc Phục Dữ Liệu Thiếu & Đa Dạng Hóa Gợi Ý Cho Cả Bài Giảng & Câu Hỏi**:
   - **Tích hợp Bộ Chọn Khối Lớp (`formGradeTier` / `editGradeTier`)**: Bổ sung ô chọn **Khối lớp (Lớp 6 đến Lớp 12)** trực tiếp trong biểu mẫu Fullscreen Modal của cả Bài Giảng và Câu Hỏi, cho phép Giáo viên/Viện Trưởng dễ dàng xem và chuyển đổi lớp cho tài liệu.
   - **Bộ Gợi Ý Phong Phú (`Rich Presets Dropdown`)**: Mở rộng danh sách gợi ý cho 5 trường `Danh mục chuyên đề`, `Chủ đề bài giảng`, `Tiêu đề`, `Loại SGK` và `Số thứ tự Bài`. Danh sách gợi ý được kết hợp giữa danh mục mẫu chuẩn theo từng môn học + toàn bộ dữ liệu hiện có trong Database + Zustand Topic Store.
   - **Tự động điền thuộc tính SGK khuyết thiếu (`Auto-enrichment Fallback`)**: Khi mở hiệu đính bài giảng/câu hỏi cũ thiếu `loai` hoặc `bai`, hệ thống tự động gọi `enrichTextbookAttributes` để điền mẫu phù hợp (vd: `Đại số`, `Hình học`, `Grammar`...). Khi lưu, nếu để trống thì hệ thống tự bổ sung để không bản ghi nào bị thiếu thông tin SGK.
3. **Nâng Cấp Kiến Trúc Tương Quan Bài Giảng (Lesson) & Câu Hỏi (Question)**:
   - **Migration SQL**: `backend/migrations/20260725_upgrade_lesson_question_correlation.sql`.
   - **Mã `scopeCode` duy nhất SGK**: `${subject}_g${gradeTier}_${loai}_b${bai}`.
   - **Phân đoạn sư phạm (`pedagogicalPhase`)**: `illustration`, `comprehension`, `mastery`, `challenge`.

## Các file chính đã cập nhật
- [src/components/TutorConsole/LectureBankManager.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/TutorConsole/LectureBankManager.tsx): Thêm dropdown chọn Khối lớp, mở rộng rich presets cho 5 dropdown, auto-enrichment fallback cho SGK.
- [src/components/TutorConsole/Modals/QuestionFormModal.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/TutorConsole/Modals/QuestionFormModal.tsx): Thêm dropdown chọn Khối lớp, mở rộng rich presets và auto-enrichment fallback cho SGK.
- [backend/migrations/20260725_upgrade_lesson_question_correlation.sql](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/migrations/20260725_upgrade_lesson_question_correlation.sql): Migration SQL nâng cấp schema tương quan Bài Giảng - Câu Hỏi & Analytics.

## Bước tiếp theo (Next Steps)
- Tiến hành phân bổ/phân tích AI cho dữ liệu câu hỏi của các môn học khác ngoài môn Toán (như Tiếng Anh, Ngữ Văn, Khoa học...) theo đúng cấu hình chuyên đề và bài học trên DB.

