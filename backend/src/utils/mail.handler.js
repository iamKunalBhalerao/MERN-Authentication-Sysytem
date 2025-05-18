import nodemailer from "nodemailer";

const createTransporter = async () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("env credentials is not comming in function");
    return null;
  }

  const transporter = await nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    //secure: false, // Use `true` for port 465, `false` for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
};

// const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 587,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

export { createTransporter };
