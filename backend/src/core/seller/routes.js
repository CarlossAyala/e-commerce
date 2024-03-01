const router = require("express").Router();
const stores = require("./store/routes");
const products = require("./product/routes");
const qa = require("./qa/routes");
const { authentication, authStore } = require("../../middlewares");

router.use("/stores", authentication, stores);
router.use("/products", authentication, authStore, products);
router.use("/qa", authentication, authStore, qa);

module.exports = router;
