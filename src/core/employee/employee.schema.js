const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const userId = id;
const businessId = id;
const scopeId = id;

const resourceId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  userId: userId.required(),
  businessId: businessId.required(),
  scopeId: scopeId.required(),
});

const update = Joi.object({
  scopeId,
});

module.exports = {
  resourceId,
  create,
  update,
};
