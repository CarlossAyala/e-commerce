import { Router } from "express";
import controllers from "./controllers.js";
import schemas from "./schemas.js";
import { validateSchema } from "../../../middlewares/index.js";

const router = Router();

router.param("questionId", controllers.validateQuestionId);
router.param("productId", controllers.validateProductId);

router.get("/", controllers.findAll);
router.get("/:questionId", controllers.findOne);
router.get("/product/:productId", controllers.findAllByProductId);
router.post(
  "/:questionId",
  validateSchema(schemas.answer, "body"),
  controllers.answer
);
router.patch("/:questionId", controllers.reject);

export default router;
