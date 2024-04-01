const express = require("express");
const controllers = require("./controllers");
const schemas = require("./schemas");
const {
  validateSchema,
  authentication,
  validateAccessToken,
} = require("../../../middlewares");

const auth = [validateAccessToken, authentication];
const router = express.Router();

router.get("/done", auth, controllers.findAllDone);
router.get("/pending", auth, controllers.findAllPending);
router.get("/product/:productId", controllers.findAllByProductId);
router.get("/product/:productId/stats", controllers.productStats);
router.post(
  "/:orderItemId",
  auth,
  validateSchema(schemas.create, "body"),
  controllers.create
);

module.exports = router;
