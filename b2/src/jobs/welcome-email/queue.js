const { Queue } = require("bullmq");
const { connection } = require("../config");
const { JOBS } = require("../constants");

const queue = new Queue(JOBS.WELCOME_EMAIL, { connection });

const sendEmail = async (data) => {
  await queue.add(JOBS.WELCOME_EMAIL, data);
};

module.exports = { sendEmail };
