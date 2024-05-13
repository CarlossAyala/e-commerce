import { Router } from "express";
import morgan from "morgan";
import path from "path";
import rfs from "rotating-file-stream";

const router = Router();

// TODO: Change Logger?
const accessLogStream = rfs.createStream("app-express.log", {
  interval: "1d",
  path: path.join("logs"),
});

router.use(morgan("dev")); //stream at console
router.use(morgan("combined", { stream: accessLogStream })); //stream at file

module.exports = router;
