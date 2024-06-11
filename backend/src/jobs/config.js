const IORedis = require("ioredis");

const connection = new IORedis({
  maxRetriesPerRequest: null,
});

module.exports = { connection };
