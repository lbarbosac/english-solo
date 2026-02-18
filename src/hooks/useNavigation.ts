import { useState, useEffect, useCallback } from 'react';

export type GameScreen = 
  | { screen: 'menu' }
  | { screen: 'levelSelect'; mode: 'phrases' | 'dialogues' }
  | { screen: 'playing'; level: 'easy' | 'medium' | 'advanced'; isDailyChallenge: boolean; activityId?: number; mode: 'phrases' | 'dialogues' }
  | { screen: 'scoreboard'; result: any };

interface UseNavigationReturn {
  gameState: GameScreen;
  navigate: (newState: GameScreen) => void;
  goBack: () => void;
}

const HISTORY_KEY = 'englishsolo_nav_history';

export const useNavigation = (initialState: GameScreen = { screen: 'menu' }): UseNavigationReturn => {
  const [gameState, setGameState] = useState<GameScreen>(() => {
    try {
      const stored = sessionStorage.getItem(HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.current || initialState;
      }
    } catch (e) {
      console.error('Error loading navigation state:', e);
    }
    return initialState;
  });

  const saveState = useCallback((state: GameScreen) => {
    try {
      sessionStorage.setItem(HISTORY_KEY, JSON.stringify({ current: state }));
    } catch (e) {
      console.error('Error saving navigation state:', e);
    }
  }, []);

  const navigate = useCallback((newState: GameScreen) => {
    const stateKey = `${newState.screen}-${Date.now()}`;
    window.history.pushState(
      { gameState: newState, key: stateKey },
      '',
      `#${newState.screen}`
    );
    setGameState(newState);
    saveState(newState);
  }, [saveState]);

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.gameState) {
        setGameState(event.state.gameState);
        saveState(event.state.gameState);
      } else {
        setGameState({ screen: 'menu' });
        saveState({ screen: 'menu' });
      }
    };

    if (!window.history.state?.gameState) {
      window.history.replaceState(
        { gameState: gameState, key: 'initial' },
        '',
        window.location.hash || '#menu'
      );
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [gameState, saveState]);

  return { gameState, navigate, goBack };
};
