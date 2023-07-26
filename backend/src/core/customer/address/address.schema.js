const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const name = Joi.string().min(3).max(100).required();
const phone = Joi.string().min(6).max(20).required();
const zipCode = Joi.string().min(4).max(5).required();
const province = Joi.string().min(3).max(50).required();
const city = Joi.string().min(3).max(50).required();
const street = Joi.string().min(3).max(100).required();
const apartmentNumber = Joi.string().min(1).max(5).required();
const aditional = Joi.string().max(255);

const base = Joi.object({
  name,
  phone,
  zipCode,
  province,
  city,
  street,
  apartmentNumber,
  aditional,
});

const resourceId = Joi.object({
  id: id.required(),
});

module.exports = {
  base,
  resourceId,
};
