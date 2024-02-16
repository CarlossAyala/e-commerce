const express = require("express");
const auth = require("../core/auth/routes");
// const customerRoutes = require("./customer.routes");
// const sellerRoutes = require("./seller.routes");
// const sharedRoutes = require("../core/shared");
// const adminRoutes = require("../core/admin");

const routes = express.Router();

routes.use("/api/auth", auth);
// routes.use("/customer", customerRoutes);
// routes.use("/seller", sellerRoutes);
// routes.use("/api/shared", sharedRoutes);
// routes.use("/api/admin", adminRoutes);

module.exports = routes;
