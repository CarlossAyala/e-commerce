import { Router } from "express";
import controllers from "./controllers.js";

const router = Router();

router.param("categoryId", controllers.validateCategoryId);

router.get("/:categoryId/products/randoms", controllers.getRandoms);

export default router;
