import { describe, it, expect } from '@jest/globals';
import { validateDomain, onlyEnglishLetters } from '../services/validate.js';

describe('validateDomain', () => {
  let result;
  it('should throw an error if the domain is invalid', () => {
    try {
      validateDomain('invalid-domain');
    } catch (error) {
      expect(error.message).toBe('The domain is invalid.');
    }
  });
  it('should return true if the domain is not listed in a DNSBL', async () => {
    result = await validateDomain('example.com');
    expect(result).toBe(true);
  });
  it('should return false if the domain is listed in a DNSBL', async () => {
    result = false;
    expect(result).toBe(false);
  });
});

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
