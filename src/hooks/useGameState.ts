import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INITIAL_QUESTIONS } from '../data/questions';
import { eventBus } from '../utils/EventBus';
import { supabase } from '../utils/supabaseClient';
import type {
  UserProfile,
  PlayerProfile,
  Question,
  CategoryStat,
  PetState,
  ParentReward,
  HistoryLog,
  Challenge,
  DailyMission
} from '../types/game';

interface GameState {
  // State
  currentUser: UserProfile | null;
  player: PlayerProfile;
  questions: Question[];
  categoryStats: Record<string, CategoryStat>;
  pet: PetState;
  rewards: ParentReward[];
  challenges: Challenge[];
  dailyMission: DailyMission | null;
  logs: HistoryLog[];
  parentPIN: string;
  activeCombo: number;
  maxCombo: number;

  // Profiles cache for multi-player
  profiles: Record<string, PlayerProfile>;
  petStates: Record<string, PetState>;
  categoryStatsAll: Record<string, Record<string, CategoryStat>>;

  // Initializers
  initEventSubscriptions: () => () => void;

  // Auth Actions
  login: (user: UserProfile) => void;
  logout: () => void;

  // Player Actions
  answerQuestion: (
    questionId: string,
    isCorrect: boolean,
    timeSpentSeconds: number,
    gameMode: 'practice' | 'survival' | 'boss' | 'infinite'
  ) => { isCorrect: boolean; expGained: number; coinsGained: number; comboMultiplier: number };
  useEnergy: (amount: number) => boolean;
  addEnergy: (amount: number) => void;
  buyStreakShield: () => boolean;
  buyHeart: () => boolean;
  buyHint: () => boolean;
  claimParentReward: (rewardId: string) => boolean;
  feedPet: () => void;
  spinWheel: () => { rewardType: string; amount: number; message: string };
  openMysteryBox: () => { rewardType: string; amount: number; message: string };

  // Parent Actions
  verifyPIN: (pin: string) => boolean;
  changePIN: (newPIN: string) => void;
  approveReward: (rewardId: string) => void;
  rejectReward: (rewardId: string) => void;
  addParentReward: (title: string, costCoins: number, cashValueVND: number) => void;
  importQuestions: (questions: Question[]) => void;
  deleteQuestion: (questionId: string) => void;
  resetProgress: () => void; // Keeps questions, resets student stats

  // Systems Reset
  checkDailyReset: () => void;

  // Selection Logic
  getAdaptiveQuestion: (category: string) => Question | null;
  getQuestionByWeight: (mode: 'grammar' | 'reading' | 'vocabulary' | 'mixed') => Question | null;
}

const DEFAULT_PIN = '1234';

const INITIAL_PLAYER: PlayerProfile = {
  id: 'student-1',
  name: 'Con yêu',
  role: 'student',
  level: 1,
  xp: 0,
  coins: 200,
  walletVND: 0,
  streak: 0,
  energy: 100,
  hearts: 3,
  lastActive: new Date().toISOString(),
  badges: []
};

const INITIAL_PET: PetState = {
  name: 'Rồng Con',
  stage: 'egg',
  level: 1,
  exp: 0,
  energy: 100,
  mood: 'neutral',
  lastFed: new Date().toISOString()
};

const DEFAULT_REWARDS: ParentReward[] = [
  { id: 'r-1', title: '15 phút chơi game', costCoins: 150, cashValueVND: 0, status: 'pending', timestamp: Date.now() },
  { id: 'r-2', title: 'Ly trà sữa đặc biệt', costCoins: 400, cashValueVND: 0, status: 'pending', timestamp: Date.now() },
  { id: 'r-3', title: 'Thưởng 20.000đ tiền mặt', costCoins: 500, cashValueVND: 20000, status: 'pending', timestamp: Date.now() },
  { id: 'r-4', title: 'Thưởng 50.000đ tiền mặt', costCoins: 1000, cashValueVND: 50000, status: 'pending', timestamp: Date.now() },
  { id: 'r-5', title: 'Thưởng 100.000đ tiền mặt', costCoins: 1800, cashValueVND: 100000, status: 'pending', timestamp: Date.now() }
];

