const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const fkUser = id;
const fkRole = id;

const resourceId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  fkUser: fkUser.required(),
  fkRole: id.required(),
});

const update = Joi.object({
  fkRole: fkRole.required(),
});

module.exports = {
  resourceId,
  create,
  update,
};
