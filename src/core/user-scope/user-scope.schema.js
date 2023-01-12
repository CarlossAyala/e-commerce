const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const fkUser = id;
const fkScope = id;

const resourceId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  fkUser: fkUser.required(),
  fkScope: fkScope.required(),
});

const update = Joi.object({
  fkScope: fkScope.required(),
});

module.exports = {
  resourceId,
  create,
  update,
};
