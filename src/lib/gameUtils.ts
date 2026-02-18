// Hooks and utilities for the game

export interface ActivityProgress {
  completed: boolean;
  started: boolean;
  bestAccuracy: number;
  phrasesCompleted: number; // 0-10
}

export interface LevelProgress {
  activities: Record<number, ActivityProgress>; // 1-50
  completed: number;
  total: number;
}

export interface GameProgress {
  totalXP: number;
  playerLevel: number;
  currentStreak: number;
  lastPlayedDate: string | null;
  phrasesProgress: {
    easy: LevelProgress;
    medium: LevelProgress;
    advanced: LevelProgress;
  };
  dialoguesProgress: {
    easy: LevelProgress;
    medium: LevelProgress;
    advanced: LevelProgress;
  };
  dailyChallengeCompleted: boolean;
  dailyChallengeDate: string | null;
}

const STORAGE_KEY = 'englishsolo_progress';
const XP_PER_LEVEL = 500;

const createDefaultLevelProgress = (): LevelProgress => ({
  activities: {},
  completed: 0,
  total: 50,
});

const defaultProgress: GameProgress = {
  totalXP: 0,
  playerLevel: 1,
  currentStreak: 0,
  lastPlayedDate: null,
  phrasesProgress: {
    easy: createDefaultLevelProgress(),
    medium: createDefaultLevelProgress(),
    advanced: createDefaultLevelProgress(),
  },
  dialoguesProgress: {
    easy: createDefaultLevelProgress(),
    medium: createDefaultLevelProgress(),
    advanced: createDefaultLevelProgress(),
  },
  dailyChallengeCompleted: false,
  dailyChallengeDate: null,
};

const getTodayDate = (): string => new Date().toISOString().split('T')[0];

const getYesterdayDate = (): string => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
};

export const calculateLevel = (totalXP: number): number => {
  return Math.floor(totalXP / XP_PER_LEVEL) + 1;
};

const migrateProgress = (stored: any): GameProgress => {
  const progress = { ...defaultProgress };
  
  if (stored.totalXP !== undefined) progress.totalXP = stored.totalXP;
  if (stored.currentStreak !== undefined) progress.currentStreak = stored.currentStreak;
  if (stored.lastPlayedDate !== undefined) progress.lastPlayedDate = stored.lastPlayedDate;
  if (stored.dailyChallengeCompleted !== undefined) progress.dailyChallengeCompleted = stored.dailyChallengeCompleted;
  if (stored.dailyChallengeDate !== undefined) progress.dailyChallengeDate = stored.dailyChallengeDate;
  
  // Migrate phrasesProgress
  if (stored.phrasesProgress) {
    if (stored.phrasesProgress.easy) progress.phrasesProgress.easy = stored.phrasesProgress.easy;
    if (stored.phrasesProgress.medium) progress.phrasesProgress.medium = stored.phrasesProgress.medium;
    if (stored.phrasesProgress.advanced) progress.phrasesProgress.advanced = stored.phrasesProgress.advanced;
  }
  
  // Migrate dialoguesProgress
  if (stored.dialoguesProgress) {
    if (stored.dialoguesProgress.easy) progress.dialoguesProgress.easy = stored.dialoguesProgress.easy;
    if (stored.dialoguesProgress.medium) progress.dialoguesProgress.medium = stored.dialoguesProgress.medium;
    if (stored.dialoguesProgress.advanced) progress.dialoguesProgress.advanced = stored.dialoguesProgress.advanced;
  }
  
  progress.playerLevel = calculateLevel(progress.totalXP);
  return progress;
};

export const loadProgress = (): GameProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const progress = migrateProgress(parsed);
      
      const today = getTodayDate();
      const yesterday = getYesterdayDate();
      
      if (progress.lastPlayedDate) {
        if (progress.lastPlayedDate !== today && progress.lastPlayedDate !== yesterday) {
          progress.currentStreak = 0;
        }
      }
      
      if (progress.dailyChallengeDate !== today) {
        progress.dailyChallengeCompleted = false;
      }
      
      return progress;
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }
  return { ...defaultProgress };
};

