const router = require("express").Router();
const controllers = require("./controllers");

router.param("productId", controllers.findById);

router.get("/", controllers.findAll);
router.get("/:productId", controllers.findOne);
router.get("/:productId/related", controllers.findRelated);

module.exports = router;
