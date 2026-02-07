import UrlService from "../services/url.service.js";
export const shorten = async (req, res, next) => {
    try {
        const { originalURL } = req.body;
        if(!originalURL) return res.status(400).json({ error: 'Original URL is required' });
        const result = await UrlService.shorten(originalURL);
        res.json(result);
    } catch (error) {
        next(error)
    }
}
export const redirect = async (req, res, next) => {
    try {
        const { shortCode } = req.params;
        if(!shortCode) return res.status(400).json({ error: 'Short code is required' });
        const originalURL = await UrlService.getOriginal(shortCode);
        if(!originalURL) return res.status(404).json({ error: 'URL not found' });
        res.redirect(302, originalURL);
    } catch (error) {
        next(error);
    }
}
    