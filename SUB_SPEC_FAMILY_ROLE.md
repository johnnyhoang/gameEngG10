# Sub-Spec: Hệ Thống Phân Quyền & Lớp Chủ Nhiệm (Family & Role System)
*Cập nhật: 2026-07-11 — bổ sung cơ chế Profile Quản Trị Động (Hiệu Trưởng / Hiệu Phó tạo theo chỉ định)*

Tài liệu này xác định các vai trò (Role) trong hệ thống GameEngG10, cấu trúc Lớp Chủ Nhiệm, quyền hạn và cách thức kết nối giữa các vai trò theo kiến trúc Đa Hồ Sơ (Multi-Profile).

---

## 1. Kiến Trúc Đa Hồ Sơ (Multi-Profile Architecture)

Mỗi tài khoản Google (Google Account) đăng nhập vào ứng dụng không bị giới hạn trong 1 vai trò duy nhất. Thay vào đó, 1 Google Account đóng vai trò là "Chìa khóa" (`account_id`) để quản lý tối đa **4 hồ sơ (Profile)** biệt lập, mỗi hồ sơ có một vai trò riêng.

### 1.1 Sơ Đồ Các Hồ Sơ Tối Đa Của 1 Người

| # | Hồ Sơ | Cách Tạo | Cách Vô Hiệu Hóa | Có thể phục hồi? |
|:--|:-------|:---------|:-----------------|:----------------|
| 1 | **Học Sinh** (`student`) | Tự tạo | Admin set `is_active = false` | ✅ Có |
| 2 | **Chủ Nhiệm** (`parent`) | Tự tạo | Admin set `is_active = false` | ✅ Có |
| 3 | **Hiệu Phó** (`pho_vien`) | Hiệu Trưởng chỉ định → **hệ thống INSERT profile mới** | Hiệu Trưởng thu hồi → `is_active = false` | ✅ Có (reactivate) |
| 4 | **Hiệu Trưởng** (`truong_vien`) | Hiệu Trưởng khác chỉ định → **hệ thống INSERT profile mới** | Hiệu Trưởng thu hồi → `is_active = false` | ✅ Có (reactivate) |

> ⚠️ **Không bao giờ DELETE profile** — dữ liệu lịch sử hoạt động luôn được giữ lại. Khi bị thu hồi quyền, cột `is_active` được set `FALSE`. Người dùng sẽ không thấy profile này trên màn hình chọn hồ sơ và không thể truy cập nó cho đến khi được reactivate.

### 1.2 Nguyên Tắc Cốt Lõi

- **Tự Tạo Hồ Sơ Thường:** Người dùng có thể tự tạo hồ sơ **Học Sinh** hoặc **Chủ Nhiệm** bất kỳ lúc nào.
- **Biệt Lập Tuyệt Đối:** Mỗi hồ sơ là một tiến trình game và quyền hạn hoàn toàn tách biệt. Hai hồ sơ cùng tài khoản Google hoạt động song song mà không ảnh hưởng lẫn nhau.
- **Chuyển Đổi Linh Hoạt (Switch Role):** Khi đăng nhập, màn hình chọn hồ sơ **luôn hiển thị các profile đang `is_active = true`** của tài khoản đó. Điều này cho phép người dùng (kể cả có quyền Hiệu Trưởng/Hiệu Phó) có thể tự do lựa chọn hoặc tạo mới hồ sơ Học Sinh / Chủ Nhiệm khi cần thiết.
- **Hồ Sơ Quản Trị Được Tạo Động:** Khi Hiệu Trưởng chỉ định ai đó làm Hiệu Phó/Hiệu Trưởng, hệ thống **tự động INSERT một profile mới** với vai trò đó gắn vào `account_id` của người được chỉ định. Khi bị thu hồi, profile đó bị **vô hiệu hóa** (`is_active = false`) — không bị xóa — và có thể được reactivate bởi Hiệu Trưởng bất cứ lúc nào.


---

## 2. Định Nghĩa Vai Trò (User Roles)

Hệ thống chia thành **3 tầng chức năng** với **5 vai trò cụ thể**:

---

### Tầng 1: Người Tu Học

#### 🌱 Học Sinh (Student)
- **Code value:** `'student'`
- **Thuật ngữ UI:** Thiếu Hiệp 🌱
- Là trung tâm của ứng dụng. Tham gia giải bài, kiếm XP/NP, nuôi thú ảo.
- Chỉ có quyền truy cập vào Môi trường Thiếu Hiệp (World Map, Đấu Trường, Hang Luyện Công...).
- Một Học Sinh (Con) có thể chưa có Chủ Nhiệm, và có thể mời người khác làm Chủ Nhiệm của mình.

