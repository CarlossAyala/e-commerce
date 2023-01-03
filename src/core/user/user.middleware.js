const Boom = require('@hapi/boom');
const UserService = require('./user.service');

const UserProvider = new UserService();

const userExist = async (req, res, next) => {
  try {
    const user = await UserProvider.getOne(req.params.id);

    if (!user) return next(Boom.notFound('User not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userExist,
};
