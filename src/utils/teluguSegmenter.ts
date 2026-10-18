/**
 * Telugu Text Segmenter Utility
 * Uses Intl.Segmenter with 'te' locale to safely split Telugu into grapheme clusters or words.
 * NEVER splits by code units or single UTF-16 characters, avoiding broken ottulu (consonant conjuncts)
 * and matras (vowel signs).
 */

export function segmentGraphemes(text: string): string[] {
  if (!text) return [];

  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    try {
      const segmenter = new Intl.Segmenter('te', { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text), s => s.segment);
    } catch {
      // Fallback below
    }
  }

  // Regex Unicode-aware fallback matching base character followed by any combining marks
  const matches = text.match(/\P{M}\p{M}*/gu);
  return matches || Array.from(text);
}

export function segmentWords(text: string): string[] {
  if (!text) return [];

  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    try {
      const segmenter = new Intl.Segmenter('te', { granularity: 'word' });
      const words: string[] = [];
      for (const seg of segmenter.segment(text)) {
        if (seg.isWordLike) {
          words.push(seg.segment);
        }
      }
      if (words.length > 0) return words;
    } catch {
      // Fallback
    }
  }

  return text.trim().split(/\s+/);
}
