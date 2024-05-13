import { Router } from "express";
import controllers from "./controllers.js";

const router = Router();

router.get("/count", controllers.getCount);
router.get("/growth-stats", controllers.getGrowthStats);

export default router;
