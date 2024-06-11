const { Router } = require("express");
const controllers = require("./controllers");

const router = Router();

router.get("/count", controllers.getCount);
router.get("/growth-stats", controllers.getGrowthStats);

module.exports = router;
