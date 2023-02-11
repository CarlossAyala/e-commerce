const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const employeeId = id;
const roleId = id;

const resourceId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  employeeId: employeeId.required(),
  roleId: roleId.required(),
});

const update = Joi.object({
  roleId: roleId.required(),
});

module.exports = {
  resourceId,
  create,
  update,
};
