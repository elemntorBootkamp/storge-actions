import winston from 'winston';
import chalk from 'chalk';
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf((info) => {
          const { level, message, timestamp } = info;
          const coloredMessage = level === 'warn' ? chalk.yellow(message) : message;
          return `${timestamp} [${level}]: ${coloredMessage}`;
        }),
      ),
    }),
    new winston.transports.File({
      filename: 'logfile.log',
      format: winston.format.combine(
        winston.format.printf((info) => {
          const { level, message, timestamp } = info;
          const coloredMessage = level === 'warn' ? chalk.yellow(message) : message;
          return `${timestamp} [${level}]: ${coloredMessage}`;
        }),
      ),
    }),
  ],
});
logger.info('Starting the application...');
export default logger;
