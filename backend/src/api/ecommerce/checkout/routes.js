const { Router } = require("express");
const middlewares = require("../../../middlewares");
const controllers = require("./controllers");
const schemas = require("./schemas");

const router = Router();

router.param("paymentIntentId", controllers.validatePaymentIntentId);

router.get("/:paymentIntentId", controllers.findPaymentIntent);
router.post("/", controllers.createPaymentIntent);
router.post(
  "/:paymentIntentId/confirm",
  middlewares.schemaValidator(schemas.confirmPaymentIntent),
  controllers.confirmPaymentIntent,
);

module.exports = router;
