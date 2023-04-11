const Boom = require('@hapi/boom');
const UserService = require('../user/user.service');

const UserProvider = new UserService();

const accountExist = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await UserProvider.findByEmail(email);
    // console.log(user);
    if (user) return next(Boom.badRequest('This email is already in use'));

    next();
  } catch (error) {
    next(error);
  }
};

const userExist = async (req, res, next) => {
  try {
    const userId = req.auth.id;

    const user = await UserProvider.getOne(userId);

    if (!user) return next(Boom.badRequest('User not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  accountExist,
  userExist,
};
