const numberFrom = (primary: unknown, legacy: unknown, fallback = 0): number => {
  const value = primary ?? legacy ?? fallback;
  return Number.isFinite(Number(value)) ? Number(value) : fallback;
};

/** Read legacy coins/NP payloads once and expose only the canonical Ruby domain fields. */
export const normalizeRubyPayload = <T extends any>(payload: T): T => {
  if (!payload || typeof payload !== 'object') return payload;
  const normalized: any = { ...payload };

  if (normalized.player) {
    normalized.player = {
      ...normalized.player,
      ruby: numberFrom(normalized.player.ruby, normalized.player.coins, 200),
    };
    delete normalized.player.coins;
  }

  const mapCurrency = (items: any[] | undefined, canonical: string, legacy: string) =>
    Array.isArray(items)
      ? items.map(item => {
          const next = { ...item, [canonical]: numberFrom(item?.[canonical], item?.[legacy]) };
          delete next[legacy];
          return next;
        })
      : items;

  normalized.logs = mapCurrency(normalized.logs, 'rubyChanged', 'coinsChanged');
  normalized.rewards = mapCurrency(normalized.rewards, 'costRuby', 'costCoins');
  normalized.rewardRedemptions = mapCurrency(normalized.rewardRedemptions, 'costRuby', 'costCoins');
  normalized.classRewards = mapCurrency(normalized.classRewards, 'costRuby', 'costCoins');
  normalized.classRewardRedemptions = mapCurrency(normalized.classRewardRedemptions, 'costRuby', 'costCoins');
  normalized.challenges = mapCurrency(normalized.challenges, 'rewardRuby', 'rewardCoins');

  if (normalized.gameSettings) {
    normalized.gameSettings = {
      ...normalized.gameSettings,
      bossCompletionBonusRuby:
        normalized.gameSettings.bossCompletionBonusRuby ?? normalized.gameSettings.bossCompletionBonusNP,
      baseRuby: numberFrom(normalized.gameSettings.baseRuby, normalized.gameSettings.baseCoins, 5),
    };
    delete normalized.gameSettings.bossCompletionBonusNP;
    delete normalized.gameSettings.baseCoins;
  }

  return normalized;
};

export const normalizePersistedRubyState = (state: any): any => {
  const normalized = normalizeRubyPayload(state);
  if (normalized?.profiles) {
    normalized.profiles = Object.fromEntries(
      Object.entries(normalized.profiles).map(([id, profile]) => [
        id,
        normalizeRubyPayload({ player: profile }).player,
      ])
    );
  }
  return normalized;
};
