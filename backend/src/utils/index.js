const Joi = require("joi");

const getRandomIntByRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const envSchema = Joi.object({
  node_env: Joi.string().valid("development", "production", "test"),
  port: Joi.number().port().default(3001),
  salt_rounds: Joi.number().required(),
  mysql: Joi.object({
    database: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    host: Joi.string().hostname().required(),
    port: Joi.number().port().required(),
  }).required(),
  jwt: Joi.object({
    access_token: Joi.object({
      secret: Joi.string().required(),
      expire: Joi.string().required(),
    }).required(),
    refresh_token: Joi.object({
      secret: Joi.string().required(),
      expire: Joi.string().required(),
    }).required(),
  }).required(),
  admin: Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).required(),
  seller: Joi.object({
    password: Joi.string().required(),
  }).required(),
  stripe: Joi.object({
    sk_test: Joi.string().required(),
  }).required(),
  cloudinary: Joi.object({
    cloud_name: Joi.string().required(),
    api_key: Joi.string().required(),
    api_secret: Joi.string().required(),
  }).required(),
  resend: Joi.object({
    api_key: Joi.string().required(),
  }).required(),
  redis: Joi.object({
    host: Joi.string().hostname().required(),
    port: Joi.number().port().required(),
  }).required(),
  client_url: Joi.string().when("node_env", {
    is: "production",
    then: Joi.string().required(),
    otherwise: Joi.string().default("http://localhost:3000"),
  }),
  logger: Joi.object({
    level: Joi.string()
      .valid("error", "warn", "info", "http", "verbose", "debug", "silly")
      .default("info"),
  }).required(),
});

module.exports = {
  getRandomIntByRange,
  envSchema,
};
