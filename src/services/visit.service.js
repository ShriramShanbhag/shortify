import { getVisitStats } from "../repositories/visit.repository.js";

const VisitService = {
    getVisitStats: async (urlId) => {
        return await getVisitStats(urlId);
    }
};

export default VisitService;