import { describe, it, expect } from '@jest/globals';
import { tryTest } from '../controllers/website.js';

describe('try basic test', () => {
  it('should return true', async () => {
    const result = await tryTest();
    expect(result).toBe(true);
  });
});
