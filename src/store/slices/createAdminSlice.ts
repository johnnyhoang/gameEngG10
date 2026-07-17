// @ts-nocheck
import type { StateCreator } from 'zustand';
import type { StoreState } from '../types';
import { DEFAULT_UI_THEME } from '../../theme/uiThemes';
import { logActivity, checkLevelUp } from '../helpers';
import { eventBus } from '../../utils/EventBus';
import { toast } from '../../utils/toast';
import { adminService } from '../../services/adminService';
import { playerService } from '../../services/playerService';
import { enrichTextbookAttributes } from '../../utils/textbookEnricher';
import { getHoChiMinhDateString } from '../../utils/date';

export const createAdminSlice: StateCreator<
  StoreState,
  [],
  [],
  Pick<StoreState, 
    'adminStudents' | 'adminLinks' | 'selectedStudentProfile' | 'failedQuestionIds' | 'recentlyPlayedQuestionIds' | 'tutorQuests' | 'markRewardDelivered' | 'cancelRedemption' | 'schoolRewards' | 'fetchSchoolRewards' | 'createSchoolReward' | 'deleteSchoolReward' | 'importQuestions' | 'deleteQuestion' | 'updateQuestion' | 'addQuestion' | 'flagQuestionConfused' | 'fetchAdminStudents' | 'promoteUser' | 'fetchStudentProfile' | 'adminMarkRewardDelivered' | 'adminCancelRedemption' | 'adminSetEnergy' | 'adminSetEnergyConfig' | 'updateGameSettings' | 'addTutorQuest' | 'completeTutorQuest' | 'deleteTutorQuest' | 'claimTutorQuest' | 'auditLogs' | 'fetchAuditLogs' | 'skipReviews' | 'fetchSkipReviews' | 'resolveSkipReview'
  >
