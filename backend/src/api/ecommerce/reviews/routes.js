const { Router } = require("express");
const middlewares = require("../../../middlewares");
const controllers = require("./controllers");
const schemas = require("./schemas");

const router = Router();

router.get("/done", middlewares.authenticate, controllers.findAllDone);
router.get("/pending", middlewares.authenticate, controllers.findAllPending);
router.get("/product/:productId", controllers.findAllByProductId);
router.get("/product/:productId/stats", controllers.productStats);
router.post(
  "/:orderItemId",
  middlewares.authenticate,
  middlewares.schemaValidator(schemas.create, "body"),
  controllers.create
);

module.exports = router;
