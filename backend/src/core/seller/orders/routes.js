const express = require("express");
const controllers = require("./controllers");

const router = express.Router();

router.param("orderId", controllers.validateOrderId);

router.get("/", controllers.findAll);
router.get("/:orderId", controllers.findOne);

module.exports = router;
