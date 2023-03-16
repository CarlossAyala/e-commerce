const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});
const name = Joi.string().min(1).max(100);
const lastname = Joi.string().min(1).max(100);
const number = Joi.string().creditCard();
const expiration = Joi.date().greater('now');
const cvv = Joi.string().min(3).max(4);

const uuidV4 = Joi.object({
  id: id.required(),
});

const base = Joi.object({
  name: name.required(),
  lastname: lastname.required(),
  number: number.required(),
  expiration: expiration.required(),
  cvv: cvv.required(),
});

module.exports = {
  uuidV4,
  base,
};
