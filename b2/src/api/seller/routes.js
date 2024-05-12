const { Router } = require("express");
const middlewares = require("../../middlewares");
const stores = require("./store/routes");
const products = require("./products/routes");
const qa = require("./qa/routes");
const orders = require("./orders/routes");
const reviews = require("./review/routes");

const router = Router();

router.use("/stores", stores);
router.use("/products", middlewares.authenticateStore, products);
router.use("/qa", middlewares.authenticateStore, qa);
router.use("/orders", middlewares.authenticateStore, orders);
router.use("/reviews", middlewares.authenticateStore, reviews);

module.exports = router;
