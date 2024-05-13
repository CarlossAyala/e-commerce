import { Router } from "express";
import { validateSchema } from "../../../middlewares/index.js";
import controllers from "./controllers.js";
import schemas from "./schemas.js";

const router = Router();

router.param("productId", controllers.validateProductId);

router.get("/customer", controllers.findAllCustomer);
router.get(
  "/product/:productId/customer",
  controllers.findAllCustomerByProduct
);
router.post(
  "/:productId",
  validateSchema(schemas.create, "body"),
  controllers.create
);

export default router;
