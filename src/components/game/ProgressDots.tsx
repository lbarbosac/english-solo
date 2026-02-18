interface ProgressDotsProps {
  total: number;
  current: number;
  results: ('correct' | 'wrong' | 'pending')[];
}

export const ProgressDots = ({ total, current, results }: ProgressDotsProps) => {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {Array.from({ length: total }).map((_, index) => {
        const result = results[index];
        let className = 'progress-dot';
        
        if (index === current) {
          className += ' current';
        } else if (result === 'correct') {
          className += ' completed';
        } else if (result === 'wrong') {
          className += ' error';
        }
        
        return <div key={index} className={className} />;
      })}
    </div>
  );
};
