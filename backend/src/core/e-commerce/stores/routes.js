import { Router } from "express";
import controllers from "./controllers.js";

const router = Router();

router.get("/", controllers.findAll);
router.get("/:storeId", controllers.findOne);
router.get("/find-by-product-id/:productId", controllers.findByProductId);
router.get("/:storeId/products", controllers.findProducts);

export default router;
