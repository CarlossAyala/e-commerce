const Boom = require('@hapi/boom');
const RoleService = require('./role.service');

const RoleProvider = new RoleService();

const roleExist = async (req, res, next) => {
  try {
    const roleId = req.params.id;
    const role = await RoleProvider.getOne(roleId);

    if (!role) return next(Boom.notFound('Role not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  roleExist,
};
