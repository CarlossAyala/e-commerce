const express = require("express");
const { validateSchema } = require("../../../middlewares");
const controllers = require("./controllers");
const schemas = require("./schemas");

const router = express.Router();

router.param("storeId", controllers.validateStoreId);
router.param("requestId", controllers.validateRequestId);

router.get("/", controllers.findAll);
router.get("/requests-verify", controllers.findAllRequestsVerify);
router.get("/:storeId", controllers.findOne);
router.put(
  "/requests-verify/:requestId",
  validateSchema(schemas.updateRequestVerify),
  controllers.updateRequestVerify
);

module.exports = router;
