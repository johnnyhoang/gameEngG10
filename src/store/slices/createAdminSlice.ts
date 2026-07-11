// @ts-nocheck
import type { StateCreator } from 'zustand';
import type { StoreState } from '../types';
import { INITIAL_PLAYER, INITIAL_PET, DEFAULT_GAME_SETTINGS, INITIAL_CHALLENGES, DEFAULT_REWARDS, DEFAULT_PIN } from '../initialState';
import { INITIAL_QUESTIONS } from '../../data/questions';
import { INITIAL_LESSONS } from '../../data/lessons';
import { DEFAULT_UI_THEME } from '../../theme/uiThemes';
import { supabase } from '../../utils/supabaseClient';
import { logActivity, checkLevelUp } from '../helpers';
import { eventBus } from '../../utils/EventBus';
import { toast } from '../../utils/toast';

export const createAdminSlice: StateCreator<
  StoreState,
  [],
  [],
  Pick<StoreState, 
    'parentPIN' | 'adminStudents' | 'selectedStudentProfile' | 'failedQuestionIds' | 'recentlyPlayedQuestionIds' | 'parentQuests' | 'changePIN' | 'markRewardDelivered' | 'cancelRedemption' | 'addParentReward' | 'deleteParentReward' | 'importQuestions' | 'deleteQuestion' | 'updateQuestion' | 'flagQuestionConfused' | 'fetchAdminStudents' | 'promoteUser' | 'fetchStudentProfile' | 'adminMarkRewardDelivered' | 'adminCancelRedemption' | 'adminSetEnergy' | 'adminSetEnergyConfig' | 'updateGameSettings' | 'addParentQuest' | 'completeParentQuest' | 'deleteParentQuest' | 'claimParentQuest' | 'auditLogs' | 'fetchAuditLogs' | 'skipReviews' | 'fetchSkipReviews' | 'resolveSkipReview'
  >
