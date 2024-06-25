const { Router } = require("express");
const middlewares = require("../../../middlewares");
const controllers = require("./controllers");
const schemas = require("./schemas");

const router = Router();

router.get("/", controllers.findAll);
router.get(
  "/:chatId/messages",
  controllers.validateChat,
  controllers.findAllMessages,
);
router.post(
  "/:chatId/messages",
  controllers.validateChat,
  middlewares.schemaValidator(schemas.create),
  controllers.create,
);

module.exports = router;
