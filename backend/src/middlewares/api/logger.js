const router = require("express").Router();
const morgan = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream");

const accessLogStream = rfs.createStream("app-express.log", {
  interval: "1d",
  path: path.join("logs"),
});

router.use(morgan("dev")); //stream at console
router.use(morgan("combined", { stream: accessLogStream })); //stream at file

module.exports = router;
