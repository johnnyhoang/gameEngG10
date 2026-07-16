# Sub-Spec: Hệ Thống Phân Quyền & Lớp Chủ Nhiệm (Family & Role System)
*Cập nhật: 2026-07-13 — Bổ sung cơ chế duyệt ứng tuyển Phó Viện Trưởng, Xin đồng hành và roster phân quyền*

Tài liệu này xác định các vai trò (Role) trong hệ thống GameEngG10, cấu trúc Lớp Chủ Nhiệm, quyền hạn và cách thức kết nối giữa các vai trò theo kiến trúc Đa Hồ Sơ (Multi-Profile).

Contract xác thực, active-profile context và cô lập dữ liệu được định nghĩa tại [SUB_SPEC_AUTH_PROFILE.md](./SUB_SPEC_AUTH_PROFILE.md). Ma trận quyền trong tài liệu này luôn được đánh giá theo **profile đang active**, không theo toàn bộ account Google.

---

## 1. Kiến Trúc Đa Hồ Sơ (Multi-Profile Architecture)

Mỗi tài khoản Google (Google Account) đăng nhập vào ứng dụng không bị giới hạn trong 1 vai trò duy nhất. Thay vào đó, 1 Google Account đóng vai trò là "Chìa khóa" (`account_id`) để quản lý tối đa **4 hồ sơ (Profile)** biệt lập, mỗi hồ sơ có một vai trò riêng.

### 1.1 Sơ Đồ Các Hồ Sơ Tối Đa Của 1 Người

| # | Hồ Sơ | Cách Tạo | Cách Vô Hiệu Hóa | Có thể phục hồi? |
|:--|:-------|:---------|:-----------------|:----------------|
| 1 | **Học Sinh** (`student`) | Tự tạo | Admin set `is_active = false` | ✅ Có |
| 2 | **Chủ Nhiệm Chính** (`tutor`) | Tự tạo | Admin set `is_active = false` | ✅ Có |
| 3 | **Phó Viện Trưởng** (`pho_vien`) | Viện Trưởng chỉ định → **hệ thống INSERT profile mới** | Viện Trưởng thu hồi → `is_active = false` | ✅ Có (reactivate) |
| 4 | **Viện Trưởng** (`truong_vien`) | Viện Trưởng khác chỉ định → **hệ thống INSERT profile mới** | Viện Trưởng thu hồi → `is_active = false` | ✅ Có (reactivate) |

> ⚠️ **Không bao giờ DELETE profile** — dữ liệu lịch sử hoạt động luôn được giữ lại. Khi bị thu hồi quyền, cột `is_active` được set `FALSE`. Người dùng sẽ không thấy profile này trên màn hình chọn hồ sơ và không thể truy cập nó cho đến khi được reactivate.

### 1.2 Nguyên Tắc Cốt Lõi

- **Tự Tạo Hồ Sơ Thường:** Người dùng có thể tự tạo hồ sơ **Học Sinh** hoặc **Chủ Nhiệm** bất kỳ lúc nào.
- **Biệt Lập Tuyệt Đối:** Mỗi hồ sơ là một tiến trình game và quyền hạn hoàn toàn tách biệt. Hai hồ sơ cùng tài khoản Google hoạt động song song mà không ảnh hưởng lẫn nhau.
- **Account Không Tham Gia Nghiệp Vụ:** Hành vi không được thay đổi theo việc account đang có một hay nhiều profile. Hai profile cùng account được xét quyền, quan hệ, tiến trình và tương tác giống hai profile thuộc hai account khác nhau; `account_id` chỉ nối profile với phiên xác thực.
- **Chuyển Đổi Linh Hoạt (Switch Role):** Khi đăng nhập, màn hình chọn hồ sơ **luôn hiển thị các profile đang `is_active = true`** của tài khoản đó. Điều này cho phép người dùng (kể cả có quyền Viện Trưởng/Phó Viện Trưởng) có thể tự do lựa chọn hoặc tạo mới hồ sơ Học Sinh / Chủ Nhiệm khi cần thiết.
- **Hồ Sơ Quản Trị Được Tạo Động:** Khi Viện Trưởng chỉ định ai đó làm Phó Viện Trưởng/Viện Trưởng, hệ thống **tự động INSERT một profile mới** với vai trò đó gắn vào `account_id` của người được chỉ định. Khi bị thu hồi, profile đó bị **vô hiệu hóa** (`is_active = false`) — không bị xóa — và có thể được reactivate bởi Viện Trưởng bất cứ lúc nào.


