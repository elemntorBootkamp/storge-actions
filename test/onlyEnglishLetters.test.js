import {
  describe, it, expect,
} from '@jest/globals';
import { onlyEnglishLetters } from '../services/validate.js';

describe('onlyEnglishLetters', () => {
  it('returns true for string with only English letters and spaces', () => {
    const result = onlyEnglishLetters('Hello world');
    expect(result).toBe(true);
  });

  it('returns true for empty string', () => {
    const result = onlyEnglishLetters('');
    expect(result).toBe(true);
  });

  it('returns false for string with non-English letters', () => {
    const result = onlyEnglishLetters('שלום עולם');
    expect(result).toBe(false);
  });

  it('returns false for string with numbers', () => {
    const result = onlyEnglishLetters('Hello 123');
    expect(result).toBe(false);
  });

  it('returns false for string with special characters', () => {
    const result = onlyEnglishLetters('Hello !@#$%^&*()_+');
    expect(result).toBe(false);
  });
});
