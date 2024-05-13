import { Router } from "express";
import controllers from "./controllers.js";
import schemas from "./schemas.js";
import { validateSchema } from "../../../middlewares/index.js";

const router = Router();

router.param("addressId", controllers.validateAddressId);

router.get("/", controllers.findAll);
router.get("/:addressId", controllers.findOne);
router.post("/", validateSchema(schemas.create, "body"), controllers.create);
router.put(
  "/:addressId",
  validateSchema(schemas.update, "body"),
  controllers.update
);
router.delete("/:addressId", controllers.remove);

export default router;