---

## 2. Định Nghĩa Vai Trò (User Roles)

Hệ thống chia thành **3 tầng chức năng** với **5 vai trò cụ thể**:

---

### Tầng 1: Người Tu Học

#### 🌱 Học Sinh (Student)
- **Code value:** `'student'`
- **Thuật ngữ UI:** Sĩ Tử 🌱
- Là trung tâm của ứng dụng. Tham gia giải bài, kiếm XP/Ruby, nuôi thú ảo.
- Chỉ có quyền truy cập vào Môi trường Sĩ Tử (World Map, Trường Thi, Học Đường...).
- Một Học Sinh (Con) có thể chưa có Chủ Nhiệm, và có thể mời người khác làm Chủ Nhiệm của mình.

---

### Tầng 2: Người Đồng Hành Gia Đình

#### 👨‍👩‍👧 Chủ Nhiệm Chính (Primary Parent)
- **Code value:** `'tutor'`
- **Thuật ngữ UI:** Chủ Nhiệm Chính 👨‍👩‍👧
- Đóng vai trò người ra quyết định chính trong một Lớp Chủ Nhiệm.
- **Quyền hạn:**
  - Nhận/mời nhiều Học Sinh làm con (những Học Sinh chưa có Chủ Nhiệm).
  - Duyệt yêu cầu đổi Quà Khuyến Học (confirm delivery).
  - Tạo Danh Mục Quà Khuyến Học (số lượng giới hạn, đặt giá Ruby).
  - Tạo Nhiệm vụ giao cho con (Parent Quests).
  - Xem báo cáo học tập của tất cả học sinh trong lớp chủ nhiệm.
  - Cấu hình Năng Lượng (`maxEnergy`, `resetHours`) cho từng con.
  - Mời Chủ nhiệm Phụ tham gia nhóm.
  - "Rời con" (kick Học Sinh khỏi lớp chủ nhiệm).
- **Không được phép:** Quản lý ngân hàng câu hỏi, xem học sinh ngoài gia đình mình.

#### 👤 Chủ Nhiệm Phụ (Secondary Parent)
- **Code value:** `'secondary_tutor'`
- **Thuật ngữ UI:** Chủ Nhiệm Phụ (hiển thị chung Phòng Điều Hành, badge màu khác)
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

> ⚠️ Profile Viện Trưởng và Phó Viện Trưởng **không tự tạo được** — hệ thống tự động sinh profile mới gắn vào tài khoản Google của người được chỉ định. Khi bị thu hồi quyền, profile được đặt `is_active = false`, không xóa lịch sử và có thể được kích hoạt lại.

#### 👑 Viện Trưởng (Super Admin)
- **Code value:** `'truong_vien'`
- **Thuật ngữ UI:** Viện Trưởng 👑
- **Tương đương cũ:** `'admin'` — toàn bộ quyền cũ giữ nguyên, đổi tên.
- Chủ nhân tối cao của Học Viện. Không bị giới hạn bởi bất kỳ ràng buộc phân quyền nào.
- **Cơ chế profile:** Khi được chỉ định, hệ thống INSERT một profile `truong_vien` mới vào `ge10_users` gắn với `account_id` của người đó. Khi bị thu hồi, profile này được đặt `is_active = false`.
- **Quyền hạn đầy đủ (bao gồm tất cả quyền của Phó Viện Trưởng, cộng thêm):**
  - Bổ nhiệm Phó Viện Trưởng → hệ thống tự sinh profile Phó Viện Trưởng cho người được chọn
  - Thu hồi Phó Viện Trưởng → hệ thống vô hiệu hóa profile Phó Viện Trưởng của người đó
  - Bổ nhiệm Viện Trưởng mới → hệ thống tự sinh profile Viện Trưởng cho người được chọn
  - Xóa tài khoản vĩnh viễn
  - Cấu hình Boss Bounty toàn hệ thống
  - Xem audit log đầy đủ
  - Override mọi cài đặt hệ thống

