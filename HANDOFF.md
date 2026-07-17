# Handoff Context — GameEngG10

## 1. Trạng thái hiện tại (Current Status)
- **Vừa hoàn thành:** 
   - **Hoàn thiện CRUD Quà Khuyến Học Của Trường**: Bổ sung tính năng Chỉnh sửa (Update) cho phần quà chung của trường trong [RewardManager.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/TutorConsole/RewardManager.tsx) (cho phép sửa Tên quà, Giá ruby, Số lượng tổng và Số lượng còn lại trực tiếp thông qua một SideDrawer).
   - **Sửa lỗi hiển thị dữ liệu Sĩ Tử trong Roster**: Trong [MemberRoster.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/TutorConsole/MemberRoster.tsx), chuyển đổi cách đọc dữ liệu Sĩ tử sang cấu trúc phẳng (truy xuất trực tiếp `level`, `streak`, `xp` thay vì qua `player` lồng), sửa logic tìm Người Quản Lý theo `link_type === 'primary'` và cập nhật hàng trống `colSpan={8}` giúp hiển thị Cấp độ, Danh hiệu, Chuỗi chuyên cần, Tích lũy XP và Người quản lý chính xác 100%.
   - **Tự động kết nối Ban Giám Hiệu Đồng Hành**:
      - Tạo migration [20260717_auto_connect_admins.sql](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/migrations/20260717_auto_connect_admins.sql) tự động tạo liên kết hoạt động (`active`) cho tất cả các Viện Trưởng (`truong_vien`) và Phó Viện Trưởng (`pho_vien`) hiện có.
      - Cập nhật logic duyệt Phó Viện Trưởng trong [admin.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/routes/admin.ts) để tự động chèn liên kết `admin_connection` hoạt động ngay khi Viện Trưởng duyệt thăng cấp thành công.
   - **Giữ Preview Mode khi hiệu đính bài giảng**: Thay đổi logic trong [LectureBankManager.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/TutorConsole/LectureBankManager.tsx) để khi bấm nút di chuyển "Bài trước" / "Bài sau", giao diện xem thử bài giảng tiếp theo vẫn được giữ nguyên Preview Mode thay vì bị reset về Form chỉnh sửa.
   - **Build Verification**: Chạy `npm run build` thành công 100% không phát sinh lỗi biên dịch TypeScript hay Vite đóng gói.
- **Task đang làm dở:** Không có.
- **Blockers:** Không có.
 
## 2. Bước tiếp theo (Next Steps)
- Khi có yêu cầu tính năng hoặc thay đổi nghiệp vụ mới:
   1. Thống nhất ý tưởng -> cập nhật các spec tương ứng (`CORE_SPECS.md`, `SUB_SPEC_*.md`).
   2. Ghi backlog kỹ thuật chi tiết vào `TODO.md` (bao gồm cả phân tích impacts, change requests, conflicts) và trình người dùng phê duyệt.
   3. Tiến hành code, tối ưu hóa token và thực hiện kiểm thử `npm run build`.
   4. Cập nhật file `HANDOFF.md` này để bàn giao cho phiên tiếp theo.
 
## 3. Lịch sử thay đổi gần đây (Recent Changes)
- **2026-07-17:**
   - Hoàn thiện CRUD Quà Trường, sửa hiển thị Sĩ Tử ở Member Roster, tự động liên kết Ban Giám Hiệu đồng hành và giữ Preview Mode khi di chuyển bài giảng trong Kho bài giảng.
   - Dọn dẹp liên kết nhanh dư thừa trên top nav cho học sinh và tối ưu layout cột đứng cho Sân Thú + Nhật ký MIKA trong Funzone.
   - Tích hợp kết xuất Markdown + KaTeX + Highlight.js cho bài giảng, đề bài, lời giải và phản hồi AI.
   - Khắc phục lỗi trùng lặp profile: Cập nhật API check trùng profile, viết SQL dọn dẹp profile thừa (gộp Ruby/XP) và tạo Unique Index trên `ge10_users(account_id, role)`.
   - Refactor hiển thị Nhật ký quyết nghị (`AuditLogsManager.tsx`): dịch toàn bộ action và payload JSON sang tiếng Việt tự nhiên, ẩn ID kỹ thuật.
   - Giao diện Quà Khuyến Học (`RewardManager.tsx`): chỉ hiển thị Quà Khuyến Học Của Lớp cho Giáo viên chủ nhiệm, ẩn đối với Ban Giám Hiệu và chỉ giữ lại Quà Khuyến Học Của Trường trên trang chính.
   - Thiết lập hệ thống Guidelines mới (`AGENTS.md`) và khởi tạo file `HANDOFF.md`.
