const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const handlebars = require("handlebars");
const resend = require("../../services/resend");
const { InternalServerError } = require("../../utils/http-errors");

// TODO: Check email sender
module.exports = async (job) => {
  const templatePath = path.join(__dirname, "template.hbs");
  const template = fs.readFileSync(templatePath, "utf-8");
  const compiledTemplate = handlebars.compile(template);

  const html = compiledTemplate(job.data);

  const { data, error } = resend.emails.send({
    from: "Legger E-Commerce <onboarding@resend.dev>",
    to: job.data.email,
    subject: "Welcome to Legger E-Commerce",
    headers: {
      "X-Entity-Ref-ID": crypto.randomUUID(),
    },
    html,
  });

  if (error) {
    throw new InternalServerError(error);
  }

  return data;
};
