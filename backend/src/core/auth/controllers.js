// eslint-disable-next-line no-unused-vars
const express = require("express");
const { badRequest, unauthorized, forbidden } = require("@hapi/boom");
const { User, RefreshToken } = require("../../database/mysql/models");
const { bcrypt, Stripe } = require("../../libs");
const {
  generateAccessToken,
  generateRefreshToken,
  decodeRefreshToken,
} = require("../../utils");
const { refreshTokenOptions, clearRefreshTokenOptions } =
  require("../../config").cookies;

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const signup = async (req, res, next) => {
  const { name, lastName, email, password } = req.body;

  try {
    const account = await User.model.findOne({
      where: {
        email,
      },
    });
    if (account) throw badRequest("Email already exists");

    const hashedPassword = await bcrypt.hash(password);
    await User.model.create({
      name,
      lastName,
      email,
      password: hashedPassword,
    });

    // TODO: Add email verify email and then create Stripe Account
    await Stripe.customers.create({
      name: `${name} ${lastName}`,
      email,
    });

    res.status(201).json({
      message: "Account created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const signin = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const { email, password } = req.body;

  try {
    const user = await User.model.findOne({
      where: { email },
    });
    if (!user) throw badRequest("Email or Password is incorrect");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw badRequest("Email or Password is incorrect");

    if (refreshToken) {
      const token = await RefreshToken.model.findOne({
        where: { token: refreshToken },
      });

      if (!token || token.userId !== user.id) {
        await RefreshToken.model.destroy({
          where: { userId: user.dataValues.id },
        });
      } else {
        await token.destroy();
      }

      res.clearCookie("refreshToken", clearRefreshTokenOptions);
    }

    const newRefreshToken = await generateRefreshToken(user.dataValues.id);
    const accessToken = await generateAccessToken(user.dataValues.id);

    await RefreshToken.model.create({
      token: newRefreshToken,
      userId: user.dataValues.id,
    });

    res.cookie("refreshToken", newRefreshToken, refreshTokenOptions);

    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const refresh = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  try {
    if (!refreshToken) {
      throw unauthorized("You are not authorized to access this resource.");
    }

    res.clearCookie("refreshToken", clearRefreshTokenOptions);

    const token = await RefreshToken.model.findOne({
      where: { token: refreshToken },
    });

    const { userId } = await decodeRefreshToken(refreshToken).catch(() => {
      throw forbidden("Refresh token is invalid");
    });

    // detect refresh token reuse
    if (!token) {
      // TODO: Add logger
      console.log("Someone tried to reuse the refresh token!");

      await RefreshToken.model.destroy({
        where: { userId },
      });

      throw forbidden("Refresh token is invalid");
    }

    await token.destroy();

    const accessToken = await generateAccessToken(userId);
    const newRefreshToken = await generateRefreshToken(userId);

    await RefreshToken.model.create({
      token: newRefreshToken,
      userId,
    });

    res.cookie("refreshToken", newRefreshToken, refreshTokenOptions);

    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const logout = async (req, res, next) => {
  const { refreshToken, accessToken } = req.cookies;

  try {
    if (!refreshToken || !accessToken) {
      throw unauthorized("You are not authorized to access this resource.");
    }

    const token = await RefreshToken.model.findOne({
      where: { token: refreshToken },
    });

    await token.destroy();

    res.clearCookie("refreshToken", clearRefreshTokenOptions);

    res.json({
      message: "Logout successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const profile = async (req, res, next) => {
  const { userId } = req.auth;

  try {
    const user = await User.model.findByPk(userId, {
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) throw badRequest("User not found");

    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin, refresh, logout, profile };
