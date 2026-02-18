// Speech recognition utilities with Levenshtein fuzzy matching

/**
 * Calculate Levenshtein distance between two strings
 */
export const levenshteinDistance = (a: string, b: string): number => {
  const matrix: number[][] = [];

  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

/**
 * Normalize text for comparison
 * - lowercase
 * - remove punctuation
 * - normalize contractions
 * - trim whitespace
 */
export const normalizeForComparison = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/['']/g, "'") // normalize apostrophes
    .replace(/[^\w\s']/g, '') // remove punctuation except apostrophe
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Common speech recognition corrections
 * Maps commonly misheard words to their correct forms
 */
const speechCorrections: Record<string, string[]> = {
  "i'm": ["im", "i am", "am"],
  "i've": ["ive", "i have"],
  "i'll": ["ill", "i will", "i well"],
  "i'd": ["id", "i would", "i had"],
  "you're": ["youre", "you are", "your"],
  "you've": ["youve", "you have"],
  "you'll": ["youll", "you will"],
  "we're": ["were", "we are"],
  "we've": ["weve", "we have"],
  "we'll": ["well", "we will"],
  "they're": ["theyre", "they are", "their", "there"],
  "they've": ["theyve", "they have"],
  "they'll": ["theyll", "they will"],
  "it's": ["its", "it is"],
  "that's": ["thats", "that is"],
  "what's": ["whats", "what is"],
  "there's": ["theres", "there is"],
  "here's": ["heres", "here is"],
  "let's": ["lets", "let us"],
  "don't": ["dont", "do not"],
  "doesn't": ["doesnt", "does not"],
  "didn't": ["didnt", "did not"],
  "won't": ["wont", "will not"],
  "wouldn't": ["wouldnt", "would not"],
  "couldn't": ["couldnt", "could not"],
  "shouldn't": ["shouldnt", "should not"],
  "can't": ["cant", "cannot", "can not"],
  "isn't": ["isnt", "is not"],
  "aren't": ["arent", "are not"],
  "wasn't": ["wasnt", "was not"],
  "weren't": ["werent", "were not"],
  "haven't": ["havent", "have not"],
  "hasn't": ["hasnt", "has not"],
  "hadn't": ["hadnt", "had not"],
};

/**
 * Apply speech corrections to normalize spoken text
 */
export const applySpeechCorrections = (spoken: string): string => {
  let normalized = normalizeForComparison(spoken);
  
  // Apply corrections in reverse (from expanded to contracted)
  for (const [correct, variants] of Object.entries(speechCorrections)) {
    for (const variant of variants) {
      const regex = new RegExp(`\\b${variant}\\b`, 'gi');
      normalized = normalized.replace(regex, correct);
    }
  }
  
  return normalized;
};

/**
 * Calculate similarity percentage using Levenshtein distance
 * Returns a value between 0 and 100
 */
export const calculateSimilarity = (spoken: string, expected: string): number => {
  const normalizedSpoken = applySpeechCorrections(spoken);
  const normalizedExpected = normalizeForComparison(expected);
  
  // Exact match
  if (normalizedSpoken === normalizedExpected) {
    return 100;
  }
  
  const distance = levenshteinDistance(normalizedSpoken, normalizedExpected);
  const maxLength = Math.max(normalizedSpoken.length, normalizedExpected.length);
  
  if (maxLength === 0) return 100;
  
  const similarity = ((maxLength - distance) / maxLength) * 100;
  return Math.max(0, Math.min(100, Math.round(similarity)));
};

/**
 * Calculate accuracy using multiple methods and return the best score
 * - Levenshtein similarity
 * - Word-based matching
 * Returns accuracy 0-100
 */
export const calculateAccuracyAdvanced = (spoken: string, expected: string): number => {
  const normalizedSpoken = applySpeechCorrections(spoken);
  const normalizedExpected = normalizeForComparison(expected);
  
  // Exact match
  if (normalizedSpoken === normalizedExpected) {
    return 100;
  }
  
  const spokenWords = normalizedSpoken.split(' ').filter(w => w.length > 0);
  const expectedWords = normalizedExpected.split(' ').filter(w => w.length > 0);
  
  // CRITICAL: Reject if spoken text is too short compared to expected
  // Prevents "I am I am I am" from matching "I am handsome and my sister is ugly"
  if (spokenWords.length < expectedWords.length * 0.5) {
    // If user said less than half the words, cap accuracy very low
    return Math.min(30, Math.round((spokenWords.length / expectedWords.length) * 30));
  }
  
  // Sequential word matching: words must appear in order
  // This prevents repetition of partial phrases from scoring high
  let matchedExpectedIndex = 0;
  const uniqueMatches = new Set<number>();
  
  for (const spokenWord of spokenWords) {
    // Search forward from last matched position for the next matching expected word
    for (let j = matchedExpectedIndex; j < expectedWords.length; j++) {
      if (uniqueMatches.has(j)) continue;
      const wordDistance = levenshteinDistance(spokenWord, expectedWords[j]);
      const threshold = expectedWords[j].length > 4 ? 2 : 1;
      if (wordDistance <= threshold) {
        uniqueMatches.add(j);
        matchedExpectedIndex = j + 1;
        break;
      }
    }
  }
  
  const sequentialAccuracy = expectedWords.length > 0
    ? (uniqueMatches.size / expectedWords.length) * 100
    : 0;
  
  // Also check Levenshtein on full string but penalize length mismatch
  const levenshteinSim = calculateSimilarity(spoken, expected);
  const lengthRatio = Math.min(spokenWords.length, expectedWords.length) / 
                      Math.max(spokenWords.length, expectedWords.length);
  const adjustedLevenshtein = levenshteinSim * lengthRatio;
  
  return Math.round(Math.max(sequentialAccuracy, adjustedLevenshtein));
};

/**
 * Get all expected phrases for grammar hints
 */
export const getAllExpectedPhrases = async (): Promise<string[]> => {
  const { easyPhrases, mediumPhrases, advancedDialogues } = await import('@/data/content');
  
  const phrases: string[] = [];
  
  easyPhrases.forEach(p => phrases.push(p.expectedTranscript));
  mediumPhrases.forEach(p => phrases.push(p.expectedTranscript));
  advancedDialogues.forEach(d => phrases.push(d.expectedTranscript));
  
  return phrases;
};

/**
 * Find best matching phrase from a list
 * Returns the phrase with highest similarity if above threshold
 */
export const findBestMatch = (
  spoken: string, 
  expectedPhrases: string[],
  threshold: number = 60
): { phrase: string; similarity: number } | null => {
  let bestMatch: { phrase: string; similarity: number } | null = null;
  
  for (const phrase of expectedPhrases) {
    const similarity = calculateAccuracyAdvanced(spoken, phrase);
    if (similarity >= threshold && (!bestMatch || similarity > bestMatch.similarity)) {
      bestMatch = { phrase, similarity };
    }
  }
  
  return bestMatch;
};
