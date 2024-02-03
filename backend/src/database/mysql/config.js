const config = require("../../config");

const { database, host, password, user, dialect } = config.db;

module.exports = {
  development: {
    username: user,
    password,
    database,
    host,
    dialect,
  },
  // TODO: Implement
  // test: {},
  // production: {},
};
