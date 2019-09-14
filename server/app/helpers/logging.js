const winston = require('winston');
const { colorize, combine, printf, timestamp } = winston.format;
const { Console, File } = winston.transports;
const { getFormattedDate } = require('../utils/date-utils');

const getLogFilename = () => {
  return getFormattedDate() + '.log';
}

const formatInfo = info => {
  return `${info.timestamp} [${info.level}] ${info.message}`;
}

const logger = winston.createLogger({
  format: timestamp({ format: 'DD/MMM/YYYY:HH:mm:ss ZZ' }),
  transports: [
    new Console({
      level: 'debug',
      format: combine(
        colorize(),
        printf(formatInfo)
      )
    }),
    new File({
      level: 'info',
      filename: getLogFilename(),
      dirname: 'logs',
      format: printf(formatInfo)
    })
  ]
});

module.exports = logger;