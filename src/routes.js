import { Router } from "express";
import { shorten } from "./controllers/url.controller";


const router = Router();

router.post("/shorten", shorten);
router.get("/:code", redirect);

export default router;