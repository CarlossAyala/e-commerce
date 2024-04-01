const express = require("express");
const { validateSchema } = require("../../../middlewares");
const controllers = require("./controllers");
const schemas = require("./schemas");

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
