const IORedis = require("ioredis");
const config = require("../config");

const connection = new IORedis({
  host: config.redis.host,
  port: config.redis.port,
  maxRetriesPerRequest: null,
});

module.exports = { connection };
