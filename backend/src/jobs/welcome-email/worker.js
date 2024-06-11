const { Worker } = require("bullmq");
const { JOBS } = require("../constants");
const { connection } = require("../config");

const worker = new Worker(JOBS.WELCOME_EMAIL, __dirname + "/processor.js", {
  connection,
});

worker.on("completed", (job) => {
  console.log("job completed", JOBS.WELCOME_EMAIL, job);
});
worker.on("failed", (job, err) => {
  console.log("job failed", JOBS.WELCOME_EMAIL, job, "error", err);
});
worker.on("error", (err) => {
  console.log("job error", JOBS.WELCOME_EMAIL, err);
});

module.exports = worker;
