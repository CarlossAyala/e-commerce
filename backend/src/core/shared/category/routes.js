const express = require("express");
const controllers = require("./controllers");

const router = express.Router();

router.param("categoryId", controllers.validateCategoryId);

router.get("/", controllers.findAllAndCount);
router.get("/all", controllers.findAll);
router.get("/:categoryId", controllers.findOne);

module.exports = router;
