const bcrypt = require('bcrypt');
const { saltRounds } = require('../../config');

const hash = (plain) => {
  return bcrypt.hash(plain, saltRounds);
};

const compare = (plain, encrypted) => {
  return bcrypt.compare(plain, encrypted);
};

module.exports = { hash, compare };
