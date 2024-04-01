const express = require("express");
const controllers = require("./controllers");
const schemas = require("./schemas");
const { validateSchema } = require("../../../middlewares");

const router = express.Router();

router.param("productId", controllers.validateProductId);

router.get("/", controllers.findAll);
router.post(
  "/:productId",
  validateSchema(schemas.create, "body"),
  controllers.create
);
router.patch(
  "/:productId",
  validateSchema(schemas.update, "body"),
  controllers.update
);
router.delete("/:productId", controllers.remove);

module.exports = router;
