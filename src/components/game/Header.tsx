import { ArrowLeft, Flame } from 'lucide-react';
import { loadProgress, calculateLevel } from '@/lib/gameUtils';
import { useEffect, useState } from 'react';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

export const Header = ({ showBack = false, onBack, title }: HeaderProps) => {
  const [progress, setProgress] = useState(() => loadProgress());

  // Reload progress when component mounts or becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setProgress(loadProgress());
      }
    };

    const handleStorageChange = () => {
      setProgress(loadProgress());
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('storage', handleStorageChange);
    
    // Also set up interval to check for updates
    const interval = setInterval(() => {
      setProgress(loadProgress());
    }, 1000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const level = calculateLevel(progress.totalXP);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50 px-4 py-3 safe-top">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {/* Left: Back button or title */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {showBack && onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Voltar</span>
            </button>
          )}
          {title && !showBack && (
            <h1 className="text-lg font-bold text-foreground truncate">{title}</h1>
          )}
        </div>

        {/* Right: Level and Streak */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Level Badge */}
          <div className="flex items-center gap-1.5 bg-primary/20 px-3 py-1 rounded-full">
            <span className="text-sm font-semibold text-primary">Nível {level}</span>
          </div>

          {/* Streak Badge */}
          <div className="streak-badge">
            <Flame className="w-4 h-4" />
            <span className="text-sm font-medium">
              {progress.currentStreak} {progress.currentStreak === 1 ? 'dia' : 'dias'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
