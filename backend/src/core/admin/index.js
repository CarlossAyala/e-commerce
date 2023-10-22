const express = require("express");
const router = express.Router();
const categories = require("./category/category.routes");

router.use("/categories", categories);

module.exports = router;
