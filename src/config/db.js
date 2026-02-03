import knex from 'knex';
import dotenv from 'dotenv';
import knexfile from '../../knexfile.js';

dotenv.config();

const db = knex(knexfile.development);

const testDBConnection = async () => {
    try {
        await db.raw('SELECT 1 + 1 AS result');
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

export  {db, testDBConnection };