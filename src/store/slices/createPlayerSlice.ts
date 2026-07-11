// @ts-nocheck
import type { StateCreator } from 'zustand';
import type { StoreState } from '../types';
import { INITIAL_PLAYER, INITIAL_PET, DEFAULT_GAME_SETTINGS, INITIAL_CHALLENGES, DEFAULT_REWARDS } from '../initialState';
import { INITIAL_QUESTIONS } from '../../data/questions';
import { INITIAL_LESSONS } from '../../data/lessons';
import { DEFAULT_UI_THEME } from '../../theme/uiThemes';
import type { RewardRedemption } from '../../types/game';
import { supabase } from '../../utils/supabaseClient';
import { logActivity, checkLevelUp } from '../helpers';
import { eventBus } from '../../utils/EventBus';
import { toast } from '../../utils/toast';

export const createPlayerSlice: StateCreator<
  StoreState,
  [],
  [],
  Pick<StoreState, 
    'player' | 'pet' | 'questions' | 'lessons' | 'lessonsProgress' | 'explorationProgress' | 'pageExplorationStates' | 'categoryStats' | 'rewards' | 'rewardRedemptions' | 'challenges' | 'dailyMission' | 'logs' | 'activeCombo' | 'maxCombo' | 'lastSyncTime' | 'profiles' | 'petStates' | 'categoryStatsAll' | 'answerQuestion' | 'useEnergy' | 'addEnergy' | 'buyStreakShield' | 'buyHint' | 'buyTheme' | 'redeemReward' | 'feedPet' | 'spinWheel' | 'openMysteryBox' | 'masterLesson' | 'applyDefeatPenalty' | 'completeBossVictory' | 'completeLevel3Page' | 'updatePendingKeyQuestion' | 'awardCoinsAndXp' | 'clearExploration' | 'resetProgress' | 'checkDailyReset' | 'getAdaptiveQuestion' | 'getQuestionByWeight'
  >
