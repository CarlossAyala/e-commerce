const config = require('../../config');

const { database, host, password, user } = config.mysql;

module.exports = {
  development: {
    username: user,
    password,
    database,
    host,
    dialect: 'mysql',
  },
  // test: {
  //   username: 'root',
  //   password: null,
  //   database: 'database_test',
  //   host: '127.0.0.1',
  //   dialect: 'mysql',
  // },
  // production: {
  //   username: 'root',
  //   password: null,
  //   database: 'database_production',
  //   host: '127.0.0.1',
  //   dialect: 'mysql',
  // },
};
