import mysql from 'mysql2/promise';
import { Pool } from 'mysql2/promise';
import logger from '../logging/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const pool: Pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWD,
  database: process.env.MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.on('acquire', (connection) => {
  logger.info(`Connection ${connection.threadId} was acquired.`);
});

pool.on('release', (connection) => {
  logger.info(`Connection ${connection.threadId} was released.`);
});

pool.on('connection', (connection) => {
  logger.info(`Connection ${connection.threadId} was created.`);
});

export default pool;
