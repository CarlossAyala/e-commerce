const express = require("express");
const controllers = require("./controllers");

const router = express.Router();

router.param("orderId", controllers.validateOrderId);
router.param("itemId", controllers.validateItemId);

router.get("/", controllers.findAll);
router.get("/:orderId", controllers.findOne);
router.get("/items/:itemId", controllers.findItem);

module.exports = router;
