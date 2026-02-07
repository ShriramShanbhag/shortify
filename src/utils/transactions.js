import { db } from "../config/db.js";

const withTransaction = async (callback) => {
    return await db.transaction(
        async (trx) => {
            return callback(trx);
        }
    )
}

export { withTransaction };