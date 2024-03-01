const router = require("express").Router();
const categories = require("./category/routes");
const products = require("./product/routes");

router.use("/categories", categories);
router.use("/products", products);

module.exports = router;
