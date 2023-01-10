const Boom = require('@hapi/boom');
const RoleService = require('./role.service');

const roleExist = async (req, res, next) => {
  try {
    const role = await RoleService.getOne(req.params.id);

    if (!role) return next(Boom.notFound('Role not found'));

    next();
  } catch (error) {
    next(error);
  }
};

const checkRoleUser = async (req, res, next) => {
  try {
    // check if the user get Owner Role or Security System Manager Scope
    const ownerRole = await 
  } catch (error) {
    next(error);
  }
};

module.exports = {
  roleExist,
};
