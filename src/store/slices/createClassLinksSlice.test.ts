import { describe, it, expect, vi, beforeEach } from 'vitest';

// classLinksService thật import useGameState/supabaseClient (cần browser env) — mock toàn bộ
// module để test chỉ hại đến logic cô lập profile trong slice, không cần DOM/Supabase thật.
vi.mock('../../services/classLinksService', () => ({
  classLinksService: { fetchClassLinks: vi.fn() }
}));

import { classLinksService } from '../../services/classLinksService';
import { createClassLinksSlice } from './createClassLinksSlice';

const mockedFetch = classLinksService.fetchClassLinks as unknown as ReturnType<typeof vi.fn>;

function createTestStore(initial: Record<string, unknown>) {
  let state: any = { ...initial };
  const get = () => state;
  const set = (partial: any) => {
    const next = typeof partial === 'function' ? partial(state) : partial;
    state = { ...state, ...next };
  };
  Object.assign(state, createClassLinksSlice(set as any, get as any, {} as any));
  return { get, set };
}

// Khoá lại lỗ hổng đã audit: dữ liệu classLinks/secondaryTutors của một profile không được
// lộ ra dưới profile khác khi đổi profile — dù do request lỗi hay do race condition
// (response cũ về chậm sau khi đã chuyển sang profile mới). Xem SUB_SPEC_AUTH_PROFILE.md.
describe('createClassLinksSlice.fetchClassLinks — cô lập giữa các profile', () => {
  beforeEach(() => {
    mockedFetch.mockReset();
  });

  it('không gọi API nếu chưa chọn profile', async () => {
    const store = createTestStore({ currentUser: null, classLinks: [], secondaryTutors: [] });
    await store.get().fetchClassLinks();
    expect(mockedFetch).not.toHaveBeenCalled();
  });

  it('reset classLinks/secondaryTutors về rỗng nếu request lỗi, thay vì giữ dữ liệu cũ', async () => {
    const store = createTestStore({
      currentUser: { id: 'profile-A' },
      classLinks: [{ id: 'old-link' }],
      secondaryTutors: [{ id: 'old-tutor' }]
    });
    mockedFetch.mockRejectedValueOnce(new Error('network fail'));

    await store.get().fetchClassLinks();

    expect(store.get().classLinks).toEqual([]);
    expect(store.get().secondaryTutors).toEqual([]);
  });

  it('bỏ qua response trả về chậm của profile cũ nếu đã đổi sang profile khác trước khi request xong', async () => {
    let resolveFetch: (v: any) => void = () => {};
    const pending = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    mockedFetch.mockReturnValueOnce(pending as any);

    const store = createTestStore({
      currentUser: { id: 'profile-A' },
      classLinks: [],
      secondaryTutors: []
    });

    const fetchPromise = store.get().fetchClassLinks(); // chụp pId = 'profile-A' lúc bắt đầu

    // Người dùng đổi sang profile khác trước khi request của profile A hoàn tất.
    store.set({ currentUser: { id: 'profile-B' }, classLinks: [{ id: 'b-link' }], secondaryTutors: [] });

    resolveFetch({ links: [{ id: 'a-link-stale' }], secondaryTutors: [{ id: 'a-tutor-stale' }] });
    await fetchPromise;

    // Response (đã cũ) của profile A không được ghi đè lên state hiện tại của profile B.
    expect(store.get().classLinks).toEqual([{ id: 'b-link' }]);
    expect(store.get().secondaryTutors).toEqual([]);
  });

  it('áp dụng bình thường khi profile không đổi trong lúc chờ', async () => {
    mockedFetch.mockResolvedValueOnce({ links: [{ id: 'link-1' }], secondaryTutors: [{ id: 'tutor-1' }] });
    const store = createTestStore({ currentUser: { id: 'profile-A' }, classLinks: [], secondaryTutors: [] });

    await store.get().fetchClassLinks();

    expect(store.get().classLinks).toEqual([{ id: 'link-1' }]);
    expect(store.get().secondaryTutors).toEqual([{ id: 'tutor-1' }]);
  });
});
