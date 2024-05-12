const { Router } = require("express");
const controllers = require("./controllers");

const router = Router();

router.param("storeId", controllers.validateStoreId);

router.get("/", controllers.findAll);
router.get("/count", controllers.getCount);
router.get("/growth-stats", controllers.getGrowthStats);
router.get("/:storeId", controllers.findOne);

module.exports = router;
