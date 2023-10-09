const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const { JWT, validateSchema } = require("../../middlewares");
const schemas = require("./auth.schemas");
const { bcrypt, Stripe } = require("../../libs");
const { User, Cart } = require("../../database/mysql/models");

router.post(
  "/signup",
  validateSchema(schemas.signup, "body"),
  async (req, res, next) => {
    const { name, lastName, email, password } = req.body;

    try {
      const userExist = await User.model.findOne({
        where: {
          email,
        },
      });
      if (userExist) {
        return next(Boom.badRequest("Email already exists"));
      }

      const hashedPassword = await bcrypt.hash(password);
      const customer = await User.model.create({
        name,
        lastName,
        email,
        password: hashedPassword,
      });

      await Cart.model.create({
        customerId: customer.dataValues.id,
      });
      await Stripe.customers.create({
        name: `${name} ${lastName}`,
        email,
      });

      return res.status(201).json({
        message: "Account created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/signin",
  validateSchema(schemas.signin, "body"),
  async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const userExist = await User.model.findOne({
        where: { email },
      });
      if (!userExist) {
        return next(
          Boom.badRequest("Please provide a valid email address or password")
        );
      }

      const isValidPassword = await bcrypt.compare(
        password,
        userExist.dataValues.password
      );
      if (!isValidPassword) {
        return next(
          Boom.badRequest("Please provide a valid email address or password")
        );
      }

      const token = await JWT.sign({
        id: userExist.dataValues.id,
      });

      delete userExist.dataValues.password;

      return res.status(200).json({
        token,
        customer: userExist,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/profile", JWT.verify, async (req, res, next) => {
  const { id } = req.auth;

  try {
    const account = await User.model.findByPk(id);
    if (!account) {
      return next(Boom.notFound("Account not found"));
    }

    delete account.dataValues.password;

    return res.status(200).json(account);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/change-full-name",
  JWT.verify,
  validateSchema(schemas.changeName, "body"),
  async (req, res, next) => {
    const { id } = req.auth;
    const { name, lastName } = req.body;

    try {
      const account = await User.model.findByPk(id);
      if (!account) {
        return next(Boom.notFound("Account not found"));
      }
      delete account.dataValues.password;

      await account.update({ name, lastName });

      return res.status(200).json(account);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/change-password",
  JWT.verify,
  validateSchema(schemas.changePassword, "body"),
  async (req, res, next) => {
    const { id } = req.auth;
    const { oldPassword, password } = req.body;

    try {
      const account = await User.model.findByPk(id);
      if (!account) {
        return next(Boom.notFound("Account not found"));
      }

      const isValidPassword = await bcrypt.compare(
        oldPassword,
        account.dataValues.password
      );
      if (!isValidPassword) {
        return next(Boom.badRequest("Old password is incorrect"));
      }

      const hashedPassword = await bcrypt.hash(password);
      await account.update({ password: hashedPassword });

      return res.status(200).json({
        message: "Password updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
