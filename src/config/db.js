import pkg from 'pg';
import { config } from 'dotenv';
config();

const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USE,
  port: parseInt(process.env.PORT),
  password: process.env.PASSWORD,
  database: process.env.dbNAME,
  max: parseInt(process.env.CL),
  idleTimeoutMillis: parseInt(process.env.QL),
  allowExitOnIdle: process.env.WFC === 'true',
});

const connection = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL using connection pool!');
    return client;
  } catch (err) {
    console.error('Connection failed: ', err.message);
    throw err;
  }
};