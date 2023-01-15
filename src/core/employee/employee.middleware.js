const Boom = require('@hapi/boom');
const EmployeeService = require('./employee.service');

const EmployeeProvider = new EmployeeService();

const resourceExist = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await EmployeeProvider.getOne(resourceId);

    if (!resource) return next(Boom.notFound('Employee not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  resourceExist,
};
