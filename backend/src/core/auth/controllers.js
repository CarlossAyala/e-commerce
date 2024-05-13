// eslint-disable-next-line no-unused-vars
import express from "express";
import { User, RefreshToken } from "../../database/mysql/models/index.js";
import { bcrypt, Stripe } from "../../libs/index.js";
import {
  generateAccessToken,
  generateRefreshToken,
  decodeRefreshToken,
} from "../../utils/index.js";
import {
  badRequest,
  unauthorized,
  invalidClient,
  invalidRequest,
} from "../../middlewares/index.js";
import {
  refreshTokenOptions,
  clearRefreshTokenOptions,
} from "../../config/cookies.js";

const getCookieName = (app) => {
  const APPS = {
    ecommerce: "ecommerce-refresh-token",
    admin: "admin-refresh-token",
    seller: "seller-refresh-token",
  };

  return APPS[app] ?? APPS["ecommerce"];
};

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
  const { app } = req.query;
  const { email, password } = req.body;

  try {
    const user = await User.model.findOne({
      where: { email },
    });
    if (!user) throw invalidClient("Email or Password is incorrect");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw invalidClient("Email or Password is incorrect");

    if (app === "admin" && !user.isAdmin) {
      throw invalidClient("You are not authorized to access this resource.");
    }

    const newRefreshToken = await generateRefreshToken(user.dataValues.id);
    const accessToken = await generateAccessToken(user.dataValues.id);

    await RefreshToken.model.create({
      token: newRefreshToken,
      userId: user.dataValues.id,
    });

    const cookieName = getCookieName(app);
    res.cookie(cookieName, newRefreshToken, refreshTokenOptions);

    res.json({
      accessToken,
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
const refresh = async (req, res, next) => {
  const { app } = req.query;
  const cookieName = getCookieName(app);
  const refreshToken = req.cookies[cookieName];

  try {
    if (!refreshToken) {
      throw invalidRequest("Missing refresh token in cookies header.");
    }

    res.clearCookie(cookieName, clearRefreshTokenOptions);

    const token = await RefreshToken.model.findOne({
      where: { token: refreshToken },
    });

    const { userId } = await decodeRefreshToken(refreshToken);

    // detect refresh token reuse
    if (!token) {
      // TODO: Add logger
      console.log("Someone tried to reuse the refresh token!");

      await RefreshToken.model.destroy({
        where: { userId },
      });

      throw invalidClient("You are not authorized to access this resource.");
    }

    await token.destroy();

    const accessToken = await generateAccessToken(userId);
    const newRefreshToken = await generateRefreshToken(userId);

    await RefreshToken.model.create({
      token: newRefreshToken,
      userId,
    });

    res.cookie(cookieName, newRefreshToken, refreshTokenOptions);

    res.json(accessToken);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const signout = async (req, res, next) => {
  const { app } = req.query;
  const cookieName = getCookieName(app);
  const refreshToken = req.cookies[cookieName];

  try {
    if (!refreshToken) {
      throw unauthorized("You are not authorized to access this resource.");
    }

    const token = await RefreshToken.model.findOne({
      where: { token: refreshToken },
    });

    await token.destroy();

    res.clearCookie(cookieName, clearRefreshTokenOptions);

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
 */
const profile = (req, res) => {
  const { user } = req;

  res.json(user);
};

export default { signup, signin, refresh, signout, profile };