> = (set, get) => ({
  player: INITIAL_PLAYER,

  pet: INITIAL_PET,

  questions: INITIAL_QUESTIONS,

  lessons: INITIAL_LESSONS,

  lessonsProgress: {},

  explorationProgress: {},

  pageExplorationStates: {},

  categoryStats: {},

  rewards: DEFAULT_REWARDS,

  rewardRedemptions: [],

  challenges: INITIAL_CHALLENGES,

  dailyMission: null,

  logs: [],

  activeCombo: 0,

  maxCombo: 0,

  lastSyncTime: null,

  profiles: {},

  petStates: {},

  categoryStatsAll: {},

  answerQuestion: (questionId, isCorrect, _timeSpent, gameMode, scoreRatio = isCorrect ? 1 : 0) => {
          const state = get();
          const question = state.questions.find(q => q.id === questionId);
          if (!question) return { isCorrect: false, expGained: 0, coinsGained: 0, comboMultiplier: 1, scoreRatio: 0 };

          // 1. Update rolling category stats
          const category = question.topicId || question.category;
          const currentStat = state.categoryStats[category] || {
            category,
            totalAnswered: 0,
            totalCorrect: 0,
            rollingAccuracy: 1,
            recentResults: []
          };

          const performanceScore = Math.max(0, Math.min(1, scoreRatio));
          const effectiveCorrect = performanceScore >= 0.6;
          const newRecentResults = [...(currentStat.recentResults || []), effectiveCorrect].slice(-10); // Keep last 10
          const correctCount = newRecentResults.filter(Boolean).length;
          const rollingAccuracy = correctCount / newRecentResults.length;

          const updatedStats = {
            ...state.categoryStats,
            [category]: {
              category,
              totalAnswered: currentStat.totalAnswered + 1,
              totalCorrect: currentStat.totalCorrect + (effectiveCorrect ? 1 : 0),
              rollingAccuracy,
              recentResults: newRecentResults
            }
          };

          // 2. Calculate rewards
          let expGained = 0;
          let coinsGained = 0;
          let newCombo = state.activeCombo;
          let comboMultiplier = 1.0;

          if (performanceScore > 0) {
            if (effectiveCorrect) newCombo += 1;
            
            // Hệ số Combo (CORE_SPECS §3.A): đúng liên tiếp 3 câu là mốc đầu tiên, tăng dần theo bội số của 3.
            if (newCombo >= 9) comboMultiplier = 2.0;
            else if (newCombo >= 6) comboMultiplier = 1.5;
            else if (newCombo >= 3) comboMultiplier = 1.2;

            // Base scores adjusted by difficulty
            const baseXP = state.gameSettings.baseXP ?? 15;
            const baseCoins = state.gameSettings.baseCoins ?? 5;
            const difficultyMultiplier = 1 + (question.difficulty - 1) * 0.1; // e.g. diff 10 gives 1.9x

            expGained = Math.round(baseXP * difficultyMultiplier * comboMultiplier * performanceScore);
            coinsGained = Math.round(baseCoins * difficultyMultiplier * comboMultiplier * performanceScore);

            // Apply streak multiplier to coins and XP
            const streakBonus = 1 + Math.min(1.0, state.player.streak * 0.1); // Max 2.0x (10 days streak)
            expGained = Math.round(expGained * streakBonus);
            coinsGained = Math.round(coinsGained * streakBonus);

            // Apply 1.5x bonus for survival mode challenge
            if (gameMode === 'survival') {
              expGained = Math.round(expGained * 1.5);
              coinsGained = Math.round(coinsGained * 1.5);
            } else if (gameMode === 'boss') {
              // Quyết đấu Boss (CORE_SPECS §3.A): nhân đôi XP cho mọi câu trả lời đúng trong trận.
              expGained = Math.round(expGained * 2);
            }
          } else {
            newCombo = 0; // Combo resets
            // Sinh tồn/Boss: bộ đếm 3 lần sai là state NỘI BỘ của lượt chơi trong PlayArea —
            // hệ thống Tim sinh mệnh toàn cục đã bị xóa bỏ (CORE_SPECS §2.1).
          }

          const maxCombo = Math.max(state.maxCombo, newCombo);
          
          // Apply changes to player store
          const updatedXP = state.player.xp + expGained;
          const levelCheck = checkLevelUp(get, set, updatedXP, state.player.level);

          const updatedFailedIds = isCorrect
            ? state.failedQuestionIds.filter(id => id !== questionId)
            : state.failedQuestionIds.includes(questionId)
              ? state.failedQuestionIds
              : [...state.failedQuestionIds, questionId];

          const currentRecent = state.recentlyPlayedQuestionIds || [];
          const updatedRecent = [questionId, ...currentRecent.filter(id => id !== questionId)].slice(0, 20);

          set({
            categoryStats: updatedStats,
            activeCombo: newCombo,
            maxCombo,
            failedQuestionIds: updatedFailedIds,
            recentlyPlayedQuestionIds: updatedRecent,
            player: {
              ...state.player,
              xp: levelCheck.xp,
              level: levelCheck.level,
              coins: state.player.coins + coinsGained + (levelCheck.badgesChanged ? 100 : 0),
              badges: levelCheck.badges,
              lastActive: new Date().toISOString()
            }
          });

          // Write activity log
          if (performanceScore > 0 && !effectiveCorrect) {
            logActivity(get, set, 
              'exercise',
              'Câu trả lời CHƯA ĐẠT',
              `Đúng một phần dạng [${question.category}] - Đạt ${Math.round(performanceScore * 10)}/10 theo rubric. Nhận +${coinsGained} NP / +${expGained} XP.`,
              coinsGained,
              expGained
            );
          } else if (isCorrect) {
            logActivity(get, set, 
              'exercise', 
              'Câu trả lời ĐÚNG', 
              `Đúng dạng [${question.category}] - Nhận +${coinsGained} NP / +${expGained} XP. Combo: ${newCombo}x`, 
              coinsGained, 
              expGained
            );
          } else {
            logActivity(get, set, 
              'exercise', 
              'Câu trả lời SAI', 
              `Sai dạng [${question.category}] - Thử lại lần sau nhé. Combo bị reset.`, 
              0, 
              0
            );
          }

          // Publish event
          eventBus.publish('QUESTION_ANSWERED', {
            questionId,
            category,
            isCorrect: effectiveCorrect,
            difficulty: question.difficulty,
            gameMode,
            scoreRatio: performanceScore
          });

          return { isCorrect: effectiveCorrect, expGained, coinsGained, comboMultiplier, scoreRatio: performanceScore };
        },

  useEnergy: (amount) => {
          const state = get();
          if (state.player.energy < amount) return false;
          set({
            player: {
              ...state.player,
              energy: state.player.energy - amount
            }
          });
          logActivity(get, set, 'energy_refill', 'Tiêu hao năng lượng', `Tiêu tốn ${amount} năng lượng khởi hành phụ bản.`);
          return true;
        },

  addEnergy: (amount) => {
          set((state: any) => ({
            player: {
              ...state.player,
              energy: Math.min(state.gameSettings.maxEnergy ?? 1000, state.player.energy + amount)
            }
          }));
        },

  buyStreakShield: () => {
          const state = get();
          const cost = 150;
          if (state.player.coins < cost) return false;

          const hasShieldBadge = state.player.badges.includes('Streak Shield');
          if (hasShieldBadge) return false; // Max 1 shield owned

          set({
            player: {
              ...state.player,
              coins: state.player.coins - cost,
              badges: [...state.player.badges, 'Streak Shield']
            }
          });

          logActivity(get, set, 'shop', 'Lĩnh Hộ Tâm Phù', 'Đã nhận 1 Hộ Tâm Phù bảo vệ Chuỗi Tu Luyện', -cost, 0);
          return true;
        },

  buyHint: () => {
          const state = get();
          const cost = 50;
          if (state.player.coins < cost) return false;

          set({
            player: {
              ...state.player,
              coins: state.player.coins - cost
            }
          });

          logActivity(get, set, 'shop', 'Khai Ngộ Quyển', 'Dùng 50 NP lĩnh Khai Ngộ Quyển hỗ trợ trong bài làm.', -cost, 0);
          return true;
        },

  buyTheme: (themeId) => {
          const state = get();
          const unlocked = state.player.unlockedThemes || [FREE_UI_THEME];
          if (themeId === FREE_UI_THEME || unlocked.includes(themeId)) return false;
          if (state.player.coins < THEME_UNLOCK_COST) return false;

          set({
            player: {
              ...state.player,
              coins: state.player.coins - THEME_UNLOCK_COST,
              unlockedThemes: [...unlocked, themeId]
            }
          });

          const themeConfig = UI_THEMES.find(t => t.id === themeId);
          logActivity(get, set, 'shop', 'Mở khóa Phong Vị', `Đã lĩnh ngộ Phong Vị "${themeConfig?.name || themeId}" mới.`, -THEME_UNLOCK_COST, 0);
          return true;
        },

  redeemReward: (rewardId) => {
          // Đổi Phần Thưởng Thực Tế (CORE_SPECS §3.2): hành động CHỦ Ý — bắt buộc đủ NP, không cho âm.
          const state = get();
          const reward = state.rewards.find(r => r.id === rewardId);
          if (!reward || reward.remainingQuantity <= 0 || state.player.coins < reward.costCoins) return false;

          const redemption: RewardRedemption = {
            id: `rr-${Date.now()}`,
            rewardId: reward.id,
            rewardTitle: reward.title,
            costCoins: reward.costCoins,
            status: 'pending',
            timestamp: Date.now()
          };

          set(prev => ({
            player: {
              ...prev.player,
              coins: prev.player.coins - reward.costCoins
            },
            rewards: prev.rewards.map(r => r.id === rewardId ? { ...r, remainingQuantity: r.remainingQuantity - 1 } : r),
            rewardRedemptions: [redemption, ...prev.rewardRedemptions]
          }));

          logActivity(get, set, 'shop', 'Đổi Phần Thưởng Thực Tế', `Đã đổi "${reward.title}" — chờ Viện Chủ trao quà ngoài đời`, -reward.costCoins, 0);
          return true;
        },

  feedPet: () => {
          const state = get();
          if (state.pet.mood === 'happy' && state.pet.energy >= 100) return false;

          // Luật "Lực Bất Tòng Tâm" (CORE_SPECS §3.B): cho Pet ăn tốn 10 NP và 5 XP của Thiếu Hiệp.
          const coinsCost = 10;
          const xpCost = 5;
          if (state.player.coins < coinsCost) return false;

          // Vì tiêu hao trực tiếp XP, Thiếu hiệp chấp nhận tụt Level tạm thời nếu dồn quá nhiều tài nguyên chăm Pet.
          let newLevel = state.player.level;
          let newXp = state.player.xp - xpCost;
          while (newXp < 0 && newLevel > 1) {
            newLevel -= 1;
            newXp += newLevel * 200;
          }
          newXp = Math.max(0, newXp);
          const didDeLevel = newLevel < state.player.level;

          set({
            player: {
              ...state.player,
              coins: state.player.coins - coinsCost,
              xp: newXp,
              level: newLevel
            },
            pet: {
              ...state.pet,
              energy: Math.min(100, state.pet.energy + 20),
              mood: 'happy',
              lastFed: new Date().toISOString()
            }
          });

          logActivity(get, set, 
            'pet_interact',
            didDeLevel ? 'Cho thú nuôi ăn (tụt cấp tạm thời)' : 'Cho thú nuôi ăn',
            didDeLevel
              ? `Pet của con rất vui mừng, nhưng dồn quá nhiều tài nguyên khiến con tạm tụt xuống Level ${newLevel}. Quay lại Hang Luyện Công cày XP để lên cấp lại nhé!`
              : 'Pet của con rất vui mừng và đầy năng lượng!',
            -coinsCost,
            -xpCost
          );
          return true;
        },

  spinWheel: () => {
          const state = get();
          // App không quản lý tiền (CORE_SPECS §3.2) — mọi phần thưởng quy hết về NP/Chân Khí.
          const rewardsOptions = [
            { type: 'coins', amount: 50, message: 'Nhận thêm +50 NP!' },
            { type: 'coins', amount: 100, message: 'Nhận thêm +100 NP!' },
            { type: 'energy', amount: 30, message: 'Hồi phục +30 Năng lượng!' },
            { type: 'coins', amount: 200, message: 'May mắn nhận +200 NP!' },
            { type: 'coins', amount: 300, message: 'Siêu cấp may mắn nhận +300 NP!' },
            { type: 'nothing', amount: 0, message: 'Trượt tay lần này, gỡ ở lần sau.' }
          ];

          const resultIndex = Math.floor(Math.random() * rewardsOptions.length);
          const spin = rewardsOptions[resultIndex];

          if (spin.type === 'coins') {
            set({ player: { ...state.player, coins: state.player.coins + spin.amount } });
            logActivity(get, set, 'box_open', 'Vòng Quay May Mắn', spin.message, spin.amount, 0);
          } else if (spin.type === 'energy') {
            get().addEnergy(spin.amount);
            logActivity(get, set, 'box_open', 'Vòng Quay May Mắn', spin.message, 0, 0);
          }

          return { rewardType: spin.type, amount: spin.amount, message: spin.message };
        },

  openMysteryBox: () => {
          const state = get();
          const boxRewards = [
            { type: 'coins', amount: 100, message: 'Nhận ngay +100 NP!' },
            { type: 'coins', amount: 200, message: 'Nhận ngay +200 NP!' },
            { type: 'coins', amount: 150, message: 'Nhận gói +150 NP!' },
            { type: 'shield', amount: 1, message: 'Nhận được 1 Khiên bảo vệ Streak!' },
            { type: 'empty', amount: 0, message: 'Rương trống rỗng, chúc con may mắn lần sau!' }
          ];

          const index = Math.floor(Math.random() * boxRewards.length);
          const reward = boxRewards[index];

          if (reward.type === 'coins') {
            set({ player: { ...state.player, coins: state.player.coins + reward.amount } });
            logActivity(get, set, 'box_open', 'Mở Hòm Bí Mật', reward.message, reward.amount, 0);
          } else if (reward.type === 'shield') {
            const hasShield = state.player.badges.includes('Streak Shield');
            if (!hasShield) {
              set({ player: { ...state.player, badges: [...state.player.badges, 'Streak Shield'] } });
            }
            logActivity(get, set, 'box_open', 'Mở Hòm Bí Mật', reward.message, 0, 0);
          }

          return { rewardType: reward.type, amount: reward.amount, message: reward.message };
        },

  masterLesson: async (lessonId, accuracyRatio) => {
          const state = get();
          const lesson = state.lessons.find(l => l.id === lessonId) || INITIAL_LESSONS.find(l => l.id === lessonId);
          if (!lesson) return;

          // Tránh cộng trùng thưởng nếu bài học đã được hoàn thành trước đó
          if (state.lessonsProgress[lessonId]) {
            // Still mark it as completed for Fog of War to increment completion count
            get().completeLevel3Page(lessonId);
            return;
          }

          get().completeLevel3Page(lessonId);

          const expGained = 50;
          // Rương Báu Ải (CORE_SPECS §3.A): đạt độ chính xác từ 90% trở lên khi hoàn thành ải mới nhận thêm +20 NP.
          const hitTreasureChest = (accuracyRatio ?? 0) >= 0.9;
          const coinsGained = hitTreasureChest ? 20 : 0;

          const updatedXP = state.player.xp + expGained;
          const levelCheck = checkLevelUp(get, set, updatedXP, state.player.level);

          set({
            lessonsProgress: {
              ...state.lessonsProgress,
              [lessonId]: true
            },
            player: {
              ...state.player,
              xp: levelCheck.xp,
              level: levelCheck.level,
              coins: state.player.coins + coinsGained + (levelCheck.badgesChanged ? 100 : 0),
              badges: levelCheck.badges
            }
          });

          logActivity(get, set,
            'exercise',
            hitTreasureChest ? 'Lĩnh ngộ bài học! Mở Rương Báu Ải 🎁' : 'Lĩnh ngộ bài học!',
            hitTreasureChest
              ? `Đã qua ải chuyên đề: ${lesson.title}. Độ chính xác ≥90% mở thêm Rương Báu Ải!`
              : `Đã qua ải chuyên đề: ${lesson.title}.`,
            coinsGained,
            expGained
          );
        },

  applyDefeatPenalty: (coinsEarnedInRun, xpEarnedInRun) => {
          const state = get();
          const coinsClawback = Math.floor(Math.max(0, coinsEarnedInRun) / 2);
          const xpClawback = Math.floor(Math.max(0, xpEarnedInRun) / 2);

          set({
            player: {
              ...state.player,
              coins: Math.max(0, state.player.coins - coinsClawback),
              xp: Math.max(0, state.player.xp - xpClawback)
            },
            pet: {
              ...state.pet,
              energy: Math.max(0, state.pet.energy - 5),
              mood: 'sad'
            }
          });

          if (coinsClawback > 0 || xpClawback > 0) {
            logActivity(get, set,
              'exercise',
              'Tẩu Hỏa Nhập Ma!',
              'Sai đủ 3 câu giữa trận, chỉ giữ được 50% chiến lợi phẩm thu được. Pet buồn thiu vì thấy con thất bại.',
              -coinsClawback,
              -xpClawback
            );
          }
        },

  completeBossVictory: (bonusIndex?: number) => {
          const state = get();
          const bonusXP = 150;
          // Bonus Điểm khi hạ Boss — quảng bá trên Boss Card, do Chủ Viện/Phó Viện cấu hình (CORE_SPECS §2.1).
          // Thay hoàn toàn thưởng tiền mặt cũ; Boss không bao giờ thưởng tiền.
          const npBonusOptions = state.gameSettings.bossCompletionBonusNP ?? [100, 150, 200];
          // Dùng đúng bonusIndex của Boss vừa đánh để khớp số đã quảng bá trên Boss Card;
          // không xác định được thì chọn ngẫu nhiên (tương thích ngược).
          const npBonus = (bonusIndex !== undefined && npBonusOptions[bonusIndex] !== undefined)
            ? npBonusOptions[bonusIndex]
            : npBonusOptions[Math.floor(Math.random() * npBonusOptions.length)];

          const updatedXP = state.player.xp + bonusXP;
          const levelCheck = checkLevelUp(get, set, updatedXP, state.player.level);

          set({
            player: {
              ...state.player,
              xp: levelCheck.xp,
              level: levelCheck.level,
              badges: levelCheck.badges,
              coins: state.player.coins + npBonus + (levelCheck.badgesChanged ? 100 : 0)
            }
          });
          logActivity(get, set,
            'boss',
            'Hạ Gục Boss! 🔥',
            `Đánh bại Boss xuất sắc! Nhận thêm +${bonusXP} XP và bonus hoàn thành +${npBonus} NP.`,
            npBonus,
            bonusXP
          );
        },

  completeLevel3Page: (pageId) => {
          const state = get();
          const studentId = state.currentUser?.id || state.player.id;
          const currentExploration = state.pageExplorationStates[pageId] || {
            studentId,
            pageId,
            lastExploredAt: new Date().toISOString(),
            lastCompletedAt: null,
            explorationCount: 0,
            pendingKeyQuestionId: null
          };

          const updatedExploration = {
            ...currentExploration,
            lastCompletedAt: new Date().toISOString(),
            explorationCount: currentExploration.explorationCount + 1,
            pendingKeyQuestionId: null // Clear any pending question upon success
          };

          set({
            pageExplorationStates: {
              ...state.pageExplorationStates,
              [pageId]: updatedExploration
            }
          });
          
          // Also call the new DB-backed exploration clear logic
          get().clearExploration(pageId);
        },

  updatePendingKeyQuestion: (pageId, questionId) => {
          const state = get();
          const studentId = state.currentUser?.id || state.player.id;
          const currentExploration = state.pageExplorationStates[pageId] || {
            studentId,
            pageId,
            lastExploredAt: new Date().toISOString(),
            lastCompletedAt: null,
            explorationCount: 0,
            pendingKeyQuestionId: null
          };

          const updatedExploration = {
            ...currentExploration,
            pendingKeyQuestionId: questionId
          };

          set({
            pageExplorationStates: {
              ...state.pageExplorationStates,
              [pageId]: updatedExploration
            }
          });
        },

  awardCoinsAndXp: async (coins, xp, activityTitle, activityDetails) => {
          const state = get();
          
          // Local optimistic update
          set({
            player: {
              ...state.player,
              coins: Math.max(0, state.player.coins + coins),
              xp: state.player.xp + xp
            }
          });
          
          // Send transaction to Ledger backend if coins != 0
          if (coins !== 0 && state.currentUser?.id) {
            try {
              const session = (await supabase.auth.getSession()).data.session;
              if (session?.access_token) {
                const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
                const res = await fetch(`${backendUrl}/api/economy/transaction`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
                  body: JSON.stringify({
                    profileId: state.currentUser.id,
                    amount: coins,
                    reason: activityTitle,
                    details: activityDetails
                  })
                });
                if (res.ok) {
                  const data = await res.json();
                  // Sync exact coins from DB back
                  set((s) => ({ player: { ...s.player, coins: data.coins } }));
                }
              }
            } catch (e) {
              console.error('Failed to write to Ledger NP:', e);
            }
          }

          logActivity(get, set, 'box_open', activityTitle, activityDetails, coins, xp);
        },

  clearExploration: async (pageId: string) => {
          const state = get();
          
          // Optimistic local state update
          const currentProgress = state.explorationProgress[pageId] || { clearCount: 0, lastClearedAt: new Date().toISOString() };
          const newCount = currentProgress.clearCount + 1;
          
          set({
            explorationProgress: {
              ...state.explorationProgress,
              [pageId]: { clearCount: newCount, lastClearedAt: new Date().toISOString() }
            }
          });

          if (state.currentUser?.id) {
            try {
              const session = (await supabase.auth.getSession()).data.session;
              if (session?.access_token) {
                const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
                const res = await fetch(`${backendUrl}/api/exploration/clear`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
                  body: JSON.stringify({
                    profileId: state.currentUser.id,
                    pageId
                  })
                });
                if (res.ok) {
                  const data = await res.json();
                  // Sync exact count from server
                  set(s => ({
                    explorationProgress: {
                      ...s.explorationProgress,
                      [pageId]: data.progress
                    }
                  }));
                }
              }
            } catch (e) {
              console.error('Failed to sync exploration progress:', e);
            }
          }
        },

  resetProgress: () => {
          set({
            player: INITIAL_PLAYER,
            pet: INITIAL_PET,
            categoryStats: {},
            activeCombo: 0,
            maxCombo: 0,
            challenges: INITIAL_CHALLENGES.map(ch => ({ ...ch, currentCount: 0, completed: false })),
            dailyMission: null,
            logs: []
          });
          logActivity(get, set, 'parent_approve', 'Khởi tạo lại tiến độ', 'Đã reset toàn bộ tiến độ.', 0, 0);
        },

  checkDailyReset: () => {
          const state = get();
          const todayStr = new Date().toISOString().split('T')[0];
          const lastActiveStr = state.player.lastActive.split('T')[0];

          if (todayStr === lastActiveStr) return; // Already updated today

          // Calculate dates difference
          const lastActiveDate = new Date(lastActiveStr);
          const todayDate = new Date(todayStr);
          const diffTime = Math.abs(todayDate.getTime() - lastActiveDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          let newStreak = state.player.streak;
          let streakBroken = false;
          // Luật Chuỗi Tinh Tấn (CORE_SPECS §3.1 + SUB_SPEC_XP_NP §2.1): thưởng leo thang theo ngày giữ chuỗi.
          let streakBonus = 0;

          if (diffDays === 1) {
            // Streak continued!
            newStreak += 1;
            streakBonus = newStreak >= 4 ? 30 : newStreak === 3 ? 20 : newStreak === 2 ? 10 : 0;
            logActivity(get, set, 
              'exercise',
              'Duy trì Streak học tập!',
              `Chuỗi học tăng lên ${newStreak} ngày!${streakBonus > 0 ? ` Thưởng chuỗi +${streakBonus} NP.` : ''}`,
              streakBonus,
              0
            );
          } else if (diffDays > 1) {
            // Streak broken! Check for shield
            const hasShield = state.player.badges.includes('Streak Shield');
            if (hasShield) {
              set({
                player: {
                  ...state.player,
                  badges: state.player.badges.filter(b => b !== 'Streak Shield')
                }
              });
              logActivity(get, set, 'shop', 'Kích hoạt Khiên', 'Khiên đã nổ để giữ chuỗi.', 0, 0);
            } else {
              streakBroken = true;
              newStreak = 0;
              // Mất chuỗi CHỈ reset về 0 — KHÔNG trừ NP (bãi bỏ phạt -50 NP cũ).
              eventBus.publish('STREAK_RESET', { brokenDays: diffDays });
            }
          }

          // Generate New Daily Mission
          const customMission: DailyMission = {
            id: `m-${todayStr}`,
            date: todayStr,
            title: 'Nhiệm Vụ Chiến Binh Ngày Mới',
            requirements: [
              { description: 'Hoàn thành làm 20 câu hỏi luyện tập', type: 'count', target: 20, current: 0, completed: false },
              { description: 'Đạt đúng trên 10 câu Grammar Cave', type: 'category', target: 10, current: 0, completed: false },
              { description: 'Đạt đúng trên 10 câu Vocabulary Castle', type: 'category', target: 10, current: 0, completed: false }
            ],
            rewardXP: 250,
            completed: false
          };

          set({
            dailyMission: customMission,
            activeCombo: 0,
            player: {
              ...state.player,
              streak: newStreak,
              coins: state.player.coins + streakBonus,
              energy: state.gameSettings.maxEnergy ?? 1000, // Refill energy daily
              lastActive: new Date().toISOString(),
              dailySkips: { date: todayStr, count: 0 }
            },
            challenges: state.challenges.map(ch => 
              ch.type === 'daily' ? { ...ch, currentCount: 0, completed: false } : ch
            )
          });

          eventBus.publish('DAILY_CHECK_IN', { streakBroken });
        },

  getAdaptiveQuestion: (category) => {
          const state = get();
          const list = state.questions.filter(q => {
            const qSubject = (q as any).subject || 'english';
            // Cô lập Tầng → Môn Phái (CORE_SPECS §1.4): nội dung không gắn tầng mặc định thuộc Tầng 9.
            const qTier = q.gradeTier ?? DEFAULT_GRADE_TIER;
            return q.category === category && qSubject === state.currentSubject && qTier === state.activeGradeTier;
          });
          if (list.length === 0) return null;

          // Find historical rolling accuracy for this category
          const stat = state.categoryStats[category];
          const accuracy = stat ? stat.rollingAccuracy : 0.5; // default to medium

          // Dynamic difficulty selector:
          // Low accuracy (e.g. 30%) -> pick easier questions (difficulty 1 - 4) to boost confidence & review basics
          // High accuracy (e.g. 85%) -> pick harder questions (difficulty 6 - 10) to challenge
          let minDiff = 1;
          let maxDiff = 10;

          if (accuracy < 0.4) {
            maxDiff = 4;
          } else if (accuracy < 0.75) {
            minDiff = 3;
            maxDiff = 7;
          } else {
            minDiff = 6;
          }

          const matchedDiffList = list.filter(q => q.difficulty >= minDiff && q.difficulty <= maxDiff);
          const finalPool = matchedDiffList.length > 0 ? matchedDiffList : list;

          // Aggressive randomization: filter out recently played questions to avoid repetition
          const recentlyPlayed = state.recentlyPlayedQuestionIds || [];
          let filteredPool = finalPool.filter(q => !recentlyPlayed.includes(q.id));

          // If filtering leaves the pool empty or too small (e.g. less than 2 questions), fall back to original pool
          if (filteredPool.length === 0) {
            filteredPool = finalPool;
          }

          // Random pick from final/filtered pool
          return filteredPool[Math.floor(Math.random() * filteredPool.length)];
        },

  getQuestionByWeight: (mode) => {
          const state = get();
          const categoriesPool: string[] = [];

          if (state.currentSubject === 'math') {
            if (mode === 'grammar') {
              categoriesPool.push('parabol-line', 'viet-relation', 'linear-function');
            } else if (mode === 'reading') {
              categoriesPool.push('real-geometry', 'plane-geometry', 'volume-displacement', 'tangent-geometry');
            } else if (mode === 'vocabulary') {
              categoriesPool.push('real-equations', 'real-finance', 'growth-modeling', 'percentage-discount', 'shopping-discount');
            } else {
              categoriesPool.push('parabol-line', 'viet-relation', 'linear-function', 'growth-modeling', 'percentage-discount', 'volume-displacement', 'shopping-discount', 'real-equations', 'real-geometry', 'real-finance', 'plane-geometry', 'tangent-geometry');
            }
          } else if (state.currentSubject === 'literature') {
            if (mode === 'grammar') {
              categoriesPool.push('literature-vietnamese');
            } else if (mode === 'reading') {
              categoriesPool.push('literature-reading-poetry', 'literature-reading-prose', 'literature-reading-argument');
            } else if (mode === 'vocabulary') {
              categoriesPool.push('literature-writing');
            } else {
              categoriesPool.push('literature-vietnamese', 'literature-reading-poetry', 'literature-reading-prose', 'literature-reading-argument', 'literature-writing');
            }
          } else if (state.currentSubject === 'english') {
            if (mode === 'grammar') {
              categoriesPool.push('grammar', 'passive-voice', 'relative-clauses', 'tenses', 'rewrite');
            } else if (mode === 'reading') {
              categoriesPool.push('reading', 'cloze');
            } else if (mode === 'vocabulary') {
              categoriesPool.push('vocabulary', 'wordform');
            } else if (mode === 'pronunciation') {
              categoriesPool.push('pronunciation', 'stress');
            } else {
              categoriesPool.push('grammar', 'passive-voice', 'relative-clauses', 'tenses', 'rewrite', 'reading', 'cloze', 'vocabulary', 'wordform', 'pronunciation', 'stress');
            }
          } else {
            // Generic fallback for basic subjects: gather categories dynamically from questions of that subject
            const uniqCategories = Array.from(new Set(
              state.questions
                .filter(q => q.subject === state.currentSubject && (q.gradeTier ?? DEFAULT_GRADE_TIER) === state.activeGradeTier)
                .map(q => q.category)
            )).filter(Boolean);
            
            if (uniqCategories.length > 0) {
              categoriesPool.push(...uniqCategories);
            } else {
              categoriesPool.push('basic-general');
            }
          }

          // Calculate weights: W_c = (1.0 - Accuracy) + 0.1
          const weightedCategories = categoriesPool.map(cat => {
            const stat = state.categoryStats[cat];
            const accuracy = stat ? stat.rollingAccuracy : 0.5; // Default to 50%
            const weight = (1.0 - accuracy) + 0.1; // epsilon = 0.1
            return { cat, weight };
          });

          // Spin weighted roulette
          const totalWeight = weightedCategories.reduce((acc, current) => acc + current.weight, 0);
          let randomWeight = Math.random() * totalWeight;
          let selectedCategory = categoriesPool[0];

          for (const item of weightedCategories) {
            randomWeight -= item.weight;
            if (randomWeight <= 0) {
              selectedCategory = item.cat;
              break;
            }
          }

          // Fetch adaptive question from the selected category
          return get().getAdaptiveQuestion(selectedCategory);
        },

});
