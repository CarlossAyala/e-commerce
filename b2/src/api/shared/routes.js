const { Router } = require("express");
const categories = require("./categories/routes");
const product = require("./products/routes");
const qa = require("./qa/routes");
const paymentMethod = require("./payment-method/routes");

const router = Router();

router.use("/categories", categories);
router.use("/products", product);
router.use("/qa", qa);
router.use("/payment-methods", paymentMethod);

module.exports = router;
