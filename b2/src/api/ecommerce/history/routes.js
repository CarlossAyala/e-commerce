const { Router } = require("express");
const controllers = require("./controllers");

const router = Router();

router.get("/", controllers.findAll);
router.post("/:productId", controllers.create);
router.delete("/clear", controllers.clear);
router.delete("/:productId", controllers.remove);

module.exports = router;
