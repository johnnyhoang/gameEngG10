# HANDOFF - GameEngG10

## Trạng thái hệ thống hiện tại
1. **Dữ liệu 100% Động từ Database**:
   - Đã tạo bảng `ge10_match_pairs` trong PostgreSQL và migrate 24 cặp thẻ bài cho Minigame Ghép Cặp Bài Trùng.
   - Loại bỏ 100% các mảng tĩnh `ENGLISH_PAIRS`, `MATH_PAIRS`, `LITERATURE_PAIRS`, `GENERAL_PAIRS` hardcode trong code.
2. **Nâng cấp Giao diện Soạn Thảo & Hiệu Đính Bài Giảng + Câu Hỏi (Đồng bộ Fullscreen Modal)**:
   - Chuyển biểu mẫu Soạn Thảo / Hiệu Đính Bài Giảng và Chỉnh Sửa Câu Hỏi từ SideDrawer sang **Fullscreen Modal** toàn màn hình.
   - Tối ưu khu vực **Đề bài, Giải thích lời giải & Các lựa chọn** tự động mở rộng theo chiều cao màn hình với font mono chuyên nghiệp, hỗ trợ soạn thảo Markdown thoải mái.
   - Đồng bộ component `TypeableCombobox` cho các trường: **Kỹ năng (Category)**, **Phân loại SGK**, **Số thứ tự Bài (Số thực/lẻ)**, và **Nguồn (Source)**.
   - Danh sách gợi ý dropdown được truy vấn động (`distinct`) từ chính dữ liệu các câu hỏi / bài giảng hiện có của môn học & khối lớp tương ứng, hỗ trợ vừa chọn mẫu vừa gõ mới tự do.

## Các file chính đã cập nhật
- [src/components/TutorConsole/Modals/QuestionFormModal.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/TutorConsole/Modals/QuestionFormModal.tsx): Chuyển sang FullscreenModal, nâng cấp giao diện soạn thảo đề bài/lời giải rộng rãi, tích hợp TypeableCombobox gợi ý distinct.
- [src/components/TutorConsole/QuestionBankManager.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/TutorConsole/QuestionBankManager.tsx): Truyền danh sách `existingQuestions` để tính gợi ý distinct động cho câu hỏi.
- [src/components/TutorConsole/LectureBankManager.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/TutorConsole/LectureBankManager.tsx): Chuyển SideDrawer sang FullscreenModal, tích hợp TypeableCombobox với gợi ý distinct động theo môn/lớp.

## Bước tiếp theo (Next Steps)
- Tiến hành phân bổ/phân tích AI cho dữ liệu câu hỏi của các môn học khác ngoài môn Toán (như Tiếng Anh, Ngữ Văn, Khoa học...) theo đúng cấu hình chuyên đề và bài học trên DB.

