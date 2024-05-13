import { Router } from "express";
import controllers from "./controllers.js";

const router = Router();

router.param("storeId", controllers.validateStoreId);

router.get("/", controllers.findAll);
router.get("/count", controllers.getCount);
router.get("/growth-stats", controllers.getGrowthStats);
router.get("/:storeId", controllers.findOne);

export default router;
