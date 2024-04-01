const express = require("express");
const { validateAccessToken, authentication } = require("./middlewares");
const auth = require("./core/auth/routes");
const seller = require("./core/seller/routes");
const shared = require("./core/shared/routes");
const eCommerce = require("./core/e-commerce/routes");
const admin = require("./core/admin/routes");

const routes = express.Router();

routes.use("/api/auth", auth);
routes.use("/api/seller", validateAccessToken, authentication, seller);
routes.use("/api/shared", shared);
routes.use("/api/e-commerce", eCommerce);
routes.use("/api/admin", validateAccessToken, authentication, admin);

module.exports = routes;
