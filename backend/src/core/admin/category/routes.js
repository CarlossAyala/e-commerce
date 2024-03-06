const express = require("express");
const controllers = require("./controllers");
const schemas = require("./schemas");
const { validateSchema } = require("../../../middlewares");

const router = express.Router();

router.param("categoryId", controllers.validateCategoryId);

router.get("/", controllers.findAll);
router.get("/:categoryId", controllers.findOne);
router.post("/", validateSchema(schemas.create), controllers.create);
router.put("/:categoryId", validateSchema(schemas.update), controllers.update);
router.patch(
  "/:categoryId/attach",
  validateSchema(schemas.categoryIds),
  controllers.attach
);
router.patch(
  "/:categoryId/detach",
  validateSchema(schemas.categoryIds),
  controllers.detach
);
router.delete("/:categoryId", controllers.remove);

module.exports = router;
