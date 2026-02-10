import {db} from '../config/db.js';

const findByShortCode = async (shortCode, trx) => {
    const queryBuilder = trx || db;
    const result = await queryBuilder('urls').where({ short_code: shortCode }).first();
    return result ? result : null;
}

const findByOriginalUrl = async (originalUrl, trx) => {
    const queryBuilder = trx || db;
    const result = await queryBuilder('urls').where({ original_url: originalUrl }).first();
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

const incrementVisitCount = async (id) => {
    await db('urls').where({ id }).increment('visit_count', 1);
}

export { findByShortCode, findByOriginalUrl, createUrl, updateShortCode, incrementVisitCount };