---

### Tầng 2: Người Đồng Hành Gia Đình

#### 👨‍👩‍👧 Chủ Nhiệm Chính (Primary Parent)
- **Code value:** `'parent'`
- **Thuật ngữ UI:** Hiệu Trưởng 👑 (trong giao diện ParentConsole)
- Đóng vai trò người ra quyết định chính trong một Lớp Chủ Nhiệm.
- **Quyền hạn:**
  - Nhận/mời nhiều Học Sinh làm con (những Học Sinh chưa có Chủ Nhiệm).
  - Duyệt yêu cầu đổi Phần Thưởng Thực Tế (confirm delivery).
  - Tạo danh mục Phần Thưởng Thực Tế (số lượng giới hạn, đặt giá NP).
  - Tạo Nhiệm vụ giao cho con (Parent Quests).
  - Xem báo cáo học tập của tất cả học sinh trong lớp chủ nhiệm.
  - Cấu hình Chân Khí (`maxEnergy`, `resetHours`) cho từng con.
  - Mời Chủ nhiệm Phụ tham gia nhóm.
  - "Rời con" (kick Học Sinh khỏi lớp chủ nhiệm).
- **Không được phép:** Quản lý ngân hàng câu hỏi, xem học sinh ngoài gia đình mình.

#### 👤 Chủ Nhiệm Phụ (Secondary Parent)
- **Code value:** `'secondary_parent'`
- **Thuật ngữ UI:** Chủ Nhiệm Phụ (hiển thị chung giao diện Hiệu Trưởng, badge màu khác)
- Là người đồng hành cùng Chủ nhiệm Chính. Được Chủ nhiệm Chính mời vào Lớp Chủ Nhiệm.
- Chia sẻ chung danh sách học sinh trong nhóm.
- **Quyền do Chủ nhiệm Chính cấu hình bật/tắt từng mục:**
  - Được phép duyệt đổi quà (on/off — mặc định: off).
  - Được phép tạo Nhiệm vụ mới (on/off — mặc định: off).
  - Chỉ được xem báo cáo (Read-only — mặc định: on).
- **Luôn không được phép:** Kick Học Sinh, mời Chủ nhiệm Phụ khác, cấu hình Energy.
- **Lưu trữ:** `ge10_family_links.link_type = 'secondary'` + permissions JSON

---

### Tầng 3: Người Quản Trị Học Viện

> ⚠️ Profile Hiệu Trưởng và Hiệu Phó **không tự tạo được** — hệ thống **tự động sinh profile mới** gắn vào tài khoản Google của người được chỉ định. Khi bị thu hồi quyền, **profile đó bị xóa hoàn toàn** khỏi hệ thống. Không thuộc mô hình lớp học.

#### 👑 Hiệu Trưởng (Super Admin)
- **Code value:** `'truong_vien'`
- **Thuật ngữ UI:** Hiệu Trưởng 👑
- **Tương đương cũ:** `'admin'` — toàn bộ quyền cũ giữ nguyên, đổi tên.
- Chủ nhân tối cao của Học Viện. Không bị giới hạn bởi bất kỳ ràng buộc phân quyền nào.
- **Cơ chế profile:** Khi được chỉ định, hệ thống INSERT một profile `truong_vien` mới vào `ge10_users` gắn với `account_id` của người đó. Khi bị thu hồi, profile này bị DELETE.
- **Quyền hạn đầy đủ (bao gồm tất cả quyền của Hiệu Phó, cộng thêm):**
  - Bổ nhiệm Hiệu Phó → hệ thống tự sinh profile Hiệu Phó cho người được chọn
  - Thu hồi Hiệu Phó → hệ thống tự xóa profile Hiệu Phó của người đó
  - Bổ nhiệm Hiệu Trưởng mới → hệ thống tự sinh profile Hiệu Trưởng cho người được chọn
  - Xóa tài khoản vĩnh viễn
  - Cấu hình Boss Bounty toàn hệ thống
  - Xem audit log đầy đủ
  - Override mọi cài đặt hệ thống

