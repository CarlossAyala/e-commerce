const { Sequelize } = require("sequelize");
const config = require("../../config");

const { database, user, password, host, dialect } = config.db;

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect,
});

module.exports = sequelize;
