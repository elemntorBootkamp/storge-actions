import dotenv from 'dotenv';
import logger from '../logger.js';

dotenv.config();

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    logger.info(token);
    if (token !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c') {
      logger.info('Invalid token');
      throw new Error('Invalid token');
    } else {
      logger.info('valid token, yeee');
      next();
    }
  } catch (error) {
    logger.info('Invalid token catch');
    res.status(401).json({ error: 'Invalid token' });
  }
};
