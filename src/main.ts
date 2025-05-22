import http from 'node:http';
import dotenv from 'dotenv';
import logger from './logging/logger.js';
import app from './app.js';
import pool from './db/db.js';

dotenv.config();

const normalizePort = (val: string | undefined): string | number | false => {
  if (val === undefined) return false;
  const port: number = parseInt(val, 10);

  if (Number.isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

const port: string | number | false = normalizePort(process.env.PORT);

app.set('port', port);

const errorHandler = (err: any) => {
  if (err.syscall !== 'listen') {
    throw err;
  }
  const address = server.address();
  const bind: string = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;

  switch (err.code) {
    case 'EACCES':
      logger.error(bind + ' require elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw err;
  }
};

const sigintHandler = async () => {
  logger.info('SIGINT received.');

  logger.info('Shutting down server...');
  server.close(async () => {
    logger.info('Closed out remaining connections.');
    logger.info('Closing mysql pool connections...');
    await pool.end().then(() => logger.info('Mysql Pool ended.'));
    process.exit(0);
  });
};

const sigtermHandler = async () => {
  logger.info('SIGTERM received.');

  logger.info('Shutting down server...');
  server.close(async () => {
    logger.info('Closed out remaining connections.');
    logger.info('Closing mysql pool connections...');
    await pool.end().then(() => logger.info('Mysql Pool ended.'));
    process.exit(0);
  });
};

const server = http.createServer(app);

server.on('listening', () => {
  const address = server.address();
  const bind: string = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
  logger.info(`Listening on ${bind}`);
});

server.on('error', errorHandler);

// Graceful shutdown attempts
process.on('SIGTERM', sigtermHandler);

process.on('SIGINT', sigintHandler);

server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
