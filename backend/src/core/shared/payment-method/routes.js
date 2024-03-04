const express = require("express");
const controllers = require("./controllers");
const schemas = require("./schemas");
const {
  validateAccessToken,
  authentication,
  checkStripeAccount,
  validateSchema,
} = require("../../../middlewares");

const router = express.Router();
const auth = [validateAccessToken, authentication, checkStripeAccount];

router.use(auth);

router.param("paymentMethodId", controllers.validatePaymentMethodId);
router.get("/", controllers.findAll);
router.get("/:paymentMethodId", controllers.findOne);
router.get("/session/:sessionId", controllers.findSession);
router.post("/", validateSchema(schemas.create, "body"), controllers.create);
router.delete("/:paymentMethodId", controllers.remove);

module.exports = router;
