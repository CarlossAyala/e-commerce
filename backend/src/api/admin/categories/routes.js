const { Router } = require("express");
const middlewares = require("../../../middlewares");
const controllers = require("./controllers");
const schemas = require("./schemas");

const router = Router();

router.param("categoryId", controllers.validateCategoryId);

router.get("/", controllers.getAll);
router.get("/count", controllers.getCount);
router.get("/:categoryId", controllers.findOne);
router.post(
  "/",
  middlewares.upload.array("gallery", 10),
  middlewares.schemaValidator(schemas.create),
  controllers.create
);
router.put(
  "/:categoryId",
  middlewares.upload.array("nextGallery", 10),
  middlewares.schemaValidator(schemas.update),
  controllers.update
);
router.patch(
  "/:categoryId/attach",
  middlewares.schemaValidator(schemas.categoryIds),
  controllers.attach
);
router.patch(
  "/:categoryId/detach",
  middlewares.schemaValidator(schemas.categoryIds),
  controllers.detach
);
router.delete("/:categoryId", controllers.remove);

module.exports = router;
