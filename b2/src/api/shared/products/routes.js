const { Router } = require("express");
const controllers = require("./controllers");

const router = Router();

router.param("productId", controllers.findById);

router.get("/", controllers.findAll);
router.get("/:productId", controllers.findOne);
router.get("/:productId/related", controllers.findRelated);

module.exports = router;
