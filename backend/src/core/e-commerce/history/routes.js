import { Router } from "express";
import controllers from "./controllers.js";

const router = Router();

router.get("/", controllers.findAll);
router.post("/:productId", controllers.create);
router.delete("/clear", controllers.clear);
router.delete("/:productId", controllers.remove);

export default router;
