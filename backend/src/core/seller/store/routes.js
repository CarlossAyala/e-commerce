const express = require("express");
const { validateSchema, authStore } = require("../../../middlewares");
const controllers = require("./controllers");
const schemas = require("./schemas");

const router = express.Router();

router.get("/", authStore, controllers.find);
router.post("/", validateSchema(schemas.create), controllers.create);
router.put("/", authStore, validateSchema(schemas.update), controllers.update);
router.delete("/", authStore, controllers.remove);

module.exports = router;
