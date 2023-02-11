const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { gues } = require('../../../utils/roles.util');

const userSchema = Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      default: gues,
    },
    identificationPhone: { type: String },
    twoFactorsToken: { type: String },
    facebookToken: { type: String },
    googleToken: { type: String },
    twitterToken: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