> = (set, get) => ({
  adminStudents: [],
  adminLinks: [],

  selectedStudentProfile: null,

  failedQuestionIds: [],

  recentlyPlayedQuestionIds: [],

  tutorQuests: [],

  auditLogs: [],

  fetchAuditLogs: async () => {
    const state = get();
    if (state.currentUser?.role !== 'truong_vien' && state.currentUser?.role !== 'pho_vien') return;
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

          logActivity(get, set, 'parent_approve', 'Đã Trao Quà', `Người quản lý xác nhận đã trao "${redemption.rewardTitle}" ngoài đời.`, 0, 0);
        },

  cancelRedemption: (redemptionId) => {
          // Hủy lượt đổi: hoàn Ruby cho Sĩ Tử + trả lại remainingQuantity cho catalog item.
          const state = get();
          const redemption = state.rewardRedemptions.find(r => r.id === redemptionId);
          if (!redemption || redemption.status !== 'pending') return;

          set(prev => ({
            player: {
              ...prev.player,
              ruby: prev.player.ruby + redemption.costRuby
            },
            rewards: prev.rewards.map(r => r.id === redemption.rewardId ? { ...r, remainingQuantity: r.remainingQuantity + 1 } : r),
            rewardRedemptions: prev.rewardRedemptions.filter(r => r.id !== redemptionId)
          }));

          logActivity(get, set, 'parent_approve', 'Hoàn trả Ruby', `Hủy lượt đổi "${redemption.rewardTitle}". Đã hoàn lại ${redemption.costRuby} Ruby`, redemption.costRuby, 0);
        },

  schoolRewards: [],

  fetchSchoolRewards: async () => {
    try {
      const rewards = await adminService.fetchSchoolRewards();
      set({ schoolRewards: rewards.map((row: any) => ({
        id: row.id,
        title: row.title,
        costRuby: row.cost_ruby,
        quantity: row.quantity,
        remainingQuantity: row.remaining_quantity,
        timestamp: Number(row.created_at)
      })) });
    } catch (e) {
      console.error('Error fetching school reward templates:', e);
    }
  },

  createSchoolReward: async (title, costRuby, quantity) => {
    const ok = await adminService.createSchoolReward(title, costRuby, Math.max(1, Math.round(quantity)));
    if (ok) {
      await get().fetchSchoolRewards();
      logActivity(get, set, 'parent_approve', 'Thêm Quà Khuyến Học của trường', `Quà mới: "${title}" trị giá ${costRuby} Ruby, số lượng ${quantity}`, 0, 0);
    }
    return ok;
  },

  deleteSchoolReward: async (rewardId) => {
    const ok = await adminService.deleteSchoolReward(rewardId);
    if (ok) {
      set((state: any) => ({ schoolRewards: state.schoolRewards.filter((r: any) => r.id !== rewardId) }));
    }
    return ok;
  },

  importQuestions: (importedQuestions) => {
          set((state: any) => {
            const existingPrompts = new Set(state.questions.map((q: any) => q.prompt));
            const filteredNew = importedQuestions
              .filter(newQ => !existingPrompts.has(newQ.prompt))
              .map(newQ => {
                const textbook = enrichTextbookAttributes(newQ.topicId, newQ.category, newQ.subject);
                return {
                  ...newQ,
                  loai: textbook.loai,
                  bai: textbook.bai
                };
              });
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
          logActivity(get, set, 'parent_approve', 'Xóa câu hỏi', `Viện Trưởng đã xóa câu hỏi mã số ${questionId}`, 0, 0);
          return true;
        },

  addQuestion: async (newQ) => {
          const state = get();
          const id = 'cust-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
          const textbook = enrichTextbookAttributes(newQ.topicId, newQ.category, newQ.subject);
          const question = { id, ...newQ, source: newQ.source || 'AI Ingested', loai: textbook.loai, bai: textbook.bai } as Question;
          
          try {
            const ok = await adminService.updateCustomQuestion(id, question);
            if (!ok) {
              toast.error('Không thể tạo câu hỏi mới.');
              return false;
            }
          } catch (e) {
            console.error('Error adding question:', e);
            toast.error('Lỗi kết nối khi lưu câu hỏi mới.');
            return false;
          }

          set((state: any) => ({
            questions: [question, ...state.questions]
          }));
          logActivity(get, set, 'parent_approve', 'Thêm câu hỏi mới', `Viện Trưởng đã tạo câu hỏi mới mã số ${id}`, 0, 0);
          return true;
        },

  updateQuestion: async (questionId, updatedQuestion) => {
          const state = get();
          const question = state.questions.find(q => q.id === questionId);
          if (!question) return false;

          const isCustomQuestion = question.source?.startsWith('AI Ingested') || question.isConfused;
          const textbook = enrichTextbookAttributes(
            updatedQuestion.topicId || question.topicId,
            updatedQuestion.category || question.category,
            updatedQuestion.subject || question.subject
          );
          const nextQuestion = { ...question, ...updatedQuestion, loai: textbook.loai, bai: textbook.bai } as Question;

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
          logActivity(get, set, 'parent_approve', 'Cập nhật câu hỏi', `Viện Trưởng đã cập nhật câu hỏi mã số ${questionId}`, 0, 0);
          return true;
        },

  flagQuestionConfused: async (question, reason?: 'quá khó' | 'quá dài' | 'quá khùng', severity?: number) => {
    const state = get();
    const todayStr = getHoChiMinhDateString(new Date());
    
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

      // Đánh dấu câu hỏi bị ghim local
      const nextQuestion = { ...question, isConfused: true, skipReason: reason, skipSeverity: severity } as Question;
      const nextSkips = { date: todayStr, count: skips.count + 1 };

      set((state: any) => ({
        questions: state.questions.map(q => q.id === question.id ? nextQuestion : q),
        player: {
          ...state.player,
          dailySkips: nextSkips
        }
      }));

      logActivity(get, set, 'exercise', 'Bỏ qua', `Đã gác lại câu hỏi mã số ${question.id} (Lý do: ${reason || 'Không rõ'}). Không trừ Ruby.`, 0, 0);
      return true;
    } catch (error) {
      console.error('Error flagging question:', error);
      toast.error('Lỗi kết nối khi gác lại câu hỏi.');
      return false;
    }
  },

  fetchAdminStudents: async () => {
    try {
      const activeProfileId = get().currentUser?.id;
      const data = await adminService.fetchAdminStudents(activeProfileId);
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
              toast.error('Lỗi khi cập nhật cấu hình Năng Lượng.');
              return;
            }
            await get().fetchStudentProfile(studentUserId);
            toast.success(`Đã cập nhật trần Năng Lượng ${clampedMax} và thời gian hồi ${resetHours} giờ cho Sĩ Tử.`);
          } catch (e) {
            console.error('Error updating student energy config:', e);
            toast.error('Lỗi kết nối khi cập nhật cấu hình Năng Lượng.');
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

  addTutorQuest: (title, description, rewardRuby) => {
          set((state: any) => ({
            tutorQuests: [
              ...state.tutorQuests,
              {
                id: `pq-${Date.now()}`,
                title,
                description,
                rewardRuby,
                status: 'pending',
                timestamp: Date.now()
              }
            ]
          }));
        },

  completeTutorQuest: (questId) => {
          set((state: any) => ({
            tutorQuests: state.tutorQuests.map(q => 
              q.id === questId ? { ...q, status: 'completed' } : q
            )
          }));
        },

  deleteTutorQuest: (questId) => {
          set((state: any) => ({
            tutorQuests: state.tutorQuests.filter(q => q.id !== questId)
          }));
        },

  claimTutorQuest: (questId) => {
          let rubyReward = 0;
          let qTitle = '';
          set((state: any) => {
            const quest = state.tutorQuests.find(q => q.id === questId);
            if (!quest || quest.status !== 'completed') return {};
            rubyReward = quest.rewardRuby;
            qTitle = quest.title;
            return {
              tutorQuests: state.tutorQuests.map(q =>
                q.id === questId ? { ...q, status: 'claimed' } : q
              ),
              player: {
                ...state.player,
                ruby: state.player.ruby + rubyReward
              }
            };
          });
          if (rubyReward > 0) {
            logActivity(get, set, 'reward_claimed', 'Nhận thưởng nhiệm vụ', `Đã nhận thưởng: ${qTitle}`, rubyReward, 0);
          }
        },

});

