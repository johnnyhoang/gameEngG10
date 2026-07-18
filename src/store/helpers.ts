import type { HistoryLog } from '../types/game';
import { getStudentRankForLevel } from '../types/game';
import { eventBus } from '../utils/EventBus';
import { recordMissionEvent } from '../services/missionLedgerService';
import { toast } from '../utils/toast';
import { xpNeededForLevel } from '../utils/leveling';

export const logActivity = (
  get: any,
  set: any,
  activityType: HistoryLog['activityType'],
  title: string,
  detail: string,
  ruby = 0,
  xp = 0
) => {
  const newLog: HistoryLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    activityType,
    title,
    detail,
    rubyChanged: ruby,
    xpChanged: xp,
    subject: get().currentSubject,
    gradeTier: get().activeGradeTier
  };
  set((state: any) => ({
    logs: [newLog, ...(state.logs || [])].slice(0, 200)
  }));
};

export const checkLevelUp = (
  get: any,
  set: any,
  currentXp: number,
  currentLevel: number
) => {
  let level = currentLevel;
  let xp = currentXp;
  const badges = [...(get().player.badges || [])];
  let badgesChanged = false;

  const oldRank = getStudentRankForLevel(currentLevel);

  const applyLevelUps = () => {
    while (xp >= xpNeededForLevel(level)) {
      xp -= xpNeededForLevel(level);
      level += 1;
      // Lên cấp thường không tự thưởng Ruby (chỉ mốc danh hiệu mới thưởng đột biến — CORE_SPECS §7.3);
      // log chỉ ghi nhận sự kiện, không claim số Ruby không thực sự được cộng.
      logActivity(get, set, 'exercise', 'Thăng cấp!', `Bạn vừa chạm Level ${level}.`, 0, 0);
      toast.success(`🎉 Chúc mừng Sĩ Tử thăng cấp lên Cấp ${level}! ✨`);
      eventBus.publish('PET_GROWTH', { levelUp: true });
    }
  };
  applyLevelUps();

  const newRank = getStudentRankForLevel(level);
  if (newRank.id !== oldRank.id) {
    const badgeName = `Danh hiệu: ${newRank.name}`;
    if (!badges.includes(badgeName)) {
      badges.push(badgeName);
      badgesChanged = true;
      const rankUpBonusXp = 100;
      xp += rankUpBonusXp;
      applyLevelUps();
      logActivity(
        get, set,
        'challenge',
        'Thăng cấp danh hiệu!',
        `Chúc mừng Sĩ Tử đã thăng cấp danh hiệu lên ${newRank.icon} ${newRank.name}! Nhận thêm +100 Ruby và +${rankUpBonusXp} XP.`,
        100,
        rankUpBonusXp
      );
      toast.success(`🏆 Tuyệt vời! Sĩ Tử thăng danh hiệu lên: ${newRank.icon} ${newRank.name}! 🎉 (+100 Ruby 💎)`);
    }
  }

  // Popup chúc mừng thăng cấp (Luật Một Bảng — CORE_SPECS §7.2): bắn đúng 1 lần dù nhảy nhiều
  // cấp cùng lúc (VD hoàn thành Boss cộng dồn XP lớn), UI subscribe để hiện overlay ăn mừng.
  if (level > currentLevel) {
    eventBus.publish('PLAYER_LEVEL_UP', {
      fromLevel: currentLevel,
      toLevel: level,
      rank: newRank,
      rankChanged: newRank.id !== oldRank.id
    });
    const state = get();
    void recordMissionEvent({
      profileId: state.currentUser?.id || state.player.id,
      idempotencyKey: `level-reached:${level}`,
      eventType: 'level_reached',
      gradeTier: state.activeGradeTier,
      subjectId: state.currentSubject,
      entityType: 'level',
      entityId: String(level),
      value: 1,
      metadata: { level },
    });
  }

  return { level, xp, badges, badgesChanged };
};

export const mapServerTopics = (topics: any[]): any[] => {
  return (topics || []).map((t: any) => ({
    id: t.id,
    subjectId: t.subject || t.subjectId,
    gradeTier: t.grade_tier ?? t.gradeTier ?? 9,
    group: t.group || 'co_ban',
    label: t.name || t.label,
    labelEN: t.label_en ?? t.labelEN ?? '',
    hamNguyenTo: t.ham_nguyen_to ?? t.hamNguyenTo ?? 'thach',
    examRelevance: t.exam_relevance ?? t.examRelevance ?? 'medium',
    minQuestions: t.min_questions ?? t.minQuestions ?? 30,
    questionTypes: t.question_types ?? t.questionTypes ?? ['mcq'],
    description: t.description || '',
  }));
};

