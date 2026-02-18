import { useState, useCallback, useRef, useEffect } from 'react';
import '../types/speech.d.ts';

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  confidence: number;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  isSupported: boolean;
}

export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const isActiveRef = useRef(false);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSpeechTimeRef = useRef<number>(Date.now());
  
  const isSupported = typeof window !== 'undefined' && 
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  // Clear silence timeout
  const clearSilenceTimeout = useCallback(() => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
  }, []);

  // Reset silence timeout - extended to 3 seconds
  const resetSilenceTimeout = useCallback(() => {
    clearSilenceTimeout();
    lastSpeechTimeRef.current = Date.now();
    
    silenceTimeoutRef.current = setTimeout(() => {
      // Only stop if still listening and no recent speech
      if (isActiveRef.current && recognitionRef.current) {
        const timeSinceLastSpeech = Date.now() - lastSpeechTimeRef.current;
        if (timeSinceLastSpeech >= 5000) {
          try {
            recognitionRef.current.stop();
          } catch (e) {
            // Ignore
          }
        }
      }
    }, 5000); // 5 seconds silence timeout
  }, [clearSilenceTimeout]);

  // Create new recognition instance for each session with optimized settings
  const createRecognition = useCallback(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) return null;

    const recognition = new SpeechRecognitionAPI();
    
    // Optimized settings for better accuracy
    recognition.lang = 'en-US'; // American English
    recognition.continuous = true; // Keep listening
    recognition.interimResults = true; // Show partial results
    recognition.maxAlternatives = 3; // Get multiple alternatives for better matching

    recognition.onstart = () => {
      isActiveRef.current = true;
      setIsListening(true);
      setError(null);
      lastSpeechTimeRef.current = Date.now();
      resetSilenceTimeout();
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';
      let bestConfidence = 0;

      // Reset timeout on speech detection
      lastSpeechTimeRef.current = Date.now();
      resetSilenceTimeout();

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        
        // Check all alternatives for the best match
        for (let j = 0; j < result.length; j++) {
          const alternative = result[j];
          if (alternative.confidence > bestConfidence) {
            bestConfidence = alternative.confidence;
          }
        }

        if (result.isFinal) {
          // Use the first (most likely) result
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);
      setConfidence(bestConfidence);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      clearSilenceTimeout();
      
      switch (event.error) {
        case 'not-allowed':
          setError('Permissão do microfone negada. Por favor, permita o acesso.');
          break;
        case 'no-speech':
          // Don't show error for no speech - user might not have spoken yet
          break;
        case 'audio-capture':
          setError('Nenhum microfone encontrado.');
          break;
        case 'network':
          setError('Erro de rede. Verifique sua conexão.');
          break;
        case 'aborted':
          // User aborted, no error needed
          break;
        default:
          setError(`Erro de reconhecimento: ${event.error}`);
      }
      
      isActiveRef.current = false;
      setIsListening(false);
    };

    recognition.onend = () => {
      clearSilenceTimeout();
      isActiveRef.current = false;
      setIsListening(false);
    };

    return recognition;
  }, [resetSilenceTimeout, clearSilenceTimeout]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearSilenceTimeout();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // Ignore abort errors
        }
        recognitionRef.current = null;
      }
    };
  }, [clearSilenceTimeout]);

  // CRITICAL: Called directly from user click handler
  const startListening = useCallback(() => {
    if (!isSupported) {
      setError('Reconhecimento de voz não suportado neste navegador.');
      return;
    }

    // If already active, don't start again
    if (isActiveRef.current) {
      return;
    }

    setError(null);
    setTranscript('');
    setConfidence(0);

    // Abort any existing instance first
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {
        // Ignore
      }
    }

    // Create fresh instance
    const recognition = createRecognition();
    if (!recognition) {
      setError('Falha ao criar reconhecimento de voz.');
      return;
    }

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (err) {
      console.error('Failed to start recognition:', err);
      setError('Falha ao iniciar o reconhecimento de voz.');
      isActiveRef.current = false;
      setIsListening(false);
    }
  }, [isSupported, createRecognition]);

  const stopListening = useCallback(() => {
    clearSilenceTimeout();
    if (recognitionRef.current && isActiveRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore stop errors
      }
    }
  }, [clearSilenceTimeout]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setConfidence(0);
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    confidence,
    error,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
  };
};
