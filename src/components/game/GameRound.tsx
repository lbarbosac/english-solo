import { useState, useEffect, useCallback, useMemo } from 'react';
import { RecordButton, PlayButton } from './RecordButton';
import { FeedbackDisplay } from './FeedbackDisplay';
import { TextFallback } from './TextFallback';
import { Progress } from '@/components/ui/progress';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { 
  getContentForTask, 
  isDialogue, 
  type GameContent,
  type DialogueContent,
  type PhraseContent
} from '@/data/content';
import { 
  calculateXP, 
  loadProgress, 
  saveProgress,
  updateStreak,
  addXP,
  markActivityCompleted,
} from '@/lib/gameUtils';
import { calculateAccuracyAdvanced } from '@/lib/speechUtils';

interface GameRoundProps {
  level: 'easy' | 'medium' | 'advanced';
  isDailyChallenge?: boolean;
  activityId?: number;
  mode?: 'phrases' | 'dialogues';
  onComplete: (results: RoundResult) => void;
  onBack: () => void;
}

export interface ChallengeResult {
  accuracy: number;
  xpEarned: number;
  isCorrect: boolean;
  content: GameContent;
  spoken: string;
}

export interface RoundResult {
  totalXP: number;
  challenges: ChallengeResult[];
  level: 'easy' | 'medium' | 'advanced';
  activityId?: number;
  mode?: 'phrases' | 'dialogues';
}

const ACCURACY_THRESHOLD = 75;
const PHRASES_PER_TASK = 10;

