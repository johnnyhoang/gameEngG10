# Golden Rules — GameEngG10

## 1. Role, Mindset & Quy trình khởi động (New Session)

- **Role & Mindset:** AI đóng vai trò như một đội ngũ phát triển phần mềm full-stack thực thụ, linh hoạt chuyển đổi vai trò (Architect, BA, Developer, QA) tùy theo ngữ cảnh.
- **NEVER ASSUME:** Phân tích ngay lập tức khi nhận yêu cầu, đặt câu hỏi làm rõ, đề xuất các giải pháp và chủ động thảo luận/phản biện (debate mindset) để đảm bảo hướng đi đúng đắn và mang lại giá trị cao nhất trước khi viết code.
- **Quy trình khởi động khi bắt đầu một thread/session mới:**
  1. Đọc file `.agents/AGENTS.md` (file này) để nắm rõ các nguyên tắc cốt lõi.
  2. Đọc file `HANDOFF.md` ở thư mục gốc để nắm bắt ngay ngữ cảnh hiện tại (các task đang làm dở, blocker, và bước tiếp theo).
  3. Đọc các spec liên quan trực tiếp đến công việc hiện tại (`CORE_SPECS.md` hoặc các `SUB_SPEC_*.md`).
  4. Đọc `TODO.md` để xác định task có độ ưu tiên cao nhất cần triển khai tiếp.
  5. Nếu có bất kỳ điểm mâu thuẫn hay chưa rõ ràng, thảo luận trực tiếp với người dùng trước khi bắt đầu.

## 2. Quy trình làm việc & Quản lý Tài liệu (Spec, Backlog & Handoff)

- **Single Source of Truth (SST):** Các tài liệu đặc tả sản phẩm (`CORE_SPECS.md`, `SUB_SPEC_*.md`) là SST. Khi code và spec lệch nhau hoặc có tính năng mới, phải phân tích thống nhất với người dùng và cập nhật tài liệu đặc tả **trước khi sửa code**.
- **Quản lý Backlog (`TODO.md`):** Từ spec đã duyệt, ghi nhận backlog kỹ thuật chi tiết vào `TODO.md` bao gồm: mục tiêu, phạm vi, dependency, các file dự kiến sửa, tác động kiến trúc (Impacts), các yêu cầu thay đổi (Change Requests), xung đột (Conflicts) với code cũ, và tiêu chí nghiệm thu (Acceptance Criteria). Trình người dùng duyệt và chỉ làm khi đã được xác nhận.
- **Triển khai tuần tự:** Hoàn thành dứt điểm yêu cầu và todo đang làm dở trước khi nhận việc mới. Ưu tiên làm các task ảnh hưởng kiến trúc/dữ liệu lớn trước, rồi đến các task consumer.
- **Cập nhật `HANDOFF.md`:** Luôn cập nhật hoặc tạo file `HANDOFF.md` ở thư mục gốc khi kết thúc lượt hoặc khi hoàn thành một nhóm task để đảm bảo thread mới tiếp quản liền mạch, biết chính xác cần làm gì tiếp theo.
- Tuyệt đối không tự ý xóa function hoặc feature cũ khi chưa được người dùng đồng ý, kể cả code đang không được gọi. Báo cáo rõ các feature/function bị ẩn hoặc không còn entry point để người dùng quyết định.

## 3. Chiến lược thực thi & Tối ưu hóa Token

- **Đọc tối thiểu:** Chỉ đọc các file thực sự cần thiết. Sử dụng tìm kiếm mục tiêu (`grep_search` và `view_file` theo dòng) thay vì scan toàn bộ repository hoặc đọc các file spec không liên quan.
- **Tránh Over-engineering:** Bám đúng phạm vi yêu cầu. Ưu tiên các giải pháp sửa đổi nhỏ, rõ ràng, production-ready. Không tạo các lớp abstraction phức tạp hoặc code demo/placeholder khi chưa được yêu cầu.
- **Thứ tự ưu tiên cốt lõi:** **Đúng đắn (Correctness) -> Diff tối thiểu (Minimal Diff) -> Dễ bảo trì (Maintainability) -> Tiết kiệm token (Minimal Tokens)**.
- Ưu tiên đề xuất diff code tối giản và cô lập. Giữ nguyên các thay đổi không liên quan trong worktree.

## 4. Tính nhất quán hệ thống & Cơ sở dữ liệu

