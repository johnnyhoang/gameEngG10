// Shim tương thích: store đã tách thành slices tại src/store/ — file này chỉ re-export
// để các import cũ (`from '../hooks/useGameState'`) tiếp tục hoạt động.
// QUAN TRỌNG: mọi hằng số/dữ liệu ở đây phải trỏ về nguồn THẬT, không được stub rỗng
// (stub rỗng từng làm mất toàn bộ ngân hàng câu hỏi/bài học/cẩm nang trong store mới).
export * from '../store';
export * from '../store/types';
export * from '../store/initialState';

// Dữ liệu thật từ các data module
export { INITIAL_QUESTIONS } from '../data/questions';
export { INITIAL_LESSONS } from '../data/lessons';
export { ALL_HANDBOOK_PAGES, INITIAL_HANDBOOK_PAGES } from '../data/handbookPages';
export { UI_THEMES, DEFAULT_UI_THEME } from '../theme/uiThemes';
// Bậc Học (CORE_SPECS §1.4) — nguồn duy nhất là types/game (mặc định Tầng 9)
export { DEFAULT_GRADE_TIER, GRADE_TIERS, getGradeTierConfig } from '../types/game';
