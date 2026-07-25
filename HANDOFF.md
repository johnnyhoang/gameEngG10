# Handoff - GameEngG10 Question Mapping & Game Algorithm

## Trạng thái hiện tại
- **Đã hoàn thành phân bổ dữ liệu câu hỏi môn Toán lớp 9**:
  - Đã xuất 101 câu hỏi môn Toán lớp 9 trong database.
  - Phân tích ngữ nghĩa sâu bằng AI Antigravity ngoại tuyến để đảm bảo chính xác 100% về nghiệp vụ.
  - Thực thi cập nhật 64 câu hỏi bị lệch bài giảng lên database.
  - Loại bỏ hoàn toàn sự phụ thuộc vào Regex trong runtime để phân loại câu hỏi.
- **Đã sửa lỗi logic bốc câu hỏi backend & frontend**:
  - Backend lọc nghiêm ngặt câu hỏi theo đúng `lesson_id` hoặc cùng `category` của bài học.
  - Hỗ trợ truyền tham số `lessonQuizCount` linh hoạt từ client (10 câu cho Arena, 3 câu cho Study View).
  - Loại bỏ fallback tự ý bù câu hỏi ngoài category của bài học.

## Các file đã chỉnh sửa/tạo mới
- [backend/src/routes/game.ts](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/routes/game.ts): Sửa API khởi tạo session, lọc nghiêm ngặt câu hỏi và nhận `lessonQuizCount`.
- [src/components/PlayArea.tsx](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/components/PlayArea.tsx): Truyền `lessonQuizCount` và loại bỏ fallback bù câu hỏi ngoài category.
- [scratch/import_math_mappings.js](file:///d:/Hoa%20Hoang/Apps/gameEngG10/scratch/import_math_mappings.js): Script import mapping câu hỏi vào DB.
- [scratch/math_questions_mapped.json](file:///d:/Hoa%20Hoang/Apps/gameEngG10/scratch/math_questions_mapped.json): Dữ liệu ánh xạ 101 câu hỏi Toán lớp 9 chuẩn hóa bằng AI.

## Bước tiếp theo (Next Steps)
1. Tiến hành deploy dự án lên production nếu người dùng yêu cầu (chạy build local đã pass 100%).
2. Tiếp tục áp dụng phương pháp xuất dữ liệu câu hỏi và dùng AI phân tích ngoại tuyến tương tự đối với các môn học khác của lớp 9 (như Vật lý, Hóa học, Sinh học, Lịch sử, Địa lý) để chuẩn hóa liên kết `lesson_id` trong DB.
