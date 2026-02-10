import VisitService from "../services/visit.service.js";
const getVisitStats = async (req, res, next) => {
    try {
        const { id } = req.params;
        if(!id) return res.status(400).json({ error: 'URL ID is required' });
        const stats = await VisitService.getVisitStats(id);
        res.json(stats);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export { getVisitStats }