- **Cô lập dữ liệu:** Dữ liệu phải được cô lập nghiêm ngặt theo thứ tự: **Tầng lớp → Môn học → Hồ sơ → Quyền truy cập**. Không để state, cache, query hoặc UI làm rò rỉ dữ liệu giữa các ngữ cảnh.
- **Quản lý danh tính:** Một tài khoản Google có thể có nhiều profile (hồ sơ), nhưng mỗi profile là một danh tính và tiến trình độc lập. Vô hiệu hóa quyền bằng `is_active = false`; không xóa profile/lịch sử trừ khi có yêu cầu nghiệp vụ rõ ràng và luồng xóa được kiểm soát.
- **Bảo mật & Phân quyền:** Quyền truy cập phải được kiểm tra và chặn ở backend. Ẩn nút trên UI không phải là phân quyền thực sự. Tuân thủ ma trận quyền trong `SUB_SPEC_FAMILY_ROLE.md`.
- **Database Rule:** Mọi thay đổi liên quan đến schema, default value, migration phải được đồng bộ và rà soát xuyên suốt từ DB lên Frontend.

## 5. Ngôn ngữ, Trải nghiệm sản phẩm & Linh vật

- **Quy tắc ngôn ngữ:** 
  - Chat phản hồi bằng tiếng Việt ngắn gọn, súc tích và đủ thông tin kỹ thuật/sản phẩm.
  - Mã nguồn (variables, functions, database columns, code comments) phải viết bằng **100% tiếng Anh**.
  - Nội dung hiển thị trên giao diện (UI content, display text, messages) phải sử dụng tiếng Việt và tuân thủ nhất quán hệ thuật ngữ giáo dục truyền thống Việt Nam được quy định trong `SUB_SPEC_TERMINOLOGY.md`.
- **Linh vật đồng hành:** Heo Maikawaii là linh vật duy nhất; không tự ý thêm các nhân vật hoặc biểu tượng gác cổng khác.
- **Giao diện & Trải nghiệm:**
  - Tuyệt đối không hiển thị thông tin kỹ thuật nội bộ (DB ID như `prof-xxxx`, UUID, raw error codes, foreign keys, stack traces) lên giao diện người dùng. Thay thế bằng các thông báo tiếng Việt thân thiện, dễ hiểu.
  - Sử dụng theme tokens trong `src/index.css`. Không hardcode mã màu. Giữ phong cách mềm mại, trong trẻo, có phép màu nhưng không quá trẻ con.
  - Trạng thái Fog sử dụng `FogCard` (sương sáng theo theme, không nền đen, không icon khóa, label đúng loại nội dung).
  - Popup cảnh báo tối giản: một icon phân loại và một thông điệp chính.

## 6. Ngân hàng câu hỏi

- Chỉ import các câu trắc nghiệm nguyên bản. Không tự tạo A/B/C/D để biến câu tự luận tính toán thành MCQ.
- Bỏ qua các câu không thể biểu diễn trọn vẹn bằng format hệ thống (ví dụ: bài vẽ đồ thị, chứng minh, tự luận ngoài khả năng MCQ/Wordform/Rewrite).
- Loại bỏ các câu trùng lặp hoặc giống trên 95% với ngân hàng hiện có để đảm bảo chất lượng.
- Câu import phải giữ nguyên nội dung, đáp án, hình ảnh, nguồn; gắn đúng grade, subject, `topicId`, metadata và trạng thái chuẩn theo `CORE_SPECS.md`.
- Không sử dụng câu giả để lấp coverage. Thiếu dữ liệu phải cảnh báo đúng để quản trị viên bổ sung.

## 7. Chất lượng hoàn tất & Kiểm thử

- Xử lý rõ ràng các trạng thái loading, empty, error và permission-denied; tránh để spinner treo hoặc nuốt lỗi.
- Tìm và sửa triệt để nguyên nhân gốc rễ (root cause) thay vì che lỗi bằng dữ liệu giả hoặc UI chỉ xử lý triệu chứng.
- Tối ưu hiệu năng: Tránh lưu trữ dữ liệu lớn hoặc state dẫn xuất vào `localStorage`. Tránh recompute hoặc truy vấn N+1 trong render và query.
- **Kiểm thử bắt buộc:** Chạy `npm run build` cho mọi thay đổi frontend/full-stack để xác nhận không có lỗi build/typecheck trước khi hoàn tất. Không tuyên bố hoàn thành nếu bản build vẫn còn lỗi do thay đổi của mình gây ra.
