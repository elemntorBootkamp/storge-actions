
const winston = require('winston');
const chalk = require('chalk');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => {
      const { timestamp, level, message } = info;
      let coloredMessage;
      switch (level) {
        case 'error':
          coloredMessage = chalk.red(message);
          break;
        case 'warn':
          coloredMessage = chalk.yellow(message);
          break;
        case 'info':
          coloredMessage = chalk.green(message);
          break;
        case 'verbose':
          coloredMessage = chalk.blue(message);
          break;
        case 'debug':
          coloredMessage = chalk.magenta(message);
          break;
        case 'silly':
          coloredMessage = chalk.cyan(message);
          break;
        default:
          coloredMessage = message;
      }
      return `${timestamp} [${level.toUpperCase()}] ${coloredMessage}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'app.log',
      level: 'info'
    })
  ]
});




