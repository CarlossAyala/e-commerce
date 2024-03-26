const express = require("express");
const controllers = require("./controllers");

const router = express.Router();

router.param("slug", controllers.validateCategorySlug);
router.get("/main", controllers.getAllMain);
router.get("/full", controllers.getAllFull);
router.get("/:slug", controllers.getCategoryBySlug);
router.get("/:slug/list", controllers.getCategoryListBySlug);
router.get("/:slug/products/best-seller", controllers.getBestSeller);
router.get("/:slug/products/random", controllers.getRandomProducts);
router.get("/:slug/stores", controllers.getStores);

module.exports = router;
