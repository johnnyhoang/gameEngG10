# Handoff Context — GameEngG10

## 1. Trạng thái hiện tại (Current Status)
- **Vừa hoàn thành:** 
   - Tinh giản Hero Greeting trên trang học sinh (`AcademyTab.tsx`):
      - Loại bỏ các badge trùng lặp (Streak, Level, Môn học) vì các chỉ số này đã xuất hiện đầy đủ ở Top HUD và mục Tiến độ tu học.
      - Xóa hoàn toàn hộp phụ EXP + Energy mini (EXP, Energy, Ruby) bên phải giúp giao diện cực kỳ gọn gàng.
      - Chỉ giữ lại 2 badge hữu ích là Lớp chủ nhiệm ("Lớp: ...") và Phong cách học đường ("Phong Cách: ...").
   - Tối ưu hóa "Dòng hoạt động" (Activity Log):
      - Loại bỏ giới hạn chiều cao tĩnh `max-h-[480px]` ở `ActivityLog.tsx`.
      - Chuyển wrapper chứa ActivityLog ở cột phải `AcademyTab.tsx` thành `h-full flex flex-col` giúp card kéo giãn tự nhiên theo chiều cao cột bên trái, lấp đầy không gian đến sát biên dưới, giải quyết triệt để khoảng trống dư thừa lãng phí.
   - Sửa triệt để các lỗi TypeScript phát sinh do unused imports/variables (`player`, `activeSubjectConfig`, `SUBJECTS_CONFIG`, `isEnglish`, `Zap`, `Star`, `Flame`).
   - Chạy `npm run build` thành công, không lỗi biên dịch.
   - Tinh giản giao diện học sinh (lượt trước): Loại bỏ các liên kết nhanh dư thừa/trùng lặp trên top nav (`TopHUD.tsx`) gồm Bản đồ, Cửa hàng, Sân thú, Học tịch. Tránh gây loãng thông tin và tập trung trải nghiệm vào thanh điều hướng 5 tab chính ở dưới.
   - Sửa lỗi tiêu đề trùng lặp và tối ưu layout trong tab **Funzone**:
      - Loại bỏ thẻ tiêu đề "🐷 Sân Thú Nuôi" trùng lặp ở `FunzoneTab.tsx`, nhường quyền hiển thị duy nhất cho tiêu đề bên trong `PetSanctuary.tsx`.
      - Chuyển bố cục hiển thị **Nhật ký MIKA** từ chia 2 cột ngang (`grid-cols-2`) thành dạng xếp dọc (`flex-col`) nằm ngay dưới khu chăm sóc thú nuôi để hiển thị rộng rãi, chuẩn đẹp trong cột sidebar 1/3.
   - Tinh giản **Công Viên Thư Giãn (Khu Thám Hiểm)**:
      - Loại bỏ nút "Bản Đồ Chính" (Back) thừa ở header của `RelaxationZone.tsx`.
      - Thu gọn các card minigame: Xóa nút "Vào Chơi" cồng kềnh, người dùng nhấp trực tiếp vào card để chơi, tích hợp badge tiêu hao năng lượng (`⚡ 10⚡`) tinh tế ở góc dưới bên phải (sẽ tự động đổi sang màu đỏ báo hiệu khi học sinh hết năng lượng).
      - Xử lý triệt để các cảnh báo TypeScript (unused imports/vars).
   - Thêm chú thích giải thích trực quan cho nút "Luyện tập tổng hợp" tại `PracticeHall.tsx` để học sinh hiểu rõ cơ chế tự động chuyển bài giảng hoặc trộn đề ngẫu nhiên.
   - Clean dọn dẹp **Phòng Luyện Tập (Hang Luyện)**:
      - Loại bỏ hoàn toàn cột sidebar bên phải chứa **Sổ tay lỗi sai** và **Nguồn học liệu tham khảo**.
      - Di chuyển **Kho Nền Tảng tương tác trực quan** nhúng gọn gàng vào trong Header Card phía trên (phân cách bằng viền nét đứt mỏng), giúp tinh giản giao diện đáng kể.
      - Đổi tên tiêu đề của cụm công cụ này thành **"Công cụ học tập tương tác"** và thiết lập ánh xạ giới thiệu (introduce) động khác nhau cho từng môn học (Toán, Anh, Văn) để học sinh nắm rõ vai trò công cụ.
      - Chuyển bố cục từ grid 2 cột sang layout 1 cột dọc (`space-y-6`) rộng rãi, dễ theo dõi.
      - Loại bỏ hoàn toàn phần **Câu hỏi mẫu** (🎯 Câu hỏi mẫu) ở cuối trang để làm sạch giao diện.
      - Xóa bỏ các state (`noteText`), effect lưu note, các hàm `useMemo` tính toán câu hỏi mẫu và các import không còn sử dụng (`getSubjectActivities`).
   - Tái cấu trúc **Sổ Tu Học (Learning Ledger)** tại trang Học Viện:
      - Loại bỏ hoàn toàn khối accordion header và tiêu đề "Sổ Tu Học" bị lỗi loading vô hạn.
      - Trực tiếp render danh sách nhiệm vụ Nhập Môn (Onboarding), Nhiệm Vụ Hôm Nay (Daily Missions) và Tiến độ học tập ra màn hình dưới dạng grid layout 3 cột mượt mà.
      - Loại bỏ cơ chế Offline Fallback (nhiệm vụ giả lập) ở phía client theo yêu cầu để Sổ Tu Học luôn kết nối tới backend thực tế.
      - Sửa lỗi treo deadlock ở phía backend Node.js: gỡ bỏ hoàn toàn block transaction (`BEGIN`, `COMMIT`, `ROLLBACK`) trong route `GET /api/mission-ledger` (file `backend/src/routes/missionLedger.ts`). Việc gọi transaction chứa thao tác chèn/cập nhật tranh chấp lock đồng thời với request `sync` ở màn hình chính là nguyên nhân gốc rễ gây deadlock và cạn kiệt connection pool của PostgreSQL, làm các request bị đứng.
      - Chèn vòng xoay loading nhỏ bên trong thay vì đơ loading toàn màn hình, nâng cao trải nghiệm người dùng.
      - Dọn dẹp các prop không sử dụng (`compact`, `defaultExpanded`) tại `AcademyTab.tsx`.
   - Thực hiện kiểm tra lỗi biên dịch TypeScript và đóng gói thành công (`npm run build` và `npm run build:backend` chạy thành công không có lỗi).
   - Đã cập nhật [walkthrough.md](file:///C:/Users/hoa.hoang/.gemini/antigravity/brain/d444f40c-00d9-41ee-9b45-f0471956fcb4/walkthrough.md).
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
   - Dọn dẹp liên kết nhanh dư thừa trên top nav cho học sinh và tối ưu layout cột đứng cho Sân Thú + Nhật ký MIKA trong Funzone.
   - Tích hợp kết xuất Markdown + KaTeX + Highlight.js cho bài giảng, đề bài, lời giải và phản hồi AI.
   - Khắc phục lỗi trùng lặp profile: Cập nhật API check trùng profile, viết SQL dọn dẹp profile thừa (gộp Ruby/XP) và tạo Unique Index trên `ge10_users(account_id, role)`.
   - Refactor hiển thị Nhật ký quyết nghị (`AuditLogsManager.tsx`): dịch toàn bộ action và payload JSON sang tiếng Việt tự nhiên, ẩn ID kỹ thuật.
   - Tối giản tiêu đề Quà Trường trong `RewardManager.tsx` (loại bỏ tiêu đề panel trùng lặp).
   - Sửa đổi giao diện Quà Khuyến Học (`RewardManager.tsx`): chỉ hiển thị Quà Khuyến Học Của Lớp cho Giáo viên chủ nhiệm, ẩn đối với Ban Giám Hiệu và chỉ giữ lại Quà Khuyến Học Của Trường trên trang chính.
   - Sửa lỗi build TypeScript dư thừa import trong `TutorConsole.tsx`.
   - Thiết lập hệ thống Guidelines mới (`AGENTS.md`) và khởi tạo file `HANDOFF.md`.
