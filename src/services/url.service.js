import { createUrl, findByOriginalUrl, findByShortCode, updateShortCode } from "../repositories/url.repository.js";
import { withTransaction } from "../utils/transactions.js";
import { encode } from "../utils/base62.js";
import { logVisit } from "../repositories/visit.repository.js";

const UrlService = {
    shorten: async (originalURL) => {
        const existingURL = await findByOriginalUrl(originalURL);
        if(existingURL) return existingURL;

        return await withTransaction(async (trx) => {
            const tempCode = Math.random().toString(36).substring(7);
            const newRecord = await createUrl({ original_url: originalURL, short_code: tempCode }, trx); 
            const shortCode = encode(newRecord.id);
            await updateShortCode(newRecord.id, shortCode, trx);
            return { ...newRecord, short_code: shortCode };
        });
    },
    getOriginal: async (shortCode, ip, userAgent) => {
        return await withTransaction(async (trx) => {
            const originalURL  = await findByShortCode(shortCode, trx);
            logVisit(originalURL.id, ip, userAgent, trx);
            return originalURL || null;
        });
    }
}

export default UrlService;