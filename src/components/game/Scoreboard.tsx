import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Trophy, Flame, ArrowRight, RotateCcw, Home } from 'lucide-react';
import { XPBar } from './XPBar';
import { type RoundResult, type ChallengeResult } from './GameRound';
import { loadProgress } from '@/lib/gameUtils';
import { isDialogue, type PhraseContent } from '@/data/content';

interface ScoreboardProps {
  result: RoundResult;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const Scoreboard = ({ result, onPlayAgain, onGoHome }: ScoreboardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = loadProgress();
  
  const correctCount = result.challenges.filter(c => c.isCorrect).length;
  const incorrectChallenges = result.challenges.filter(c => !c.isCorrect);
  
  // Remove duplicates from incorrect challenges (by content id)
  const uniqueIncorrect = incorrectChallenges.reduce((acc, challenge) => {
    const contentId = challenge.content.id;
    if (!acc.some(c => c.content.id === contentId)) {
      acc.push(challenge);
    }
    return acc;
  }, [] as ChallengeResult[]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.1,
          ease: 'back.out(1.7)' 
        }
      );
    }
  }, []);

  const getTextFromContent = (challenge: ChallengeResult): string => {
    if (isDialogue(challenge.content)) {
      // Only show first line for dialogues
      return challenge.content.dialogue[0].text;
    }
    return (challenge.content as PhraseContent).text;
  };

  return (
    <div
      ref={containerRef}
      className="p-4 sm:p-6 flex flex-col min-h-[calc(100vh-60px)] animate-fade-in w-full max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex p-4 rounded-full bg-primary/20 mb-4">
          <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {correctCount > 0 ? 'Atividade Completa!' : 'Continue Praticando!'}
        </h1>
        <p className="text-muted-foreground">
          {correctCount > 0 ? 'Você acertou!' : 'Tente novamente para melhorar'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
        <div className="bg-card rounded-2xl p-4 text-center">
          <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">+{result.totalXP}</div>
          <div className="text-xs sm:text-sm text-muted-foreground">XP Ganho</div>
        </div>
        <div className="bg-card rounded-2xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-bold text-warning mb-1">
            <Flame className="w-5 h-5 sm:w-6 sm:h-6" />
            {progress.currentStreak}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">Dias seguidos</div>
        </div>
      </div>

      {/* Total XP Progress */}
      <div className="mb-6">
        <XPBar totalXP={progress.totalXP} />
      </div>

      {/* Mistakes Review - Limited height with scroll */}
      {uniqueIncorrect.length > 0 && (
        <div className="mb-6 flex-shrink-0">
          <h2 className="text-lg font-semibold text-foreground mb-3">Para revisar:</h2>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {uniqueIncorrect.slice(0, 3).map((challenge, idx) => (
              <div
                key={`${challenge.content.id}-${idx}`}
                className="bg-warning/10 border border-warning/30 rounded-xl p-3"
              >
                <p className="text-sm text-foreground mb-1 line-clamp-1">
                  {getTextFromContent(challenge)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Você disse: "{challenge.spoken || '(nada)'}" • {Math.round(challenge.accuracy)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions - Always visible at bottom */}
      <div className="mt-auto space-y-3 pb-4">
        <button
          onClick={onPlayAgain}
          className="w-full py-3 sm:py-4 px-6 bg-primary hover:bg-primary/90 rounded-xl font-semibold text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Próxima Atividade
        </button>
        <button
          onClick={onGoHome}
          className="w-full py-3 sm:py-4 px-6 bg-secondary hover:bg-secondary/80 rounded-xl font-semibold text-secondary-foreground transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Menu Principal
        </button>
      </div>
    </div>
  );
};
