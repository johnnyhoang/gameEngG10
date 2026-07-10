Created At: 2026-07-10T05:12:10Z
Completed At: 2026-07-10T05:12:10Z
File Path: `file:///D:/Hoa%20Hoang/Apps/gameEngG10/src/hooks/useGameState.ts`
Total Lines: 2282
Total Bytes: 98087
Showing lines 450 to 500
The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
450: const FREE_UI_THEME: UiThemeId = 'current';
451: 
452: const INITIAL_PET: PetState = {
453:   name: 'Heo Maikawaii',
454:   stage: 'egg',
455:   level: 1,
456:   exp: 0,
457:   energy: 100,
458:   mood: 'neutral',
459:   lastFed: new Date().toISOString()
460: };
461: 
462: const DEFAULT_REWARDS: ParentReward[] = [
463:   { id: 'r-1', title: '15 phút chơi game', costCoins: 150, cashValueVND: 0, status: 'pending', timestamp: Date.now() },
464:   { id: 'r-2', title: 'Ly trà sữa đặc biệt', costCoins: 400, cashValueVND: 0, status: 'pending', timestamp: Date.now() },
465:   { id: 'r-3', title: 'Thưởng 20.000đ tiền mặt', costCoins: 500, cashValueVND: 20000, status: 'pending', timestamp: Date.now() },
466:   { id: 'r-4', title: 'Thưởng 50.000đ tiền mặt', costCoins: 1000, cashValueVND: 50000, status: 'pending', timestamp: Date.now() },
467:   { id: 'r-5', title: 'Thưởng 100.000đ tiền mặt', costCoins: 1800, cashValueVND: 100000, status: 'pending', timestamp: Date.now() }
468: ];
469: 
470: const INITIAL_CHALLENGES: Challenge[] = [
471:   { id: 'ch-1', type: 'daily', title: 'Luyện 20 câu hỏi', description: 'Hoàn thành làm 20 câu hỏi bất kỳ', targetCount: 20, currentCount: 0, rewardCoins: 100, rewardXP: 100, completed: false },
472:   { id: 'ch-2', type: 'daily', title: 'Chiến binh Grammar', description: 'Trả lời đúng 10 câu hỏi ngữ pháp', targetCount: 10, currentCount: 0, rewardCoins: 80, rewardXP: 80, completed: false, category: 'grammar' },
473:   { id: 'ch-3', type: 'daily', title: 'Không tỳ vết', description: 'Đạt chuỗi đúng 10 câu liên tiếp', targetCount: 10, currentCount: 0, rewardCoins: 120, rewardXP: 150, completed: false },
474:   { id: 'ch-4', type: 'weekly', title: 'Học tập bền bỉ', description: 'Hoàn thành 100 câu hỏi trong tuần', targetCount: 100, currentCount: 0, rewardCoins: 500, rewardXP: 500, completed: false },
475:   { id: 'ch-5', type: 'achievement', title: 'Khởi đầu vinh quang', description: 'Tổng cộng trả lời đúng 100 câu', targetCount: 100, currentCount: 0, rewardCoins: 300, rewardXP: 300, completed: false },
476:   { id: 'ch-6', type: 'achievement', title: 'Huyền thoại học đường', description: 'Tổng cộng trả lời đúng 1000 câu', targetCount: 1000, currentCount: 0, rewardCoins: 2000, rewardXP: 2000, completed: false }
477: ];
478: 
479: export const useGameState = create<GameState>()(
480:   persist(
481:     (originalSet, get) => {
482:       // Intercept set updates to automatically keep profiles in sync
483:       let syncTimeout: any = null;
484:       const triggerDebouncedSync = () => {
485:         const user = get().currentUser;
486:         if (!user || user.id.startsWith('mock-')) return;
487: 
488:         if (syncTimeout) clearTimeout(syncTimeout);
489: 
490:         syncTimeout = setTimeout(async () => {
491:           try {
492:             const state = get();
493:             const session = (await supabase.auth.getSession()).data.session;
494:             const token = session?.access_token;
495:             if (!token) return;
496: 
497:             const syncPayload = {
498:               player: state.player,
499:               pet: state.pet,
500:               categoryStats: state.categoryStats,
The above content does NOT show the entire file contents. If you need to view any lines of the file which were not shown to complete your task, call this tool again to view those lines.
