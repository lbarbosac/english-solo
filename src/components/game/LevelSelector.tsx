import { BookOpen, MessageCircle } from 'lucide-react';
import { type LevelProgress } from '@/lib/gameUtils';

type GameMode = 'phrases' | 'dialogues';

interface LevelSelectorProps {
  mode: GameMode;
  onSelectLevel: (level: 'easy' | 'medium' | 'advanced') => void;
  onBack: () => void;
  progress: {
    easy: LevelProgress;
    medium: LevelProgress;
    advanced: LevelProgress;
  };
}

export const LevelSelector = ({
  mode,
  onSelectLevel,
  onBack,
  progress,
}: LevelSelectorProps) => {
  const levels = [
    {
      key: 'easy' as const,
      title: 'Fácil',
      description: mode === 'phrases' ? 'Frases curtas e simples' : 'Diálogos simples do dia a dia',
      color: 'from-green-500/20 to-green-600/20 border-green-500/30',
      progress: progress.easy,
    },
    {
      key: 'medium' as const,
      title: 'Médio',
      description: mode === 'phrases' ? 'Frases compostas' : 'Diálogos intermediários',
      color: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
      progress: progress.medium,
    },
    {
      key: 'advanced' as const,
      title: 'Avançado',
      description: mode === 'phrases' ? 'Frases complexas e formais' : 'Diálogos avançados e profissionais',
      color: 'from-red-500/20 to-red-600/20 border-red-500/30',
      progress: progress.advanced,
    },
  ];

  return (
    <div className="p-4 sm:p-6 animate-fade-in w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-primary/20">
          {mode === 'phrases' ? (
            <BookOpen className="w-8 h-8 text-primary-foreground" />
          ) : (
            <MessageCircle className="w-8 h-8 text-primary-foreground" />
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {mode === 'phrases' ? 'Frases' : 'Diálogos'}
          </h1>
          <p className="text-muted-foreground">Escolha o nível de dificuldade</p>
        </div>
      </div>

      <div className="space-y-4">
        {levels.map((level) => (
          <button
            key={level.key}
            onClick={() => onSelectLevel(level.key)}
            className={`w-full p-6 rounded-2xl bg-gradient-to-r ${level.color} border border-border hover:scale-[1.02] transition-all duration-300 text-left`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-foreground">{level.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-foreground">
                  {level.progress.completed}
                </span>
                <span className="text-muted-foreground">
                  /{level.progress.total}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
