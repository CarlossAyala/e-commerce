const { Router } = require("express");
const controllers = require("./controllers");

const router = Router();

router.param("orderId", controllers.validateOrderId);

router.get("/", controllers.findAll);
router.get("/latest", controllers.findLatest);
router.get("/:orderId", controllers.findOne);

module.exports = router;
