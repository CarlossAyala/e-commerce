const Joi = require('joi');

const UserSchema = require('../user/user.schema').fields;

const signup = Joi.object({
  name: UserSchema.name.required(),
  lastName: UserSchema.lastName.required(),
  email: UserSchema.email.required(),
  password: UserSchema.password.required(),
  validatePassword: UserSchema.validatePassword.required(),
});

const signin = Joi.object({
  email: UserSchema.email.required(),
  password: UserSchema.password.required(),
});

const changeName = Joi.object({
  name: UserSchema.name.required(),
  lastName: UserSchema.lastName.required(),
});

const changePassword = Joi.object({
  oldPassword: UserSchema.password.required(),
  newPassword: UserSchema.password
    .invalid(Joi.ref('oldPassword', { render: true }))
    .required(),
  passwordConfirmation: Joi.string()
    .valid(Joi.ref('newPassword', { render: true }))
    .required(),
});

module.exports = {
  signup,
  signin,
  changeName,
  changePassword,
};