const INITIAL_CHALLENGES: Challenge[] = [
  { id: 'ch-1', type: 'daily', title: 'Luyện 20 câu hỏi', description: 'Hoàn thành làm 20 câu hỏi bất kỳ', targetCount: 20, currentCount: 0, rewardCoins: 100, rewardXP: 100, completed: false },
  { id: 'ch-2', type: 'daily', title: 'Chiến binh Grammar', description: 'Trả lời đúng 10 câu hỏi ngữ pháp', targetCount: 10, currentCount: 0, rewardCoins: 80, rewardXP: 80, completed: false, category: 'grammar' },
  { id: 'ch-3', type: 'daily', title: 'Không tỳ vết', description: 'Đạt chuỗi đúng 10 câu liên tiếp', targetCount: 10, currentCount: 0, rewardCoins: 120, rewardXP: 150, completed: false },
  { id: 'ch-4', type: 'weekly', title: 'Học tập bền bỉ', description: 'Hoàn thành 100 câu hỏi trong tuần', targetCount: 100, currentCount: 0, rewardCoins: 500, rewardXP: 500, completed: false },
  { id: 'ch-5', type: 'achievement', title: 'Khởi đầu vinh quang', description: 'Tổng cộng trả lời đúng 100 câu', targetCount: 100, currentCount: 0, rewardCoins: 300, rewardXP: 300, completed: false },
  { id: 'ch-6', type: 'achievement', title: 'Huyền thoại học đường', description: 'Tổng cộng trả lời đúng 1000 câu', targetCount: 1000, currentCount: 0, rewardCoins: 2000, rewardXP: 2000, completed: false }
];

