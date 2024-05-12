const db = require("../db/mysql/models");
const { BadRequest, Unauthorized } = require("../utils/http-errors");
const { verifyAccessToken } = require("../utils/jwt");

const authenticate = async (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new BadRequest("Missing authorization header."));
  }

  const accessToken = authorization.split(" ")[1];
  if (!accessToken) {
    return next(
      new BadRequest("Missing access token in authorization header.")
    );
  }

  try {
    const { userId } = verifyAccessToken(accessToken);

    const UserModel = db.sequelize.model("User");
    const user = await UserModel.findByPk(userId, {
      raw: true,
    });
    if (!user) {
      throw new Unauthorized("You are not authorized to access this resource.");
    }

    delete user.password;

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
