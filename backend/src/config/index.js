/* eslint-disable no-undef */
require("dotenv").config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3007,
  saltRounds: Number(process.env.AUTH_SALT),
  pixels: process.env.API_KEY_PIXELS,
  mysql: {
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
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
  auth0: {
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG,
  },
};

module.exports = config;
