const express = require("express");
const controllers = require("./controllers");

const router = express.Router();

router.get("/", controllers.findAll);
router.get("/:productId", controllers.findOne);
router.post("/:productId", controllers.create);
router.delete("/clear", controllers.clear);
router.delete("/:productId", controllers.remove);

module.exports = router;
