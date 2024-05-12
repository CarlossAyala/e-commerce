import { resend } from "../../libs";

// TODO: Delete comment
// module.exports = (job) => resend.emails.send(job.data);
export default async (job) => {
  const { data, error } = resend.emails.send({
    from: "Testing <onboarding@resend.dev>",
    to: "infocarlosayala@gmail.com",
    subject: "hello world",
    html: "<strong>it works!</strong>",
  });

  if (error) {
    throw new Error(error);
  }

  return data;
};
