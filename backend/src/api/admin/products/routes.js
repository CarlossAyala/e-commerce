const { Router } = require("express");
const controllers = require("./controllers");

const router = Router();

router.get("/count", controllers.getCount);

module.exports = router;
