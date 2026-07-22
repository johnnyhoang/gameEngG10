# Handoff Context — GameEngG10

## 1. Trạng thái hiện tại (Current Status)
- **Vừa hoàn thành:** 
   - **Nâng cấp bài giảng (3-5 trang / 3.000-4.000 từ) và viết lại ngân hàng 1.000+ câu hỏi chuẩn hóa cho toàn bộ các môn Bậc Đại Học CS & Robotics**:
      - **Software Engineering (`cs_software_engineering`)**: 10 bài giảng nâng cấp (~3.200-4.000 ký tự mỗi bài, kèm bảng so sánh, ví dụ code Java/SQL/YAML, sơ đồ ASCII, ví dụ thực tế Netflix/Google) + 100 câu hỏi trắc nghiệm mới (4 đáp án cân bằng độ dài ±20%, xoay vòng vị trí A/B/C/D, distractor kỹ thuật thuyết phục).
      - **10 Môn Robotics Đại Học**:
         1. `cs_robotics_fundamentals` (10 bài ~3.510 ký tự/bài + 100 câu)
         2. `cs_robot_mechanics` (10 bài ~5.808 ký tự/bài + 100 câu)
         3. `cs_robot_perception` (10 bài ~3.932 ký tự/bài + 100 câu)
         4. `cs_navigation_motion` (10 bài ~2.332 ký tự/bài + 100 câu)
         5. `cs_robot_intelligence` (10 bài ~4.265 ký tự/bài + 100 câu)
         6. `cs_robot_programming` (10 bài ~3.198 ký tự/bài + 100 câu)
         7. `cs_embedded_hardware` (10 bài ~2.474 ký tự/bài + 100 câu)
         8. `cs_human_interaction` (10 bài ~4.857 ký tự/bài + 100 câu)
         9. `cs_robotics_engineering` (10 bài ~3.427 ký tự/bài + 100 câu)
         10. `cs_specialized_robotics` (10 bài ~2.194 ký tự/bài + 100 câu)
      - **6 Môn Khoa Học Máy Tính (Computer Science)**:
         1. `cs_programming` (10 bài ~2.873 ký tự/bài + 100 câu)
         2. `cs_algorithms_structures` (10 bài ~2.240 ký tự/bài + 100 câu)
         3. `cs_computer_systems` (10 bài ~3.798 ký tự/bài + 100 câu)
         4. `cs_database_data` (10 bài ~3.552 ký tự/bài + 100 câu)
         5. `cs_networking_security` (10 bài ~3.713 ký tự/bài + 100 câu)
         6. `cs_artificial_intelligence` (10 bài ~3.558 ký tự/bài + 100 câu)
   - **Đã nạp trực tiếp và kiểm tra trong PostgreSQL**:
      - Toàn bộ dữ liệu bài giảng và câu hỏi được nạp vào DB qua Node.js parameterized queries (`.cjs` scripts), đảm bảo 100% chuẩn mã UTF-8.
      - Đã liên kết đúng `lesson_id` giữa `ge10_custom_questions` và `ge10_lessons`.
      - Đã commit & push lên GitHub repository (`main` branch).
- **Task đang làm dở:** Không có.
- **Blockers:** Không có.

## 2. Bước tiếp theo (Next Steps)
- Khi có yêu cầu tính năng hoặc thay đổi nghiệp vụ mới:
   1. Thống nhất ý tưởng -> cập nhật các spec tương ứng (`CORE_SPECS.md`, `SUB_SPEC_*.md`).
   2. Ghi backlog kỹ thuật chi tiết vào `TODO.md` (bao gồm cả phân tích impacts, change requests, conflicts) và trình người dùng phê duyệt.
   3. Tiến hành code, tối ưu hóa token và thực hiện kiểm thử `npm run build`.
   4. Cập nhật file `HANDOFF.md` này để bàn giao cho phiên tiếp theo.

## 3. Lịch sử thay đổi gần đây (Recent Changes)
- **2026-07-22:**
   - **Nâng cấp giao diện Admin Dashboard & Nhật ký hoạt động (Mobile First) + Auto Refresh Shop**:
      - Thêm nút "Đồng bộ dữ liệu" (Reload Dashboard) ở header Phòng Điều Hành để cập nhật nhanh tức thời.
      - Tự động gọi `fetchAuditLogs` sau mỗi thao tác quản trị (nạp năng lượng, duyệt quà...) giúp đồng bộ hóa lịch sử ngay lập tức.
      - Phân trang nhật ký (hiển thị 10 dòng đầu kèm nút Tải thêm nhật ký).
      - Tối ưu hóa UI mobile cho phần nhật ký quyết nghị bằng dạng danh sách các thẻ (Cards) thay vì bảng dữ liệu cồng kềnh, cải thiện đáng kể trải nghiệm di động.
      - Thiết lập `setInterval` tự động làm mới giá cả, số lượng quà tặng lớp và ví Ruby của học sinh trong Cửa hàng (ItemShop) định kỳ 1 phút/lần.
- **2026-07-20:**
   - **Hoàn thành nâng cấp chất lượng bài giảng & câu hỏi cho tất cả 17 môn CS & Robotics Đại Học**:
      - Viết lại 170 bài giảng với độ dài 3-5 trang (2.500–5.800 ký tự mỗi bài), tích hợp sơ đồ ASCII, bảng so sánh, code ví dụ thực tế.
      - Tạo 1.700 câu hỏi trắc nghiệm mới, loại bỏ hoàn toàn pattern "câu dài nhất là đúng", xoay vòng vị trí đáp án A/B/C/D đồng đều, các lựa chọn sai (distractors) có tính thuyết phục kỹ thuật cao.
      - Push toàn bộ code và dữ liệu di trú lên GitHub repository.
- **2026-07-18:**
   - **Hoàn thành trọn vẹn 10 môn chuyên ngành Robotics:** Tạo, tích hợp và chạy di trú toàn bộ 100 bài giảng, 1000 câu hỏi chất lượng cao và cấu hình đấu Boss cho 10 môn học thuộc ngành Robotics của Bậc Đại Học - CS.
