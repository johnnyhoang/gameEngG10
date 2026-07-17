// Shim tương thích: store đã tách thành slices tại src/store/ — file này chỉ re-export
// để các import cũ (`from '../hooks/useGameState'`) tiếp tục hoạt động.
// Ngân hàng câu hỏi (INITIAL_QUESTIONS) và bài giảng (INITIAL_LESSONS) không còn hardcode
// ở đây — cả hai đã được import một lần vào DB (ge10_custom_questions với user_id = NULL,
// ge10_lessons) và luôn lấy qua state.questions/state.lessons sau khi fetch profile.
export * from '../store';
export * from '../store/types';
export * from '../store/initialState';

export { UI_THEMES, DEFAULT_UI_THEME } from '../theme/uiThemes';
// Bậc Học (CORE_SPECS §1.4) — nguồn duy nhất là types/game (mặc định Tầng 9)
export { DEFAULT_GRADE_TIER, GRADE_TIERS, getGradeTierConfig } from '../types/game';
