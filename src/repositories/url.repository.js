import {db} from '../config/db.js';

const findByShortCode = async (shortCode) => {
    const result = await db('urls').where({ short_code: shortCode }).first();
    return result ? result.original_url : null;
}

const findByOriginalUrl = async (originalUrl) => {
    const result = await db('urls').where({ original_url: originalUrl }).first();
    return result || null;
}

const createUrl = async (urlData, trx) => {
    const queryBuilder = trx || db;
    const [result] = await queryBuilder('urls').insert(urlData).returning(['id', 'original_url'])
    return result;
}

const updateShortCode = async (id, shortCode, trx) => {
    const queryBuilder = trx || db;
    await queryBuilder('urls').where({ id }).update({ short_code: shortCode });
}

export { findByShortCode, findByOriginalUrl, createUrl, updateShortCode };