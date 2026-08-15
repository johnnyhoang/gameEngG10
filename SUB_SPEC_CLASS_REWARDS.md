# Sub-Spec: Quà Khuyến Học (School Rewards & Class Rewards)
*Cập nhật: 2026-08-15 — Viết mới sau audit toàn bộ hệ thống quà/phát thưởng: thêm cờ "không giới hạn", sửa mô hình sở hữu quà lớp của Trợ Giảng, và bịt lỗ hổng "đổi quà không trừ tiền".*
*Cập nhật 2026-08-15 (đợt 2): chuẩn hóa thuật ngữ theo [SUB_SPEC_TERMINOLOGY.md](./SUB_SPEC_TERMINOLOGY.md) — Chủ Nhiệm Chính/Phụ → Chủ Nhiệm/Trợ Giảng, Ban Giám Hiệu → Ban Lãnh Đạo Viện, Quà TRƯỜNG → Quà TOÀN VIỆN.*
*Cập nhật 2026-08-15 (đợt 4): §4.3 sửa lại — lớp mới chỉ nhân bản ĐÚNG 1 quà mặc định (không còn copy nguyên cả danh mục toàn viện).*

Tài liệu này đặc tả đầy đủ cơ chế **Danh Mục Quà Khuyến Học** — được [CORE_SPECS.md §3.2](./CORE_SPECS.md) trỏ tới. Vai trò và cấu trúc Lớp Chủ Nhiệm nằm ở [SUB_SPEC_FAMILY_ROLE.md](./SUB_SPEC_FAMILY_ROLE.md); tài liệu này chỉ tập trung vào chính cơ chế quà.

> ❌ Không có tỷ giá tiền thật. Ruby là tài nguyên ảo trong app — xem Luật Ruby tại CORE_SPECS §3.1.

---

## 1. Kiến trúc 2 tầng

Có **đúng 2** danh mục quà, không có tầng thứ 3:

| Tầng | Bảng | Ai xem | Ai CRUD | Ai duyệt |
|:--|:--|:--|:--|:--|
| **Quà TOÀN VIỆN** (`ge10_school_reward_templates`) | 1 danh sách DÙNG CHUNG toàn viện | Học sinh **chưa có lớp** (mồ côi) | Viện Trưởng / Viện Phó | Viện Trưởng / Viện Phó |
| **Quà LỚP** (`ge10_class_rewards`) | 1 danh sách / lớp (khoá theo `teacher_id` = ID Chủ Nhiệm) | Học sinh **thuộc lớp đó** | Chủ Nhiệm, hoặc Trợ Giảng được cấp quyền | Chủ Nhiệm, hoặc Trợ Giảng được cấp quyền |

**Không có khái niệm "lớp" là 1 bảng riêng** — 1 lớp = tập học sinh liên kết `primary` tới cùng 1 Chủ Nhiệm (`ge10_class_links`). `ge10_class_rewards.teacher_id` chính là ID hồ sơ của Chủ Nhiệm đó.

---

## 2. Cờ "Không giới hạn" (`is_unlimited`)

Cả `ge10_school_reward_templates` và `ge10_class_rewards` đều có cột `is_unlimited BOOLEAN` (migration `20260815_reward_unlimited_and_class_ownership.sql`). Khi `TRUE`:
- Cột `quantity`/`remaining_quantity` (hoặc `remaining` ở quà lớp) bị **bỏ qua hoàn toàn** — không hiển thị, không kiểm tra tồn kho, không trừ/hoàn khi đổi/huỷ.
- Người tạo **không cần nhập số như `999999`** để giả lập không giới hạn — đây là hack cũ đã bị loại bỏ (migration backfill mọi dòng seed cũ có `quantity >= 999999` sang `is_unlimited = TRUE`).
- Dùng chủ yếu cho quà TOÀN VIỆN (áp dụng cho học sinh mồ côi, số lượng không giới hạn theo đúng yêu cầu nghiệp vụ). Quà LỚP cũng hỗ trợ cờ này để giáo viên có thể tạo phúc lợi không giới hạn riêng, và để giữ nguyên cờ khi 1 quà toàn viện "không giới hạn" được nhân bản xuống lớp.

---

## 3. Quà TOÀN VIỆN — dành cho học sinh mồ côi

