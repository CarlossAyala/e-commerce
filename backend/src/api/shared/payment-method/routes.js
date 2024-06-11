const { Router } = require("express");
const middlewares = require("../../../middlewares");
const controllers = require("./controllers");
const schemas = require("./schemas");

const router = Router();

router.use(middlewares.authenticate);
router.use(middlewares.attachStripeAccount);

router.param("paymentMethodId", controllers.validatePaymentMethodId);
router.get("/", controllers.findAll);
router.get("/:paymentMethodId", controllers.findOne);
router.get("/session/:sessionId", controllers.findSession);
router.post(
  "/",
  middlewares.schemaValidator(schemas.create),
  controllers.create
);
router.delete("/:paymentMethodId", controllers.remove);

module.exports = router;
