// @ts-nocheck
import type { StateCreator } from 'zustand';
import type { StoreState } from '../types';
import { INITIAL_PLAYER, INITIAL_PET, DEFAULT_GAME_SETTINGS, INITIAL_CHALLENGES, DEFAULT_REWARDS } from '../initialState';
import { INITIAL_QUESTIONS } from '../../data/questions';
import { INITIAL_LESSONS } from '../../data/lessons';
import { DEFAULT_UI_THEME } from '../../theme/uiThemes';
import { logActivity, checkLevelUp } from '../helpers';
import { eventBus } from '../../utils/EventBus';
import { toast } from '../../utils/toast';
import { adminService } from '../../services/adminService';
import { playerService } from '../../services/playerService';

export const createAdminSlice: StateCreator<
  StoreState,
  [],
  [],
  Pick<StoreState, 
    'adminStudents' | 'adminLinks' | 'selectedStudentProfile' | 'failedQuestionIds' | 'recentlyPlayedQuestionIds' | 'parentQuests' | 'markRewardDelivered' | 'cancelRedemption' | 'addParentReward' | 'deleteParentReward' | 'importQuestions' | 'deleteQuestion' | 'updateQuestion' | 'flagQuestionConfused' | 'fetchAdminStudents' | 'promoteUser' | 'fetchStudentProfile' | 'adminMarkRewardDelivered' | 'adminCancelRedemption' | 'adminSetEnergy' | 'adminSetEnergyConfig' | 'updateGameSettings' | 'addParentQuest' | 'completeParentQuest' | 'deleteParentQuest' | 'claimParentQuest' | 'auditLogs' | 'fetchAuditLogs' | 'skipReviews' | 'fetchSkipReviews' | 'resolveSkipReview'
  >
