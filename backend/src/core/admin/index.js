const express = require("express");
const router = express.Router();
const categories = require("./category/category.routes");
const requestsOfficialStores = require("./requests-official-stores/routes");
const stats = require("./stats/routes");

router.use("/categories", categories);
router.use("/requests-official-stores", requestsOfficialStores);
router.use("/stats", stats);

module.exports = router;
