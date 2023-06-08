const pino = require('pino');
const fs = require('fs');
const winston = require('winston');
const chalk = require('chalk');
const logger = winston.createLogger({
  level: 'error',
  transports: [
    new winston.transports.File({ filename: 'app.log' }),
  ],
});
const fileTransports = pino.transport({
  target: 'pino/file',
  options: { destination: `${__dirname}/app.log` },
});
module.exports = pino(
  {
    level: process.env.PINO_LOG_LEVEL || 'info',
    formatters: {
      level: (label) => ({ level: label.toUpperCase() }),
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  fileTransports,
);
