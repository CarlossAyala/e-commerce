import { Router } from "express";
import { validateAccessToken, authentication } from "./middlewares/index.js";
import auth from "./core/auth/routes.js";
import seller from "./core/seller/routes.js";
import shared from "./core/shared/routes.js";
import eCommerce from "./core/e-commerce/routes.js";
import admin from "./core/admin/routes.js";

const routes = Router();

routes.use("/api/auth", auth);
routes.use("/api/seller", validateAccessToken, authentication, seller);
routes.use("/api/shared", shared);
routes.use("/api/e-commerce", eCommerce);
routes.use("/api/admin", validateAccessToken, authentication, admin);

export default routes;