#### 🛡️ Hiệu Phó (Moderator)
- **Code value:** `'pho_vien'`
- **Thuật ngữ UI:** Hiệu Phó 🛡️
- Được Hiệu Trưởng ủy quyền quản lý học viện. Có quyền quản trị nội dung và học sinh nhưng bị giới hạn ở cấp độ phân quyền.
- **Cơ chế profile:** Khi được chỉ định, hệ thống INSERT một profile `pho_vien` mới vào `ge10_users` gắn với `account_id` của người đó. Khi bị thu hồi, profile này bị DELETE.
- **Quyền hạn:**
  - Xem toàn bộ danh sách học sinh trong viện.
  - CRUD câu hỏi trong ngân hàng câu hỏi.
  - Import đề thi bằng AI Gemini.
  - Thăng/hạ vai trò trong phạm vi: `student` ↔ `parent`.
  - Cấu hình Energy cho học sinh.
  - Xem Thiên Cơ Các — dashboard đầy đủ.
  - Cấu hình bonus Boss Card.
- **Không được phép:**
  - Thăng/hạ vai trò Hiệu Phó hoặc Hiệu Trưởng.
  - Xóa tài khoản.
  - Xem audit log hành động admin.

---

## 3. Cấu Trúc Lớp Chủ Nhiệm (Family Group)

Lớp Chủ Nhiệm là không gian liên kết giữa Người Quản Trị (Chủ nhiệm) và Học sinh.

- **Nguyên tắc "1 Cha":** Mỗi Học Sinh (Con) tại một thời điểm chỉ có duy nhất **01 Chủ nhiệm Chính**.
- Một Chủ nhiệm Chính có thể quản lý **nhiều Học sinh** (ví dụ: gia đình có 3 con, hoặc lớp học có 40 học sinh).
- Một Chủ nhiệm Chính có thể mời **nhiều Chủ nhiệm Phụ** tham gia cùng quản lý.

### 3.1 Cơ Chế Mời và Kết Nối
Tất cả các lời mời kết nối được xử lý thông qua việc nhập Email Google hoặc quét mã QR Code sau này.

- **Kết nối bằng Email Google (bãi bỏ ID):**
  - Mọi lời mời kết nối (Chủ Nhiệm mời Học Sinh, Học Sinh xin kết nối với Chủ Nhiệm, hay mời Chủ Nhiệm Phụ) đều sử dụng **Email Google** làm định danh kết nối thay vì ID hồ sơ DB rườm rà.
  - Khi gửi lời mời tới một email, nếu tài khoản Google đó đã đăng ký hệ thống nhưng chưa tạo vai trò cần thiết, hệ thống sẽ **tự động khởi tạo vai trò tương ứng ở background** (Học Sinh hoặc Chủ Nhiệm) để nhận lời mời.
- **Thầy/Cô mời Học Sinh (Chủ Nhiệm mời Con):**
  - Chủ Nhiệm nhập Email Google của Học Sinh để gửi lời mời.
  - Hệ thống kiểm tra: Nếu Học Sinh **chưa có Chủ Nhiệm**, hệ thống tạo liên kết chính (`primary`) với trạng thái chờ Học Sinh duyệt (`pending_student`).
  - Nếu Học Sinh **đã có Chủ Nhiệm chính**, hệ thống sẽ cảnh báo (alert). Chủ Nhiệm có thể chọn gửi lời mời làm **Phó Chủ Nhiệm (Chủ Nhiệm Phụ)** để cùng quản lý. Liên kết này được gửi dưới dạng `secondary` với trạng thái chờ Chủ Nhiệm chính của Học Sinh duyệt (`pending_primary`).
- **Con xin kết nối với Thầy/Cô (Học Sinh mời Chủ Nhiệm):**
  - Học Sinh chưa có Chủ Nhiệm có thể nhập Email Google của một Thầy/Cô để xin vào lớp.
  - Thầy/Cô nhận được yêu cầu kết nối dưới dạng chờ duyệt (`pending_parent`) và có quyền chấp nhận hoặc từ chối.
- **🔓 Mã PIN bảo mật cá nhân bị bãi bỏ hoàn toàn (2026-07-11):** Hệ thống mã PIN bảo mật cá nhân (`parentPIN` / `changePIN` / `verifyPIN`) trước đây dùng để khóa các hành động nhạy cảm đã bị **bãi bỏ hoàn toàn**. Do thiết kế mới chia profile độc lập, phân quyền cực kỳ chặt chẽ ngay từ màn hình Login của Google/Supabase, nên việc dùng thêm mã PIN là không cần thiết và gây rườm rà. Mọi thao tác quản lý vai trò giờ đây được kiểm soát trực tiếp qua phiên đăng nhập của Hiệu Trưởng.
- **Rời Nhóm:**
  - Chủ Nhiệm có quyền kick/rời Học Sinh khỏi nhóm (Học Sinh mất liên kết nhưng tài khoản không bị xóa).
  - Học Sinh cũng có quyền rời nhóm tự do (thực chất là rời lớp/giải phóng bản thân).
  - Sau khi rời, Học Sinh có thể tự do gia nhập lớp chủ nhiệm mới.

