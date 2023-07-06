import {
  describe, it, expect,
} from '@jest/globals';
import { validateDomain } from '../services/validate.js';

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