export const saveProgress = (progress: GameProgress): void => {
  try {
    progress.playerLevel = calculateLevel(progress.totalXP);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const markActivityCompleted = (
  progress: GameProgress,
  mode: 'phrases' | 'dialogues',
  level: 'easy' | 'medium' | 'advanced',
  activityId: number,
  accuracy: number,
  phrasesCompleted: number = 10,
  fullyCompleted: boolean = true
): GameProgress => {
  const newProgress = { ...progress };
  const progressMap = mode === 'phrases' ? newProgress.phrasesProgress : newProgress.dialoguesProgress;
  const levelProgress = progressMap[level];
  
  const currentActivity = levelProgress.activities[activityId];
  
  if (fullyCompleted) {
    // Only mark as completed if all 10 phrases passed
    if (!currentActivity || accuracy > currentActivity.bestAccuracy) {
      levelProgress.activities[activityId] = {
        completed: true,
        started: true,
        bestAccuracy: accuracy,
        phrasesCompleted: 10,
      };
    }
  } else {
    // Mark as started/in-progress
    levelProgress.activities[activityId] = {
      completed: false,
      started: true,
      bestAccuracy: currentActivity ? Math.max(currentActivity.bestAccuracy, accuracy) : accuracy,
      phrasesCompleted: currentActivity 
        ? Math.max(currentActivity.phrasesCompleted, phrasesCompleted)
        : phrasesCompleted,
    };
  }
  
  // Recalculate completed count
  levelProgress.completed = Object.values(levelProgress.activities).filter(a => a.completed).length;
  
  return newProgress;
};

export const getLevelProgress = (
  progress: GameProgress,
  mode: 'phrases' | 'dialogues',
  level: 'easy' | 'medium' | 'advanced'
): LevelProgress => {
  const progressMap = mode === 'phrases' ? progress.phrasesProgress : progress.dialoguesProgress;
  return progressMap[level];
};

export const updateStreak = (progress: GameProgress): GameProgress => {
  const today = getTodayDate();
  const yesterday = getYesterdayDate();
  const lastPlayed = progress.lastPlayedDate;

  if (lastPlayed === today) return progress;
  if (lastPlayed === yesterday) {
    return { ...progress, currentStreak: progress.currentStreak + 1, lastPlayedDate: today };
  }
  return { ...progress, currentStreak: 1, lastPlayedDate: today };
};

export const addXP = (progress: GameProgress, xpToAdd: number): GameProgress => {
  const newTotalXP = progress.totalXP + xpToAdd;
  return { ...progress, totalXP: newTotalXP, playerLevel: calculateLevel(newTotalXP) };
};

export const calculateXP = (
  accuracy: number,
  responseTime: number,
  consecutiveCorrect: number,
  isDailyChallenge: boolean
): number => {
  let baseXP = Math.round(accuracy / 10);
  const speedBonus = Math.max(0, Math.round(5 - (responseTime / 1000)));
  const streakMultiplier = consecutiveCorrect >= 5 ? 1.2 : 1;
  const dailyMultiplier = isDailyChallenge ? 1.25 : 1;
  return Math.round((baseXP + speedBonus) * streakMultiplier * dailyMultiplier);
};

export { calculateAccuracyAdvanced as calculateAccuracy } from './speechUtils';

export const getXPLevel = (totalXP: number): { level: number; progress: number; nextLevelXP: number } => {
  const level = calculateLevel(totalXP);
  const currentLevelXP = (level - 1) * XP_PER_LEVEL;
  const progress = ((totalXP - currentLevelXP) / XP_PER_LEVEL) * 100;
  return { level, progress, nextLevelXP: level * XP_PER_LEVEL };
};

export const formatTime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes > 0) return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  return `${seconds}s`;
};
