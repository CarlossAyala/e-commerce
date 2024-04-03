const express = require("express");
const { validateSchema } = require("../../../middlewares");
const controllers = require("./controllers");
const schemas = require("./schemas");

const router = express.Router();

router.param("productId", controllers.findById);

router.get("/", controllers.findAll);
router.get("/:productId", controllers.findOne);
router.post("/", validateSchema(schemas.create), controllers.create);
router.put("/:productId", validateSchema(schemas.update), controllers.update);
router.delete("/:productId", controllers.remove);

module.exports = router;
