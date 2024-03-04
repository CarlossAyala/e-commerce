const express = require("express");
const controllers = require("./controllers");

const router = express.Router();

router.param("productId", controllers.validateProductId);

router.get("/", controllers.findAll);
router.get("/products/:productId", controllers.findAllByProductId);
router.get("/products/:productId/avg-rating", controllers.avgRatingByProductId);

module.exports = router;
