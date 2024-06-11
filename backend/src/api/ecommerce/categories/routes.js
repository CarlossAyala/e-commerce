const { Router } = require("express");
const controllers = require("./controllers");

const router = Router();

router.param("categoryId", controllers.validateCategoryId);

router.get("/:categoryId/products/randoms", controllers.getRandoms);

module.exports = router;
