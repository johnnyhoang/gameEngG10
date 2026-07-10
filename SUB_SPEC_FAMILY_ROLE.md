# Sub-Spec: Hệ Thống Phân Quyền & Nhóm Gia Đình (Family & Role System)

Tài liệu này xác định các vai trò (Role) trong hệ thống GameEngG10, cấu trúc Nhóm Gia Đình, quyền hạn và cách thức kết nối giữa các vai trò theo kiến trúc Đa Hồ Sơ (Multi-Profile).

## 1. Kiến trúc Đa Hồ Sơ (Multi-Profile Architecture)

Mỗi tài khoản Google (Google Account) đăng nhập vào ứng dụng không bị giới hạn trong 1 vai trò duy nhất. Thay vào đó, 1 Google Account đóng vai trò là "Chìa khóa" (Account ID) để quản lý nhiều Hồ Sơ (Profiles) biệt lập.

- **Tạo Hồ Sơ Tùy Chọn:** Ở lần đăng nhập đầu tiên hoặc các lần tiếp theo, người dùng có thể chọn tạo mới một hồ sơ là **Học Sinh** hoặc **Phụ Huynh**.
- **Biệt Lập Tuyệt Đối:** Mỗi hồ sơ là một tiến trình game và quyền hạn hoàn toàn tách biệt. Một người có thể tạo 1 hồ sơ Phụ Huynh để quản lý con, và tạo thêm 1 hồ sơ Học Sinh để tự mình trải nghiệm game. Hai hồ sơ này hoạt động song song trên cùng một Google Account mà không ảnh hưởng tiến trình của nhau.
- **Tự Quản / Tự Nhận:** Phụ huynh có thể tạo hồ sơ Học Sinh trên máy của mình và tự "nhận" hồ sơ đó làm con. 

## 2. Định nghĩa Vai trò (User Roles)

Hệ thống được chia thành 2 nhóm người dùng chính và 4 vai trò cụ thể:

### Nhóm 1: Người Tu Học
- **Học sinh (Student):** 
  - Là trung tâm của ứng dụng. Tham gia giải bài, kiếm XP/NP, nuôi thú ảo.
  - Chỉ có quyền truy cập vào Môi trường Thiếu Hiệp (World Map, Đấu Trường, Hang Luyện Công...).
  - Một Học Sinh (Con) có thể chưa có Phụ Huynh, và có thể mời người khác làm Phụ Huynh của mình.

### Nhóm 2: Người Quản Trị & Đồng Hành
- **Phụ huynh Chính / Viện Chủ (Primary Parent):**
  - Đóng vai trò là người ra quyết định chính trong một Nhóm Gia Đình.
  - Có thể nhận/mời nhiều Học Sinh làm con (những Học Sinh chưa có Phụ Huynh).
  - Quyền hạn: Duyệt yêu cầu đổi quà, nạp tiền (VND Wallet), tạo Nhiệm vụ, xem báo cáo học tập của tất cả học sinh trong nhóm, mời Phụ huynh phụ vào nhóm.
  - Phụ huynh có thể "Rời con" (giải phóng Học Sinh khỏi nhóm). Học Sinh cũng có thể chủ động "Rời cha".

- **Phụ huynh Phụ / Cố Vấn (Secondary Parent):**
  - Là người đồng hành cùng Phụ huynh chính. Được Phụ huynh chính mời vào Nhóm Gia Đình.
  - Chia sẻ chung danh sách học sinh và có quyền xem báo cáo, động viên, giao nhiệm vụ (tùy cấu hình phân quyền).

- **Phụ tá Viện Chủ (Assistant Admin) / Chủ Viện:**
  - Là tài khoản quản trị nội dung của toàn hệ thống (không thuộc mô hình gia đình).
  - **Lưu ý:** Không thể tự tạo hồ sơ Admin/Phụ tá. Một tài khoản Google không tự trở thành viện phó/chủ, mà **phải được Admin (Viện chủ tối cao) chỉ định phân quyền**.
  - Nhiệm vụ: Quản lý ngân hàng câu hỏi, duyệt AI, cập nhật lý thuyết.

---

## 3. Cấu trúc Nhóm Gia Đình (Family Group)

Nhóm Gia Đình là không gian liên kết giữa Người Quản Trị (Phụ huynh) và Học sinh.
- **Nguyên tắc "1 Cha":** Mỗi Học Sinh (Con) tại một thời điểm chỉ có duy nhất **01 Phụ huynh Chính (Cha)**.
- Một Phụ huynh Chính có thể quản lý **nhiều Học sinh** (ví dụ: gia đình có 3 con, hoặc lớp học có 40 học sinh).
- Một Phụ huynh Chính có thể mời **nhiều Phụ huynh Phụ** tham gia cùng quản lý.

### 3.1 Cơ chế Mời và Kết Nối
Tất cả các lời mời đều thông qua việc nhập tài khoản hoặc quét mã QR Code.
- **Phụ Huynh mời Con:** 
  - Phụ huynh có thể tìm ID/Mã QR của Học Sinh để gửi lời mời. Chỉ những Học Sinh *chưa có Cha* mới nhận được lời mời này.
  - Con có quyền **Approve (Chấp nhận)** lời mời để vào nhóm.
- **Con mời Phụ Huynh:**
  - Học Sinh chưa có Cha có thể nhập ID/Mã QR của một Phụ Huynh để chủ động xin vào nhóm.
- **Rời Nhóm:**
  - Phụ Huynh có quyền kick/rời Học Sinh khỏi nhóm.
  - Học Sinh cũng có quyền rời nhóm tự do (thực chất là rời lớp/giải phóng bản thân).

### 3.2 Quy tắc Ủy quyền Phụ huynh Phụ
Phụ huynh Chính có quyền bật/tắt các tính năng sau cho Phụ huynh Phụ:
- Được phép duyệt đổi quà (Dùng chung Ví VND do Phụ huynh chính nạp).
- Được phép giao nhiệm vụ mới.
- Chỉ được xem báo cáo (Read-only).
