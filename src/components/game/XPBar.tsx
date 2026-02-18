import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { getXPLevel } from '@/lib/gameUtils';

interface XPBarProps {
  totalXP: number;
  showLevel?: boolean;
}

export const XPBar = ({ totalXP, showLevel = true }: XPBarProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const { level, progress, nextLevelXP } = getXPLevel(totalXP);

  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, {
        width: `${progress}%`,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      });
    }
  }, [progress]);

  return (
    <div className="w-full">
      {showLevel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-foreground">
            Nível {level}
          </span>
          <span className="text-xs text-muted-foreground">
            {totalXP} / {nextLevelXP} XP
          </span>
        </div>
      )}
      <div className="xp-bar">
        <div
          ref={barRef}
          className="xp-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
