const { Router } = require("express");
const middlewares = require("../../../middlewares");
const controllers = require("./controllers");
const schemas = require("./schemas");

const router = Router();

router.param("productId", controllers.findById);

router.get("/", controllers.findAll);
router.get("/count", controllers.getCount);
router.get("/count-status", controllers.getCountStatus);
router.get("/growth-stats", controllers.getGrowthStats);
router.get("/:productId", controllers.findOne);
router.post(
  "/",
  middlewares.upload.array("gallery", 10),
  middlewares.schemaValidator(schemas.create),
  controllers.create,
);
router.put(
  "/:productId",
  middlewares.upload.array("nextGallery", 10),
  middlewares.schemaValidator(schemas.update),
  controllers.update,
);
router.delete("/:productId", controllers.remove);

module.exports = router;
