const Boom = require('@hapi/boom');
const PermissionService = require('./permission.service');

const PermissionProvider = new PermissionService();

const permissionExist = async (req, res, next) => {
  try {
    const permissionId = req.params.id;
    const permission = await PermissionProvider.getOne(permissionId);

    if (!permission) return next(Boom.notFound('Permission not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  permissionExist,
};
