const router = require("express").Router();
const { authStore } = require("../../middlewares");
const stores = require("./store/routes");
const products = require("./product/routes");
const qa = require("./qa/routes");
const orders = require("./orders/routes");
const reviews = require("./review/routes");

router.use("/stores", stores);
router.use("/products", authStore, products);
router.use("/qa", authStore, qa);
router.use("/orders", authStore, orders);
router.use("/reviews", authStore, reviews);

module.exports = router;
