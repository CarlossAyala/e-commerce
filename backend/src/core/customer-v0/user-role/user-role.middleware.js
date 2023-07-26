const Boom = require('@hapi/boom');
const UserRoleService = require('./user-role.service');

const UserRoleProvider = new UserRoleService();

const userRoleExist = async (req, res, next) => {
  try {
    const userRoleId = req.params.id;
    const userRole = await UserRoleProvider.getOne(userRoleId);

    if (!userRole) return next(Boom.notFound('User-Role not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRoleExist,
};
