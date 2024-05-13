import { Router } from "express";
import {
  authentication,
  validateAccessToken,
  checkStripeAccount,
} from "../../middlewares/index.js";
import qa from "./qa/routes.js";
import cart from "./cart/routes.js";
import checkout from "./checkout/routes.js";
import address from "./address/routes.js";
import review from "./review/routes.js";
import history from "./history/routes.js";
import bookmarks from "./bookmark/routes.js";
import stores from "./stores/routes.js";
import orders from "./orders/routes.js";
import categories from "./categories/routes.js";

const router = Router();
const auth = [validateAccessToken, authentication];

router.use("/qa", auth, qa);
router.use("/cart", auth, cart);
router.use("/checkout", auth, checkStripeAccount, checkout);
router.use("/addresses", auth, address);
router.use("/reviews", review);
router.use("/orders", auth, orders);
router.use("/history", auth, history);
router.use("/bookmarks", auth, bookmarks);
router.use("/stores", stores);
router.use("/categories", categories);

export default router;
