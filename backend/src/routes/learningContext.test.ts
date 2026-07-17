import { describe, it, expect, vi } from 'vitest';

// Route đăng ký middleware ngay ở module scope (router.use(authMiddleware, ...)) nên cần mock
// trước khi import — test này chỉ quan tâm parseContext(), không cần DB/HTTP thật.
vi.mock('../db.js', () => ({ pool: { query: vi.fn() } }));
vi.mock('../middleware/auth.js', () => ({
  authMiddleware: (_req: any, _res: any, next: any) => next(),
  activeProfileMiddleware: (_req: any, _res: any, next: any) => next()
}));

import { parseContext } from './learningContext.js';

// Khoá lại yêu cầu của SUB_SPEC_LEARNING_CONTEXT.md §7.1: "Không consumer mới tự default
// 9/english" — mọi request thiếu/hỏng gradeTier hoặc subjectId phải bị từ chối tường minh
// (trả null → route trả 400), không được âm thầm rơi về một context mặc định nào.
describe('parseContext — biên cô lập theo gradeTier + subjectId', () => {
  it('chấp nhận gradeTier hợp lệ + subjectId hợp lệ', () => {
    expect(parseContext({ gradeTier: '9', subjectId: 'english' })).toEqual({ gradeTier: 9, subjectId: 'english' });
    expect(parseContext({ gradeTier: 12, subject: 'math' })).toEqual({ gradeTier: 12, subjectId: 'math' });
  });

  it('từ chối gradeTier ngoài phạm vi hỗ trợ (6-12) thay vì âm thầm cắt về giá trị gần nhất', () => {
    expect(parseContext({ gradeTier: '13', subjectId: 'english' })).toBeNull();
    expect(parseContext({ gradeTier: '0', subjectId: 'english' })).toBeNull();
  });

  it('từ chối khi thiếu gradeTier hoặc subjectId, không default về 9/english', () => {
    expect(parseContext({ subjectId: 'english' })).toBeNull();
    expect(parseContext({ gradeTier: '9' })).toBeNull();
    expect(parseContext({ gradeTier: '9', subjectId: '' })).toBeNull();
    expect(parseContext({ gradeTier: '9', subjectId: '   ' })).toBeNull();
  });

  it('từ chối gradeTier không phải số hợp lệ (NaN)', () => {
    expect(parseContext({ gradeTier: 'not-a-number', subjectId: 'english' })).toBeNull();
  });

  it('cắt khoảng trắng thừa ở subjectId nhưng không đổi giá trị môn học', () => {
    expect(parseContext({ gradeTier: '9', subjectId: '  math  ' })).toEqual({ gradeTier: 9, subjectId: 'math' });
  });
});
