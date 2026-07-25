# HANDOFF - GameEngG10

## Trạng thái hệ thống hiện tại
1. **Khắc Phục Lỗi Đồng Bộ Profile & Giao Diện Báo Lỗi Chuyên Dụng**:
   - **Giao diện Báo Lỗi Hồ Sơ (Error Panel)**: Cập nhật `src/components/ProfileSelectionScreen.tsx` hiển thị Panel Cảnh Báo Lỗi chuyên dụng (với nút "Thử lại 🔄" và "Đăng xuất") khi quá trình tải danh sách hồ sơ gặp sự cố kết nối. Tuyệt đối không hiển thị các nút "Trở thành Sĩ Tử / Trở thành Chủ Nhiệm" (tạo mới) để tránh việc người dùng bấm nhầm tạo trùng lặp khi chưa lấy được dữ liệu cũ.
   - **Mở rộng JWT Verification Algorithms**: Bổ sung đầy đủ các thuật toán chữ ký Supabase Auth (`ES256`, `RS256`, `HS256`,...) trong `backend/src/middleware/auth.ts`.
   - **Tự động liên kết Profile theo Email (`Auto-relink by Email`)**: Cập nhật `GET /api/profiles` và `POST /api/profiles/quick-start` tại `backend/src/routes/profiles.ts` tự động gán lại `account_id` mới dựa trên email Google.
   - **Vercel Serverless Express Routing**: Thêm `api/index.ts` và rewrite rule `/api/(.*)` trong `vercel.json` giúp Vercel định tuyến chính xác API requests về Express backend.

## Các file chính đã cập nhật
- [src/components/ProfileSelectionScreen.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/ProfileSelectionScreen.tsx): Render Error Panel khi gặp lỗi tải hồ sơ.
- [src/store/slices/createAuthSlice.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/store/slices/createAuthSlice.ts): Quản lý `profilesError` trong Zustand store.
- [src/store/types.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/store/types.ts): Thêm `profilesError` vào `StoreState`.
- [api/index.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/api/index.ts): Entrypoint Vercel Serverless Function cho Express Backend.
- [vercel.json](file:///d:/Hoa%20Hoang/Apps/gameEngG10/vercel.json): Điều hướng API requests về serverless function.

## Bước tiếp theo (Next Steps)
- Tiếp tục nạp dữ liệu danh mục Chương & Bài chuẩn SGK cho các môn học khác (Tiếng Anh, Ngữ Văn, Vật Lý, Hóa Học, Sinh Học...) từ Lớp 6 đến Lớp 12.