> = (set, get) => ({
  parentPIN: DEFAULT_PIN,

  adminStudents: [],

  selectedStudentProfile: null,

  failedQuestionIds: [],

  recentlyPlayedQuestionIds: [],

  parentQuests: [],

  auditLogs: [],

  changePIN: async (newPIN) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return false;
    const session = (await supabase.auth.getSession()).data.session;
    const token = session?.access_token;
    if (!token) return false;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
    try {
      const res = await fetch(`${backendUrl}/api/security/pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ profileId: pId, pin: newPIN })
      });
      if (res.ok) {
        set({ parentPIN: newPIN });
        return true;
      }
      return false;
    } catch (e) {
      console.error('Error changing PIN:', e);
      return false;
    }
  },

  fetchAuditLogs: async () => {
    const state = get();
    if (state.currentUser?.role !== 'truong_vien') return;
    const session = (await supabase.auth.getSession()).data.session;
    const token = session?.access_token;
    if (!token) return;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
    try {
      const res = await fetch(`${backendUrl}/api/admin/audit-logs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        set({ auditLogs: data || [] });
      }
    } catch (e) {
      console.error('Error fetching audit logs:', e);
    }
  },

  skipReviews: [],

  fetchSkipReviews: async (studentId) => {
    const session = (await supabase.auth.getSession()).data.session;
    const token = session?.access_token;
    if (!token) return;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
    try {
      const res = await fetch(`${backendUrl}/api/family/skip-reviews/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        set({ skipReviews: data || [] });
      }
    } catch (e) {
      console.error('Error fetching skip reviews:', e);
    }
  },

  resolveSkipReview: async (reviewId) => {
    const session = (await supabase.auth.getSession()).data.session;
    const token = session?.access_token;
    if (!token) return false;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
    try {
      const res = await fetch(`${backendUrl}/api/family/skip-reviews/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ reviewId })
      });
      if (res.ok) {
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

          logActivity(get, set, 'parent_approve', 'Đã Trao Phần Thưởng', `Viện Chủ xác nhận đã trao "${redemption.rewardTitle}" ngoài đời.`, 0, 0);
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

          logActivity(get, set, 'parent_approve', 'Viện Chủ hoàn trả Ngân Lượng', `Hủy lượt đổi "${redemption.rewardTitle}". Đã hoàn lại ${redemption.costCoins} NP`, redemption.costCoins, 0);
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
          logActivity(get, set, 'parent_approve', 'Viện Chủ thêm Phúc Lợi mới', `Phúc Lợi mới: "${title}" trị giá ${costCoins} NP, số lượng ${safeQuantity}`, 0, 0);
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
              const session = (await supabase.auth.getSession()).data.session;
              const token = session?.access_token;
              if (!token) return false;

              const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
              const res = await fetch(`${backendUrl}/api/questions/custom/${questionId}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              if (!res.ok) {
                const errData = await res.json();
                toast.error(errData.error || 'Không thể xóa câu hỏi.');
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
          logActivity(get, set, 'parent_approve', 'Xóa câu hỏi', `Viện Chủ đã xóa câu hỏi mã số ${questionId}`, 0, 0);
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
              const session = (await supabase.auth.getSession()).data.session;
              const token = session?.access_token;
              if (!token) return false;

              const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
              const res = await fetch(`${backendUrl}/api/questions/custom/${questionId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(nextQuestion)
              });
              if (!res.ok) {
                const errData = await res.json();
                toast.error(errData.error || 'Không thể cập nhật câu hỏi.');
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
          logActivity(get, set, 'parent_approve', 'Cập nhật câu hỏi', `Viện Chủ đã cập nhật câu hỏi mã số ${questionId}`, 0, 0);
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
      const session = (await supabase.auth.getSession()).data.session;
      const token = session?.access_token;
      if (!token) return false;

      const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
      
      // Gọi API transaction để trừ tiền và lưu review skip ở backend
      const res = await fetch(`${backendUrl}/api/economy/transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          profileId: state.currentUser?.id,
          amount: -10,
          reason: 'Bỏ qua câu hỏi (Skip)',
          details: {
            questionId: question.id,
            questionPrompt: question.prompt,
            reason: reason || 'Quá khó'
          }
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        toast.error(errData.error || 'Môn Chủ không cho phép bỏ qua câu hỏi.');
        return false;
      }

      const data = await res.json();
      const updatedCoins = data.coins;

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
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
            const res = await fetch(`${backendUrl}/api/admin/users`, {
              headers: { 'Authorization': 'Bearer ' + token }
            });
            if (res.ok) {
              const users = await res.json();
              set({ adminStudents: users });
            }
          } catch (e) {
            console.error('Error fetching admin students list:', e);
          }
        },

  promoteUser: async (targetUserId: string, newRole: string) => {
          try {
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
            const res = await fetch(`${backendUrl}/api/admin/promote`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({ targetUserId, newRole })
            });
            if (res.ok) {
              // Refresh students list
              await get().fetchAdminStudents();
            }
          } catch (e) {
            console.error('Error promoting user:', e);
          }
        },

  fetchStudentProfile: async (studentUserId: string) => {
          try {
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
            const res = await fetch(`${backendUrl}/api/admin/student-profile?studentUserId=${studentUserId}`, {
              headers: { 'Authorization': 'Bearer ' + token }
            });
            if (res.ok) {
              const profile = await res.json();
              set({ selectedStudentProfile: profile });
            }
          } catch (e) {
            console.error('Error fetching student profile:', e);
          }
        },

  adminMarkRewardDelivered: async (studentUserId: string, redemptionId: string) => {
          try {
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
            const res = await fetch(`${backendUrl}/api/admin/deliver-reward`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({ studentUserId, redemptionId })
            });
            if (res.ok) {
              // Reload profile
              await get().fetchStudentProfile(studentUserId);
            }
          } catch (e) {
            console.error('Error marking reward delivered:', e);
          }
        },

  adminCancelRedemption: async (studentUserId: string, redemptionId: string) => {
          try {
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
            const res = await fetch(`${backendUrl}/api/admin/cancel-redemption`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({ studentUserId, redemptionId })
            });
            if (res.ok) {
              // Reload profile
              await get().fetchStudentProfile(studentUserId);
            }
          } catch (e) {
            console.error('Error cancelling redemption:', e);
          }
        },

  adminSetEnergy: async (studentUserId: string, energyPercent: number) => {
          try {
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const clampedPercent = Math.max(0, Math.min(100, Math.round(energyPercent)));
            const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
            const res = await fetch(`${backendUrl}/api/admin/refill-energy`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({ studentUserId, energyPercent: clampedPercent })
            });
            if (!res.ok) {
              const errData = await res.json();
              toast.error(errData.error || 'Lỗi khi cập nhật năng lượng.');
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
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const clampedMax = Math.max(50, Math.min(300, Math.round(maxEnergy)));
            const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
            const res = await fetch(`${backendUrl}/api/admin/set-energy-config`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({ studentUserId, maxEnergy: clampedMax, resetHours })
            });
            if (!res.ok) {
              const errData = await res.json();
              toast.error(errData.error || 'Lỗi khi cập nhật cấu hình Chân Khí.');
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
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
            const res = await fetch(`${backendUrl}/api/admin/game-settings`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify(payload)
            });
            if (!res.ok) {
              const errData = await res.json();
              toast.error(errData.error || 'Lỗi khi cập nhật cấu hình.');
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
