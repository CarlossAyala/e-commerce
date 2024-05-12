const { Router } = require("express");
const categories = require("./categories/routes");
const stores = require("./stores/routes");
const users = require("./users/routes");
const products = require("./products/routes");

const router = Router();

router.use("/categories", categories);
router.use("/stores", stores);
router.use("/users", users);
router.use("/products", products);

module.exports = router;
