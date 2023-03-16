const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});
const brand = Joi.string().valid(
  'american_express',
  'diners club',
  'discover',
  'instapayment',
  'jcb',
  'laser',
  'maestro',
  'mastercard',
  'solo',
  'switch',
  'visa'
);
const number = Joi.string().creditCard();
const holder = Joi.string().min(3).max(255);
const expiration = Joi.date().greater('now');
const cvv = Joi.string().min(3).max(4);

const resourceId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  brand: brand.required(),
  number: number.required(),
  holder: holder.required(),
  expiration: expiration.required(),
  cvv: cvv.required(),
});
const update = Joi.object({
  number,
  holder,
  expiration,
  cvv,
});

module.exports = {
  resourceId,
  create,
  update,
};
