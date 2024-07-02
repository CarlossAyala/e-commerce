const { Router } = require("express");
const middlewares = require("../../../middlewares");
const controllers = require("./controllers");
const schemas = require("./schemas");

const router = Router();

router.param("questionId", controllers.validateQuestionId);
router.param("productId", controllers.validateProductId);

router.get("/", controllers.findAll);
router.get("/:questionId", controllers.findOne);
router.get("/product/:productId", controllers.findAllByProductId);
router.post(
  "/:questionId",
  middlewares.schemaValidator(schemas.answer, "body"),
  controllers.answer,
);
router.patch("/:questionId", controllers.reject);

module.exports = router;
