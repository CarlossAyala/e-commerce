/* eslint-disable no-undef */
require("dotenv").config();

//TODO: Add schema validation

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3002,
  saltRounds: Number(process.env.AUTH_SALT),
  pixels: process.env.API_KEY_PIXELS, //TODO: Implement
  db: {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  },
  jwt: {
    access_token: {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expire: process.env.ACCESS_TOKEN_EXPIRE,
    },
    refresh_token: {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expire: process.env.REFRESH_TOKEN_EXPIRE,
    },
  },
  admin: {
    name: process.env.ADMIN_NAME,
    lastName: process.env.ADMIN_LAST_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
  seller: {
    password: process.env.SELLER_PASSWORD,
  },
  stipe: {
    sk_test: process.env.STRIPE_SK_TEST,
  },
};
