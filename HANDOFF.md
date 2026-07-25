# HANDOFF - GameEngG10

## Trạng thái hệ thống hiện tại
1. **Khắc Phục Lỗi Đồng Bộ Profile Người Dùng Cũ Khi Đăng Nhập**:
   - **Mở rộng JWT Verification Algorithms**: Bổ sung đầy đủ các thuật toán chữ ký Supabase Auth (`ES256`, `RS256`, `HS256`,...) trong `backend/src/middleware/auth.ts`, khắc phục triệt để lỗi `401 Unauthorized: Invalid token`.
   - **Tự động liên kết Profile theo Email (`Auto-relink by Email`)**: Cập nhật `GET /api/profiles` và `POST /api/profiles/quick-start` tại `backend/src/routes/profiles.ts` tự động gán lại `account_id` mới dựa trên email Google nếu tài khoản bị thay đổi token hoặc reset phiên Auth.
   - **Báo lỗi minh bạch**: Cập nhật `src/store/slices/createAuthSlice.ts` phát Toast Alert nếu quá trình kết nối server tải danh sách hồ sơ thất bại.
2. **Danh Mục & Dropdown Liên Hoàn Chuẩn SGK (GDPT 2018)**:
   - **Migration SQL**: `backend/migrations/20260725_curriculum_textbooks_schema.sql` khởi tạo bảng `ge10_curriculum_textbooks` và thêm 2 cột `chapter_name`, `lesson_name` vào `ge10_lessons` & `ge10_custom_questions`.
   - **Dữ liệu Mẫu Toán 9**: Nạp 6 Chương & 21 Bài học chuẩn tên SGK tiếng Việt.
   - **Giao diện Dropdown Liên Hoàn (Cascade Dropdowns)**: Fullscreen Modal bài giảng & câu hỏi tích hợp bộ đôi **📚 Chọn Chương (SGK Chuẩn)** và **📖 Chọn Bài Học (SGK Chuẩn)**.

## Các file chính đã cập nhật
- [backend/src/middleware/auth.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/middleware/auth.ts): Mở rộng thuật toán JWT verification.
- [backend/src/routes/profiles.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/routes/profiles.ts): Auto-relink profile theo email và tối ưu quick-start profile.
- [src/store/slices/createAuthSlice.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/store/slices/createAuthSlice.ts): Hiển thị thông báo Toast nếu fetchProfiles bị lỗi.

## Bước tiếp theo (Next Steps)
- Tiếp tục nạp dữ liệu danh mục Chương & Bài chuẩn SGK cho các môn học khác (Tiếng Anh, Ngữ Văn, Vật Lý, Hóa Học, Sinh Học...) từ Lớp 6 đến Lớp 12.
