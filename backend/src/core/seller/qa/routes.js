const express = require("express");
const controllers = require("./controllers");
const schemas = require("./schemas");
const { validateSchema } = require("../../../middlewares");

const router = express.Router();

router.param("questionId", controllers.validateQuestionId);
router.param("productId", controllers.validateProductId);

router.get("/", controllers.findAll);
router.get("/:questionId", controllers.findOne);
router.get("/product/:productId", controllers.findAllByProductId);
router.post(
  "/:questionId",
  validateSchema(schemas.answer, "body"),
  controllers.answer
);
router.patch("/:questionId", controllers.reject);

module.exports = router;
