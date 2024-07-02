const { Router } = require("express");
const middlewares = require("../../../middlewares");
const controllers = require("./controllers");
const schemas = require("./schemas");

const router = Router();

router.param("addressId", controllers.validateAddressId);

router.get("/", controllers.findAll);
router.get("/:addressId", controllers.findOne);
router.post(
  "/",
  middlewares.schemaValidator(schemas.create),
  controllers.create,
);
router.put(
  "/:addressId",
  middlewares.schemaValidator(schemas.update),
  controllers.update,
);
router.delete("/:addressId", controllers.remove);

module.exports = router;
