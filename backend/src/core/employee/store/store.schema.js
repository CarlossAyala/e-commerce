const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const name = Joi.string().max(255);
const lastName = Joi.string().max(255);
const email = Joi.string().email();
const hireDate = Joi.date().min('now');
const password = Joi.string().min(8).max(100);
const validatePassword = Joi.ref('password');

const resourceId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
  validatePassword,
}).with('password', 'validatePassword');

const updateName = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
});

const updateEmail = Joi.object({
  email: email.required(),
});

const updatePassword = Joi.object({
  password: password.required(),
});

const updateHireDate = Joi.object({
  hireDate: hireDate.required(),
});

module.exports = {
  resourceId,
  create,
  updateName,
  updateEmail,
  updatePassword,
  updateHireDate,
};
