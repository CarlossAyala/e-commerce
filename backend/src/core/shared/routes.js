import { Router } from "express";
import categories from "./categories/routes.js";
import product from "./products/routes.js";
import qa from "./qa/routes.js";
import paymentMethod from "./payment-method/routes.js";

const router = Router();

router.use("/categories", categories);
router.use("/products", product);
router.use("/qa", qa);
router.use("/payment-methods", paymentMethod);

export default router;
