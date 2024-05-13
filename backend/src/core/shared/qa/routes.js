import { Router } from "express";
import controllers from "./controllers.js";

const router = Router();

router.param("productId", controllers.validateProductId);

router.get("/product/:productId", controllers.findAllProducts);

export default router;
