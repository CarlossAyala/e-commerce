import { Router } from "express";
import controllers from "./controllers.js";
import schemas from "./schemas.js";
import { validateSchema } from "../../../middlewares/index.js";
import { upload } from "../../../libs/index.js";

const router = Router();

router.param("categoryId", controllers.validateCategoryId);

router.get("/", controllers.getAll);
router.get("/count", controllers.getCount);
router.get("/:categoryId", controllers.findOne);
router.post(
  "/",
  upload.array("gallery", 10),
  validateSchema(schemas.create),
  controllers.create
);
router.put(
  "/:categoryId",
  upload.array("nextGallery", 10),
  validateSchema(schemas.update),
  controllers.update
);
router.patch(
  "/:categoryId/attach",
  validateSchema(schemas.categoryIds),
  controllers.attach
);
router.patch(
  "/:categoryId/detach",
  validateSchema(schemas.categoryIds),
  controllers.detach
);
router.delete("/:categoryId", controllers.remove);

export default router;
