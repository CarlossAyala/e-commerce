const express = require("express");
const auth = require("../core/auth/routes");
const seller = require("../core/seller/routes");
const shared = require("../core/shared/routes");
const { validateAccessToken } = require("../middlewares");
// const customerRoutes = require("./customer.routes");
// const adminRoutes = require("../core/admin");

const routes = express.Router();

routes.use("/api/auth", auth);
routes.use("/api/seller", validateAccessToken, seller);
routes.use("/api/shared", shared);
// routes.use("/customer", customerRoutes);
// routes.use("/api/admin", adminRoutes);

module.exports = routes;
