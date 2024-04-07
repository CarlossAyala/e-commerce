const router = require("express").Router();
const categories = require("./categories/routes");
const product = require("./product/routes");
const qa = require("./qa/routes");
const paymentMethod = require("./payment-method/routes");

router.use("/categories", categories);
router.use("/products", product);
router.use("/qa", qa);
router.use("/payment-methods", paymentMethod);

module.exports = router;
