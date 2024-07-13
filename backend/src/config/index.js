const dotenv = require("dotenv");
const { envSchema } = require("../utils");
require("./types");

dotenv.config();

/**
 * Environment variables
 * @typedef {Object} validation
 * @property {import("joi").ValidationError} error - Error object
 * @property {import("./types").Env} value - Validated environment variables
 */

/**
 * Validate environment variables
 * @type {validation} Validation result
 */
const { error, value: config } = envSchema.validate(
  {
    node_env: process.env.ENVIRONMENT,
    port: process.env.PORT,
    salt_rounds: process.env.AUTH_SALT,
    mysql: {
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_USER_PASSWORD,
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
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
    stripe: {
      sk_test: process.env.STRIPE_SK_TEST,
    },
    cloudinary: {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    },
    resend: {
      api_key: process.env.RESEND_API_KEY,
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
    client_url: process.env.CLIENT_URL,
    logger: {
      level: process.env.LOGGER_LEVEL,
    },
  },
  { abortEarly: false },
);
if (error) {
  const messages = error.details.map((err) => err.message);
  throw new Error("Error in environment variables: " + messages.join(", "));
}

module.exports = config;
