const router = require("express").Router();
const categories = require("./category/routes");
const stores = require("./stores/routes");

router.use("/categories", categories);
router.use("/stores", stores);

module.exports = router;
