// Nguồn chân lý duy nhất cho công thức tính level từ XP ở backend — trước đây while-loop
// `xp >= level * 200` bị lặp lại độc lập ở game.ts và missionLedger.ts (nguy cơ lệch nếu một
// nơi sửa mà quên nơi kia). Frontend có bản tương ứng riêng ở src/utils/leveling.ts (hai gói
// không dùng chung package nên vẫn phải giữ đồng bộ thủ công giữa 2 file này).
export const XP_PER_LEVEL = 200;

export function xpNeededForLevel(level: number): number {
  return level * XP_PER_LEVEL;
}

export function applyLevelUps(xp: number, level: number): { xp: number; level: number } {
  let nextXp = xp;
  let nextLevel = level;
  while (nextXp >= xpNeededForLevel(nextLevel)) {
    nextXp -= xpNeededForLevel(nextLevel);
    nextLevel += 1;
  }
  return { xp: nextXp, level: nextLevel };
}
