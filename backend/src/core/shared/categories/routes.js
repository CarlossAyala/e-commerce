import { Router } from "express";
import controllers from "./controllers.js";

const router = Router();

router.param("categoryId", controllers.validateCategoryId);

router.get("/", controllers.findAll);
router.get("/:categoryId", controllers.findOne);

export default router;
