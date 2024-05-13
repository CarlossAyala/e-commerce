import { Worker } from "bullmq";
import { connection } from "../config.js";
import { JOBS } from "../constants.js";

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

export { worker };
