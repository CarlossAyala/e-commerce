const Joi = require('joi');

const name = Joi.string().min(3).max(255).required();
const lastName = Joi.string().min(3).max(255).required();
const email = Joi.string().email().required();
const password = Joi.string().min(8).max(255).required();
const validatePassword = Joi.string().valid(Joi.ref('password')).required();
const newPassword = Joi.string()
  .invalid(Joi.ref('oldPassword', { render: true }))
  .required();
const confirmPassword = Joi.string()
  .valid(Joi.ref('newPassword', { render: true }))
  .required();

const signup = Joi.object({
  name,
  lastName,
  email,
  password,
  validatePassword,
});

const signin = Joi.object({
  email,
  password,
});

const changeName = Joi.object({
  name,
  lastName,
});

const changePassword = Joi.object({
  oldPassword: password,
  newPassword,
  confirmPassword,
});

module.exports = {
  signin,
  signup,
  changeName,
  changePassword,
};
