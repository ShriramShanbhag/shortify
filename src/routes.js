import { Router } from "express";
import { shorten, redirect } from "./controllers/url.controller.js";
import { getVisitStats } from "./controllers/visit.controller.js";


const router = Router();

router.post("/shorten", shorten);
router.get("/:code", redirect);
router.get("/:id/stats", getVisitStats);

export default router;