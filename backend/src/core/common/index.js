const express = require("express");
const router = express.Router();
const category = require("./category/category.routes");

router.use("/categories", category);

module.exports = router;
