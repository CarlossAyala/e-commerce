const { Router } = require("express");
const auth = require("./auth/routes");
const admin = require("./admin/routes");
const shared = require("./shared/routes");
const seller = require("./seller/routes");
const ecommerce = require("./ecommerce/routes");

const routes = Router();

routes.use("/api/auth", auth);
routes.use("/api/admin", admin);
routes.use("/api/shared", shared);
routes.use("/api/seller", seller);
routes.use("/api/e-commerce", ecommerce);

module.exports = routes;
