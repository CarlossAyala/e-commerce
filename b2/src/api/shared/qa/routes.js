const { Router } = require("express");
const controllers = require("./controllers");

const router = Router();

router.param("productId", controllers.validateProductId);

router.get("/product/:productId", controllers.findAllProducts);

module.exports = router;
