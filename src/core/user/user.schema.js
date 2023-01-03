const Joi = require('joi');

// const { root, admin, gues, read, write } = require('../../utils/roles.util');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});
const name = Joi.string().min(3).max(50);
const lastName = Joi.string().min(3).max(50);
const email = Joi.string().email().lowercase().trim();
const password = Joi.string().min(8).max(100);
const validatePassword = Joi.ref('password');
// const roles = Joi.array().items(
//   Joi.string().default(gues).valid(root, admin, gues, read, write)
// );
// const phone = Joi.string();
// const twoFactorsToken = Joi.string();
// const facebookToken = Joi.string();
// const googleToken = Joi.string();
// const twitterToken = Joi.string();

const userId = Joi.object({
  id: id.required(),
});

const updateFullname = Joi.object({
  name,
  lastName,
});

const updateEmail = Joi.object({
  email: email.required(),
});

// const updatePhone = Joi.object({
//   phone: phone.required(),
// });

const changePassword = Joi.object({
  password: password.required(),
  validatePassword,
}).with('password', 'validatePassword');

module.exports = {
  userId,
  updateFullname,
  updateEmail,
  // updatePhone,
  changePassword,
  props: {
    id,
    name,
    lastName,
    email,
    password,
    validatePassword,
  },
};