#### 🛡️ Phó Viện Trưởng (Moderator)
- **Code value:** `'pho_vien'`
- **Thuật ngữ UI:** Phó Viện Trưởng 🛡️
- Được Viện Trưởng ủy quyền quản lý học viện. Có quyền quản trị nội dung và học sinh nhưng bị giới hạn ở cấp độ phân quyền.
- **Cơ chế profile:** Khi được chỉ định, hệ thống INSERT một profile `pho_vien` mới vào `ge10_users` gắn với `account_id` của người đó. Khi bị thu hồi, profile này được đặt `is_active = false`.
- **Quyền hạn:**
  - Xem toàn bộ danh sách học sinh trong viện.
  - CRUD câu hỏi trong ngân hàng câu hỏi.
  - Import đề thi bằng AI Gemini.
  - Thăng/hạ vai trò trong phạm vi: `student` ↔ `tutor`.
  - Cấu hình Energy cho học sinh.
  - Xem Phòng Học Vụ — dashboard đầy đủ.
  - Cấu hình bonus Boss Card.
- **Không được phép:**
  - Thăng/hạ vai trò Phó Viện Trưởng hoặc Viện Trưởng.
  - Xóa tài khoản.
  - Xem audit log hành động admin.

---

## 3. Cấu Trúc Lớp Chủ Nhiệm (Family Group)

Lớp Chủ Nhiệm là không gian liên kết giữa Người Quản Trị (Chủ nhiệm) và Học sinh.

- **Nguyên tắc "1 Cha":** Mỗi Học Sinh (Con) tại một thời điểm chỉ có duy nhất **01 Chủ nhiệm Chính**.
- Một Chủ nhiệm Chính có thể quản lý **nhiều Học sinh** (ví dụ: gia đình có 3 con, hoặc lớp học có 40 học sinh).
- Một Chủ nhiệm Chính có thể mời **nhiều Chủ nhiệm Phụ** tham gia cùng quản lý.

### 3.1 Cơ Chế Mời và Kết Nối
Tất cả các lời mời kết nối được xử lý thông qua việc nhập Email Google hoặc quét mã QR Code sau này. Bố cục giao diện kết nối (`FamilyManager.tsx`) được thiết kế trực quan dạng **lưới 2 cột x 2 hàng (Grid layout 2x2)** gồm 4 hành động:
1.  **Mời Thành Viên Lớp Học:** Giáo viên chủ nhiệm mời Học sinh vào lớp bằng cách nhập Email Google của học sinh.
2.  **Mời Giáo Viên Phụ Đồng Hành:** Giáo viên chủ nhiệm chính mời người khác cùng đồng hành quản lý lớp làm Chủ nhiệm phụ.
3.  **Xin Đồng Hành Lớp Khác:** Giáo viên phụ (hoặc giáo viên muốn hỗ trợ) gửi yêu cầu liên kết với Giáo viên chủ nhiệm chính của lớp đó.
4.  **Ứng Tuyển Làm Phó Viện Trưởng Trường Học:** Giáo viên tự nộp đơn ứng tuyển làm Phó Viện Trưởng của trường. Đơn này xuất hiện công khai trên trang quản trị Phòng Học Vụ của Viện Trưởng để phê duyệt (hoặc từ chối) trực tiếp, giúp lược bỏ quy trình liên hệ/gửi email tay rườm rà.

- **Kết nối bằng Email Google (bãi bỏ ID):**
  - Mọi lời mời kết nối đều sử dụng **Email Google** làm định danh kết nối thay vì ID hồ sơ DB rườm rà.
  - Khi gửi lời mời tới một email, nếu tài khoản Google đó đã đăng ký hệ thống nhưng chưa tạo vai trò cần thiết, hệ thống sẽ **tự động khởi tạo vai trò tương ứng ở background** (Học Sinh hoặc Chủ Nhiệm) để nhận lời mời.
- **Thầy/Cô mời Học Sinh (Chủ Nhiệm mời Con):**
  - Chủ Nhiệm nhập Email Google của Học Sinh để gửi lời mời.
  - Hệ thống kiểm tra: Nếu Học Sinh **chưa có Chủ Nhiệm**, hệ thống tạo liên kết chính (`primary`) với trạng thái chờ Học Sinh duyệt (`pending_student`).
  - Nếu Học Sinh **đã có Chủ Nhiệm chính**, hệ thống sẽ cảnh báo (alert). Chủ Nhiệm có thể chọn gửi lời mời làm **Phó Chủ Nhiệm (Chủ Nhiệm Phụ)** để cùng quản lý. Liên kết này được gửi dưới dạng `secondary` với trạng thái chờ Chủ Nhiệm chính của Học Sinh duyệt (`pending_primary`).
