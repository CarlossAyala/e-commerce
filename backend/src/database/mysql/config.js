const environments = require("../../config/environments");

const { database, host, password, user, dialect } = environments.db;

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
