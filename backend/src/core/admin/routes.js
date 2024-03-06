const router = require("express").Router();
const categories = require("./category/routes");

router.use("/categories", categories);

module.exports = router;
