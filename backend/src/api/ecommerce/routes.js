const { Router } = require("express");
const middlewares = require("../../middlewares");
const questions = require("./questions/routes");
const cart = require("./cart/routes");
const checkout = require("./checkout/routes");
const addresses = require("./addresses/routes");
const reviews = require("./reviews/routes");
const history = require("./history/routes");
const bookmarks = require("./bookmarks/routes");
const stores = require("./stores/routes");
const orders = require("./orders/routes");
const categories = require("./categories/routes");

const router = Router();

router.use("/questions", middlewares.authenticate, questions);
router.use("/cart", middlewares.authenticate, cart);
router.use(
  "/checkout",
  middlewares.authenticate,
  middlewares.attachStripeAccount,
  checkout
);
router.use("/addresses", middlewares.authenticate, addresses);
router.use("/reviews", reviews);
router.use("/orders", middlewares.authenticate, orders);
router.use("/history", middlewares.authenticate, history);
router.use("/bookmarks", middlewares.authenticate, bookmarks);
router.use("/stores", stores);
router.use("/categories", categories);

module.exports = router;
