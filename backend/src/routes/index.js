const express = require("express");
const routes = express.Router();
const customerRoutes = require("./customer.routes");
const sellerRoutes = require("./seller.routes");
const sharedRoutes = require("../core/shared");
const authRoutes = require("../core/auth/auth.routes");
const adminRoutes = require("../core/admin");

routes.use("/customer", customerRoutes);
routes.use("/seller", sellerRoutes);
routes.use("/api/shared", sharedRoutes);
routes.use("/api/auth", authRoutes);
routes.use("/api/admin", adminRoutes);

module.exports = routes;
