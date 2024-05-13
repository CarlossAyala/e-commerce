import { Router } from "express";
import controllers from "./controllers.js";

const router = Router();

router.get("/count", controllers.getCount);

export default router;
