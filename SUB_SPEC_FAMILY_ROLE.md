# Sub-Spec: Hệ Thống Phân Quyền & Nhóm Gia Đình (Family & Role System)
*Cập nhật: 2026-07-10 — bổ sung kiến trúc Đa Cấp (Viện Trưởng / Phó Viện / Phụ Huynh Phụ)*

Tài liệu này xác định các vai trò (Role) trong hệ thống GameEngG10, cấu trúc Nhóm Gia Đình, quyền hạn và cách thức kết nối giữa các vai trò theo kiến trúc Đa Hồ Sơ (Multi-Profile).

---

## 1. Kiến Trúc Đa Hồ Sơ (Multi-Profile Architecture)

Mỗi tài khoản Google (Google Account) đăng nhập vào ứng dụng không bị giới hạn trong 1 vai trò duy nhất. Thay vào đó, 1 Google Account đóng vai trò là "Chìa khóa" (Account ID) để quản lý nhiều Hồ Sơ (Profiles) biệt lập.

- **Tạo Hồ Sơ Tùy Chọn:** Ở lần đăng nhập đầu tiên hoặc các lần tiếp theo, người dùng có thể chọn tạo mới một hồ sơ là **Học Sinh** hoặc **Phụ Huynh**.
- **Biệt Lập Tuyệt Đối:** Mỗi hồ sơ là một tiến trình game và quyền hạn hoàn toàn tách biệt. Một người có thể tạo 1 hồ sơ Phụ Huynh để quản lý con, và tạo thêm 1 hồ sơ Học Sinh để tự mình trải nghiệm game. Hai hồ sơ này hoạt động song song trên cùng một Google Account mà không ảnh hưởng tiến trình của nhau.
- **Tự Quản / Tự Nhận:** Phụ huynh có thể tạo hồ sơ Học Sinh trên máy của mình và tự "nhận" hồ sơ đó làm con.
- **Hồ sơ Quản Trị:** Tài khoản Viện Trưởng và Phó Viện **không thể tự tạo** — phải được Viện Trưởng hiện tại chỉ định. Không thuộc mô hình gia đình.

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
- Một Học Sinh (Con) có thể chưa có Phụ Huynh, và có thể mời người khác làm Phụ Huynh của mình.

---

### Tầng 2: Người Đồng Hành Gia Đình

#### 👨‍👩‍👧 Phụ Huynh Chính (Primary Parent)
- **Code value:** `'parent'`
- **Thuật ngữ UI:** Viện Chủ 👑 (trong giao diện ParentConsole)
- Đóng vai trò người ra quyết định chính trong một Nhóm Gia Đình.
- **Quyền hạn:**
  - Nhận/mời nhiều Học Sinh làm con (những Học Sinh chưa có Phụ Huynh).
  - Duyệt yêu cầu đổi Phần Thưởng Thực Tế (confirm delivery).
  - Tạo danh mục Phần Thưởng Thực Tế (số lượng giới hạn, đặt giá NP).
  - Tạo Nhiệm vụ giao cho con (Parent Quests).
  - Xem báo cáo học tập của tất cả học sinh trong nhóm gia đình.
  - Cấu hình Chân Khí (`maxEnergy`, `resetHours`) cho từng con.
  - Mời Phụ huynh Phụ tham gia nhóm.
  - "Rời con" (kick Học Sinh khỏi nhóm gia đình).
- **Không được phép:** Quản lý ngân hàng câu hỏi, xem học sinh ngoài gia đình mình.

#### 👤 Phụ Huynh Phụ (Secondary Parent)
- **Code value:** `'secondary_parent'`
- **Thuật ngữ UI:** Phụ Huynh Phụ (hiển thị chung giao diện Viện Chủ, badge màu khác)
- Là người đồng hành cùng Phụ huynh Chính. Được Phụ huynh Chính mời vào Nhóm Gia Đình.
- Chia sẻ chung danh sách học sinh trong nhóm.
- **Quyền do Phụ huynh Chính cấu hình bật/tắt từng mục:**
  - Được phép duyệt đổi quà (on/off — mặc định: off).
  - Được phép tạo Nhiệm vụ mới (on/off — mặc định: off).
  - Chỉ được xem báo cáo (Read-only — mặc định: on).
- **Luôn không được phép:** Kick Học Sinh, mời Phụ huynh Phụ khác, cấu hình Energy.
- **Lưu trữ:** `ge10_family_links.link_type = 'secondary'` + permissions JSON

---

### Tầng 3: Người Quản Trị Học Viện

> ⚠️ Các tài khoản trong tầng này **không tự tạo được** và **không thuộc mô hình gia đình**. Phải được Viện Trưởng hiện tại chỉ định.

#### 👑 Viện Trưởng (Super Admin)
- **Code value:** `'truong_vien'`
- **Thuật ngữ UI:** Viện Trưởng 👑
- **Tương đương cũ:** `'admin'` — toàn bộ quyền cũ giữ nguyên, đổi tên.
- Chủ nhân tối cao của Học Viện. Không bị giới hạn bởi bất kỳ ràng buộc phân quyền nào.
- **Quyền hạn đầy đủ (bao gồm tất cả quyền của Phó Viện, cộng thêm):**
  - Bổ nhiệm/hạ cấp Phó Viện
  - Bổ nhiệm Viện Trưởng mới (chia sẻ quyền)
  - Xóa tài khoản vĩnh viễn
  - Cấu hình Boss Bounty toàn hệ thống
  - Xem audit log đầy đủ
  - Override mọi cài đặt hệ thống

