const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});
const contactName = Joi.string().min(3).max(50);
const contactPhone = Joi.string().trim().min(9);
const zipCode = Joi.string().length(4);
const province = Joi.string().max(50);
const city = Joi.string().max(50);
const street = Joi.string().max(100);
const streetNumber = Joi.string().max(4);
const apartmentNumber = Joi.string().allow('').max(4);
const streetOne = Joi.string().allow('').max(100);
const streetTwo = Joi.string().allow('').max(100);
const aditional = Joi.string().allow('').max(255);

const addressId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  contactName: contactName.required(),
  contactPhone: contactPhone.required(),
  zipCode: zipCode.required(),
  province: province.required(),
  city: city.required(),
  street: street.required(),
  streetNumber: streetNumber.required(),
  apartmentNumber,
  streetOne,
  streetTwo,
  aditional,
});

const update = Joi.object({
  contactName,
  contactPhone,
  zipCode,
  province,
  city,
  street,
  streetNumber,
  apartmentNumber,
  streetOne,
  streetTwo,
  aditional,
});

module.exports = {
  addressId,
  create,
  update,
};
