# Sub-Spec: Xác Thực, Phân Quyền và Cô Lập Hồ Sơ

## 1. Mô hình danh tính

- Google/Supabase account (`account_id`, JWT `sub`) chỉ là danh tính xác thực và nơi chứa nhiều hồ sơ.
- Profile (`ge10_users.id`) là danh tính sử dụng ứng dụng: role, tiến trình, Ruby, lịch sử, nội dung cá nhân và mọi quan hệ gia đình/lớp học.
- Một request sau khi chọn hồ sơ phải mang `X-Profile-Id`. Backend xác minh profile đang active và thuộc JWT account trước khi xử lý.
- Không được dùng JWT `sub` làm `user_id`/`profile_id` trong bảng nghiệp vụ.

## 2. Active Profile Context

Middleware chuẩn tạo context bất biến:

```ts
interface AuthenticatedProfileContext {
  accountId: string;
  profile: { id: string; role: UserRole; isActive: true };
}
```

- Route chọn/liệt kê/tạo profile chỉ cần account context.
- Mọi route nghiệp vụ cần active profile context; không tin `profileId` trong body/query để xác định người gọi.
- Route thao tác trên profile khác phải xác minh quan hệ và permission từ active profile tới target profile.
- Authorization dùng role của active profile. Việc cùng account tồn tại profile admin không cấp quyền admin cho profile đang active khác.

## 3. Cô lập dữ liệu

- Mọi dữ liệu cá nhân khóa bằng `profile.id`: player, pet, Ruby, session, progress, quiz result, question performance, custom question, log, reward và exploration.
- Nội dung chuẩn/global được dùng chung có chủ đích; trạng thái sử dụng nội dung vẫn phải khóa theo profile.
- Khi đổi profile, frontend reset toàn bộ state profile-scoped trước khi nạp profile mới.
- Cache/localStorage chứa dữ liệu profile phải namespace theo `accountId:profileId`; không fallback dữ liệu từ profile trước.

## 4. Bảo mật API và database

- JWT phải được kiểm tra signature, issuer, expiry và subject.
- Backend là boundary authorization bắt buộc; UI chỉ phản ánh quyền đã được backend xác nhận.
- Client không truy cập trực tiếp bảng `ge10_*`; RLS và revoke grants tiếp tục là defense in depth.
- Mutation nhạy cảm phải kiểm tra ownership/relationship trong cùng transaction với thay đổi dữ liệu.

## 5. Migration và compatibility

- Không suy luận profile từ `account_id`, kể cả account hiện chỉ có một profile. Số lượng profile là trạng thái có thể thay đổi, không phải khóa ownership.
- Record nghiệp vụ chỉ được migrate khi nguồn cung cấp `profile_id` tường minh hoặc có quan hệ nghiệp vụ chứng minh trực tiếp owner; thiếu bằng chứng thì giữ nguyên và báo cáo.
- Không tồn tại compatibility fallback từ account sang profile. Header profile là contract canonical bắt buộc sau bước chọn profile.
- `account_id` chỉ được dùng tại boundary xác thực để kiểm tra profile thuộc phiên Google/Supabase và trong nghiệp vụ quản lý danh sách profile của account.

## 6. Acceptance

- Hai profile cùng Google account không đọc/ghi được state của nhau.
- Profile học sinh không có quyền admin dù cùng account có profile Viện Trưởng.
- Profile không thể kết thúc session, nhận Ruby hoặc ghi progress cho profile khác.
- Chuyển profile và refresh không hiển thị state/cache của profile trước.
- Integration tests bao phủ chéo account, chéo profile cùng account, inactive profile và relationship permissions.