#### 🛡️ Phó Viện (Moderator)
- **Code value:** `'pho_vien'`
- **Thuật ngữ UI:** Phó Viện 🛡️
- Được Viện Trưởng ủy quyền quản lý học viện. Có quyền quản trị nội dung và học sinh nhưng bị giới hạn ở cấp độ phân quyền.
- **Quyền hạn:**
  - Xem toàn bộ danh sách học sinh trong viện.
  - CRUD câu hỏi trong ngân hàng câu hỏi.
  - Import đề thi bằng AI Gemini.
  - Thăng/hạ vai trò trong phạm vi: `student` ↔ `parent`.
  - Cấu hình Energy cho học sinh.
  - Xem Thiên Cơ Các — dashboard đầy đủ.
  - Cấu hình bonus Boss Card.
- **Không được phép:**
  - Thăng/hạ vai trò Phó Viện hoặc Viện Trưởng.
  - Xóa tài khoản.
  - Xem audit log hành động admin.

---

## 3. Cấu Trúc Nhóm Gia Đình (Family Group)

Nhóm Gia Đình là không gian liên kết giữa Người Quản Trị (Phụ huynh) và Học sinh.

- **Nguyên tắc "1 Cha":** Mỗi Học Sinh (Con) tại một thời điểm chỉ có duy nhất **01 Phụ huynh Chính**.
- Một Phụ huynh Chính có thể quản lý **nhiều Học sinh** (ví dụ: gia đình có 3 con, hoặc lớp học có 40 học sinh).
- Một Phụ huynh Chính có thể mời **nhiều Phụ huynh Phụ** tham gia cùng quản lý.

### 3.1 Cơ Chế Mời và Kết Nối
Tất cả các lời mời đều thông qua việc nhập ID tài khoản hoặc quét mã QR Code.

- **Phụ Huynh mời Con:**
  - Phụ huynh tìm ID/Mã QR của Học Sinh để gửi lời mời. Chỉ những Học Sinh *chưa có Cha* mới nhận được lời mời này.
  - Con có quyền **Approve (Chấp nhận)** hoặc **Reject (Từ chối)** lời mời.
  - Lời mời chờ (pending) tự hết hạn sau 7 ngày nếu không được phản hồi.
- **Con mời Phụ Huynh:**
  - Học Sinh chưa có Cha có thể nhập ID/Mã QR của một Phụ Huynh để chủ động xin vào nhóm.
  - Phụ huynh nhận được thông báo và có quyền chấp nhận/từ chối.
- **🔓 Không còn PIN Lockscreen khi vào Bảng Quản Trị (bãi bỏ 2026-07-11):** Trước đây có một màn hình khóa ("Viện Chủ Lockscreen") yêu cầu nhập mã PIN mỗi khi vào ParentConsole. Cơ chế này đã bị **bỏ hẳn** — chọn vai trò Phụ Huynh lúc đăng nhập (hoặc vào lại ParentConsole sau đó) đưa thẳng vào Bảng Quản Trị Viện Chủ, không còn bước xác thực PIN nào chắn giữa. `parentPIN`/`changePIN` vẫn còn (dùng cho mục đích khác trong Chính Điện), nhưng không còn action `verifyPIN` hay bất kỳ màn hình gate nào dùng nó.
- **Rời Nhóm:**
  - Phụ Huynh có quyền kick/rời Học Sinh khỏi nhóm (Học Sinh mất liên kết nhưng tài khoản không bị xóa).
  - Học Sinh cũng có quyền rời nhóm tự do (thực chất là rời lớp/giải phóng bản thân).
  - Sau khi rời, Học Sinh có thể tự do gia nhập nhóm gia đình mới.

### 3.2 Quy Tắc Ủy Quyền Phụ Huynh Phụ
Phụ huynh Chính toggle các quyền sau cho từng Phụ huynh Phụ (mặc định: chỉ xem):

| Quyền | Mặc định | Mô tả |
|:---|:---:|:---|
| Xem báo cáo học tập | ✅ ON | Luôn được phép, không thể tắt |
| Duyệt đổi quà (Phần Thưởng) | ❌ OFF | Có thể bật — dùng NP chung nhóm |
| Tạo Nhiệm vụ mới | ❌ OFF | Có thể bật |
| Cấu hình Energy | ❌ LOCKED | Không thể bật — chỉ Phụ huynh Chính |

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
| Promote → Phó Viện | — | ❌ | ❌ | ❌ | ✅ |
| Promote → Viện Trưởng | — | ❌ | ❌ | ❌ | ✅ |
| Xem Thiên Cơ Các (full) | — | ❌ | ❌ | ✅ | ✅ |
| Xóa tài khoản vĩnh viễn | — | ❌ | ❌ | ❌ | ✅ |
| Xem Audit Log | — | ❌ | ❌ | ❌ | ✅ |

> ⚙️ = tùy cấu hình của Phụ huynh Chính

---

## 5. Lộ Trình Triển Khai

### Sprint 1 — MVP Khẩn Cấp
1. Migrate `'admin'` → `'truong_vien'` trong DB và tất cả code checks.
2. Cập nhật Types TypeScript.
3. Thêm `'pho_vien'` vào backend authorization.
4. UI ParentConsole: phân biệt badge Viện Trưởng vs. Phó Viện, thêm nút "Bổ nhiệm Phó Viện".

### Sprint 2 — Phụ Huynh Phụ
1. Thêm `link_type` và `secondary_permissions` vào `ge10_family_links`.
2. API: invite secondary parent, manage permissions.
3. UI: Phụ huynh Chính manage Phụ huynh Phụ trong ParentConsole.

### Sprint 3 — Audit & Security
1. Bảng `ge10_admin_audit_log`.
2. API `GET /api/admin/audit-log`.
3. Notification system khi role thay đổi.
