import VisitService from "../services/visit.service";
const getVisitStats = async (req, res, next) => {
    try {
        const { urlId } = req.params;
        if(!urlId) return res.status(400).json({ error: 'URL ID is required' });
        const stats = await VisitService.getVisitStats(urlId);
        res.json(stats);
    } catch (error) {
        next(error);
    }
}

export { getVisitStats }