### 3.1 CRUD (Ban Lãnh Đạo Viện)
`GET/POST/PUT/DELETE /api/admin/school-rewards` (`backend/src/routes/admin.ts`) — gate bởi `requireAcademyAdmin()`: chỉ `truong_vien`/`pho_vien`. Giáo viên (tutor/secondary_tutor) **không có quyền** ở đây.

### 3.2 Xem / Đổi / Tự huỷ (Học sinh mồ côi)
`backend/src/routes/schoolRewards.ts` — mọi hồ sơ đã đăng nhập gọi được, nhưng chỉ có ý nghĩa với học sinh không có `ge10_class_links` active nào:
- `GET /api/school-rewards` → `{ rewards, redemptions }` (redemptions là của chính hồ sơ đang active).
- `POST /api/school-rewards/:id/redeem` → **atomic trong 1 transaction**: kiểm tra tồn kho (bỏ qua nếu `is_unlimited`) → kiểm tra đủ Ruby → trừ Ruby → trừ `remaining_quantity` (nếu không unlimited, có `WHERE remaining_quantity > 0` chống race condition) → tạo `ge10_reward_redemptions` trạng thái `pending`.
- `DELETE /api/school-rewards/redemptions/:id` → học sinh tự rút lại yêu cầu đang `pending`: hoàn Ruby + hoàn `remaining_quantity` (nếu không unlimited) → đánh dấu `cancelled`.

> ⚠️ **Trước đây route đổi quà này không tồn tại.** Client tự trừ Ruby trong state cục bộ (Zustand) rồi đẩy bản ghi redemption qua endpoint sync chung của toàn bộ profile (`POST /api/profile/:id/sync`), không có transaction, không xác thực lại giá/tồn kho ở server, không trừ `remaining_quantity` ở bất kỳ đâu. Đây là nguyên nhân của bug "đổi quà xong không trừ tiền" — sync có thể thất bại giữa chừng khiến redemption tồn tại mà Ruby không thực sự bị trừ trong DB, hoặc học sinh đổi vượt quá tồn kho "có hạn" vô hạn lần. Route atomic trên đã thay thế hoàn toàn luồng cũ; `routes/profiles.ts` giờ **bỏ qua có chủ đích** mọi `rewardRedemptions` gửi lên từ client trong payload sync.

### 3.3 Duyệt / Huỷ (Ban Lãnh Đạo Viện)
`POST /api/admin/deliver-reward` và `POST /api/admin/cancel-redemption` (`admin.ts`) — gate bởi `checkStudentManagementPermission(actorId, studentId, 'approve_reward')`. Cả 2 route atomic, đã đúng từ trước (không phải phần bị sửa trong audit này).

---

## 4. Quà LỚP — dành cho học sinh có lớp

### 4.1 Mô hình sở hữu chung (owner resolution)

`ge10_class_rewards.teacher_id` luôn là ID của **Chủ Nhiệm** — kể cả khi thao tác tạo/sửa/xoá/duyệt được thực hiện bởi Trợ Giảng. `backend/src/routes/classRewards.ts::resolveClassContext(profileId, role)` giải quyết:

- **role = `tutor`** → `ownerId = profileId` (chính họ), `canManage = true` luôn (không cần toggle).
- **role = `secondary_tutor`** → tra `ge10_class_links` để tìm Chủ Nhiệm của (các) học sinh mà họ có liên kết `secondary` active, lấy `owner_id` từ liên kết `primary` tương ứng; `canManage = secondary_permissions.can_approve_rewards === true` (đúng 1 cờ, dùng chung cho cả "tạo/sửa/xoá" lẫn "duyệt" — khớp với ma trận §3.2 SUB_SPEC_FAMILY_ROLE.md chỉ có 1 dòng "Tạo/Duyệt Phần Thưởng").
- Trợ Giảng chưa liên kết `secondary` active với học sinh nào → `ownerId = null`, không quản lý được gì.

> ⚠️ **Trước đây** Trợ Giảng tạo quà dưới **chính `profile.id` của họ** (tách biệt khỏi danh mục của Chủ Nhiệm), và toàn bộ router chỉ kiểm tra `role ∈ {tutor, secondary_tutor, truong_vien, pho_vien}` — không hề đọc `secondary_permissions`, và còn cho phép Ban Lãnh Đạo Viện tự tạo "quà lớp" cá nhân trái với vai trò của họ (quà toàn viện mới là kênh đúng cho Ban Lãnh Đạo Viện). Route `PATCH .../deliver` cũ so `cr.teacher_id === req.profile.id`, nên Trợ Giảng **không bao giờ** duyệt được quà của Chủ Nhiệm dù được bật quyền — toggle hoàn toàn vô tác dụng. Đã sửa cả 2.

