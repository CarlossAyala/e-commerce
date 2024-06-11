const { Router } = require("express");
const controllers = require("./controllers");

const router = Router();

router.param("categoryId", controllers.validateCategoryId);

router.get("/", controllers.findAll);
router.get("/:categoryId", controllers.findOne);

module.exports = router;
