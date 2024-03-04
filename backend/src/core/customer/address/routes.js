const express = require("express");
const controllers = require("./controllers");
const schemas = require("./schemas");
const { validateSchema } = require("../../../middlewares");

const router = express.Router();

router.param("addressId", controllers.validateAddressId);

router.get("/", controllers.findAll);
router.get("/:addressId", controllers.findOne);
router.post("/", validateSchema(schemas.create, "body"), controllers.create);
router.put(
  "/:addressId",
  validateSchema(schemas.update, "body"),
  controllers.update
);
router.delete("/:addressId", controllers.remove);

module.exports = router;
