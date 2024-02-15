const { Sequelize } = require("sequelize");
const environments = require("../../config/environments");

const { database, user, password, host, dialect, port } = environments.db;

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect,
  port,
});

module.exports = sequelize;
