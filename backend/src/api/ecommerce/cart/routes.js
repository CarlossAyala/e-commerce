const { Router } = require("express");
const middlewares = require("../../../middlewares");
const controllers = require("./controllers");
const schemas = require("./schemas");

const router = Router();

router.param("productId", controllers.validateProductId);

router.get("/", controllers.findAll);
router.post(
  "/:productId",
  middlewares.schemaValidator(schemas.create),
  controllers.create
);
router.patch(
  "/:productId",
  middlewares.schemaValidator(schemas.update),
  controllers.update
);
router.delete("/:productId", controllers.remove);

module.exports = router;
