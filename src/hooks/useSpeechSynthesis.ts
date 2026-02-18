import { useState, useCallback, useRef } from 'react';

interface UseSpeechSynthesisReturn {
  speak: (text: string, rate?: number) => Promise<void>;
  stop: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
}

export const useSpeechSynthesis = (): UseSpeechSynthesisReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const speak = useCallback((text: string, rate: number = 0.9): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!isSupported) {
        reject(new Error('Speech synthesis is not supported'));
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Try to get an American English voice
      const voices = window.speechSynthesis.getVoices();
      const americanVoice = voices.find(
        voice => voice.lang === 'en-US' && voice.name.includes('Female')
      ) || voices.find(voice => voice.lang === 'en-US');
      
      if (americanVoice) {
        utterance.voice = americanVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        resolve();
      };

      utterance.onerror = (event) => {
        setIsSpeaking(false);
        reject(new Error(`Speech error: ${event.error}`));
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    });
  }, [isSupported]);

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
  };
};
