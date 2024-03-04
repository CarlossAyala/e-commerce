const express = require("express");
const auth = require("../core/auth/routes");
const seller = require("../core/seller/routes");
const shared = require("../core/shared/routes");
const customer = require("../core/customer/routes");
const { validateAccessToken, authentication } = require("../middlewares");
// const adminRoutes = require("../core/admin");

const routes = express.Router();

routes.use("/api/auth", auth);
routes.use("/api/seller", validateAccessToken, authentication, seller);
routes.use("/api/shared", shared);
routes.use("/api/customer", customer);
// routes.use("/api/admin", adminRoutes);

module.exports = routes;
