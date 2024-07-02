const { Sequelize } = require("sequelize");
const { node_env } = require("../../../config");
const config = require("./config")[node_env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

module.exports = sequelize;
