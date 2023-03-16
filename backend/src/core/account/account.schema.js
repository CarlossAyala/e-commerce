const Joi = require('joi');

const UserSchema = require('../user/user.schema');

const signupSchema = Joi.object({
  name: UserSchema.props.name.required(),
  lastName: UserSchema.props.lastName.required(),
  email: UserSchema.props.email.required(),
  password: UserSchema.props.password.required(),
  validatePassword: UserSchema.props.validatePassword,
}).with('password', 'validatePassword');

const signinSchema = Joi.object({
  email: UserSchema.props.email.required(),
  password: UserSchema.props.password.required(),
});

module.exports = {
  signupSchema,
  signinSchema,
};
