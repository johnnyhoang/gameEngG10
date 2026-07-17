import { describe, it, expect } from 'vitest';
import { getProfileScopedResetState } from './initialState';

// Khoá lại danh sách field bắt buộc phải reset khi rời một profile (selectProfile/deselectProfile/
// logout đều dùng chung hàm này) — nếu ai đó thêm state profile-scoped mới mà quên đưa vào đây,
// test dưới không tự phát hiện field mới, nhưng phát hiện NGAY nếu field đã có bị lỡ tay xoá khỏi
// danh sách reset (đúng loại lỗi đã gây rò rỉ classLinks/secondaryTutors/isOrphanStudent).
describe('getProfileScopedResetState', () => {
  it('reset toàn bộ dữ liệu gắn với profile, kể cả classLinks/secondaryTutors/isOrphanStudent', () => {
    const reset = getProfileScopedResetState();
    expect(reset.currentUser).toBeNull();
    expect(reset.classLinks).toEqual([]);
    expect(reset.secondaryTutors).toEqual([]);
    expect(reset.isOrphanStudent).toBe(true);
    expect(reset.questions).toEqual([]);
    expect(reset.lessons).toEqual([]);
    expect(reset.adminStudents).toEqual([]);
    expect(reset.tutorQuests).toEqual([]);
  });

  it('trả về mảng/object mới mỗi lần gọi — không chia sẻ tham chiếu mutable giữa các lần reset', () => {
    const a = getProfileScopedResetState();
    const b = getProfileScopedResetState();
    expect(a.classLinks).not.toBe(b.classLinks);
    expect(a.categoryStats).not.toBe(b.categoryStats);
  });
});
