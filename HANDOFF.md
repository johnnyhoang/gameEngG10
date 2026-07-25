# HANDOFF - GameEngG10

## Trạng thái hệ thống hiện tại
1. **Danh Mục & Dropdown Liên Hoàn Chuẩn SGK (GDPT 2018)**:
   - **Migration SQL**: `backend/migrations/20260725_curriculum_textbooks_schema.sql` khởi tạo bảng `ge10_curriculum_textbooks` và thêm 2 cột `chapter_name`, `lesson_name` vào `ge10_lessons` & `ge10_custom_questions`.
   - **Dữ liệu Mẫu Toán 9**: Nạp 6 Chương & 21 Bài học chuẩn tên SGK tiếng Việt.
   - **Giao diện Dropdown Liên Hoàn (Cascade Dropdowns)**: Fullscreen Modal bài giảng & câu hỏi tích hợp bộ đôi **📚 Chọn Chương (SGK Chuẩn)** và **📖 Chọn Bài Học (SGK Chuẩn)**. Chọn Chương tự động lọc Bài thuộc Chương đó; chọn Bài tự động điền `Loại SGK`, `Số thứ tự Bài`, `Tiêu đề bài giảng`.
2. **Khắc Phục Dữ Liệu Thiếu & Đa Dạng Hóa Gợi Ý**:
   - **Bộ Chọn Khối Lớp (`formGradeTier` / `editGradeTier`)**: Ô chọn **Khối lớp (Lớp 6 đến Lớp 12)** trực tiếp trong Fullscreen Modal.
   - **Bộ Gợi Ý Phong Phú (`Rich Presets Dropdown`)**: Mở rộng danh sách gợi ý cho 5 trường `Danh mục chuyên đề`, `Chủ đề bài giảng`, `Tiêu đề`, `Loại SGK` và `Số thứ tự Bài`.
   - **Tự động điền thuộc tính SGK khuyết thiếu (`Auto-enrichment Fallback`)**: Điền mẫu thông số SGK phù hợp nếu thiếu.
3. **Nâng Cấp Kiến Trúc Tương Quan Bài Giảng (Lesson) & Câu Hỏi (Question)**:
   - **Mã `scopeCode` duy nhất SGK**: `${subject}_g${gradeTier}_${loai}_b${bai}`.
   - **Phân đoạn sư phạm (`pedagogicalPhase`)**: `illustration`, `comprehension`, `mastery`, `challenge`.

## Các file chính đã cập nhật
- [backend/migrations/20260725_curriculum_textbooks_schema.sql](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/migrations/20260725_curriculum_textbooks_schema.sql): Schema & Seed Data cho Sách Giáo Khoa chuẩn.
- [backend/src/routes/textbookMappings.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/routes/textbookMappings.ts): Endpoint GET `/api/curriculum/textbooks`.
- [src/components/TutorConsole/LectureBankManager.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/TutorConsole/LectureBankManager.tsx): Dropdown Chương & Bài học liên hoàn cho Bài Giảng.
- [src/components/TutorConsole/Modals/QuestionFormModal.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/TutorConsole/Modals/QuestionFormModal.tsx): Dropdown Chương & Bài học liên hoàn cho Câu Hỏi.

## Bước tiếp theo (Next Steps)
- Tiếp tục nạp dữ liệu danh mục Chương & Bài chuẩn SGK cho các môn học khác (Tiếng Anh, Ngữ Văn, Vật Lý, Hóa Học, Sinh Học...) từ Lớp 6 đến Lớp 12.

