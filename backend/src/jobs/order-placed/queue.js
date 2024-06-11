const { Queue } = require("bullmq");
const { connection } = require("../config");
const { JOBS } = require("../constants");

const queue = new Queue(JOBS.ORDER_PLACED, { connection });

const sendEmail = async (data) => {
  await queue.add(JOBS.ORDER_PLACED, data);
};

module.exports = { sendEmail };
