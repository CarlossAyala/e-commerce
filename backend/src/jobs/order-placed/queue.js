import { Queue } from "bullmq";
import { connection } from "../config.js";
import { JOBS } from "../constants.js";

const queue = new Queue(JOBS.CUSTOMER_ORDER_PLACED, {
  connection,
});

const sendOrderPlacedEmail = async (data) => {
  await queue.add(JOBS.CUSTOMER_ORDER_PLACED, data, {
    removeOnComplete: true,
    removeOnFail: true,
  });
};

export { queue, sendOrderPlacedEmail };
