import { Router } from "express";
import { validateSchema } from "../../../middlewares/index.js";
import controllers from "./controllers.js";
import schemas from "./schemas.js";

const router = Router();

router.param("paymentIntentId", controllers.validatePaymentIntentId);

router.get("/:paymentIntentId", controllers.findPaymentIntent);
router.post("/", controllers.createPaymentIntent);
router.post(
  "/:paymentIntentId/confirm",
  validateSchema(schemas.confirmPaymentIntent, "body"),
  controllers.confirmPaymentIntent
);

export default router;
