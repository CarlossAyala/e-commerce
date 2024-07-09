const { db } = require("../../../config");

const { database, user, password, host, port } = db;

module.exports = {
  development: {
    username: user,
    password,
    database,
    host,
    port,
    dialect: "mysql",
    seederStorage: "sequelize",
  },
  test: {
    username: user,
    password,
    database,
    host,
    port,
    dialect: "mysql",
    seederStorage: "sequelize",
  },
  production: {
    username: user,
    password,
    database,
    host,
    port,
    dialect: "mysql",
    seederStorage: "sequelize",
  },
};
