import { Router } from "express";
import controllers from "./controllers.js";
import schemas from "./schemas.js";
import {
  validateAccessToken,
  authentication,
  checkStripeAccount,
  validateSchema,
} from "../../../middlewares/index.js";

const router = Router();
const auth = [validateAccessToken, authentication, checkStripeAccount];

router.use(auth);

router.param("paymentMethodId", controllers.validatePaymentMethodId);
router.get("/", controllers.findAll);
router.get("/:paymentMethodId", controllers.findOne);
router.get("/session/:sessionId", controllers.findSession);
router.post("/", validateSchema(schemas.create, "body"), controllers.create);
router.delete("/:paymentMethodId", controllers.remove);

export default router;
