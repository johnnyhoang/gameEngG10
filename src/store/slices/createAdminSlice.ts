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
    'parentPIN' | 'adminStudents' | 'selectedStudentProfile' | 'failedQuestionIds' | 'recentlyPlayedQuestionIds' | 'parentQuests' | 'verifyPIN' | 'changePIN' | 'markRewardDelivered' | 'cancelRedemption' | 'addParentReward' | 'deleteParentReward' | 'importQuestions' | 'deleteQuestion' | 'updateQuestion' | 'flagQuestionConfused' | 'fetchAdminStudents' | 'promoteUser' | 'fetchStudentProfile' | 'adminMarkRewardDelivered' | 'adminCancelRedemption' | 'adminSetEnergy' | 'updateGameSettings' | 'addParentQuest' | 'completeParentQuest' | 'deleteParentQuest' | 'claimParentQuest'
  >
> = (set, get) => ({
  parentPIN: DEFAULT_PIN,

  adminStudents: [],

  selectedStudentProfile: null,

  failedQuestionIds: [],

  recentlyPlayedQuestionIds: [],

  parentQuests: [],

  verifyPIN: (pin) => {
          return get().parentPIN === pin;
        },

  changePIN: (newPIN) => {
          set({ parentPIN: newPIN });
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
            // Filter duplicates by checking prompts/ids
            const filteredNew = importedQuestions.filter(newQ => 
              !state.questions.some(existingQ => existingQ.prompt === newQ.prompt)
            );
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
          const nextQuestion = { ...question, isConfused: true, skipReason: reason, skipSeverity: severity } as Question;

          try {
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return false;

            const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
            const res = await fetch(`${backendUrl}/api/questions/confused`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(question)
            });
            if (!res.ok) {
              const errData = await res.json();
              toast.error(errData.error || 'Không thể đánh dấu câu hỏi.');
              return false;
            }
          } catch (error) {
            console.error('Error flagging question:', error);
            toast.error('Lỗi kết nối khi đánh dấu câu hỏi.');
            return false;
          }

          set((state: any) => {
            const todayStr = new Date().toISOString().split('T')[0];
            let newSkips = state.player.dailySkips || { date: todayStr, count: 0 };
            if (newSkips.date !== todayStr) {
              newSkips = { date: todayStr, count: 1 };
            } else {
              newSkips = { date: todayStr, count: newSkips.count + 1 };
            }

            return {
              questions: state.questions.map(q => q.id === question.id ? nextQuestion : q),
              player: {
                ...state.player,
                dailySkips: newSkips,
                // Môn Chủ Hỏi Tội (CORE_SPECS §3.1): skip không giới hạn nhưng trừ 10 NP.
                // Khoản trừ BẮT BUỘC của hệ thống — được phép đẩy NP xuống ÂM (không kẹp Math.max 0).
                coins: state.player.coins - 10
              }
            };
          });
          logActivity(get, set, 'exercise', 'Bỏ qua câu này', `Đã gác lại câu hỏi mã số ${question.id} (Lý do: ${reason || 'Không rõ'}). Môn Chủ trừ 10 NP.`, -10, 0);
          return true;
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
