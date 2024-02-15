const Joi = require("joi");

const name = Joi.string().label("Name").min(3).max(255).required();
const lastName = Joi.string().label("Last name").min(3).max(255).required();
const email = Joi.string().label("Email").email().required();
const password = Joi.string().min(8).max(255).required();
const confirmPassword = Joi.string().label("Confirm password").required();

const signup = Joi.object({
  name,
  lastName,
  email,
  password: password.label("Password"),
  confirmPassword: confirmPassword.valid(Joi.ref("password", { render: true })),
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
  oldPassword: password.label("Old password"),
  newPassword: password.label("New password"),
  confirmPassword: confirmPassword.valid(
    Joi.ref("newPassword", { render: true })
  ),
});

module.exports = {
  signin,
  signup,
  changeName,
  changePassword,
};
