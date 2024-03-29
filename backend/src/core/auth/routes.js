const express = require("express");
const schemas = require("./schemas");
const controllers = require("./controllers");
const {
  validateSchema,
  validateAccessToken,
  authentication,
} = require("../../middlewares");

const router = express.Router();

router.post(
  "/signup",
  validateSchema(schemas.signup, "body"),
  controllers.signup
);

router.post(
  "/signin",
  validateSchema(schemas.signin, "body"),
  controllers.signin
);

router.post("/refresh-token", controllers.refresh);

router.post("/signout", controllers.signout);

router.get(
  "/profile",
  validateAccessToken,
  authentication,
  controllers.profile
);

// TODO:
// router.patch(
//   "/change-full-name",
//   JWT.verify,
//   validateSchema(schemas.changeName, "body"),
//   async (req, res, next) => {
//     const { id } = req.auth;
//     const { name, lastName } = req.body;

//     try {
//       const account = await User.model.findByPk(id);
//       if (!account) {
//         return next(Boom.notFound("Account not found"));
//       }
//       delete account.dataValues.password;

//       await account.update({ name, lastName });

//       return res.status(200).json(account);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.patch(
//   "/change-password",
//   JWT.verify,
//   validateSchema(schemas.changePassword, "body"),
//   async (req, res, next) => {
//     const { id } = req.auth;
//     const { oldPassword, newPassword } = req.body;

//     try {
//       const account = await User.model.findByPk(id);
//       if (!account) {
//         return next(Boom.notFound("Account not found"));
//       }

//       const isValidPassword = await bcrypt.compare(
//         oldPassword,
//         account.dataValues.password
//       );
//       if (!isValidPassword) {
//         return next(Boom.badRequest("Password is incorrect"));
//       }

//       const hashedPassword = await bcrypt.hash(newPassword);
//       await account.update({ password: hashedPassword });

//       return res.status(200).json({
//         message: "Password updated successfully",
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

module.exports = router;
