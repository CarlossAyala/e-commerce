const { Queue } = require("bullmq");
const { connection } = require("../config");
const { JOBS } = require("../constants");

const queue = new Queue(JOBS.CUSTOMER_ORDER_PLACED, {
  connection,
});

const sendOrderPlacedEmail = async (data) => {
  await queue.add(JOBS.CUSTOMER_ORDER_PLACED, data, {
    removeOnComplete: true,
    removeOnFail: true,
  });
};

module.exports = {
  queue,
  sendOrderPlacedEmail,
};
