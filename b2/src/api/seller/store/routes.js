const { Router } = require("express");
const middlewares = require("../../../middlewares");
const controllers = require("./controllers");
const schemas = require("./schemas");

const router = Router();

router.get("/", middlewares.authenticateStore, controllers.find);
router.get("/earnings", middlewares.authenticateStore, controllers.getEarnings);
router.post(
  "/",
  middlewares.schemaValidator(schemas.create),
  controllers.create
);
router.put(
  "/",
  middlewares.authenticateStore,
  middlewares.upload.fields([
    { name: "nextProfile", maxCount: 1 },
    { name: "nextGallery", maxCount: 10 },
  ]),
  middlewares.schemaValidator(schemas.update),
  controllers.update
);
router.delete("/", middlewares.authenticateStore, controllers.remove);

module.exports = router;
