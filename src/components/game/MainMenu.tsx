import { useState, useEffect } from 'react';
import { BookOpen, MessageCircle, Zap, Trophy } from 'lucide-react';
import { Header } from './Header';
import { XPBar } from './XPBar';
import { GameCard } from './GameCard';
import { LevelSelector } from './LevelSelector';
import { ActivitySelectorModal } from './ActivitySelectorModal';
import { GameRound, type RoundResult } from './GameRound';
import { Scoreboard } from './Scoreboard';
import { useNavigation, type GameScreen } from '@/hooks/useNavigation';
import { loadProgress, getLevelProgress, type GameProgress, type LevelProgress } from '@/lib/gameUtils';

export const MainMenu = () => {
  const { gameState, navigate, goBack } = useNavigation({ screen: 'menu' });
  const [progress, setProgress] = useState<GameProgress>(loadProgress());
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'phrases' | 'dialogues'>('phrases');
  const [selectedLevel, setSelectedLevel] = useState<'easy' | 'medium' | 'advanced'>('easy');

  useEffect(() => {
    if (gameState.screen === 'menu') {
      setProgress(loadProgress());
    }
  }, [gameState.screen]);

  useEffect(() => {
    const handleStorage = () => setProgress(loadProgress());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleSelectMode = (mode: 'phrases' | 'dialogues') => {
    setSelectedMode(mode);
    navigate({ screen: 'levelSelect', mode });
  };

  const handleSelectLevel = (level: 'easy' | 'medium' | 'advanced') => {
    setSelectedLevel(level);
    setShowActivityModal(true);
  };

  const handleSelectActivity = (activityId: number) => {
    setShowActivityModal(false);
    navigate({ 
      screen: 'playing', 
      level: selectedLevel, 
      isDailyChallenge: false,
      activityId,
      mode: selectedMode,
    });
  };

  const handleDailyChallenge = () => {
    navigate({ screen: 'playing', level: 'medium', isDailyChallenge: true, mode: 'phrases' });
  };

  const handleRoundComplete = (result: RoundResult) => {
    navigate({ screen: 'scoreboard', result });
  };

  const handleGoHome = () => {
    navigate({ screen: 'menu' });
  };

  const handlePlayAgain = () => {
    if (gameState.screen === 'scoreboard') {
      const r = gameState.result;
      navigate({ 
        screen: 'playing', 
        level: r.level, 
        isDailyChallenge: false,
        mode: r.mode || 'phrases',
      });
    }
  };

  const getPhrasesCompleted = () => {
    return progress.phrasesProgress.easy.completed + 
           progress.phrasesProgress.medium.completed + 
           progress.phrasesProgress.advanced.completed;
  };

  const getDialoguesCompleted = () => {
    return progress.dialoguesProgress.easy.completed + 
           progress.dialoguesProgress.medium.completed + 
           progress.dialoguesProgress.advanced.completed;
  };

  const getCurrentLevelProgress = (): LevelProgress => {
    return getLevelProgress(progress, selectedMode, selectedLevel);
  };

  const today = new Date().toISOString().split('T')[0];
  const isDailyChallengeAvailable = 
    !progress.dailyChallengeCompleted || 
    progress.dailyChallengeDate !== today;

  switch (gameState.screen) {
    case 'levelSelect':
      return (
        <div className="min-h-screen bg-background">
          <Header showBack onBack={goBack} />
          <LevelSelector
            mode={gameState.mode}
            onSelectLevel={handleSelectLevel}
            onBack={goBack}
            progress={gameState.mode === 'phrases' ? progress.phrasesProgress : progress.dialoguesProgress}
          />
          <ActivitySelectorModal
            isOpen={showActivityModal}
            onClose={() => setShowActivityModal(false)}
            onSelectActivity={handleSelectActivity}
            levelProgress={getCurrentLevelProgress()}
            levelTitle={`${gameState.mode === 'phrases' ? 'Frases' : 'Diálogos'} - ${
              selectedLevel === 'easy' ? 'Fácil' : selectedLevel === 'medium' ? 'Médio' : 'Avançado'
            }`}
          />
        </div>
      );

    case 'playing':
      return (
        <div className="min-h-screen bg-background">
          <Header showBack onBack={goBack} />
          <GameRound
            level={gameState.level}
            isDailyChallenge={gameState.isDailyChallenge}
            activityId={gameState.activityId}
            mode={gameState.mode}
            onComplete={handleRoundComplete}
            onBack={goBack}
          />
        </div>
      );

    case 'scoreboard':
      return (
        <div className="min-h-screen bg-background">
          <Header />
          <Scoreboard
            result={gameState.result}
            onPlayAgain={handlePlayAgain}
            onGoHome={handleGoHome}
          />
        </div>
      );

    default:
      return (
        <div className="min-h-screen bg-background">
          <Header title="EnglishSolo" />
          
          <div className="p-4 sm:p-6 safe-bottom w-full max-w-4xl mx-auto">
            <section className="mb-6 sm:mb-8 animate-fade-in">
              <XPBar totalXP={progress.totalXP} />
            </section>

            <section className="mb-6 sm:mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <GameCard
                title="Desafio Diário"
                description={
                  isDailyChallengeAvailable
                    ? "Complete para ganhar XP bônus!"
                    : "Concluído! Volte amanhã."
                }
                icon={<Zap className="w-6 h-6 text-foreground" />}
                onClick={isDailyChallengeAvailable ? handleDailyChallenge : () => {}}
                highlight={isDailyChallengeAvailable}
              />
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-muted-foreground mb-4">
                Modos de Prática
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <GameCard
                    title="Frases"
                    description="Pratique frases do dia a dia"
                    icon={<BookOpen className="w-6 h-6 text-foreground" />}
                    progress={{ completed: getPhrasesCompleted(), total: 150 }}
                    onClick={() => handleSelectMode('phrases')}
                  />
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                  <GameCard
                    title="Diálogos"
                    description="Conversas reais interativas"
                    icon={<MessageCircle className="w-6 h-6 text-foreground" />}
                    progress={{ completed: getDialoguesCompleted(), total: 150 }}
                    onClick={() => handleSelectMode('dialogues')}
                  />
                </div>
              </div>
            </section>

            <section className="mt-6 sm:mt-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="bg-card rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Seu Progresso</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Frases</h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-xl font-bold text-foreground">{progress.phrasesProgress.easy.completed}</div>
                        <div className="text-xs text-muted-foreground">Fácil</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-foreground">{progress.phrasesProgress.medium.completed}</div>
                        <div className="text-xs text-muted-foreground">Médio</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-foreground">{progress.phrasesProgress.advanced.completed}</div>
                        <div className="text-xs text-muted-foreground">Avançado</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Diálogos</h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-xl font-bold text-foreground">{progress.dialoguesProgress.easy.completed}</div>
                        <div className="text-xs text-muted-foreground">Fácil</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-foreground">{progress.dialoguesProgress.medium.completed}</div>
                        <div className="text-xs text-muted-foreground">Médio</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-foreground">{progress.dialoguesProgress.advanced.completed}</div>
                        <div className="text-xs text-muted-foreground">Avançado</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      );
  }
};
