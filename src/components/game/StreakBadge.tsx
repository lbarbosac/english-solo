import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  streak: number;
}

export const StreakBadge = ({ streak }: StreakBadgeProps) => {
  return (
    <div className="streak-badge">
      <Flame className="w-5 h-5" />
      <span>{streak} {streak === 1 ? 'dia' : 'dias'}</span>
    </div>
  );
};
