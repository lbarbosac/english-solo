import { useState } from 'react';
import { Keyboard } from 'lucide-react';

interface TextFallbackProps {
  onSubmit: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const TextFallback = ({ 
  onSubmit, 
  placeholder = "Digite a frase em inglês...",
  disabled = false 
}: TextFallbackProps) => {
  const [text, setText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText('');
      setIsExpanded(false);
    }
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-4"
        disabled={disabled}
      >
        <Keyboard className="w-4 h-4" />
        <span>Prefere digitar?</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mt-4 animate-fade-in">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          autoFocus
          disabled={disabled}
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground px-4 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          disabled={!text.trim() || disabled}
        >
          Enviar
        </button>
      </div>
      <button
        type="button"
        onClick={() => setIsExpanded(false)}
        className="text-sm text-muted-foreground hover:text-foreground mt-2"
      >
        Cancelar
      </button>
    </form>
  );
};
