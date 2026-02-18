import { X, Check, Minus } from 'lucide-react';
import { type LevelProgress } from '@/lib/gameUtils';

interface ActivitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectActivity: (activityId: number) => void;
  levelProgress: LevelProgress;
  levelTitle: string;
}

export const ActivitySelectorModal = ({
  isOpen,
  onClose,
  onSelectActivity,
  levelProgress,
  levelTitle,
}: ActivitySelectorModalProps) => {
  if (!isOpen) return null;

  const activities = Array.from({ length: 50 }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-card rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col border border-border shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">{levelTitle}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {levelProgress.completed} de {levelProgress.total} completas
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Activities Grid */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {activities.map((activityId) => {
              const activity = levelProgress.activities[activityId];
              const isCompleted = activity?.completed || false;
              const isStarted = activity?.started || false;

              let bgClass = 'bg-muted/50 border-2 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground';
              let iconContent: React.ReactNode = <span>{activityId}</span>;

              if (isCompleted) {
                bgClass = 'bg-blue-500/20 border-2 border-blue-500 text-blue-400';
                iconContent = <Check className="w-5 h-5" />;
              } else if (isStarted) {
                bgClass = 'bg-amber-500/20 border-2 border-amber-500 text-amber-400';
                iconContent = <Minus className="w-5 h-5" />;
              }

              return (
                <button
                  key={activityId}
                  onClick={() => onSelectActivity(activityId)}
                  className={`
                    relative aspect-square rounded-xl flex items-center justify-center
                    text-sm font-bold transition-all duration-200 hover:scale-105
                    ${bgClass}
                  `}
                  title={
                    isCompleted 
                      ? `Completa - ${Math.round(activity?.bestAccuracy || 0)}%` 
                      : isStarted 
                        ? `Em andamento - ${activity?.phrasesCompleted || 0}/10 frases`
                        : 'Não iniciada'
                  }
                >
                  {iconContent}
                  
                  {(isCompleted || isStarted) && (
                    <span className={`absolute -bottom-1 -right-1 text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold ${
                      isCompleted ? 'bg-blue-500 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {activityId}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Legend */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500/20 border border-blue-500" />
              <span>Completa</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-amber-500/20 border border-amber-500" />
              <span>Em andamento</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted/50 border border-border" />
              <span>Pendente</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
