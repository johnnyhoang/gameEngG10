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
  xp = 0,
  wallet = 0
) => {
  const newLog: HistoryLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    activityType,
    title,
    detail,
    coinsChanged: coins,
    xpChanged: xp,
    walletChanged: wallet,
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
      logActivity(get, set, 'exercise', 'Thăng cấp!', `Bạn vừa chạm Level ${level}.`, 50, 0, 0);
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
        rankUpBonusXp,
        0
      );
    }
  }

  return { level, xp, badges, badgesChanged };
};
