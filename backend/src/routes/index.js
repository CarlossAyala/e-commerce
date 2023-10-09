const express = require("express");
const routes = express.Router();
const customerRoutes = require("./customer.routes");
const sellerRoutes = require("./seller.routes");
const systemRoutes = require("./system.routes");
const stripeRoutes = require("./stripe.routes");
const common = require("../core/common");
const authRoutes = require("../core/auth/auth.routes");

routes.use("/customer", customerRoutes);
routes.use("/seller", sellerRoutes);
routes.use("/system", systemRoutes);
routes.use("/stripe", stripeRoutes);
routes.use("/api/common", common);
routes.use("/api/auth", authRoutes);

module.exports = routes;
