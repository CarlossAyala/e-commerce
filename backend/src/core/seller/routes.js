import { Router } from "express";
import { authStore } from "../../middlewares/index.js";
import stores from "./store/routes.js";
import products from "./products/routes.js";
import qa from "./qa/routes.js";
import orders from "./orders/routes.js";
import reviews from "./review/routes.js";

const router = Router();

router.use("/stores", stores);
router.use("/products", authStore, products);
router.use("/qa", authStore, qa);
router.use("/orders", authStore, orders);
router.use("/reviews", authStore, reviews);

export default router;
