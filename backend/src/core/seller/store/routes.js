import { Router } from "express";
import { validateSchema, authStore } from "../../../middlewares/index.js";
import { upload } from "../../../libs/index.js";
import controllers from "./controllers.js";
import schemas from "./schemas.js";

const router = Router();

router.get("/", authStore, controllers.find);
router.get("/earnings", authStore, controllers.getEarnings);
router.post("/", validateSchema(schemas.create), controllers.create);
router.put(
  "/",
  authStore,
  upload.fields([
    { name: "nextProfile", maxCount: 1 },
    { name: "nextGallery", maxCount: 10 },
  ]),
  validateSchema(schemas.update),
  controllers.update
);
router.delete("/", authStore, controllers.remove);

export default router;
