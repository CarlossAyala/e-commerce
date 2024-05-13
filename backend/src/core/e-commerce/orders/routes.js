import { Router } from "express";
import controllers from "./controllers.js";

const router = Router();

router.param("orderId", controllers.validateOrderId);
router.param("itemId", controllers.validateItemId);

router.get("/", controllers.findAll);
router.get("/:orderId", controllers.findOne);
router.get("/items/:itemId", controllers.findItem);

export default router;
