const router = require("express").Router();
const {
  authentication,
  validateAccessToken,
  checkStripeAccount,
} = require("../../middlewares");
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

module.exports = router;
