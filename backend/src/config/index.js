const dotenv = require("dotenv");
const { validateEnv } = require("../utils");
dotenv.config();

let config;

try {
  config = validateEnv({
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    salt_rounds: process.env.AUTH_SALT,
    db: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_USER_PASSWORD,
      host: process.env.DB_HOST,
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
  });
} catch (error) {
  console.log("Error in config", error);
  process.exit(1);
}

module.exports = config;