- **Con xin kết nối với Thầy/Cô (Học Sinh mời Chủ Nhiệm):**
  - Học Sinh chưa có Chủ Nhiệm có thể nhập Email Google của một Thầy/Cô để xin vào lớp.
  - Thầy/Cô nhận được yêu cầu kết nối dưới dạng chờ duyệt (`pending_tutor`) và có quyền chấp nhận hoặc từ chối.
- **🔓 Mã PIN bảo mật cá nhân bị bãi bỏ hoàn toàn (2026-07-11):** Hệ thống mã PIN bảo mật cá nhân (`parentPIN` / `changePIN` / `verifyPIN`) trước đây dùng để khóa các hành động nhạy cảm đã bị **bãi bỏ hoàn toàn**. Do thiết kế mới chia profile độc lập, phân quyền cực kỳ chặt chẽ ngay từ màn hình Login của Google/Supabase, nên việc dùng thêm mã PIN là không cần thiết và gây rườm rà. Mọi thao tác quản lý vai trò giờ đây được kiểm soát trực tiếp qua phiên đăng nhập của Viện Trưởng.
- **Rời Nhóm:**
  - Chủ Nhiệm có quyền kick/rời Học Sinh khỏi nhóm (Học Sinh mất liên kết nhưng tài khoản không bị xóa).
  - Học Sinh cũng có quyền rời nhóm tự do (thực chất là rời lớp/giải phóng bản thân).
  - Sau khi rời, Học Sinh có thể tự do gia nhập lớp chủ nhiệm mới.

### 3.2 Quy Tắc Ủy Quyền Chủ Nhiệm Phụ
Chủ nhiệm Chính toggle các quyền sau cho từng Chủ nhiệm Phụ (mặc định: chỉ xem):

| Quyền | Mặc định | Mô tả |
|:---|:---:|:---|
| Xem báo cáo học tập | ✅ ON | Luôn được phép, không thể tắt |
| Duyệt đổi quà (Phần Thưởng) | ❌ OFF | Có thể bật — dùng Ruby chung nhóm |
| Tạo Nhiệm vụ mới | ❌ OFF | Có thể bật |
| Cấu hình Energy | ❌ LOCKED | Không thể bật — chỉ Chủ nhiệm Chính |

### 3.3 Đại Sảnh Đường (Lớp mặc định của trường)
Đối với những Học Sinh chưa kết nối với bất kỳ lớp học hay Chủ nhiệm nào (học sinh mồ côi):
- **Danh mục quà tặng mặc định**: Hệ thống tự động khởi tạo danh mục quà tặng mặc định (ví dụ: Ly trà sữa, 1h chơi iPad...) lưu trực tiếp theo tài khoản học sinh.
- **Quản lý lâm thời**: Ban Giám Hiệu gồm **Viện Trưởng** (`truong_vien`) và **Phó Viện Trưởng** (`pho_vien`) sẽ trực tiếp đóng vai trò là **Chủ nhiệm lâm thời** của học sinh đó.
- **Quyền hạn**: Viện Trưởng / Phó Viện Trưởng có quyền nạp Năng Lượng, giao Bảng Bài Tập riêng cho Sĩ Tử và duyệt yêu cầu đổi Quà Khuyến Học từ Phòng Điều Hành toàn viện.

### 3.4 Danh Sách Nhân Sự & Học Viên (Roster)
Bảng Roster trong Phòng Học Vụ (`SettingsManager.tsx`) thay thế hoàn toàn bảng xếp hạng Leaderboard cũ, đóng vai trò là sổ quản lý nhân sự phân quyền:
*   **Phân chia tab chính:**
    1.  `Sĩ Tử`: Danh sách học sinh.
    2.  `Chủ Nhiệm`: Danh sách giáo viên chủ nhiệm chính.
    3.  `Đồng Hành`: Danh sách giáo viên phụ hỗ trợ.
    4.  `Ban Giám Hiệu`: Danh sách Viện Trưởng và Phó Viện Trưởng.
*   **Phân quyền hiển thị theo vai trò (Role-based filtering):**
    *   **Giáo viên (Chủ nhiệm/Phụ):** Chỉ được nhìn thấy học sinh trong phạm vi các lớp mình phụ trách. Tab `Sĩ Tử` của giáo viên chia thành 2 sub-tabs:
        - `Lớp của tôi (Chủ nhiệm)`: Hiện học sinh liên kết chính (`primary`).
        - `Lớp đồng hành phụ`: Hiện học sinh liên kết phụ (`secondary`).
    *   **Ban giám hiệu:** Nhìn thấy toàn bộ học sinh trong trường học (tất cả các lớp).
