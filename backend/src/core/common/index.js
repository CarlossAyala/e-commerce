const express = require("express");
const router = express.Router();
const category = require("./category/category.routes");
const product = require("./product/product.routes");
const reviews = require("./review/review.routes");

router.use("/categories", category);
router.use("/products", product);
router.use("/reviews", reviews);

module.exports = router;