export const GameRound = ({
  level,
  isDailyChallenge = false,
  activityId,
  mode = 'phrases',
  onComplete,
  onBack,
}: GameRoundProps) => {
  const { speak, isSpeaking, isSupported: ttsSupported } = useSpeechSynthesis();
  const { 
    isListening, 
    transcript,
    confidence,
    startListening, 
    stopListening, 
    resetTranscript,
    isSupported: sttSupported,
    error: sttError,
  } = useSpeechRecognition();

  // Get 10 phrases for this task
  const phrases = useMemo(() => {
    return getContentForTask(mode, level, activityId || 1);
  }, [mode, level, activityId]);

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [phraseResults, setPhraseResults] = useState<(ChallengeResult | null)[]>(
    () => new Array(PHRASES_PER_TASK).fill(null)
  );
  const [passedPhrases, setPassedPhrases] = useState<boolean[]>(
    () => new Array(PHRASES_PER_TASK).fill(false)
  );
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<{
    isCorrect: boolean;
    accuracy: number;
    xpEarned: number;
    spoken: string;
    expected: string;
  } | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [hasEvaluated, setHasEvaluated] = useState(false);
  
  // Retry phase
  const [isRetryPhase, setIsRetryPhase] = useState(false);
  const [retryQueue, setRetryQueue] = useState<number[]>([]);
  const [retryIndex, setRetryIndex] = useState(0);

  const currentChallenge = useMemo(() => {
    if (isRetryPhase && retryQueue.length > 0) {
      return phrases[retryQueue[retryIndex]];
    }
    return phrases[currentPhraseIndex];
  }, [phrases, currentPhraseIndex, isRetryPhase, retryQueue, retryIndex]);

  // Count how many phrases have passed
  const passedCount = passedPhrases.filter(Boolean).length;
  const progressPercent = (passedCount / PHRASES_PER_TASK) * 100;

  const getTextToSpeak = (content: GameContent): string => {
    if (isDialogue(content)) {
      return content.dialogue[0].text;
    }
    return (content as PhraseContent).text;
  };

  const getDisplayText = (content: GameContent): React.ReactNode => {
    if (isDialogue(content)) {
      const line = content.dialogue[0];
      return (
        <div className="space-y-2">
          <div className="flex gap-2 justify-center">
            <span className="text-primary font-bold">{line.speaker}:</span>
            <span className="text-foreground text-xl">{line.text}</span>
          </div>
        </div>
      );
    }
    return <span className="text-foreground text-xl">{(content as PhraseContent).text}</span>;
  };

  const getTranslation = (content: GameContent): string => {
    if (isDialogue(content)) {
      return (content as DialogueContent).translation;
    }
    return (content as PhraseContent).translation;
  };

  const evaluateResponse = useCallback((spokenText: string) => {
    if (hasEvaluated) return;
    setHasEvaluated(true);
    
    const responseTime = startTime ? Date.now() - startTime : 5000;
    const expectedTranscript = currentChallenge.expectedTranscript;
    const accuracy = calculateAccuracyAdvanced(spokenText, expectedTranscript);
    const isCorrect = accuracy >= ACCURACY_THRESHOLD;
    
    const newConsecutive = isCorrect ? consecutiveCorrect + 1 : 0;
    setConsecutiveCorrect(newConsecutive);

    const xpEarned = calculateXP(accuracy, responseTime, newConsecutive, isDailyChallenge);

    const actualIndex = isRetryPhase ? retryQueue[retryIndex] : currentPhraseIndex;

    const result: ChallengeResult = {
      accuracy,
      xpEarned,
      isCorrect,
      content: currentChallenge,
      spoken: spokenText,
    };

    // Update results
    setPhraseResults(prev => {
      const updated = [...prev];
      updated[actualIndex] = result;
      return updated;
    });

    if (isCorrect) {
      setPassedPhrases(prev => {
        const updated = [...prev];
        updated[actualIndex] = true;
        return updated;
      });
    }

    setCurrentFeedback({
      isCorrect,
      accuracy,
      xpEarned,
      spoken: spokenText,
      expected: expectedTranscript,
    });
    setShowFeedback(true);
  }, [currentChallenge, consecutiveCorrect, isDailyChallenge, startTime, hasEvaluated, isRetryPhase, retryQueue, retryIndex, currentPhraseIndex]);

  const handlePlayAudio = useCallback(async (speed: number = 1) => {
    if (!ttsSupported || !currentChallenge) return;
    const text = getTextToSpeak(currentChallenge);
    await speak(text, speed);
    setStartTime(Date.now());
  }, [currentChallenge, speak, ttsSupported]);

  // Request mic permission on mount
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => { stream.getTracks().forEach(t => t.stop()); })
        .catch(() => {});
    }
  }, []);

  // Reset state when phrase changes
  useEffect(() => {
    setStartTime(null);
    setHasEvaluated(false);
    setShowFeedback(false);
    setCurrentFeedback(null);
    resetTranscript();
  }, [currentPhraseIndex, retryIndex, isRetryPhase, resetTranscript]);

  // Handle recording stop
  useEffect(() => {
    if (!isListening && transcript && !hasEvaluated) {
      if (transcript.trim().length > 0) {
        if (!startTime) setStartTime(Date.now());
        evaluateResponse(transcript);
      }
    }
  }, [isListening, transcript, evaluateResponse, hasEvaluated, startTime]);

  const handleTextSubmit = (text: string) => {
    if (!startTime) setStartTime(Date.now());
    evaluateResponse(text);
  };

  const handleContinue = () => {
    if (isRetryPhase) {
      // Check if current retry phrase passed
      const actualIndex = retryQueue[retryIndex];
      if (passedPhrases[actualIndex] || phraseResults[actualIndex]?.isCorrect) {
        // Move to next retry
        if (retryIndex + 1 < retryQueue.length) {
          setRetryIndex(retryIndex + 1);
        } else {
          // Check if all are now passed
          const stillFailing = retryQueue.filter(idx => !passedPhrases[idx] && !phraseResults[idx]?.isCorrect);
          if (stillFailing.length > 0) {
            setRetryQueue(stillFailing);
            setRetryIndex(0);
          } else {
            // All passed! Complete the task
            finishTask(true);
          }
        }
      } else {
        // Failed retry, stay or move on - rebuild queue
        if (retryIndex + 1 < retryQueue.length) {
          setRetryIndex(retryIndex + 1);
        } else {
          // Re-queue all still failing
          const updatedPassedPhrases = [...passedPhrases];
          // Check latest results
          const stillFailing: number[] = [];
          for (const idx of retryQueue) {
            if (!updatedPassedPhrases[idx] && !phraseResults[idx]?.isCorrect) {
              stillFailing.push(idx);
            }
          }
          if (stillFailing.length > 0) {
            setRetryQueue(stillFailing);
            setRetryIndex(0);
          } else {
            finishTask(true);
          }
        }
      }
    } else {
      // Normal phase - move to next phrase
      if (currentPhraseIndex + 1 < PHRASES_PER_TASK) {
        setCurrentPhraseIndex(currentPhraseIndex + 1);
      } else {
        // All 10 phrases done, check for failures
        const failedIndices: number[] = [];
        for (let i = 0; i < PHRASES_PER_TASK; i++) {
          const result = phraseResults[i];
          if (!result || !result.isCorrect) {
            failedIndices.push(i);
          }
        }
        
        if (failedIndices.length > 0) {
          setIsRetryPhase(true);
          setRetryQueue(failedIndices);
          setRetryIndex(0);
        } else {
          finishTask(true);
        }
      }
    }
  };

  const finishTask = (fullyCompleted: boolean) => {
    const allResults = phraseResults.filter((r): r is ChallengeResult => r !== null);
    const totalXP = allResults.reduce((sum, r) => sum + r.xpEarned, 0);
    const avgAccuracy = allResults.length > 0 
      ? allResults.reduce((sum, r) => sum + r.accuracy, 0) / allResults.length 
      : 0;
    
    let progress = loadProgress();
    progress = updateStreak(progress);
    progress = addXP(progress, totalXP);
    
    if (activityId) {
      progress = markActivityCompleted(
        progress, mode, level, activityId, avgAccuracy, passedCount, fullyCompleted
      );
    }
    
    if (isDailyChallenge) {
      progress.dailyChallengeCompleted = true;
      progress.dailyChallengeDate = new Date().toISOString().split('T')[0];
    }
    
    saveProgress(progress);

    onComplete({
      totalXP,
      challenges: allResults,
      level,
      activityId,
      mode,
    });
  };

  if (!currentChallenge) {
    return <div className="p-6 text-center text-foreground">Carregando...</div>;
  }

  const displayPhraseNumber = isRetryPhase 
    ? `Revisão - Frase ${retryIndex + 1}/${retryQueue.length}`
    : `Frase ${currentPhraseIndex + 1}/${PHRASES_PER_TASK}`;

  return (
    <div className="p-4 sm:p-6 flex flex-col min-h-[calc(100vh-60px)] w-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            {displayPhraseNumber}
          </span>
          <span className="text-sm font-medium text-primary">
            {passedCount}/{PHRASES_PER_TASK}
          </span>
        </div>
        <Progress value={progressPercent} className="h-3" />
        {isRetryPhase && (
          <p className="text-xs text-amber-400 mt-2 text-center">
            Repita as frases com menos de 75% de precisão
          </p>
        )}
        <div className="text-center mt-2 text-sm text-muted-foreground">
          Atividade {activityId || 1}
        </div>
      </div>

      {/* Challenge Content */}
      <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
        {!showFeedback ? (
          <>
            <p className="text-muted-foreground mb-4 text-center">
              {isRetryPhase ? 'Tente novamente - fale com calma' : 'Ouça e repita a frase'}
            </p>

            <div className="bg-card rounded-2xl p-4 sm:p-6 mb-6 w-full max-w-md text-center">
              {getDisplayText(currentChallenge)}
              <p className="text-sm text-muted-foreground mt-3 italic">
                {getTranslation(currentChallenge)}
              </p>
            </div>

            <div className="mb-6 sm:mb-8">
              <PlayButton
                onClick={handlePlayAudio}
                isPlaying={isSpeaking}
                disabled={!ttsSupported}
              />
            </div>

            <div className="flex flex-col items-center justify-center w-full">
              {!sttSupported ? (
                <div className="text-center">
                  <p className="text-warning text-sm mb-4">
                    Reconhecimento de voz não suportado neste navegador.
                  </p>
                  <TextFallback 
                    onSubmit={handleTextSubmit}
                    disabled={false}
                  />
                </div>
              ) : (
                <>
                  <div className="flex justify-center w-full">
                    <RecordButton
                      isRecording={isListening}
                      onStartRecording={() => {
                        resetTranscript();
                        setHasEvaluated(false);
                        if (!startTime) setStartTime(Date.now());
                        startListening();
                      }}
                      onStopRecording={stopListening}
                      disabled={false}
                    />
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    {isListening 
                      ? 'Escutando... Fale com calma' 
                      : 'Clique para gravar sua pronúncia'}
                  </p>
                  
                  {transcript && (
                    <p className="text-sm text-foreground/70 mt-2 italic text-center">
                      "{transcript}"
                    </p>
                  )}
                  
                  {sttError && (
                    <p className="text-sm text-destructive mt-2 text-center">
                      {sttError}
                    </p>
                  )}
                  
                  <TextFallback 
                    onSubmit={handleTextSubmit}
                    disabled={isListening}
                  />
                </>
              )}
            </div>
          </>
        ) : (
          currentFeedback && (
            <FeedbackDisplay
              isCorrect={currentFeedback.isCorrect}
              accuracy={currentFeedback.accuracy}
              xpEarned={currentFeedback.xpEarned}
              spoken={currentFeedback.spoken}
              expected={currentFeedback.expected}
              onContinue={handleContinue}
            />
          )
        )}
      </div>
    </div>
  );
};