### 4.2 CRUD + Duyệt

Router `backend/src/routes/classRewards.ts`, `TEACHER_ROLES = ['tutor', 'secondary_tutor']` (Ban Lãnh Đạo Viện đã bị loại khỏi danh sách này):

- `GET /api/class-rewards` → trả về `{ rewards, redemptions, isOrphan, canManage }`. `canManage` tính ở server theo §4.1, FE dùng thẳng giá trị này (không tự suy đoán lại theo role — tránh lệch dữ liệu như bug đã sửa ở §4.1).
- `POST /api/class-rewards` / `DELETE /api/class-rewards/:id` → yêu cầu `canManage === true`; ghi/xoá trên `ownerId`, không phải `profileId` của actor.
- `POST /api/class-rewards/:id/redeem` → học sinh đổi quà, atomic giống hệt §3.2 (transaction, tôn trọng `is_unlimited`).
- `DELETE /api/class-rewards/redemptions/:id` → học sinh tự huỷ yêu cầu `pending`.
- `PATCH /api/class-rewards/redemptions/:id/deliver` → yêu cầu actor thoả `ownerTeacherId === (profileId nếu tutor, hoặc resolveClassContext().ownerId nếu secondary_tutor với canManage=true)`.

### 4.3 Nhân bản (clone) từ quà TOÀN VIỆN — CHỈ 1 QUÀ, CHỈ 1 LẦN lúc tạo hồ sơ

`helpers/questions.ts::ensureDefaultClassRewards(teacherId)`:
1. Đọc cờ `ge10_users.class_rewards_seeded` của giáo viên đó.
2. Nếu đã `TRUE` → không làm gì (kể cả khi giáo viên đã chủ động xoá hết quà — **không tự "mọc lại"**).
3. Nếu `FALSE` → copy **đúng 1 quà** (mẫu đầu tiên theo `created_at` của `ge10_school_reward_templates`, bao gồm `is_unlimited`) thành 1 dòng `ge10_class_rewards` mới của giáo viên này, rồi set `class_rewards_seeded = TRUE`. Lớp mới **không** nhận nguyên cả danh mục toàn viện — chỉ 1 quà khởi đầu, Chủ Nhiệm hoặc Trợ Giảng (được cấp quyền) tự thêm/sửa/xoá tiếp theo nhu cầu thật của lớp.

Gọi tại `routes/profiles.ts` (`POST /api/profiles`, `POST /api/profiles/quick-start`) ngay khi hồ sơ `tutor`/`secondary_tutor` được tạo — đúng nghĩa "lớp vừa khởi tạo thì có sẵn 1 quà mẫu". Cũng được gọi (an toàn, no-op nếu đã seeded) từ `GET /api/class-rewards` và từ `helpers/rewardMigration.ts` khi học sinh chuyển sang giáo viên mới, để đảm bảo giáo viên đó luôn có ít nhất 1 quà trước khi cần dùng tới.

> ⚠️ **Trước đây** điều kiện seed là "giáo viên đang có 0 dòng quà lớp" — nghĩa là nếu giáo viên chủ động xoá sạch danh mục mặc định, lần load trang tiếp theo sẽ tự động nhân bản lại từ đầu. Đã sửa sang cờ 1 lần duy nhất.

### 4.4 Chuyển lớp (đổi Chủ Nhiệm)

`helpers/rewardMigration.ts::migratePendingClaims(studentId, newTeacherId)` — gọi từ `routes/classLinks.ts` khi 1 liên kết `primary` mới được chấp nhận hoặc học sinh rời hết lớp:
- **Vào lớp mới** (`newTeacherId` khác null): các yêu cầu đổi quà TOÀN VIỆN đang `pending` của học sinh được chuyển thành yêu cầu quà LỚP của giáo viên mới (tự tạo quà lớp tương ứng theo tiêu đề nếu chưa có); các yêu cầu quà LỚP `pending` cũ được trỏ lại sang giáo viên mới.
- **Rời hết lớp** (`newTeacherId = null`): yêu cầu quà LỚP `pending` được chuyển ngược về quà TOÀN VIỆN (khớp theo tiêu đề nếu tìm được, giữ nguyên `reward_title`/`cost_ruby` snapshot nếu không khớp).

