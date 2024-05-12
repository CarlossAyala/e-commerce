const { db } = require("../../../config");

const { database, user, password, host, port } = db;

module.exports = {
  development: {
    username: user,
    password: password,
    database: database,
    host: host,
    port: port,
    dialect: "mysql",
    seederStorage: "sequelize",
  },
  test: {
    username: user,
    password: password,
    database: database,
    host: host,
    port: port,
    dialect: "mysql",
    seederStorage: "sequelize",
  },
  production: {
    username: user,
    password: password,
    database: database,
    host: host,
    port: port,
    dialect: "mysql",
    seederStorage: "sequelize",
  },
};
