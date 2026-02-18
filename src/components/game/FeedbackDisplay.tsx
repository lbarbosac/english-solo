import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Check, AlertTriangle } from 'lucide-react';

interface FeedbackDisplayProps {
  isCorrect: boolean;
  accuracy: number;
  xpEarned: number;
  spoken: string;
  expected: string;
  onContinue: () => void;
}

export const FeedbackDisplay = ({
  isCorrect,
  accuracy,
  xpEarned,
  spoken,
  expected,
  onContinue,
}: FeedbackDisplayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  }, []);

  const getSuccessMessage = (accuracy: number): string => {
    if (accuracy > 90) return 'Excelente!';
    if (accuracy >= 75) return 'Acertou, muito bem!';
    return 'Quase lá!';
  };

  return (
    <div
      ref={containerRef}
      className={`rounded-2xl p-6 ${
        isCorrect ? 'bg-success/10 border border-success/30' : 'bg-warning/10 border border-warning/30'
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`p-3 rounded-full ${
            isCorrect ? 'bg-success/20' : 'bg-warning/20'
          }`}
        >
          {isCorrect ? (
            <Check className="w-6 h-6 text-success" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-warning" />
          )}
          
        </div>
        <div>
          <h3 className={`text-xl font-bold ${isCorrect ? 'text-success' : 'text-warning'}`}>
            {getSuccessMessage(accuracy)}
          </h3>

          <p className="text-sm text-muted-foreground">
            Precisão: {accuracy}% | +{xpEarned} XP
          </p>
        </div>
      </div>

      {!isCorrect && (
        <div className="space-y-2 mb-4">
          <div>
            <span className="text-xs text-muted-foreground block">Você disse:</span>
            <span className="text-sm text-foreground/70">{spoken || '(nada detectado)'}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Esperado:</span>
            <span className="text-sm text-foreground">{expected}</span>
          </div>
        </div>
      )}

      <button
        onClick={onContinue}
        className="w-full py-3 px-6 bg-primary hover:bg-primary/90 rounded-xl font-semibold text-primary-foreground transition-all duration-300"
      >
        Continuar
      </button>
    </div>
  );
};
