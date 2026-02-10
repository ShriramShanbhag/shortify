import { db } from "../config/db.js";

const logVisit = async (urlId, ipAddress, userAgent, trx) => {
    const queryBuilder = trx || db;
    await queryBuilder('visits').insert({
        url_id: urlId,
        ip_address: ipAddress,
        user_agent: userAgent,
    });
}

const getVisitStats = async (urlId) => {
    const result = await db('visits')
        .where({ url_id: urlId })
        .groupBy('ip_address')
        .select('ip_address')
        .count('* as visit_count');
    return result;
}

export { logVisit, getVisitStats }