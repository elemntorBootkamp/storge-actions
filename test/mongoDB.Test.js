const mongoose = require('mongoose');
const logger = require('../logger');

// eslint-disable-next-line no-undef
describe('MongoDB Connection', () => {
  // eslint-disable-next-line no-undef
  it('should connect to MongoDB', () => mongoose.connect('mongodb://localhost:27017/storge-action')
    .then(() => {
      logger.info('MongoDB connection successful');
    })
    .catch((err) => {
      logger.info('MongoDB connection error:', err);
      throw err;
    }));
});