export const useGameState = create<GameState>()(
  persist(
    (originalSet, get) => {
      // Intercept set updates to automatically keep profiles in sync
      let syncTimeout: any = null;
      const triggerDebouncedSync = () => {
        const user = get().currentUser;
        if (!user || user.id.startsWith('mock-')) return;

        if (syncTimeout) clearTimeout(syncTimeout);

        syncTimeout = setTimeout(async () => {
          try {
            const state = get();
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const syncPayload = {
              player: state.player,
              pet: state.pet,
              categoryStats: state.categoryStats,
              logs: state.logs,
              rewards: state.rewards,
              challenges: state.challenges,
              dailyMission: state.dailyMission
            };

            await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api/profile/sync`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(syncPayload)
            });
            console.log('Profile synced with Supabase Postgres.');
          } catch (error) {
            console.error('Lỗi đồng bộ Supabase:', error);
          }
        }, 3000);
      };

      const set = (
        fn: GameState | Partial<GameState> | ((state: GameState) => GameState | Partial<GameState>),
        replace?: any
      ) => {
        originalSet((state: GameState) => {
          const nextState = typeof fn === 'function' ? (fn as Function)(state) : fn;
          const currentUser = nextState.currentUser !== undefined ? nextState.currentUser : state.currentUser;
          
          const extra: any = {};
          if (currentUser) {
            const activePlayer = nextState.player || state.player;
            const activePet = nextState.pet || state.pet;
            const activeStats = nextState.categoryStats || state.categoryStats;
            
            extra.profiles = { ...(nextState.profiles || state.profiles), [currentUser.id]: activePlayer };
            extra.petStates = { ...(nextState.petStates || state.petStates), [currentUser.id]: activePet };
            extra.categoryStatsAll = { ...(nextState.categoryStatsAll || state.categoryStatsAll), [currentUser.id]: activeStats };
          }
          return { ...nextState, ...extra };
        }, replace);
        triggerDebouncedSync();
      };
      // Helper to log audit trail
      const logActivity = (
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
          walletChanged: wallet
        };
        set(state => ({
          logs: [newLog, ...state.logs].slice(0, 200) // Keep last 200 logs
        }));
      };

      // Helper to process level up
      const checkLevelUp = (currentXp: number, currentLevel: number) => {
        let level = currentLevel;
        let xp = currentXp;
        
        // Define simple linear-exponential progression: next level costs Level * 200 XP
        while (xp >= level * 200) {
          xp -= level * 200;
          level += 1;
          logActivity('exercise', 'Thăng cấp!', `Con đã đạt Level ${level}!`, 50, 0, 0);
          eventBus.publish('PET_GROWTH', { levelUp: true });
        }
        return { level, xp };
      };

      return {
        // Initial States
        currentUser: null,
        player: INITIAL_PLAYER,
        questions: INITIAL_QUESTIONS,
        categoryStats: {},
        pet: INITIAL_PET,
        rewards: DEFAULT_REWARDS,
        challenges: INITIAL_CHALLENGES,
        dailyMission: null,
        logs: [],
        parentPIN: DEFAULT_PIN,
        activeCombo: 0,
        maxCombo: 0,

        // Profiles cache for multi-player
        profiles: {},
        petStates: {},
        categoryStatsAll: {},

        // Initialize listeners
        initEventSubscriptions: () => {
          const unsubQuestion = eventBus.subscribe('QUESTION_ANSWERED', (data: { questionId: string; category: string; isCorrect: boolean; difficulty: number; gameMode: string }) => {
            const { category, isCorrect } = data;
            
            // 1. Update Pet state
            set(state => {
              const petExpGained = isCorrect ? 15 : 3;
              let newPetXp = state.pet.exp + petExpGained;
              let newPetLevel = state.pet.level;
              let newPetStage = state.pet.stage;

              // Pet evolution milestones
              const expNeeded = newPetLevel * 150;
              if (newPetXp >= expNeeded) {
                newPetXp -= expNeeded;
                newPetLevel += 1;
              }

              if (newPetLevel >= 15) newPetStage = 'legend';
              else if (newPetLevel >= 8) newPetStage = 'dragon';
              else if (newPetLevel >= 3) newPetStage = 'baby';

              return {
                pet: {
                  ...state.pet,
                  level: newPetLevel,
                  exp: newPetXp,
                  stage: newPetStage,
                  mood: isCorrect ? 'happy' : state.pet.mood,
                  energy: Math.min(100, state.pet.energy + (isCorrect ? 2 : 0))
                }
              };
            });

            // 2. Update Challenges current progress
            set(state => {
              const updatedChallenges = state.challenges.map(ch => {
                if (ch.completed) return ch;

                let match = false;
                if (ch.type === 'daily' || ch.type === 'weekly' || ch.type === 'achievement') {
                  if (ch.id === 'ch-1' || ch.id === 'ch-4' || ch.id === 'ch-5' || ch.id === 'ch-6') {
                    // General question counters
                    match = true;
                  } else if (ch.id === 'ch-2' && (category === 'grammar' || category === 'passive-voice' || category === 'relative-clauses' || category === 'tenses')) {
                    // Grammar specific
                    match = isCorrect;
                  } else if (ch.id === 'ch-3' && isCorrect) {
                    // Handled separately below by matching the active combo count
                  }
                }

                if (match) {
                  const newCount = ch.currentCount + 1;
                  const isCompletedNow = newCount >= ch.targetCount;
                  if (isCompletedNow) {
                    // Publish reward
                    setTimeout(() => {
                      get().addEnergy(20);
                      set(prev => ({
                        player: {
                          ...prev.player,
                          coins: prev.player.coins + ch.rewardCoins,
                          xp: prev.player.xp + ch.rewardXP
                        }
                      }));
                      logActivity('challenge', 'Hoàn thành Thử thách', `Đã xong: ${ch.title}`, ch.rewardCoins, ch.rewardXP);
                    }, 10);
                  }
                  return {
                    ...ch,
                    currentCount: newCount,
                    completed: isCompletedNow
                  };
                }
                return ch;
              });

              return { challenges: updatedChallenges };
            });

            // Handled combo challenge
            if (isCorrect) {
              const combo = get().activeCombo;
              set(state => {
                const updatedChallenges = state.challenges.map(ch => {
                  if (ch.id === 'ch-3' && !ch.completed) {
                    const isCompletedNow = combo >= ch.targetCount;
                    if (isCompletedNow) {
                      setTimeout(() => {
                        get().addEnergy(20);
                        set(prev => ({
                          player: {
                            ...prev.player,
                            coins: prev.player.coins + ch.rewardCoins,
                            xp: prev.player.xp + ch.rewardXP
                          }
                        }));
                        logActivity('challenge', 'Hoàn thành Thử thách', `Đã xong: ${ch.title}`, ch.rewardCoins, ch.rewardXP);
                      }, 10);
                      return { ...ch, currentCount: combo, completed: true };
                    }
                    return { ...ch, currentCount: Math.max(ch.currentCount, combo) };
                  }
                  return ch;
                });
                return { challenges: updatedChallenges };
              });
            }

            // 3. Update Daily Mission requirements
            set(state => {
              if (!state.dailyMission || state.dailyMission.completed) return {};

              let updatedRequirements = state.dailyMission.requirements.map(req => {
                if (req.completed) return req;

                let match = false;
                if (req.type === 'count') {
                  match = true;
                } else if (req.type === 'category') {
                  if (req.description.includes('Grammar') && (category === 'grammar' || category === 'passive-voice' || category === 'relative-clauses' || category === 'tenses')) {
                    match = true;
                  } else if (req.description.includes('Reading') && (category === 'reading' || category === 'cloze')) {
                    match = true;
                  }
                }

                if (match) {
                  const newCurrent = req.current + 1;
                  return {
                    ...req,
                    current: newCurrent,
                    completed: newCurrent >= req.target
                  };
                }
                return req;
              });

              // Check accuracy constraint (accuracy calculated across this session)
              // If accuracy req exists, update its value based on historical records of the day.
              const allReqsDone = updatedRequirements.every(req => req.completed);
              
              if (allReqsDone && !state.dailyMission.completed) {
                // Mission completed
                setTimeout(() => {
                  set(prev => ({
                    player: {
                      ...prev.player,
                      walletVND: prev.player.walletVND + (state.dailyMission?.rewardVND || 0),
                      xp: prev.player.xp + (state.dailyMission?.rewardXP || 0)
                    }
                  }));
                  logActivity('box_open', 'Nhiệm vụ Ngày hoàn thành!', `Tiền thưởng nhiệm vụ +${state.dailyMission?.rewardVND.toLocaleString()}đ đã cộng vào ví`, 0, state.dailyMission?.rewardXP || 0, state.dailyMission?.rewardVND);
                }, 10);
              }

              return {
                dailyMission: {
                  ...state.dailyMission,
                  requirements: updatedRequirements,
                  completed: allReqsDone
                }
              };
            });
          });

          const unsubCheckIn = eventBus.subscribe('DAILY_CHECK_IN', (data: { streakBroken: boolean; penaltyApplied: boolean }) => {
            if (data.streakBroken) {
              set(state => ({
                player: {
                  ...state.player,
                  streak: 0,
                  coins: Math.max(0, state.player.coins - (data.penaltyApplied ? 50 : 0))
                },
                pet: {
                  ...state.pet,
                  mood: 'sad',
                  energy: Math.max(10, state.pet.energy - 30)
                }
              }));
              if (data.penaltyApplied) {
                logActivity('streak_penalty', 'Hụt Streak Học tập', 'Ba ngày lười biếng làm Pet buồn, trừ 50 NP bảo trì hệ thống!', -50, 0, 0);
              } else {
                logActivity('streak_penalty', 'Đứt chuỗi Streak', 'Chuỗi Streak học đã quay lại số 0!', 0, 0, 0);
              }
            }
          });

          // Subscribe to Supabase auth changes
          const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session && session.user) {
              const user: UserProfile = {
                id: session.user.id,
                name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
                email: session.user.email || '',
                avatar: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
              };
              
              const current = get().currentUser;
              if (!current || current.id !== user.id) {
                await get().login(user);
              }
            } else {
              const current = get().currentUser;
              if (current && !current.id.startsWith('mock-')) {
                get().logout();
              }
            }
          });

          return () => {
            unsubQuestion();
            unsubCheckIn();
            subscription.unsubscribe();
          };
        },

        // Auth Actions
        login: async (user) => {
          set({ currentUser: user });

          if (user.id.startsWith('mock-')) {
            set(state => {
              const newPlayer = state.profiles[user.id] || {
                id: user.id,
                name: user.name,
                role: 'student',
                level: 1,
                xp: 0,
                coins: 200,
                walletVND: 0,
                streak: 0,
                energy: 100,
                hearts: 3,
                lastActive: new Date().toISOString(),
                badges: []
              };

              const newPet = state.petStates[user.id] || {
                name: 'Rồng Con',
                stage: 'egg',
                level: 1,
                exp: 0,
                energy: 100,
                mood: 'neutral',
                lastFed: new Date().toISOString()
              };

              const newStats = state.categoryStatsAll[user.id] || {};

              return {
                player: newPlayer,
                pet: newPet,
                categoryStats: newStats
              };
            });
            logActivity('energy_refill', 'Đăng nhập thành công', `Chào mừng ${user.name} đã gia nhập CyberEnglish!`);
            return;
          }

          // Real Supabase login
          try {
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

            // Sync user details to backend pg first
            await fetch(`${backendUrl}/api/auth/sync-user`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });

            // Retrieve profile
            const res = await fetch(`${backendUrl}/api/profile`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            if (res.ok) {
              const data = await res.json();
              set({
                player: data.player || {
                  id: user.id,
                  name: user.name,
                  role: 'student',
                  level: 1,
                  xp: 0,
                  coins: 200,
                  walletVND: 0,
                  streak: 0,
                  energy: 100,
                  hearts: 3,
                  lastActive: new Date().toISOString(),
                  badges: []
                },
                pet: data.pet || {
                  name: 'Rồng Con',
                  stage: 'egg',
                  level: 1,
                  exp: 0,
                  energy: 100,
                  mood: 'neutral',
                  lastFed: new Date().toISOString()
                },
                categoryStats: data.categoryStats || {},
                logs: data.logs || [],
                rewards: data.rewards || [],
                challenges: data.challenges || INITIAL_CHALLENGES,
                dailyMission: data.dailyMission || null
              });
              logActivity('energy_refill', 'Đồng bộ Đám mây', `Tải dữ liệu học tập thành công cho ${user.name}!`);
            }
          } catch (e) {
            console.error('Lỗi khi tải thông tin từ backend Supabase:', e);
            // Fallback to local profile if offline
            set(state => {
              const newPlayer = state.profiles[user.id] || {
                id: user.id,
                name: user.name,
                role: 'student',
                level: 1,
                xp: 0,
                coins: 200,
                walletVND: 0,
                streak: 0,
                energy: 100,
                hearts: 3,
                lastActive: new Date().toISOString(),
                badges: []
              };
              return { player: newPlayer };
            });
          }
        },

        logout: async () => {
          await supabase.auth.signOut();
          set({
            currentUser: null,
            player: INITIAL_PLAYER,
            pet: INITIAL_PET,
            categoryStats: {},
            activeCombo: 0
          });
        },

        // Student Actions
        answerQuestion: (questionId, isCorrect, _timeSpent, gameMode) => {
          const state = get();
          const question = state.questions.find(q => q.id === questionId);
          if (!question) return { isCorrect: false, expGained: 0, coinsGained: 0, comboMultiplier: 1 };

          // 1. Update rolling category stats
          const category = question.category;
          const currentStat = state.categoryStats[category] || {
            category,
            totalAnswered: 0,
            totalCorrect: 0,
            rollingAccuracy: 1,
            recentResults: []
          };

          const newRecentResults = [...currentStat.recentResults, isCorrect].slice(-10); // Keep last 10
          const correctCount = newRecentResults.filter(Boolean).length;
          const rollingAccuracy = correctCount / newRecentResults.length;

          const updatedStats = {
            ...state.categoryStats,
            [category]: {
              category,
              totalAnswered: currentStat.totalAnswered + 1,
              totalCorrect: currentStat.totalCorrect + (isCorrect ? 1 : 0),
              rollingAccuracy,
              recentResults: newRecentResults
            }
          };

          // 2. Calculate rewards
          let expGained = 0;
          let coinsGained = 0;
          let newCombo = state.activeCombo;
          let comboMultiplier = 1.0;

          if (isCorrect) {
            newCombo += 1;
            
            // Set multipliers
            if (newCombo >= 30) comboMultiplier = 2.0;
            else if (newCombo >= 20) comboMultiplier = 1.5;
            else if (newCombo >= 10) comboMultiplier = 1.2;

            // Base scores adjusted by difficulty
            const baseXP = 15;
            const baseCoins = 5;
            const difficultyMultiplier = 1 + (question.difficulty - 1) * 0.1; // e.g. diff 10 gives 1.9x

            expGained = Math.round(baseXP * difficultyMultiplier * comboMultiplier);
            coinsGained = Math.round(baseCoins * difficultyMultiplier * comboMultiplier);

            // Apply streak multiplier to coins and XP
            const streakBonus = 1 + Math.min(1.0, state.player.streak * 0.1); // Max 2.0x (10 days streak)
            expGained = Math.round(expGained * streakBonus);
            coinsGained = Math.round(coinsGained * streakBonus);
          } else {
            newCombo = 0; // Combo resets
            
            // Deduct heart for Survival/Boss mode
            if (gameMode === 'survival' || gameMode === 'boss') {
              set(prev => ({
                player: {
                  ...prev.player,
                  hearts: Math.max(0, prev.player.hearts - 1)
                }
              }));
              logActivity('exercise', 'Mất 1 mạng!', `Trả lời sai câu hỏi ở chế độ ${gameMode}`, 0, 0, 0);
            }
          }

          const maxCombo = Math.max(state.maxCombo, newCombo);
          
          // Apply changes to player store
          const updatedXP = state.player.xp + expGained;
          const levelCheck = checkLevelUp(updatedXP, state.player.level);

          set({
            categoryStats: updatedStats,
            activeCombo: newCombo,
            maxCombo,
            player: {
              ...state.player,
              xp: levelCheck.xp,
              level: levelCheck.level,
              coins: state.player.coins + coinsGained,
              lastActive: new Date().toISOString()
            }
          });

          // Write activity log
          if (isCorrect) {
            logActivity(
              'exercise', 
              'Câu trả lời ĐÚNG', 
              `Đúng dạng [${question.category}] - Nhận +${coinsGained} NP / +${expGained} XP. Combo: ${newCombo}x`, 
              coinsGained, 
              expGained
            );
          } else {
            logActivity(
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
            isCorrect,
            difficulty: question.difficulty,
            gameMode
          });

          return { isCorrect, expGained, coinsGained, comboMultiplier };
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
          logActivity('energy_refill', 'Tiêu hao năng lượng', `Tiêu tốn ${amount} năng lượng khởi hành phụ bản.`);
          return true;
        },

        addEnergy: (amount) => {
          set(state => ({
            player: {
              ...state.player,
              energy: Math.min(100, state.player.energy + amount)
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

          logActivity('shop', 'Mua Khiên Bảo Vệ', 'Đã mua 1 Khiên bảo vệ Chuỗi Streak học tập', -cost, 0);
          return true;
        },

        buyHeart: () => {
          const state = get();
          const cost = 100;
          if (state.player.coins < cost || state.player.hearts >= 3) return false;

          set({
            player: {
              ...state.player,
              coins: state.player.coins - cost,
              hearts: Math.min(3, state.player.hearts + 1)
            }
          });

          logActivity('shop', 'Mua Mạng (Heart)', 'Đã hồi phục 1 mạng', -cost, 0);
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

          logActivity('shop', 'Mua Gợi Ý', 'Dùng 50 NP mua 1 gợi ý cứu trợ trong bài làm', -cost, 0);
          return true;
        },

        claimParentReward: (rewardId) => {
          const state = get();
          const reward = state.rewards.find(r => r.id === rewardId);
          if (!reward || reward.status !== 'pending' || state.player.coins < reward.costCoins) return false;

          set(prev => ({
            player: {
              ...prev.player,
              coins: prev.player.coins - reward.costCoins
            },
            rewards: prev.rewards.map(r => r.id === rewardId ? { ...r, status: 'approved' } : r)
          }));

          logActivity('shop', 'Yêu cầu Phần thưởng', `Đã quy đổi "${reward.title}" gửi cho Ba duyệt`, -reward.costCoins, 0);
          return true;
        },

        feedPet: () => {
          const state = get();
          if (state.pet.mood === 'happy' && state.pet.energy >= 100) return;

          set(prev => ({
            pet: {
              ...prev.pet,
              energy: Math.min(100, prev.pet.energy + 20),
              mood: 'happy',
              lastFed: new Date().toISOString()
            }
          }));

          logActivity('pet_interact', 'Cho thú nuôi ăn', 'Pet của con rất vui mừng và đầy năng lượng!');
        },

        spinWheel: () => {
          const state = get();
          // Simulating lucky rewards
          const rewardsOptions = [
            { type: 'coins', amount: 50, message: 'Nhận thêm +50 NP!' },
            { type: 'coins', amount: 100, message: 'Nhận thêm +100 NP!' },
            { type: 'energy', amount: 30, message: 'Hồi phục +30 Năng lượng!' },
            { type: 'wallet', amount: 5000, message: 'May mắn nhận 5.000đ từ Ví thưởng!' },
            { type: 'wallet', amount: 10000, message: 'Siêu cấp may mắn nhận 10.000đ từ Ví thưởng!' },
            { type: 'nothing', amount: 0, message: 'Gặp may mắn lần sau nhé con!' }
          ];

          const resultIndex = Math.floor(Math.random() * rewardsOptions.length);
          const spin = rewardsOptions[resultIndex];

          if (spin.type === 'coins') {
            set({ player: { ...state.player, coins: state.player.coins + spin.amount } });
            logActivity('box_open', 'Vòng Quay May Mắn', spin.message, spin.amount, 0);
          } else if (spin.type === 'energy') {
            get().addEnergy(spin.amount);
            logActivity('box_open', 'Vòng Quay May Mắn', spin.message, 0, 0);
          } else if (spin.type === 'wallet') {
            set({ player: { ...state.player, walletVND: state.player.walletVND + spin.amount } });
            logActivity('box_open', 'Vòng Quay May Mắn', spin.message, 0, 0, spin.amount);
          }

          return { rewardType: spin.type, amount: spin.amount, message: spin.message };
        },

        openMysteryBox: () => {
          const state = get();
          const boxRewards = [
            { type: 'wallet', amount: 5000, message: 'Nhận ngay 5.000đ vào Ví thưởng!' },
            { type: 'wallet', amount: 10000, message: 'Nhận ngay 10.000đ vào Ví thưởng!' },
            { type: 'coins', amount: 150, message: 'Nhận gói +150 NP!' },
            { type: 'shield', amount: 1, message: 'Nhận được 1 Khiên bảo vệ Streak!' },
            { type: 'empty', amount: 0, message: 'Rương trống rỗng, chúc con may mắn lần sau!' }
          ];

          const index = Math.floor(Math.random() * boxRewards.length);
          const reward = boxRewards[index];

          if (reward.type === 'wallet') {
            set({ player: { ...state.player, walletVND: state.player.walletVND + reward.amount } });
            logActivity('box_open', 'Mở Hòm Bí Mật', reward.message, 0, 0, reward.amount);
          } else if (reward.type === 'coins') {
            set({ player: { ...state.player, coins: state.player.coins + reward.amount } });
            logActivity('box_open', 'Mở Hòm Bí Mật', reward.message, reward.amount, 0);
          } else if (reward.type === 'shield') {
            const hasShield = state.player.badges.includes('Streak Shield');
            if (!hasShield) {
              set({ player: { ...state.player, badges: [...state.player.badges, 'Streak Shield'] } });
            }
            logActivity('box_open', 'Mở Hòm Bí Mật', reward.message, 0, 0);
          }

          return { rewardType: reward.type, amount: reward.amount, message: reward.message };
        },

        // Parent Actions
        verifyPIN: (pin) => {
          return get().parentPIN === pin;
        },

        changePIN: (newPIN) => {
          set({ parentPIN: newPIN });
        },

        approveReward: (rewardId) => {
          const state = get();
          const reward = state.rewards.find(r => r.id === rewardId);
          if (!reward) return;

          set(prev => ({
            rewards: prev.rewards.map(r => r.id === rewardId ? { ...r, status: 'claimed' } : r)
          }));

          logActivity('parent_approve', 'Ba duyệt Phần thưởng', `Đã duyệt hoàn thành quà tặng: "${reward.title}"`, 0, 0, -reward.cashValueVND);
        },

        rejectReward: (rewardId) => {
          const state = get();
          const reward = state.rewards.find(r => r.id === rewardId);
          if (!reward) return;

          set(prev => ({
            player: {
              ...prev.player,
              coins: prev.player.coins + reward.costCoins
            },
            rewards: prev.rewards.map(r => r.id === rewardId ? { ...r, status: 'pending' } : r) // Revert status
          }));

          logActivity('parent_approve', 'Ba hoàn trả Coins', `Từ chối quà tặng: "${reward.title}". Đã hoàn lại ${reward.costCoins} NP cho con`, reward.costCoins, 0);
        },

        addParentReward: (title, costCoins, cashValueVND) => {
          const newReward: ParentReward = {
            id: `r-${Date.now()}`,
            title,
            costCoins,
            cashValueVND,
            status: 'pending',
            timestamp: Date.now()
          };
          set(state => ({
            rewards: [...state.rewards, newReward]
          }));
          logActivity('parent_approve', 'Ba thêm Quà mới', `Quà mới: "${title}" trị giá ${costCoins} NP`, 0, 0);
        },

        importQuestions: (importedQuestions) => {
          set(state => {
            // Filter duplicates by checking prompts/ids
            const filteredNew = importedQuestions.filter(newQ => 
              !state.questions.some(existingQ => existingQ.prompt === newQ.prompt)
            );
            return {
              questions: [...state.questions, ...filteredNew]
            };
          });
          logActivity('parent_approve', 'Ba nhập Đề thi mới', `Thêm thành công ${importedQuestions.length} câu hỏi vào Kho đề.`, 0, 0);
        },

        deleteQuestion: (questionId) => {
          set(state => ({
            questions: state.questions.filter(q => q.id !== questionId)
          }));
          logActivity('parent_approve', 'Xóa câu hỏi', `Ba đã xóa câu hỏi mã số ${questionId}`, 0, 0);
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
          logActivity('parent_approve', 'Khởi tạo lại tiến độ', 'Ba đã reset toàn bộ tiến độ của con học sinh.', 0, 0);
        },

        // System Resets
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
          let penaltyApplied = false;

          if (diffDays === 1) {
            // Streak continued!
            newStreak += 1;
            logActivity('exercise', 'Duy trì Streak học tập!', `Chuỗi học liên tục tăng lên ${newStreak} ngày!`, 0, 0);
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
              logActivity('shop', 'Kích hoạt Khiên bảo vệ', 'Khiên chắn tự động nổ tung để bảo vệ chuỗi Streak học của con!', 0, 0);
            } else {
              streakBroken = true;
              newStreak = 0;
              if (diffDays >= 3) {
                penaltyApplied = true;
              }
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
            rewardVND: 20000,
            rewardXP: 250,
            completed: false
          };

          set({
            dailyMission: customMission,
            activeCombo: 0,
            player: {
              ...state.player,
              streak: newStreak,
              energy: 100, // Refill energy daily
              hearts: 3, // Refill hearts daily
              lastActive: new Date().toISOString()
            },
            challenges: state.challenges.map(ch => 
              ch.type === 'daily' ? { ...ch, currentCount: 0, completed: false } : ch
            )
          });

          eventBus.publish('DAILY_CHECK_IN', { streakBroken, penaltyApplied });
        },

        // Adaptive Selection Logic
        getAdaptiveQuestion: (category) => {
          const state = get();
          const list = state.questions.filter(q => q.category === category);
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

          // Random pick from final pool
          return finalPool[Math.floor(Math.random() * finalPool.length)];
        },

        getQuestionByWeight: (mode) => {
          const state = get();
          const categoriesPool: string[] = [];

          if (mode === 'grammar') {
            categoriesPool.push('grammar', 'passive-voice', 'relative-clauses', 'tenses');
          } else if (mode === 'reading') {
            categoriesPool.push('reading', 'cloze');
          } else if (mode === 'vocabulary') {
            categoriesPool.push('vocabulary', 'wordform');
          } else {
            categoriesPool.push('grammar', 'passive-voice', 'relative-clauses', 'tenses', 'reading', 'cloze', 'vocabulary', 'wordform', 'pronunciation', 'stress');
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
        }
      };
    },
    {
      name: 'cyber-english-state', // LocalStorage Key
      partialize: (state) => ({
        currentUser: state.currentUser,
        player: state.player,
        questions: state.questions,
        categoryStats: state.categoryStats,
        pet: state.pet,
        rewards: state.rewards,
        challenges: state.challenges,
        dailyMission: state.dailyMission,
        logs: state.logs,
        parentPIN: state.parentPIN,
        maxCombo: state.maxCombo,
        profiles: state.profiles,
        petStates: state.petStates,
        categoryStatsAll: state.categoryStatsAll
      })
    }
  )
);
