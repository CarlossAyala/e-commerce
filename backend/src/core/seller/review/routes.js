import { Router } from "express";
import controllers from "./controllers.js";

const router = Router();

router.param("productId", controllers.validateProductId);

router.get("/", controllers.findAll);
router.get("/products/:productId", controllers.findAllByProductId);
router.get("/products/:productId/avg-rating", controllers.avgRatingByProductId);

export default router;
