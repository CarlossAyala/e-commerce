/* eslint-disable no-undef */
require('dotenv').config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3007,
  saltRounds: Number(process.env.AUTH_SALT),
  pexels: process.env.API_KEY_PIXELS,
  db: {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    port: process.env.MONGO_PORT,
    name: process.env.MONGO_DB_NAME,
    uri: process.env.MONGO_URI,
  },
  mysql: {
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
  },
  jwt_secret: process.env.JWT_SECRET,
  admin: {
    name: process.env.ADMIN_NAME,
    lastName: process.env.ADMIN_LASTNAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
};

module.exports = config;
