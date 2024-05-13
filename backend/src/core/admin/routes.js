import { Router } from "express";
import categories from "./categories/routes.js";
import stores from "./stores/routes.js";
import users from "./users/routes.js";
import products from "./products/routes.js";

const router = Router();

router.use("/categories", categories);
router.use("/stores", stores);
router.use("/users", users);
router.use("/products", products);

export default router;
