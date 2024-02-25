const router = require("express").Router();
const stores = require("./store/routes");
const { authentication, validateAccessToken } = require("../../middlewares");

router.use("/stores", validateAccessToken, authentication, stores);

module.exports = router;
