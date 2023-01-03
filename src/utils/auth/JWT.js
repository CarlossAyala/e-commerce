const jwt = require('jsonwebtoken');
const { add, hoursToSeconds } = require('date-fns');

const { jwt_secret } = require('../../config');

const sign = (payload = {}) => {
  const currentDate = Date.now();

  const duration = 1.5;

  const expirationDate = add(currentDate, {
    hours: 1,
    minutes: 30,
  });

  const options = {
    // expiresIn: hoursToSeconds(duration),
  };

  const token = jwt.sign(payload, jwt_secret, options);

  return {
    token,
    expirationDate,
  };
};

module.exports = { sign };
