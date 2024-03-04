const express = require("express");
const controllers = require("./controllers");
const schemas = require("./schemas");
const { validateSchema } = require("../../../middlewares");

const router = express.Router();

router.param("paymentIntentId", controllers.validatePaymentIntentId);

router.get("/:paymentIntentId", controllers.findPaymentIntent);
router.post("/", controllers.createPaymentIntent);
router.post(
  "/:paymentIntentId/confirm",
  validateSchema(schemas.confirmPaymentIntent, "body"),
  controllers.confirmPaymentIntent
);

module.exports = router;
