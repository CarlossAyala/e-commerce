const bcrypt = require('bcrypt');
const { saltRounds } = require('../config');

const encrypt = async (passwordToEncrypt) => {
  const hash = await bcrypt.hash(passwordToEncrypt, saltRounds);

  return hash;
};

const isValidPasswordAsync = (originalPassword, encryptedPassword) => {
  return bcrypt.compare(originalPassword, encryptedPassword);
};

module.exports = { encrypt, isValidPasswordAsync };
