const Joi = require("joi");

const name = Joi.string().label("Name").min(3).max(255).required();
const lastName = Joi.string().label("Last name").min(3).max(255).required();
const email = Joi.string().label("Email").email().required();
const password = Joi.string().min(8).max(255).required();
const oldPassword = Joi.string()
  .label("Old password")
  .min(8)
  .max(255)
  .required();
const confirmPassword = Joi.string()
  .label("Confirm password")
  .valid(Joi.ref("password", { render: true }))
  .required();

const signup = Joi.object({
  name,
  lastName,
  email,
  password: password.label("Password"),
  confirmPassword,
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
  oldPassword,
  password: password.label("New password"),
  confirmPassword,
});

module.exports = {
  signin,
  signup,
  changeName,
  changePassword,
};