---

## 5. Bảng API tổng hợp

| Method | Route | File | Actor |
|:--|:--|:--|:--|
| GET/POST/PUT/DELETE | `/api/admin/school-rewards[...]` | `routes/admin.ts` | Ban Lãnh Đạo Viện (CRUD quà toàn viện) |
| POST | `/api/admin/deliver-reward` | `routes/admin.ts` | Ban Lãnh Đạo Viện (duyệt quà toàn viện của 1 học sinh) |
| POST | `/api/admin/cancel-redemption` | `routes/admin.ts` | Ban Lãnh Đạo Viện (huỷ quà toàn viện của 1 học sinh) |
| GET | `/api/school-rewards` | `routes/schoolRewards.ts` | Học sinh mồ côi (xem) |
| POST | `/api/school-rewards/:id/redeem` | `routes/schoolRewards.ts` | Học sinh mồ côi (đổi) |
| DELETE | `/api/school-rewards/redemptions/:id` | `routes/schoolRewards.ts` | Học sinh mồ côi (tự huỷ) |
| GET | `/api/class-rewards` | `routes/classRewards.ts` | Giáo viên (quản lý) hoặc học sinh trong lớp (xem) |
| POST/DELETE | `/api/class-rewards[...]` | `routes/classRewards.ts` | Chủ Nhiệm, hoặc Phụ được cấp quyền |
| POST | `/api/class-rewards/:id/redeem` | `routes/classRewards.ts` | Học sinh trong lớp (đổi) |
| DELETE | `/api/class-rewards/redemptions/:id` | `routes/classRewards.ts` | Học sinh trong lớp (tự huỷ) |
| PATCH | `/api/class-rewards/redemptions/:id/deliver` | `routes/classRewards.ts` | Chủ Nhiệm, hoặc Phụ được cấp quyền |

## 6. Bảng phân quyền

| Hành động | student | tutor | secondary_tutor | pho_vien | truong_vien |
|:--|:---:|:---:|:---:|:---:|:---:|
| Đổi quà TOÀN VIỆN (nếu mồ côi) | ✅ | — | — | — | — |
| Đổi quà LỚP (nếu có lớp) | ✅ | — | — | — | — |
| CRUD quà TOÀN VIỆN | ❌ | ❌ | ❌ | ✅ | ✅ |
| Duyệt/huỷ quà TOÀN VIỆN của 1 học sinh | ❌ | ⚙️¹ | ⚙️¹ | ✅ | ✅ |
| CRUD quà LỚP | ❌ | ✅ | ⚙️² | ❌ | ❌ |
| Duyệt/huỷ quà LỚP | ❌ | ✅ | ⚙️² | ❌ | ❌ |

¹ Chỉ nếu học sinh đó có liên kết `primary`/`secondary` active với chính giáo viên này (không áp dụng cho học sinh mồ côi — mục này chỉ có ý nghĩa nếu giáo viên được nêu tên trong context quản lý học sinh cụ thể qua `checkStudentManagementPermission`).
² Tuỳ `secondary_permissions.can_approve_rewards` do Chủ Nhiệm cấu hình (mặc định OFF) — xem SUB_SPEC_FAMILY_ROLE.md §3.2.

---

## 7. Bảng dữ liệu

```
ge10_school_reward_templates (id, title, cost_ruby, quantity, remaining_quantity, is_unlimited, created_at)
ge10_reward_redemptions      (id, user_id, reward_id, reward_title, cost_ruby, status, timestamp, delivered_at)
ge10_class_rewards           (id, teacher_id, title, cost_ruby, quantity, remaining, is_unlimited, created_at)
ge10_class_reward_redemptions(id, class_reward_id, student_id, reward_title, cost_ruby, status, requested_at, delivered_at)
ge10_users.class_rewards_seeded BOOLEAN -- cờ "đã nhân bản quà toàn viện 1 lần" cho hồ sơ giáo viên
```

`status` ∈ `{pending, delivered, cancelled}` cho cả 2 bảng redemption.
