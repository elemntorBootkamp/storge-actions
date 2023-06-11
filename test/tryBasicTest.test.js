// eslint-disable-next-line import/no-unresolved
const { expect } = require('chai');

// Import the function to be tested
const myFunction = require('../controllers/website');

const rt = myFunction.tryTest;

// eslint-disable-next-line no-undef
describe('rt', () => {
  // eslint-disable-next-line no-undef
  it('should return true', () => {
    const result = rt();
    // eslint-disable-next-line no-unused-expressions
    expect(result).to.be.true;
  });
});