### 3.2 Quy Tắc Ủy Quyền Chủ Nhiệm Phụ
Chủ nhiệm Chính toggle các quyền sau cho từng Chủ nhiệm Phụ (mặc định: chỉ xem):

| Quyền | Mặc định | Mô tả |
|:---|:---:|:---|
| Xem báo cáo học tập | ✅ ON | Luôn được phép, không thể tắt |
| Duyệt đổi quà (Phần Thưởng) | ❌ OFF | Có thể bật — dùng NP chung nhóm |
| Tạo Nhiệm vụ mới | ❌ OFF | Có thể bật |
| Cấu hình Energy | ❌ LOCKED | Không thể bật — chỉ Chủ nhiệm Chính |

### 3.3 Đại Sảnh Đường (Lớp mặc định của trường)
Đối với những Học Sinh chưa kết nối với bất kỳ lớp học hay Chủ nhiệm nào (học sinh mồ côi):
- **Danh mục quà tặng mặc định**: Hệ thống tự động khởi tạo danh mục quà tặng mặc định (ví dụ: Ly trà sữa, 1h chơi iPad...) lưu trực tiếp theo tài khoản học sinh.
- **Quản lý lâm thời**: Ban Giám Hiệu gồm **Hiệu Trưởng** (`truong_vien`) và **Hiệu Phó** (`pho_vien`) sẽ trực tiếp đóng vai trò là **Chủ nhiệm lâm thời** của học sinh đó.
- **Quyền hạn**: Hiệu Trưởng / Hiệu Phó có quyền nạp năng lượng (Chân khí), giao nhiệm vụ (Quests) riêng cho học sinh này, và duyệt các yêu cầu đổi quà thực tế từ Bảng điều khiển admin toàn trường.

---

## 4. Ma Trận Phân Quyền Tổng Hợp

| Hành Động | student | parent | secondary_parent | pho_vien | truong_vien |
|:---|:---:|:---:|:---:|:---:|:---:|
| Chơi game / học bài | ✅ | — | — | — | — |
| Xem báo cáo con mình | — | ✅ | ✅ | — | — |
| Tạo/Duyệt Phần Thưởng | — | ✅ | ⚙️ | — | — |
| Giao Nhiệm vụ (Quest) | — | ✅ | ⚙️ | — | — |
| Kết nối gia đình | — | ✅ | ❌ | — | — |
| Cấu hình Energy con | — | ✅ | ❌ | ✅ | ✅ |
| Xem con được chỉ định | — | ✅ | ⚙️ | — | — |
| Xem TẤT CẢ học sinh | — | ❌ | ❌ | ✅ | ✅ |
| CRUD Questions | — | ❌ | ❌ | ✅ | ✅ |
| Import đề AI | — | ❌ | ❌ | ✅ | ✅ |
| Cấu hình Boss Bounty | — | ❌ | ❌ | ✅ | ✅ |
| Promote student → parent | — | ❌ | ❌ | ✅ | ✅ |
| Promote → Hiệu Phó | — | ❌ | ❌ | ❌ | ✅ |
| Promote → Hiệu Trưởng | — | ❌ | ❌ | ❌ | ✅ |
| Xem Thiên Cơ Các (full) | — | ❌ | ❌ | ✅ | ✅ |
| Xóa tài khoản vĩnh viễn | — | ❌ | ❌ | ❌ | ✅ |
| Xem Audit Log | — | ❌ | ❌ | ❌ | ✅ |

> ⚙️ = tùy cấu hình của Chủ nhiệm Chính

---

## 5. Lộ Trình Triển Khai

### Sprint 1 — MVP Khẩn Cấp
1. Migrate `'admin'` → `'truong_vien'` trong DB và tất cả code checks.
2. Cập nhật Types TypeScript.
3. Thêm `'pho_vien'` vào backend authorization.
4. UI ParentConsole: phân biệt badge Hiệu Trưởng vs. Hiệu Phó, thêm nút "Bổ nhiệm Hiệu Phó".

### Sprint 2 — Chủ Nhiệm Phụ
1. Thêm `link_type` và `secondary_permissions` vào `ge10_family_links`.
2. API: invite secondary parent, manage permissions.
3. UI: Chủ nhiệm Chính manage Chủ nhiệm Phụ trong ParentConsole.

### Sprint 3 — Audit & Security
1. Bảng `ge10_admin_audit_log`.
2. API `GET /api/admin/audit-log`.
3. Notification system khi role thay đổi.
