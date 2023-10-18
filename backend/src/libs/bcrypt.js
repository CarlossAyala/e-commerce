const _bcrypt = require("bcrypt");
const { saltRounds } = require("../config");

const hash = (plain) => {
  return _bcrypt.hash(plain, saltRounds);
};

const compare = (plain, encrypted) => {
  return _bcrypt.compare(plain, encrypted);
};

const bcrypt = { hash, compare };

module.exports = bcrypt;
