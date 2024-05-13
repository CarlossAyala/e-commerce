import Joi from "joi";

const name = Joi.string().label("Name").min(3).max(100).required();
const phone = Joi.string().label("Phone").min(6).max(20).required();
const zipCode = Joi.string().label("Zip Code").min(4).max(5).required();
const province = Joi.string().label("Province").min(3).max(50).required();
const city = Joi.string().label("City").min(3).max(50).required();
const street = Joi.string().label("Street").min(3).max(100).required();
const apartmentNumber = Joi.string()
  .label("Apartment number")
  .min(1)
  .max(5)
  .required();
const indications = Joi.string().label("Indications").max(255).allow("");

const base = Joi.object({
  name,
  phone,
  zipCode,
  province,
  city,
  street,
  apartmentNumber,
  indications,
});

export default {
  create: base,
  update: base,
};
