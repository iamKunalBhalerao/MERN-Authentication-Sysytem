import nodemailer from "nodemailer";

const createTransport = async () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
};

const sendMail = async (mailOptions) => {
  const transporter = await createTransport();
  if (!transporter) {
    console.error(
      "Email Not Send : Transporter could not be initialized. Check your SMTP credentials in the .env file."
    );
    return false;
  }

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log("Error while sending Mail: ", error);
    return false;
  }
};

export default sendMail;
