const { Worker } = require("bullmq");
const { JOBS } = require("../constants");
const { connection } = require("../config");

const worker = new Worker(JOBS.ORDER_PLACED, __dirname + "/processor.js", {
  connection,
});

worker.on("completed", (job) => {
  console.log("job completed", JOBS.ORDER_PLACED, job);
});
worker.on("failed", (job, err) => {
  console.log("job failed", JOBS.ORDER_PLACED, job, "error", err);
});
worker.on("error", (err) => {
  console.log("job error", JOBS.ORDER_PLACED, err);
});

module.exports = worker;
