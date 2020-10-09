import winston from 'winston';
import appRoot from 'app-root-path';

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, //5MB
    colorize: false,
  },
  console: {
    leve: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, //do not exit on handle exceptions
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  },
};

function logExceptions() {
  process.on('uncaughtException', (ex) => {
    logger.error(ex.message, ex);
    // process.exit(1);
  });

  process.on('unhandledRejection', (ex) => {
    logger.error(ex.message, ex);
    // process.exit(1);
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    );
  }
}

export default {
  logger,
  logExceptions,
};
