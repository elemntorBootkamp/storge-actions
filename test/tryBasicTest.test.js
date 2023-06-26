import expect from 'chai';
import { describe, it } from 'jest';
import myFunction from '../controllers/website.js';

const rt = myFunction.tryTest;

describe('rt', () => {
  it('should return true', () => {
    const result = rt();
    // eslint-disable-next-line no-unused-expressions
    expect(result).to.be.true;
  });
});
