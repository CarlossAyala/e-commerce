import { Router } from "express";
import { validateSchema } from "../../../middlewares/index.js";
import { upload } from "../../../libs/index.js";
import controllers from "./controllers.js";
import schemas from "./schemas.js";

const router = Router();

router.param("productId", controllers.findById);

router.get("/", controllers.findAll);
router.get("/count", controllers.getCount);
router.get("/count-status", controllers.getCountStatus);
router.get("/growth-stats", controllers.getGrowthStats);
router.get("/:productId", controllers.findOne);
router.post(
  "/",
  upload.array("gallery", 10),
  validateSchema(schemas.create),
  controllers.create
);
router.put(
  "/:productId",
  upload.array("nextGallery", 10),
  validateSchema(schemas.update),
  controllers.update
);
router.delete("/:productId", controllers.remove);

export default router;
