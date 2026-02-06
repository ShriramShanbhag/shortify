import { db } from "../config/db";

const withTransaction = async (callback) => {
    return await db.transaction(
        async (trx) => {
            return callback(trx);
        }
    )
}

export { withTransaction };