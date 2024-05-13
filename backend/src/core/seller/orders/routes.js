import { Router } from "express";
import controllers from "./controllers.js";

const router = Router();

router.param("orderId", controllers.validateOrderId);

router.get("/", controllers.findAll);
router.get("/latest", controllers.findLatest);
router.get("/:orderId", controllers.findOne);

export default router;
