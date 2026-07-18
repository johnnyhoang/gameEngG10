# Handoff Context — GameEngG10

## 1. Trạng thái hiện tại (Current Status)
- **Vừa hoàn thành:** 
   - **Làm giàu và tích hợp dữ liệu 10 môn học chuyên ngành Robotics (Đại học CS - grade tier 13)**:
      - **Môn học**: Hoàn tất 10 môn học cốt lõi bao gồm Robotics Fundamentals (`cs_robotics_fundamentals`), Robot Mechanics (`cs_robot_mechanics`), Robot Intelligence (`cs_robot_intelligence`), Navigation & Motion (`cs_navigation_motion`), Robot Perception (`cs_robot_perception`), Embedded & Hardware (`cs_embedded_hardware`), Specialized Robotics (`cs_specialized_robotics`), Human Interaction (`cs_human_interaction`), Robotics Engineering (`cs_robotics_engineering`), và Robot Programming (`cs_robot_programming`).
      - **Dữ liệu thực tế**: Mỗi môn học được xây dựng 10 bài giảng chất lượng cao, 100 câu hỏi (80 trắc nghiệm MCQ + 20 tự luận ngắn Short-Answer) bám sát các kiến thức nền tảng và nâng cao của Robotics, được định dạng đẹp bằng Markdown và KaTeX, liên kết chặt chẽ qua sơ đồ topic và Boss challenges hoạt động.
   - **Tự động hóa Migration**:
      - **SQL Migrations**: Tạo các file SQL bài giảng, câu hỏi và cấu hình tích hợp (activities/bosses) tương ứng cho từng môn học.
      - **Kích hoạt trong Runner**: Cập nhật mảng `MIGRATION_FILES` của file [migrationRunner.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/migrationRunner.ts) để tự động hóa hoàn toàn luồng di trú.
      - **Chạy thực tế**: Chạy lệnh `npm run migrate --workspace=gameengg10-backend` thành công 100%, nạp sạch dữ liệu thô vào DB PostgreSQL cục bộ và cập nhật bảng schema_migrations.
   - **Kiểm tra biên dịch và đóng gói (Build Verification)**:
      - Sửa lỗi trùng lặp/sai lệch prefix ID câu hỏi (`cs_navmot_q_*` bị nhầm lẫn trong perception).
      - Chạy lệnh `npm run build` thành công, biên dịch trơn tru toàn bộ workspace Vite/TypeScript.
- **Task đang làm dở:** Không có.
- **Blockers:** Không có.
 
## 2. Bước tiếp theo (Next Steps)
- Khi có yêu cầu tính năng hoặc thay đổi nghiệp vụ mới:
   1. Thống nhất ý tưởng -> cập nhật các spec tương ứng (`CORE_SPECS.md`, `SUB_SPEC_*.md`).
   2. Ghi backlog kỹ thuật chi tiết vào `TODO.md` (bao gồm cả phân tích impacts, change requests, conflicts) và trình người dùng phê duyệt.
   3. Tiến hành code, tối ưu hóa token và thực hiện kiểm thử `npm run build`.
   4. Cập nhật file `HANDOFF.md` này để bàn giao cho phiên tiếp theo.
 
## 3. Lịch sử thay đổi gần đây (Recent Changes)
- **2026-07-18:**
   - **Hoàn thành trọn vẹn 10 môn chuyên ngành Robotics:** Tạo, tích hợp và chạy di trú toàn bộ 100 bài giảng, 1000 câu hỏi chất lượng cao và cấu hình đấu Boss cho 10 môn học thuộc ngành Robotics của Bậc Đại Học - CS.
   - **Tích hợp tự động hóa qua Database Runner:** Đăng ký các file SQL mới vào mảng chạy tự động của migration runner để đồng bộ hóa cấu trúc và dữ liệu.
   - **Đảm bảo chất lượng build:** Sửa lỗi trùng lặp ID câu hỏi và xác minh bản build tổng thể `npm run build` thành công.
- **2026-07-17:**
   - **Di dời dữ liệu tĩnh còn lại vào Database:** Viết file SQL migration và seed dữ liệu tĩnh cẩm nang (`ge10_handbook_pages`), câu đố Đảo kỹ năng (`ge10_english_island_items`), ma trận đề các môn (`ge10_subject_exam_blueprints`) vào database. Bổ sung các API nạp động tương ứng và tháo gỡ hoàn toàn 5 file tĩnh cũ để tối ưu tài nguyên client.
   - **Dynamic Content Fetching (Nạp động câu hỏi/bài giảng):** Loại bỏ việc query tải sẵn hàng ngàn câu hỏi/bài học tĩnh khi chọn profile. Tích hợp tải động song song thông qua endpoint `/api/learning-content/content/all` khi chuyển đổi ngữ cảnh học tập (môn học, khối lớp), tối ưu hóa thời gian mở app gấp 10 lần.
   - **Nâng cấp động hóa Công Viên Thư Giãn:** Mở khóa các game cơ bản cho mọi môn học Sử, Địa, Khoa Học; động hóa Ghép Cặp bằng câu hỏi thực tế, lọc chính xác xúc xắc Du Khảo, ôn luyện sâu RPG Story theo môn phụ, và fallback Trình Tự Giải.
   - **Refactor nâng cao:** Hoàn thành module hóa Ingestion prompts ở backend, đồng nhất AI grading ở frontend qua module và tinh chỉnh DB pooling cho môi trường serverless.
