const express = require("express");
const controllers = require("./controllers");
const schemas = require("./schemas");
const { validateSchema } = require("../../../middlewares");

const router = express.Router();

router.param("productId", controllers.findById);

router.get("/", controllers.findAll);
router.get("/stock-alert", controllers.stockAlert);
router.get("/:productId", controllers.findOne);
router.post("/", validateSchema(schemas.create, "body"), controllers.create);
router.put(
  "/:productId",
  validateSchema(schemas.update, "body"),
  controllers.update
);
router.patch(
  "/:productId/stock-alert",
  validateSchema(schemas.stockAlert, "body"),
  controllers.updateStockAlert
);
router.delete("/:productId", controllers.remove);

module.exports = router;
