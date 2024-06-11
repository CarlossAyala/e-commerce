const { Router } = require("express");
const middlewares = require("../../middlewares");
const stores = require("./store/routes");
const products = require("./products/routes");
const questions = require("./questions/routes");
const orders = require("./orders/routes");
const reviews = require("./review/routes");

const router = Router();

router.use("/stores", stores);
router.use(
  "/products",
  middlewares.authenticate,
  middlewares.authenticateStore,
  products
);
router.use(
  "/questions",
  middlewares.authenticate,
  middlewares.authenticateStore,
  questions
);
router.use(
  "/orders",
  middlewares.authenticate,
  middlewares.authenticateStore,
  orders
);
router.use(
  "/reviews",
  middlewares.authenticate,
  middlewares.authenticateStore,
  reviews
);

module.exports = router;
