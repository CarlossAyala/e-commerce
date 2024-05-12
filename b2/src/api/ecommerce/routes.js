const { Router } = require("express");
const middlewares = require("../../middlewares");
const qa = require("./qa/routes");
const cart = require("./cart/routes");
const checkout = require("./checkout/routes");
const address = require("./address/routes");
const review = require("./review/routes");
const history = require("./history/routes");
const bookmarks = require("./bookmark/routes");
const stores = require("./stores/routes");
const orders = require("./orders/routes");
const categories = require("./categories/routes");

const router = Router();

router.use("/qa", middlewares.authenticate, qa);
router.use("/cart", middlewares.authenticate, cart);
router.use(
  "/checkout",
  middlewares.authenticate,
  middlewares.authenticateStore,
  checkout
);
router.use("/addresses", middlewares.authenticate, address);
router.use("/reviews", review);
router.use("/orders", middlewares.authenticate, orders);
router.use("/history", middlewares.authenticate, history);
router.use("/bookmarks", middlewares.authenticate, bookmarks);
router.use("/stores", stores);
router.use("/categories", categories);

module.exports = router;
