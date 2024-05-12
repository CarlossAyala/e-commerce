const { Worker } = require("bullmq");
const { connection } = require("../config");
const { JOBS } = require("../constants");

const worker = new Worker(
  JOBS.CUSTOMER_ORDER_PLACED,
  __dirname + "/processor.js",
  {
    connection,
  }
);

worker.on("completed", (job) => {
  console.log("job completed", job);
});
worker.on("failed", (job, err) => {
  console.log("job failed", job, "error", err);
});
worker.on("error", (err) => {
  console.log("error", err);
});

module.exports = { worker };
