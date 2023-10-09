const BCrypt = require("bcrypt");
const { saltRounds } = require("../config");

const hash = (plain) => {
  return BCrypt.hash(plain, saltRounds);
};

const compare = (plain, encrypted) => {
  return BCrypt.compare(plain, encrypted);
};

const bcrypt = { hash, compare };

module.exports = bcrypt;
