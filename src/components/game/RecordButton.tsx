import { useState } from 'react';
import { Mic, Square, Volume2 } from 'lucide-react';

interface RecordButtonProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  disabled?: boolean;
}

export const RecordButton = ({
  isRecording,
  onStartRecording,
  onStopRecording,
  disabled = false,
}: RecordButtonProps) => {
  return (
    <button
      onClick={isRecording ? onStopRecording : onStartRecording}
      disabled={disabled}
      className={`record-button ${isRecording ? 'recording' : ''} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      aria-label={isRecording ? 'Parar gravação' : 'Iniciar gravação'}
    >
      {isRecording ? (
        <Square className="w-8 h-8 text-white fill-white" />
      ) : (
        <Mic className="w-8 h-8 text-white" />
      )}
      
      {isRecording && (
        <span className="absolute inset-0 rounded-full animate-ping bg-destructive/30" />
      )}
    </button>
  );
};

interface PlayButtonProps {
  onClick: (speed: number) => void;
  isPlaying: boolean;
  disabled?: boolean;
}

const SPEEDS = [1, 0.5, 2];
const SPEED_LABELS: Record<number, string> = { 0.5: '0.5x', 1: '1x', 2: '2x' };

export const PlayButton = ({ onClick, isPlaying, disabled = false }: PlayButtonProps) => {
  const [speedIndex, setSpeedIndex] = useState(0);
  const currentSpeed = SPEEDS[speedIndex];

  const handleClick = () => {
    if (isPlaying) return;
    onClick(currentSpeed);
  };

  const handleSpeedToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSpeedIndex((prev) => (prev + 1) % SPEEDS.length);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleClick}
        disabled={disabled || isPlaying}
        className={`p-4 rounded-full bg-secondary hover:bg-secondary/80 transition-all duration-300 ${
          disabled || isPlaying ? 'opacity-50 cursor-not-allowed' : ''
        } ${isPlaying ? 'animate-pulse' : ''}`}
        aria-label="Ouvir áudio"
      >
        <Volume2 className="w-6 h-6 text-foreground" />
      </button>
      <button
        onClick={handleSpeedToggle}
        className="px-3 py-1.5 rounded-full bg-muted text-sm font-medium text-foreground hover:bg-muted/80 transition-colors"
        aria-label="Mudar velocidade"
      >
        {SPEED_LABELS[currentSpeed]}
      </button>
    </div>
  );
};
