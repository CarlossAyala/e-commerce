const Joi = require('joi');
const { Charge } = require('../../database/mysql/models');

const typeEnums = Object.values(Charge.enums);

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const name = Joi.string().max(50);
const description = Joi.string().max(255);
const type = Joi.string().valid(...typeEnums);
const rate = Joi.number().precision(1);
const amount = Joi.number().precision(2);
const active = Joi.boolean();
const fkChargeCategory = id;

const resourceId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  name: name.required(),
  description: description.required(),
  type: type.required(),
  rate: rate.required(),
  amount: amount.required(),
  active: active.required(),
  fkChargeCategory: fkChargeCategory.required(),
});

const update = Joi.object({
  name,
  description,
  type,
  rate,
  amount,
  active,
  fkChargeCategory,
});

module.exports = {
  resourceId,
  create,
  update,
};
