# Handoff Context — GameEngG10

## 1. Trạng thái hiện tại (Current Status)
- **Vừa hoàn thành:** 
   - **Khắc phục Lỗi lệch Đề thi & Câu hỏi (Không cùng loại)**:
      - Sửa đổi router `/game/session/start` tại backend [game.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/routes/game.ts) để tự động tra cứu `category` của bài học, lọc câu hỏi nghiêm ngặt theo đúng `lesson_id` và `category` của bài học đó. Loại bỏ hoàn toàn cơ chế fallback bốc ngẫu nhiên câu hỏi ngoài category khi thiếu đề.
      - Nhận tham số `lessonQuizCount` động từ client (thay vì bị giới hạn cứng 3 câu cho mỗi bài thi).
      - Cập nhật frontend [PlayArea.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/PlayArea.tsx) để truyền `lessonQuizCount` động lên backend và xóa bỏ logic tự ý nhét câu hỏi lệch category ở frontend.
   - **Sửa lỗi hiển thị Chuyên đề & Khoa thi**:
      - Khắc phục lỗi thiếu trường `subject` trong hàm `mapServerTopics` tại [helpers.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/store/helpers.ts), giải quyết triệt để lỗi giao diện báo "Chưa có chuyên đề thử thách..." và "Môn học này chưa thiết lập Khoa Thi" cho toàn bộ các môn học lớp 9.
   - **Đồng bộ hóa dữ liệu môn Nghệ thuật**:
      - Di trú cột `subject` từ `'art'` sang `'arts'` trong các bảng `ge10_lessons` và `ge10_textbook_mappings`, đảm bảo hiển thị đúng 5 bài học và 5 mappings SGK Nghệ thuật ở frontend.
   - **Tự động Phân bổ dữ liệu Câu hỏi Lớp 9**:
      - Viết và chạy thành công script [associate_questions_lessons_g9.js](file:///d:/Hoa%20Hoang/Apps/gameEngG10/scratch/associate_questions_lessons_g9.js) thực hiện so khớp từ khóa tiếng Việt/Anh thông minh, tự động liên kết thành công **589 câu hỏi** trong DB với `lesson_id` bài học tương ứng (Toán, Văn, Anh, KHTN, Sử Địa, Tin học, Công nghệ, GDCD, Nghệ thuật).
   - **Ánh xạ Sách giáo khoa lớp 9 (Kết nối tri thức)**:
      - Nạp 111 ánh xạ SGK mới vào bảng `ge10_textbook_mappings` trên Supabase PostgreSQL.
      - Map toàn bộ 142 bài học lớp 9 vào các bài học SGK tương ứng của 9 môn học với độ tương đồng >70%.
      - Các bài học nâng cao được xếp sau các bài SGK bằng số thứ tự `bai` lớn hơn.
   - **Kiểm thử**:
      - Chạy kiểm thử thành công bằng lệnh `npm run build` cục bộ mà không gặp lỗi bundle hay compile nào.
- **Task đang làm dở:** Không có.
- **Blockers:** Local Docker Desktop chưa được bật, khiến lệnh `docker-compose up -d --build` ở local bị lỗi kết nối Docker daemon.

## 2. Bước tiếp theo (Next Steps)
- Khi có yêu cầu tính năng hoặc thay đổi nghiệp vụ mới:
   1. Thống nhất ý tưởng -> cập nhật các spec tương ứng (`CORE_SPECS.md`, `SUB_SPEC_*.md`).
   2. Ghi backlog kỹ thuật chi tiết vào `TODO.md` (bao gồm cả phân tích impacts, change requests, conflicts) và trình người dùng phê duyệt.
   3. Tiến hành code, tối ưu hóa token và thực hiện kiểm thử `npm run build`.
   4. Cập nhật file `HANDOFF.md` này để bàn giao cho phiên tiếp theo.

## 3. Lịch sử thay đổi gần đây (Recent Changes)
- **2026-07-25:**
   - **Sửa lỗi lệch đề thi & Lọc câu hỏi nghiêm ngặt**:
      - Loại bỏ fallback câu hỏi khác category ở cả backend và frontend.
      - Nhận và gửi tham số `lessonQuizCount` linh hoạt cho bài thi bài học.
   - **Sửa lỗi hiển thị & Tự động Phân bổ Dữ liệu Câu hỏi Lớp 9**:
      - Sửa lỗi lọc topics ở frontend, hiển thị Chuyên đề và Khoa thi cho tất cả các môn lớp 9.
      - Đồng bộ subject `'art'` sang `'arts'` trong DB.
      - Liên kết thành công 589 câu hỏi lớp 9 với `lesson_id` tương ứng bằng script phân tích từ khóa thông minh.
   - **Ánh xạ Sách giáo khoa Lớp 9 KNTT**:
      - Hoàn tất nạp 111 ánh xạ SGK mới cho lớp 9. Map 142/142 bài học thành công, xử lý nhóm "Ngoài sách giáo khoa" tự động xếp sau các bài chính quy.
- **2026-07-23:**
   - **Tích hợp Quy trình Deploy tự động & Cập nhật `.agents/AGENTS.md`**:
      - Thêm mục `## 8. Quy trình Deploy tự động` vào `AGENTS.md` quy định rõ quy trình: checkcode -> commit & push GitHub -> rebuild Docker local.