> = (set, get) => ({
  adminStudents: [],
  adminLinks: [],

  selectedStudentProfile: null,

  failedQuestionIds: [],

  recentlyPlayedQuestionIds: [],

  parentQuests: [],

  auditLogs: [],

  fetchAuditLogs: async () => {
    const state = get();
    if (state.currentUser?.role !== 'truong_vien') return;
    try {
      const logs = await adminService.fetchAuditLogs();
      set({ auditLogs: logs || [] });
    } catch (e) {
      console.error('Error fetching audit logs:', e);
    }
  },

  skipReviews: [],

  fetchSkipReviews: async (studentId) => {
    try {
      const reviews = await adminService.fetchSkipReviews(studentId);
      set({ skipReviews: reviews || [] });
    } catch (e) {
      console.error('Error fetching skip reviews:', e);
    }
  },

  resolveSkipReview: async (reviewId) => {
    try {
      const ok = await adminService.resolveSkipReview(reviewId);
      if (ok) {
        set((state: any) => ({
          skipReviews: state.skipReviews.filter((r: any) => r.id !== reviewId)
        }));
        return true;
      }
      return false;
    } catch (e) {
      console.error('Error resolving skip review:', e);
      return false;
    }
  },

  markRewardDelivered: (redemptionId) => {
          // Xác nhận đã trao quà thật ngoài đời (CORE_SPECS §3.2) — app không quản lý tiền,
          // hành động này chỉ đóng yêu cầu, không có bất kỳ giao dịch tiền nào chạy trong hệ thống.
          const state = get();
          const redemption = state.rewardRedemptions.find(r => r.id === redemptionId);
          if (!redemption || redemption.status !== 'pending') return;

          set(prev => ({
            rewardRedemptions: prev.rewardRedemptions.map(r =>
              r.id === redemptionId ? { ...r, status: 'delivered', deliveredAt: Date.now() } : r
            )
          }));

          logActivity(get, set, 'parent_approve', 'Đã Trao Phần Thưởng', `Hiệu Trưởng xác nhận đã trao "${redemption.rewardTitle}" ngoài đời.`, 0, 0);
        },

  cancelRedemption: (redemptionId) => {
          // Hủy lượt đổi: hoàn NP cho thiếu hiệp + trả lại remainingQuantity cho catalog item.
          const state = get();
          const redemption = state.rewardRedemptions.find(r => r.id === redemptionId);
          if (!redemption || redemption.status !== 'pending') return;

          set(prev => ({
            player: {
              ...prev.player,
              coins: prev.player.coins + redemption.costCoins
            },
            rewards: prev.rewards.map(r => r.id === redemption.rewardId ? { ...r, remainingQuantity: r.remainingQuantity + 1 } : r),
            rewardRedemptions: prev.rewardRedemptions.filter(r => r.id !== redemptionId)
          }));

          logActivity(get, set, 'parent_approve', 'Hiệu Trưởng hoàn trả Ngân Lượng', `Hủy lượt đổi "${redemption.rewardTitle}". Đã hoàn lại ${redemption.costCoins} NP`, redemption.costCoins, 0);
        },

  addParentReward: (title, costCoins, quantity) => {
          const safeQuantity = Math.max(1, Math.round(quantity));
          const newReward: ParentReward = {
            id: `r-${Date.now()}`,
            title,
            costCoins,
            quantity: safeQuantity,
            remainingQuantity: safeQuantity,
            timestamp: Date.now()
          };
          set((state: any) => ({
            rewards: [...state.rewards, newReward]
          }));
          logActivity(get, set, 'parent_approve', 'Hiệu Trưởng thêm Phúc Lợi mới', `Phúc Lợi mới: "${title}" trị giá ${costCoins} NP, số lượng ${safeQuantity}`, 0, 0);
        },

  deleteParentReward: (rewardId) => {
          set((state: any) => ({
            rewards: state.rewards.filter(r => r.id !== rewardId)
          }));
        },

  importQuestions: (importedQuestions) => {
          set((state: any) => {
            // Dedup bằng Set thay vì .some() lồng trong .filter() — O(N*M) cũ từng
            // gây OOM tương tự bug đã fix ở customQuestions merge (login/selectProfile).
            const existingPrompts = new Set(state.questions.map((q: any) => q.prompt));
            const filteredNew = importedQuestions.filter(newQ => !existingPrompts.has(newQ.prompt));
            return {
              questions: [...state.questions, ...filteredNew]
            };
          });
          logActivity(get, set, 'parent_approve', 'Nhập Đề thi mới', `Đã nạp ${importedQuestions.length} câu hỏi vào kho đề.`, 0, 0);
        },

  deleteQuestion: async (questionId) => {
          const state = get();
          const question = state.questions.find(q => q.id === questionId);
          if (!question) return false;

          const isCustomQuestion = question.source?.startsWith('AI Ingested') || question.isConfused;
          if (isCustomQuestion && !questionId.startsWith('ai-')) {
            try {
              const ok = await adminService.deleteCustomQuestion(questionId);
              if (!ok) {
                toast.error('Không thể xóa câu hỏi.');
                return false;
              }
            } catch (error) {
              console.error('Error deleting question:', error);
              toast.error('Lỗi kết nối khi xóa câu hỏi.');
              return false;
            }
          }

          set((state: any) => ({
            questions: state.questions.filter(q => q.id !== questionId)
          }));
          logActivity(get, set, 'parent_approve', 'Xóa câu hỏi', `Hiệu Trưởng đã xóa câu hỏi mã số ${questionId}`, 0, 0);
          return true;
        },

  updateQuestion: async (questionId, updatedQuestion) => {
          const state = get();
          const question = state.questions.find(q => q.id === questionId);
          if (!question) return false;

          const isCustomQuestion = question.source?.startsWith('AI Ingested') || question.isConfused;
          const nextQuestion = { ...question, ...updatedQuestion } as Question;

          if (isCustomQuestion) {
            try {
              const ok = await adminService.updateCustomQuestion(questionId, nextQuestion);
              if (!ok) {
                toast.error('Không thể cập nhật câu hỏi.');
                return false;
              }
            } catch (error) {
              console.error('Error updating question:', error);
              toast.error('Lỗi kết nối khi cập nhật câu hỏi.');
              return false;
            }
          }

          set((state: any) => ({
            questions: state.questions.map(q => q.id === questionId ? nextQuestion : q)
          }));
          logActivity(get, set, 'parent_approve', 'Cập nhật câu hỏi', `Hiệu Trưởng đã cập nhật câu hỏi mã số ${questionId}`, 0, 0);
          return true;
        },

  flagQuestionConfused: async (question, reason?: 'quá khó' | 'quá dài' | 'quá khùng', severity?: number) => {
    const state = get();
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Check local coins cap
    if (state.player.coins < -100) {
      toast.error('Số dư Ngân Lượng (NP) của con đã âm quá giới hạn (-100 NP). Con không thể tiếp tục Bỏ qua câu hỏi, hãy cố gắng giải đáp nhé!');
      return false;
    }

    // Check local skip limit (3/day)
    let skips = state.player.dailySkips || { date: todayStr, count: 0 };
    if (skips.date !== todayStr) {
      skips = { date: todayStr, count: 0 };
    }
    if (skips.count >= 3) {
      toast.error('Con đã dùng hết 3 lượt Bỏ qua câu hỏi hôm nay. Hãy nỗ lực tự giải thử thách nhé!');
      return false;
    }

    try {
      if (!state.currentUser?.id) return false;
      
      // Gọi API transaction thông qua playerService
      const updatedCoins = await playerService.awardCoins(
        state.currentUser.id,
        -10,
        'Bỏ qua câu hỏi (Skip)',
        {
          questionId: question.id,
          questionPrompt: question.prompt,
          reason: reason || 'Quá khó'
        }
      );

      // Đánh dấu câu hỏi bị ghim local
      const nextQuestion = { ...question, isConfused: true, skipReason: reason, skipSeverity: severity } as Question;
      const nextSkips = { date: todayStr, count: skips.count + 1 };

      set((state: any) => ({
        questions: state.questions.map(q => q.id === question.id ? nextQuestion : q),
        player: {
          ...state.player,
          dailySkips: nextSkips,
          coins: updatedCoins
        }
      }));

      logActivity(get, set, 'exercise', 'Bỏ qua câu này', `Đã gác lại câu hỏi mã số ${question.id} (Lý do: ${reason || 'Không rõ'}). Môn Chủ trừ 10 NP.`, -10, 0);
      return true;
    } catch (error) {
      console.error('Error flagging question:', error);
      toast.error('Lỗi kết nối khi gác lại câu hỏi.');
      return false;
    }
  },

  fetchAdminStudents: async () => {
    try {
      const data = await adminService.fetchAdminStudents();
      set({ adminStudents: data.users || [], adminLinks: data.links || [] });
    } catch (e) {
      console.error('Error fetching admin students list:', e);
    }
  },

  promoteUser: async (targetUserId: string, newRole: string) => {
          try {
            const ok = await adminService.promoteUser(targetUserId, newRole);
            if (ok) {
              await get().fetchAdminStudents();
            }
          } catch (e) {
            console.error('Error promoting user:', e);
          }
        },

  fetchStudentProfile: async (studentUserId: string) => {
          try {
            const profile = await adminService.fetchStudentProfile(studentUserId);
            set({ selectedStudentProfile: profile });
          } catch (e) {
            console.error('Error fetching student profile:', e);
          }
        },

  adminMarkRewardDelivered: async (studentUserId: string, redemptionId: string) => {
          try {
            const ok = await adminService.adminMarkRewardDelivered(studentUserId, redemptionId);
            if (ok) {
              await get().fetchStudentProfile(studentUserId);
            }
          } catch (e) {
            console.error('Error marking reward delivered:', e);
          }
        },

  adminCancelRedemption: async (studentUserId: string, redemptionId: string) => {
          try {
            const ok = await adminService.adminCancelRedemption(studentUserId, redemptionId);
            if (ok) {
              await get().fetchStudentProfile(studentUserId);
            }
          } catch (e) {
            console.error('Error cancelling redemption:', e);
          }
        },

  adminSetEnergy: async (studentUserId: string, energyPercent: number) => {
          try {
            const clampedPercent = Math.max(0, Math.min(100, Math.round(energyPercent)));
            const ok = await adminService.adminSetEnergy(studentUserId, clampedPercent);
            if (!ok) {
              toast.error('Lỗi khi cập nhật năng lượng.');
              return;
            }
            await get().fetchStudentProfile(studentUserId);
            toast.success(`Cập nhật năng lượng thành công: ${clampedPercent}%.`);
          } catch (e) {
            console.error('Error updating student energy:', e);
            toast.error('Lỗi kết nối khi cập nhật năng lượng.');
          }
        },

  adminSetEnergyConfig: async (studentUserId: string, maxEnergy: number, resetHours: 2 | 3 | 5) => {
          try {
            const clampedMax = Math.max(50, Math.min(300, Math.round(maxEnergy)));
            const ok = await adminService.adminSetEnergyConfig(studentUserId, clampedMax, resetHours);
            if (!ok) {
              toast.error('Lỗi khi cập nhật cấu hình Chân Khí.');
              return;
            }
            await get().fetchStudentProfile(studentUserId);
            toast.success(`Đã cập nhật Trần Chân Khí ${clampedMax} + giờ hồi ${resetHours}h cho con.`);
          } catch (e) {
            console.error('Error updating student energy config:', e);
            toast.error('Lỗi kết nối khi cập nhật cấu hình Chân Khí.');
          }
        },

  updateGameSettings: async (payload) => {
          try {
            const ok = await adminService.updateGameSettings(payload);
            if (!ok) {
              toast.error('Lỗi khi cập nhật cấu hình.');
              return;
            }
            set((state: any) => ({
              gameSettings: {
                ...state.gameSettings,
                ...payload
              }
            }));
            toast.success('Cấu hình đã được cập nhật.');
          } catch (e) {
            console.error('Error updating game settings:', e);
            toast.error('Lỗi kết nối khi cập nhật cấu hình.');
          }
        },

  addParentQuest: (title, description, rewardNP) => {
          set((state: any) => ({
            parentQuests: [
              ...state.parentQuests,
              {
                id: `pq-${Date.now()}`,
                title,
                description,
                rewardNP,
                status: 'pending',
                timestamp: Date.now()
              }
            ]
          }));
        },

  completeParentQuest: (questId) => {
          set((state: any) => ({
            parentQuests: state.parentQuests.map(q => 
              q.id === questId ? { ...q, status: 'completed' } : q
            )
          }));
        },

  deleteParentQuest: (questId) => {
          set((state: any) => ({
            parentQuests: state.parentQuests.filter(q => q.id !== questId)
          }));
        },

  claimParentQuest: (questId) => {
          let np = 0;
          let qTitle = '';
          set((state: any) => {
            const quest = state.parentQuests.find(q => q.id === questId);
            if (!quest || quest.status !== 'completed') return {};
            np = quest.rewardNP;
            qTitle = quest.title;
            return {
              parentQuests: state.parentQuests.map(q =>
                q.id === questId ? { ...q, status: 'claimed' } : q
              ),
              player: {
                ...state.player,
                coins: state.player.coins + np
              }
            };
          });
          if (np > 0) {
            logActivity(get, set, 'reward_claimed', 'Nhận thưởng nhiệm vụ', `Đã nhận thưởng: ${qTitle}`, np, 0);
          }
        },

});

