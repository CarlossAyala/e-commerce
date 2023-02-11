const authMiddleware = require('./auth.middleware');

module.exports = {
  ...authMiddleware,
};