*   **Các cột hiển thị chi tiết:**
    *   *Học sinh:* Hạng, Tên & Avatar, Cấp độ (LV), Danh hiệu (theo Level), Chuỗi tinh tấn (Streak), Người quản lý trực tiếp (danh sách giáo viên chủ nhiệm & hỗ trợ), Tổng số XP tích lũy.
    *   *Giáo viên:* Tên & Avatar, Email, Danh sách Học sinh phụ trách (chủ nhiệm hoặc hỗ trợ).
    *   *Ban giám hiệu:* Tên & Avatar, Email, Vai trò (Viện Trưởng hoặc Phó Viện Trưởng).

### 3.5 Sơ Đồ Tổ Chức (Organization Chart)

Nằm trong **Phòng Hiệu Trưởng** (`phong_hieu_truong`), sơ đồ tổ chức hiển thị trực quan các liên kết nhân sự dưới dạng cây phân cấp (Diagram):
1.  **Nhóm Viện Chủ (Viện Trưởng 👑):** Ở tầng cao nhất, đại diện cho những người sở hữu toàn quyền học viện.
2.  **Nhóm Phó Viện Chủ (Phó Viện Trưởng 🛡️):** Tầng tiếp theo, được kết nối với nhóm Viện Chủ qua các liên kết quản trị.
3.  **Chủ Nhiệm Chính (👨‍👩‍👧):** Tầng thứ ba, đại diện cho những giáo viên chủ nhiệm quản lý các lớp học.
4.  **Phó Chủ Nhiệm (👤):** Tầng thứ tư, nối trực tiếp với Chủ Nhiệm Chính tương ứng (qua liên kết `secondary` giữa 2 giáo viên) và nối ngang/chéo với các Phó Chủ Nhiệm khác trong lớp học.
5.  **Sĩ Tử (Học Sinh 🌱):** Hiển thị gọn gàng dưới chân của từng giáo viên chủ nhiệm phụ trách (cả chính và phụ). Những học sinh tự do (chưa gán lớp) sẽ được hiển thị dưới dạng nhóm riêng do Ban Giám Hiệu (Viện Trưởng/Phó Viện Trưởng) quản lý trực tiếp.

**Quy tắc bảo mật thông tin UI:**
- Tuyệt đối không hiển thị ID cơ sở dữ liệu (`id`, `uuid`, `profile_id`...) của các tài khoản trên giao diện sơ đồ.
- Chỉ hiển thị Tên hiển thị (`name`), nếu không có tên thì bắt buộc dùng Email (`email`). Kèm theo Avatar và các tooltip thông tin giáo dục thân thiện (XP, Level, Streak).

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
| Promote → Phó Viện Trưởng | — | ❌ | ❌ | ❌ | ✅ |
| Promote → Viện Trưởng | — | ❌ | ❌ | ❌ | ✅ |
| Xem Phòng Học Vụ (full) | — | ❌ | ❌ | ✅ | ✅ |
| Xóa tài khoản vĩnh viễn | — | ❌ | ❌ | ❌ | ✅ |
| Xem Audit Log | — | ❌ | ❌ | ❌ | ✅ |

> ⚙️ = tùy cấu hình của Chủ nhiệm Chính

---

## 5. Lộ Trình Triển Khai

### Sprint 1 — MVP Khẩn Cấp
1. Migrate `'admin'` → `'truong_vien'` trong DB và tất cả code checks.
2. Cập nhật Types TypeScript.
3. Thêm `'pho_vien'` vào backend authorization.
4. UI TutorConsole: phân biệt badge Viện Trưởng vs. Phó Viện Trưởng, thêm nút "Bổ nhiệm Phó Viện Trưởng".

### Sprint 2 — Chủ Nhiệm Phụ
1. Thêm `link_type` và `secondary_permissions` vào `ge10_family_links`.
2. API: invite secondary parent, manage permissions.
3. UI: Chủ nhiệm Chính manage Chủ nhiệm Phụ trong TutorConsole.

### Sprint 3 — Audit & Security
1. Bảng `ge10_admin_audit_log`.
2. API `GET /api/admin/audit-log`.
3. Notification system khi role thay đổi.
