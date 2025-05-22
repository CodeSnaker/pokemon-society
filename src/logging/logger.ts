import * as winston from 'winston';
import dotenv from 'dotenv';
const { combine, timestamp, printf, align, errors } = winston.format;

dotenv.config();

const errorFilter = winston.format((info) => {
  return info.level === 'error' ? info : false;
});

const warnFilter = winston.format((info) => {
  return info.level === 'warn' ? info : false;
});

const infoFilter = winston.format((info) => {
  return info.level === 'info' ? info : false;
});

const debugFilter = winston.format((info) => {
  return info.level === 'debug' ? info : false;
});

const defaultFormat = combine(
  timestamp({
    format: 'YYYY-MM-DD hh:mm:ss A',
  }),
  align(),
  printf((info) => `[${info.timestamp} - ${info.level}] ${info.message}`),
);

const errorFormat = combine(errorFilter(), errors({ stack: true }), defaultFormat);
const warnFormat = combine(warnFilter(), defaultFormat);
const infoFormat = combine(infoFilter(), defaultFormat);
const debugFormat = combine(debugFilter(), defaultFormat);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: defaultFormat,
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: errorFormat,
      maxsize: 50000,
    }),
    new winston.transports.Console({
      level: 'error',
      format: errorFormat,
    }),

    new winston.transports.File({
      filename: './logs/warnings.log',
      level: 'warn',
      format: warnFormat,
      maxsize: 50000,
    }),

    new winston.transports.File({
      filename: './logs/info.log',
      level: 'info',
      format: infoFormat,
      maxsize: 50000,
    }),
    new winston.transports.Console({
      level: 'info',
      format: infoFormat,
    }),

    new winston.transports.File({
      filename: './logs/debug.log',
      level: 'debug',
      format: debugFormat,
      maxsize: 50000,
    }),
    new winston.transports.Console({
      level: 'debug',
      format: debugFormat,
    }),
    new winston.transports.File({ filename: './logs/combined.log', maxsize: 100000 }),
  ],
  exceptionHandlers: [new winston.transports.File({ filename: './logs/uncaught-exceptions.log' })],
  rejectionHandlers: [new winston.transports.File({ filename: './logs/uncaught-errors.log' })],
});

export default logger;
