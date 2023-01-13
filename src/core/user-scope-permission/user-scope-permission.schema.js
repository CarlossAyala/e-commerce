const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const fkUserScope = id;
const fkPermission = id;

const resourceId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  fkUserScope: fkUserScope.required(),
  fkPermission: fkPermission.required(),
});

const update = Joi.object({
  fkPermission: fkPermission.required(),
});

module.exports = {
  resourceId,
  create,
  update,
};
