const { expect } = require('chai');

// Import the function to be tested
const myFunction = require('../controllers/website');

const rt = myFunction.tryTest;
// Test the function
describe('rt', () => {
  it('should return true', () => {
    const result = rt();
    expect(result).to.be.true;
  });
});
