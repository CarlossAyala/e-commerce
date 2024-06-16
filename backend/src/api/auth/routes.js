const { Router } = require("express");
const middlewares = require("../../middlewares");
const controllers = require("./controllers");
const schemas = require("./schemas");

const router = Router();

router.post(
  "/signin",
  middlewares.schemaValidator(schemas.signin),
  controllers.signin,
);
router.post(
  "/signup",
  middlewares.schemaValidator(schemas.signup),
  controllers.signup,
);
router.post("/signout", controllers.signout);
router.post("/refresh-token", controllers.refreshToken);
router.get("/profile", middlewares.authenticate, controllers.profile);
router.put(
  "/profile",
  middlewares.authenticate,
  middlewares.schemaValidator(schemas.updateProfile),
  controllers.updateProfile,
);
router.patch(
  "/password",
  middlewares.authenticate,
  middlewares.schemaValidator(schemas.changePassword),
  controllers.changePassword,
);

module.exports = router;
