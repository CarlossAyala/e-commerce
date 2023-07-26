const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const name = Joi.string().min(2);
const contactName = Joi.string().min(3).max(50);
const contactPhone = Joi.string().min(9);
const zipCode = Joi.string().min(1).max(4);
const province = Joi.string().max(50);
const city = Joi.string().max(50);
const street = Joi.string().max(100);
const streetNumber = Joi.string().max(4);
const apartmentNumber = Joi.string().max(4);
const streetOne = Joi.string().max(100);
const streetTwo = Joi.string().max(100);
const aditional = Joi.string().max(255);

const uuidV4 = Joi.object({
  id: id.required(),
});

const base = Joi.object({
  name: name.required(),
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

module.exports = {
  uuidV4,
  base,
};
