import { encode } from "zod";
import { createUrl, findByShortCode, updateShortCode } from "../repositories/url.repository";
import { withTransaction } from "../utils/transactions";

const UrlService = {
    shorten: async (originalURL) => {
        const existingURL = await UrlModel.findOne({ original_url: originalURL });
        if(existingURL) return existingURL;

        return await withTransaction(async (trx) => {
            const tempCode = Math.random().toString(36).substring(7);
            const newRecord = createUrl({ original_url: originalURL, short_code: tempCode }, trx); 
            const shortCode = encode(newRecord.id);
            await updateShortCode(newRecord.id, shortCode, trx);
            return { ...newRecord, short_code: shortCode };
        });
    },
    getOriginal: async (shortCode) => {
        const originalURL  = await findByShortCode(shortCode);
        return originalURL || null;
    }
}

export default UrlService;