const { Router } = require("express");
const middlewares = require("../../../middlewares");
const controllers = require("./controllers");
const schemas = require("./schemas");

const router = Router();

router.param("productId", controllers.validateProductId);

router.get("/customer", controllers.findAllCustomer);
router.post(
  "/:productId",
  middlewares.schemaValidator(schemas.create),
  controllers.create
);

module.exports = router;
