const bcrypt = require("bcrypt");
const { saltRounds } = require("../config");

const encrypt = (input) => {
  return bcrypt.hash(input, saltRounds);
};

const compare = (plain, encrypted) => {
  return bcrypt.compare(plain, encrypted);
};

module.exports = {
  encrypt,
  compare,
};
