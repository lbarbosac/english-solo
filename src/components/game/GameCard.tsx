import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronRight } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress?: { completed: number; total: number };
  onClick: () => void;
  highlight?: boolean;
}

export const GameCard = ({
  title,
  description,
  icon,
  progress,
  onClick,
  highlight = false,
}: GameCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`${highlight ? 'game-card-highlight' : 'game-card'} cursor-pointer`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-background/20">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
            <p className="text-sm text-foreground/70 mt-1">{description}</p>
          </div>
        </div>
        <ChevronRight className="w-6 h-6 text-foreground/50" />
      </div>
      
      {progress && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-foreground/60 mb-1">
            <span>Progresso</span>
            <span>{progress.completed}/{progress.total}</span>
          </div>
          <div className="h-2 bg-background/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-success rounded-full transition-all duration-500"
              style={{ width: `${(progress.completed / progress.total) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
