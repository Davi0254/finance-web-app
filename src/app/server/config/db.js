import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config({ path: '../../../src/.env' });

const pool = mariadb.createPool({
    host: process.env.MARIADB_HOST,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    database: process.env.MARIADB_DATABASE,
});

export default pool;
