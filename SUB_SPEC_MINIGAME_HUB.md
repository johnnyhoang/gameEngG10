# Sub-Spec: Kiến Trúc Sàn Mini-Game (Game Hub Architecture)

Tài liệu này định nghĩa cấu trúc của Sơn Trang Thư Giãn, chuyển đổi từ một khu vực chứa các game tĩnh thành một "Sàn Game" (Platform/Hub) có khả năng cắm (plug) thêm các Mini-app độc lập trong tương lai mà không làm phình to (scope creep) hệ thống gốc.

## 1. Tầm nhìn Sàn Game (Game Hub)
Sơn Trang Thư Giãn sẽ đóng vai trò là một "Store" hoặc "Hub". Tại đây, các mini-game (ví dụ: Thẻ nhớ, Ghép cặp, Xếp sơ đồ) được hiển thị dưới dạng các thẻ ứng dụng (App Cards).
- Số lượng game ban đầu ở giai đoạn MVP: Giữ nguyên các game đang có (khoảng 3 game cốt lõi).
- Các game được phát triển về sau sẽ được xây dựng như những **Mini-app độc lập** và "plug" vào sàn thông qua một chuẩn giao tiếp thống nhất.

## 2. Chuẩn Giao Tiếp (Interface Standard)
Để một Mini-app có thể chạy trên Sàn Game GameEngG10, nó phải tuân thủ chuẩn giao thức sau:

### 2.1 Dữ liệu Đầu vào (Props / Context Injected)
Khi Sàn Game khởi chạy một Mini-app, nó sẽ truyền vào (inject) các thông tin ngữ cảnh:
- `currentStudentId`: ID của học sinh đang chơi.
- `activeSectId`: Môn phái đang được chọn (để app tự động lấy đúng data Toán, Văn, Anh...).
- `difficultyLevel`: Độ khó hiện tại do Sàn Game quyết định (Dễ/Trung bình/Khó).
- `lockedStatus`: Trạng thái bị khóa bởi sương mù hay không.

### 2.2 Dữ liệu Đầu ra (Events Emit to Hub)
Mini-app phải chịu trách nhiệm gửi các sự kiện chuẩn về cho Sàn Game để hệ thống lõi xử lý (cộng điểm, xóa sương mù):
- `onGameStart()`: Báo hiệu bắt đầu chơi.
- `onGameComplete({ correctAnswers, timeSpent, score })`: Gửi kết quả khi game kết thúc.
- `onGatekeeperTriggered()`: Nếu đây là khu vực có sương mù, gọi Sàn Game để hiển thị Popup Gatekeeper (Pet).

## 3. Quản lý Trạng Thái & Khám Phá (Fog of War)
Mỗi Mini-app sẽ được Sàn Game quản lý về trạng thái Khám Phá (Exploration):
- **Ghi nhận hoàn thành:** Sàn Game lắng nghe sự kiện `onGameComplete()`.
  - Nếu độ khó game là Dễ: Yêu cầu học sinh chơi và `onGameComplete` thành công **2 lần** để vĩnh viễn xóa sương mù cho Mini-app đó.
  - Nếu độ khó game là Khó: Yêu cầu hoàn thành **3 lần**.
- **Định nghĩa "Hoàn Thành":** Do bản thân mỗi Mini-app tự quyết định và trả về true/false trong sự kiện `onGameComplete` (ví dụ: Thẻ nhớ phải lật hết 10 thẻ, Ghép cặp phải ghép xong trước 60 giây). Sàn Game không can thiệp logic nội bộ của app.
