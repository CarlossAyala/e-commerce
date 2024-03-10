const express = require("express");
const { validateSchema, authStore } = require("../../../middlewares");
const controllers = require("./controllers");
const schemas = require("./schemas");

const router = express.Router();

router.get("/", authStore, controllers.find);
router.get("/requests-verify", authStore, controllers.findRequestsVerify);
router.post("/", validateSchema(schemas.create), controllers.create);
router.put("/", authStore, validateSchema(schemas.update), controllers.update);
router.post(
  "/requests-verify",
  authStore,
  validateSchema(schemas.createRequestVerify),
  controllers.createRequestVerify
);
router.delete("/", authStore, controllers.remove);

module.exports = router;
