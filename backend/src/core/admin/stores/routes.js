const express = require("express");
const controllers = require("./controllers");

const router = express.Router();

router.param("storeId", controllers.validateStoreId);

router.get("/", controllers.findAll);
router.get("/:storeId", controllers.findOne);

module.exports = router;
