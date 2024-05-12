const resend = require("../../services/resend");
const { InternalServerError } = require("../../utils/http-errors");

// TODO: Replace data
module.exports = async (job) => {
  const { data, error } = resend.emails.send({
    from: "Testing <onboarding@resend.dev>",
    to: "infocarlosayala@gmail.com",
    subject: "Welcome to Legger Platform",
    html: "<p>Welcome to Legger Platform</p>",
  });

  if (error) {
    throw new InternalServerError(error);
  }

  return data;
};
