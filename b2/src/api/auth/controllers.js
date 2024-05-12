const encrypter = require("../../utils/encrypter");
const {
  clearRefreshToken,
  getCookieName,
  getRefreshTokenConfig,
} = require("../../utils/cookies");
const { BadRequest, Unauthorized } = require("../../utils/http-errors");
const {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/jwt");
const Stripe = require("../../services/stripe");
const WelcomeEmailJob = require("../../jobs/welcome-email");
const { sequelize } = require("../../db/mysql");

const UserModel = sequelize.model("User");

const signin = async (req, res, next) => {
  const { app } = req.query;
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({
      where: { email },
      raw: true,
    });
    if (!user) {
      return next(new Unauthorized("Email or Password is incorrect"));
    }

    const isMatch = await encrypter.compare(password, user.password);
    if (!isMatch) {
      return next(new Unauthorized("Email or Password is incorrect"));
    }

    if (app === "admin" && !user.isAdmin) {
      return next(
        new Unauthorized("You are not authorized to access this resource.")
      );
    }

    const newRefreshToken = generateRefreshToken(user.id);
    const accessToken = generateAccessToken(user.id);

    const RefreshTokenModel = db.sequelize.model("RefreshToken");
    await RefreshTokenModel.create({
      token: newRefreshToken,
      userId: user.id,
    });

    const cookieName = getCookieName(app);
    const refreshTokenConfig = getRefreshTokenConfig(app);
    res.cookie(cookieName, newRefreshToken, refreshTokenConfig);

    delete user.password;

    res.json({
      accessToken,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  const { name, lastName, email, password } = req.body;

  try {
    const UserModel = db.sequelize.model("User");

    const account = await UserModel.findOne({
      where: {
        email,
      },
      raw: true,
    });
    if (account) {
      return next(new BadRequest("Email already exists"));
    }

    const hashedPassword = await encrypter.encrypt(password);
    await UserModel.create({
      name,
      lastName,
      email,
      password: hashedPassword,
    });

    await Stripe.customers.create({
      name: `${name} ${lastName}`,
      email,
    });

    await WelcomeEmailJob.queue.sendEmail(email);

    res.status(201).json({
      message: "Account created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const signout = async (req, res, next) => {
  const { app } = req.query;
  const cookieName = getCookieName(app);
  const refreshToken = req.cookies[cookieName];

  if (!refreshToken) {
    return next(new BadRequest("Missing refresh token in cookies header."));
  }

  try {
    const RefreshToken = db.sequelize.model("RefreshToken");

    await RefreshToken.destroy({
      where: { token: refreshToken },
    });

    res.clearCookie(cookieName, clearRefreshToken);

    res.json({
      message: "Logout successfully",
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  const { app } = req.query;
  const cookieName = getCookieName(app);
  const refreshToken = req.cookies[cookieName];

  if (!refreshToken) {
    return new BadRequest("Missing refresh token in cookies header.");
  }

  try {
    res.clearCookie(cookieName, clearRefreshToken);

    const RefreshTokenModel = db.sequelize.model("RefreshToken");

    const token = await RefreshTokenModel.findOne({
      where: { token: refreshToken },
    });

    const { userId } = verifyRefreshToken(refreshToken);

    if (!token) {
      await RefreshTokenModel.destroy({
        where: { userId },
      });

      return next(
        new Unauthorized("You are not authorized to access this resource.")
      );
    }

    await token.destroy();

    const accessToken = generateAccessToken(userId);
    const newRefreshToken = generateRefreshToken(userId);

    await RefreshTokenModel.create({
      token: newRefreshToken,
      userId,
    });

    const refreshTokenConfig = getRefreshTokenConfig();
    res.cookie(cookieName, newRefreshToken, refreshTokenConfig);

    res.json(accessToken);
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  const { user } = req;

  try {
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signin,
  signup,
  signout,
  refreshToken,
  profile,
};
