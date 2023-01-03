const Boom = require('@hapi/boom');
const UserService = require('../user/user.service');

const UserProvider = new UserService();

const userAuthorization = async (req, res, next) => {
  try {
    // If the user exist
    // const user = await UserProvider.getOne(req.auth.id);
    // if (!user) return next(Boom.notFound('User not found'));

    // If the user has authorization
    // ...

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userAuthorization,
};
