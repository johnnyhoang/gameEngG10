import type { HistoryLog } from '../types/game';
import { getStudentRankForLevel } from '../types/game';
import { eventBus } from '../utils/EventBus';

export const logActivity = (
  get: any,
  set: any,
  activityType: HistoryLog['activityType'],
  title: string,
  detail: string,
  coins = 0,
  xp = 0
) => {
  const newLog: HistoryLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    activityType,
    title,
    detail,
    coinsChanged: coins,
    xpChanged: xp,
    subject: get().currentSubject
  };
  set((state: any) => ({
    logs: [newLog, ...state.logs].slice(0, 200)
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
    while (xp >= level * 200) {
      xp -= level * 200;
      level += 1;
      // Lên cấp thường không tự thưởng NP (chỉ mốc danh hiệu mới thưởng đột biến — CORE_SPECS §7.3);
      // log chỉ ghi nhận sự kiện, không claim số Coin không thực sự được cộng.
      logActivity(get, set, 'exercise', 'Thăng cấp!', `Bạn vừa chạm Level ${level}.`, 0, 0);
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
        `Chúc mừng Thiếu hiệp đã thăng cấp danh hiệu lên ${newRank.icon} ${newRank.name}! Nhận thêm +100 Coin và +${rankUpBonusXp} XP.`,
        100,
        rankUpBonusXp
      );
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
  }

  return { level, xp, badges, badgesChanged };
};
