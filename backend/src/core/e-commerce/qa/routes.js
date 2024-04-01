const express = require("express");
const { validateSchema } = require("../../../middlewares");
const controllers = require("./controllers");
const schemas = require("./schemas");

const router = express.Router();

router.param("productId", controllers.validateProductId);

router.get("/customer", controllers.findAllCustomer);
router.get(
  "/product/:productId/customer",
  controllers.findAllCustomerByProduct
);
router.post(
  "/:productId",
  validateSchema(schemas.create, "body"),
  controllers.create
);

module.exports = router;
