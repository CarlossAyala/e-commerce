import { Router } from "express";
import controllers from "./controllers.js";
import schemas from "./schemas.js";
import { validateSchema } from "../../../middlewares/index.js";

const router = Router();

router.param("productId", controllers.validateProductId);

router.get("/", controllers.findAll);
router.post(
  "/:productId",
  validateSchema(schemas.create, "body"),
  controllers.create
);
router.patch(
  "/:productId",
  validateSchema(schemas.update, "body"),
  controllers.update
);
router.delete("/:productId", controllers.remove);

export default router;
