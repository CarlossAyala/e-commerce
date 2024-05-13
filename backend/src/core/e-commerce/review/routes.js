import { Router } from "express";
import controllers from "./controllers.js";
import schemas from "./schemas.js";
import {
  validateSchema,
  authentication,
  validateAccessToken,
} from "../../../middlewares/index.js";

const router = Router();
const auth = [validateAccessToken, authentication];

router.get("/done", auth, controllers.findAllDone);
router.get("/pending", auth, controllers.findAllPending);
router.get("/product/:productId", controllers.findAllByProductId);
router.get("/product/:productId/stats", controllers.productStats);
router.post(
  "/:orderItemId",
  auth,
  validateSchema(schemas.create, "body"),
  controllers.create
);

export default router;
