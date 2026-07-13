# Golden Rules — GameEngG10

## 1. Quy trình bắt buộc — ưu tiên cao nhất

- Mọi discussion/ý tưởng chỉ trở thành yêu cầu sau khi người dùng và AI đã phân tích, thống nhất. Khi đã thống nhất, phải cập nhật `CORE_SPECS.md` hoặc `SUB_SPEC_*.md` liên quan trước khi sửa code.
- Từ spec đã duyệt, phải ghi backlog chi tiết vào `TODO.md`: mục tiêu, phạm vi, dependency, file/layer dự kiến sửa, impact/rủi ro, migration/compatibility và acceptance criteria.
- Phải trình backlog để người dùng xác nhận. Chỉ triển khai sau khi được xác nhận; làm tuần tự từ task ảnh hưởng kiến trúc/contract/dữ liệu lớn nhất đến các task consumer liên quan cho đến khi hoàn tất.
- Hoàn thành yêu cầu và todo đang làm dở trước khi nhận việc mới; cuối mỗi lượt tự kiểm tra artifact, file và acceptance criteria còn thiếu.
- Tuyệt đối không tự xóa function hoặc feature khi chưa được người dùng đồng ý, kể cả code đang không được gọi. Nếu phát hiện feature/function bị ẩn, disable, feature-flag off hoặc không còn entry point, phải báo rõ để người dùng quyết định có enable lại hay không.
- AI phải phản hồi bằng tiếng Việt, ngắn gọn nhưng đủ thông tin kỹ thuật và sản phẩm để Senior Developer và Product Owner cùng hiểu.
- Bám đúng phạm vi yêu cầu. Ưu tiên bản sửa nhỏ, rõ, production-ready; không overengineer, không tạo abstraction hoặc code demo/placeholder khi chưa được yêu cầu.
- Luôn đọc code, schema, route và spec hiện tại trước khi sửa; không suy đoán kiến trúc từ tên file hoặc lịch sử cũ.
- Giữ nguyên thay đổi không liên quan trong worktree. Chỉ đề xuất xóa code chết/trùng/không còn consumer trong backlog và chờ xác nhận.
- Tìm và sửa root cause. Không che lỗi bằng fallback im lặng, dữ liệu giả hoặc UI chỉ xử lý triệu chứng.

## 2. Tính nhất quán hệ thống

- `CORE_SPECS.md` và các `SUB_SPEC_*.md` là đặc tả sản phẩm. Khi code và spec lệch nhau, xác minh hành vi đúng rồi cập nhật **cả code lẫn tài liệu** trong cùng thay đổi.
- Thay đổi contract phải rà xuyên suốt frontend types/state/UI, backend route/validation, database schema/default/migration và mọi consumer/report liên quan.
- Không hardcode luật gameplay hoặc giới hạn vận hành nếu chúng cần quản trị; dùng một nguồn cấu hình và cung cấp control phù hợp trong admin.
- Dữ liệu phải cô lập theo thứ tự **Tầng lớp → Môn học → Hồ sơ → Quyền truy cập**. Không để state, cache, query hoặc UI làm rò dữ liệu giữa các ngữ cảnh.
- Một Google account có thể có nhiều profile, nhưng mỗi profile là một danh tính và tiến trình độc lập. Thu hồi quyền bằng `is_active = false`; không xóa profile/lịch sử trừ khi có yêu cầu nghiệp vụ rõ ràng và luồng xóa được kiểm soát.
- Phân quyền phải được chặn ở backend; ẩn nút trên UI không phải authorization. Tuân thủ ma trận quyền hiện hành trong `SUB_SPEC_FAMILY_ROLE.md`.

## 3. Ngôn ngữ và trải nghiệm sản phẩm

- Mọi tên gọi, khái niệm, hành động, display text và message phải thuộc cùng một thế giới học tập lấy cảm hứng từ trường học, học phủ và văn hóa giáo dục truyền thống Việt Nam; không trộn tùy tiện hệ thuật ngữ khác.
- `SUB_SPEC_TERMINOLOGY.md` là nguồn chuẩn cho tên tiếng Việt, tên tiếng Anh, code/technical term, định nghĩa, ý nghĩa và công dụng. Thuật ngữ mới phải được định nghĩa tại đây trước khi đưa vào spec, code hoặc UI.
- Học sinh là người dùng trung tâm: luồng phải có hướng dẫn, dễ hiểu và không dồn công cụ phức tạp vào dashboard. Công cụ học tập phức tạp dùng page riêng và có trợ giúp `?` theo ngữ cảnh.
- Heo Maikawaii là linh vật/nhân vật đồng hành duy nhất; không thêm nhân vật hoặc biểu tượng gác cổng cạnh tranh vai trò này.
- UI phải dùng theme tokens trong `src/index.css`; không hardcode màu làm vỡ theme. Giữ phong cách mềm mại, trong trẻo, có phép màu nhưng không quá trẻ con.
- Popup/cảnh báo tối giản: một icon phân loại và một thông điệp chính. Trạng thái Fog dùng `FogCard`, sương sáng theo theme, không nền đen, không icon khóa và dùng label đúng loại nội dung.
- Giữ thuật ngữ, nhãn và hành vi nhất quán trên toàn app; khi đổi tên phải rà mọi role, navigation, modal, report và tài liệu liên quan.

## 4. Ngân hàng câu hỏi

- Chỉ import câu trắc nghiệm nguyên bản. Không tự tạo A/B/C/D để biến câu tự luận tính toán thành MCQ.
- Bỏ câu không thể biểu diễn trọn vẹn bằng format hệ thống, gồm bài vẽ đồ thị, chứng minh hoặc tự luận ngoài khả năng MCQ/Wordform/Rewrite.
- Bỏ câu trùng hoặc giống trên 95% với ngân hàng hiện có; không làm giảm chất lượng chỉ để tăng số lượng.
- Câu import phải giữ nguyên nội dung, đáp án, hình ảnh và nguồn; gắn đúng grade, subject, `topicId`, metadata và trạng thái chuẩn theo `CORE_SPECS.md`.
- Không dùng câu giả để lấp coverage trong production. Thiếu dữ liệu phải hiển thị/cảnh báo đúng để admin bổ sung.

## 5. Chất lượng hoàn tất

- Xử lý loading, empty, error và permission-denied rõ ràng; không để spinner treo, lỗi bị nuốt hoặc hành động thành công giả.
- Tránh lưu dataset lớn hoặc state dẫn xuất vào localStorage; tránh recompute/N+1 trong render và query. Tối ưu đúng hot path đã đo hoặc quan sát.
- Sau thay đổi code, chạy acceptance gate phù hợp; tối thiểu `npm run build` cho thay đổi frontend/full-stack, cùng test/typecheck liên quan nếu có.
- Không tuyên bố hoàn tất khi build/test còn lỗi do thay đổi của mình. Báo rõ lỗi có sẵn hoặc phần chưa thể kiểm chứng.
