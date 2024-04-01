const express = require("express");
const controllers = require("./controllers");

const router = express.Router();

router.get("/", controllers.findAll);
router.get("/:storeId", controllers.findOne);
router.get("/find-by-product-id/:productId", controllers.findByProductId);
router.get("/:storeId/products", controllers.findProducts);

module.exports = router;
