import { describe, it, expect } from '@jest/globals';
import { tryTest } from '../controller/website.js';

describe('rt', () => {
  it('should return true', async () => {
    const result = await tryTest();
    expect(result).toBe(true);
  });
});
