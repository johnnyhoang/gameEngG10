# Sub-Spec: Sổ Tu Học

## 1. Phạm vi sản phẩm

`Sổ Tu Học` là module toàn cục dành cho Sĩ Tử, đặt ngay dưới `TopHUD` trong app shell để mọi trang học tập đều thấy. Module không xuất hiện ở đăng nhập, chọn profile hoặc Phòng Điều Hành. Mặc định hiển thị thanh tóm tắt gọn; mở rộng mới hiển thị ba nhóm:

- **Nhập Môn:** cột mốc một lần theo profile, không reset.
- **Nhiệm Vụ Hôm Nay:** mục tiêu theo ngày và timezone `Asia/Bangkok`.
- **Tiến Độ Tu Học:** Level, XP, streak, tổng bài và cột mốc kế tiếp.

## 2. Nguyên tắc nghiệp vụ

- Backend là nguồn sự thật duy nhất cho assignment, progress, completion và reward.
- Mọi dữ liệu cô lập theo active `profile_id`; account ID chỉ dùng xác thực.
- Feature chỉ phát domain event; không tự sửa mission progress.
- Mỗi event có `idempotency_key`; replay/retry không được cộng tiến độ hoặc thưởng hai lần.
- Definition có version, trạng thái active, scope grade/subject/feature và display order; không hardcode danh sách nhiệm vụ trong component.
- Nhiệm vụ phụ thuộc feature/content chỉ được giao khi capability và dữ liệu tương ứng tồn tại.
- Daily mission sai ngày được expire; nhiệm vụ Nhập Môn dùng period `lifetime`.

## 3. Nhóm definition chuẩn

Nhập Môn gồm: gia nhập lớp Chủ Nhiệm; chọn context; cho heo ăn; thọc lét heo; hoàn thành Đố Vui; hoàn thành Tốc Chiến; học bài Toán/Anh đầu tiên; mở Xưởng Toán Hình 3D; hoàn thành bài/ải/Boss đầu tiên; dùng Thẻ Nhắc Bài; đổi Học Cụ; mở Công Viên, Cẩm Nang và một công cụ chuyên môn; làm tan sương chuyên đề; đạt các mốc Level và streak.

Daily pool gồm: hoàn thành bài; trả lời/đúng số câu; đạt accuracy; học môn chưa học trong ngày; ôn chuyên đề yếu; chơi mini-game; chăm sóc heo; học đủ phút; làm đúng liên tiếp; hoàn thành Bảng Bài Tập do Chủ Nhiệm giao. Engine chỉ chọn definition phù hợp context/capability.

## 4. Data contract

- `ge10_mission_definitions`: `mission_key`, category, copy, event type, condition JSON, target, reward JSON, scope, feature key, version, active, display order.
- `ge10_profile_mission_assignments`: profile, definition/version, period key, target/current, status, timestamps; unique `(profile_id, mission_key, period_key)`.
- `ge10_learning_events`: event/idempotency key, profile, type, learning context, entity/value/metadata và timestamp.
- `ge10_mission_reward_ledger`: assignment, profile, reward type/amount và timestamp; unique theo assignment/reward type.

## 5. Event chuẩn giai đoạn đầu

`teacher_link_activated`, `pet_fed`, `pet_tickled`, `riddle_completed`, `encounter_sprint_completed`, `lesson_completed`, `question_answered`, `feature_opened`, `boss_completed`, `shop_item_redeemed`, `hint_used`, `level_reached`. Event Fog chỉ được bổ sung khi completion contract truyền được chính xác `requiredCompletions`; không suy đoán tan sương từ một lần hoàn thành.

## 6. UI và trạng thái

- Thanh gọn: Level/XP, tiến độ Nhập Môn và tiến độ hôm nay.
- Panel có loading, empty và error rõ ràng; lỗi sync không được hiển thị hoàn thành giả.
- Khi làm bài, chỉ giữ summary nhỏ; panel không che nội dung câu hỏi.
- Completion không tự mở modal gây gián đoạn; dùng toast và cập nhật badge/progress.
