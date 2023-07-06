import mongoose from 'mongoose';
import { describe, it } from '@jest/globals';
import logger from '../logger.js';

describe('MongoDB Connection', () => {
  it('should connect to MongoDB', () => mongoose.connect('mongodb://0.0.0.0:27017/storge-action')
    .then(() => {
      logger.info('MongoDB connection successful');
    })
    .catch((err) => {
      logger.info('MongoDB connection error:', err);
      throw err;
    }));
});
