import dotenv from 'dotenv';
import logger from '../logger.js';

dotenv.config();

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (token !== process.env.TOKEN) {
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
