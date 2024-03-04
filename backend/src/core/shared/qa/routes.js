const express = require("express");
const controllers = require("./controllers");

const router = express.Router();

router.param("productId", controllers.validateProductId);

router.get("/product/:productId", controllers.findAllProducts);

module.exports = router;
