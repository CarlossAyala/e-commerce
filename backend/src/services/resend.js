const { Resend } = require("resend");
const config = require("../config");

const resend = new Resend(config.resend.api_key);

module.exports = resend;
