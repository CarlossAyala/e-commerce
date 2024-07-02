const { Router } = require("express");
const middlewares = require("../../../middlewares");
const controllers = require("./controllers");
const schemas = require("./schemas");

const router = Router();

router.param("storeId", controllers.validateStoreId);

router.get("/", controllers.findAllChats);
router.get(
  "/:storeId/messages",
  controllers.attachChat,
  controllers.findAllMessages,
);
router.post(
  "/:storeId/messages",
  middlewares.schemaValidator(schemas.create),
  controllers.findOrCreateChat,
  controllers.create,
);

module.exports = router;
