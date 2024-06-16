const bcrypt = require("bcrypt");
const config = require("../config");

const encrypt = (input) => {
  return bcrypt.hash(input, config.salt_rounds);
};

const compare = (plain, encrypted) => {
  return bcrypt.compare(plain, encrypted);
};

module.exports = {
  encrypt,
  compare,
};
