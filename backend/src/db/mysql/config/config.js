const { mysql } = require("../../../config");

const { database, user: username, password, host, port } = mysql;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    port,
    dialect: "mysql",
    seederStorage: "sequelize",
  },
  test: {
    username,
    password,
    database,
    host,
    port,
    dialect: "mysql",
    seederStorage: "sequelize",
  },
  production: {
    username,
    password,
    database,
    host,
    port,
    dialect: "mysql",
    seederStorage: "sequelize",
  },
};
