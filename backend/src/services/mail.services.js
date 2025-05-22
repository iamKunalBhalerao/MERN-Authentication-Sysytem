import { generateOTP } from "../utils/generateOTP.util.js";
import { createTransporter } from "../utils/mail.handler.js";

async function mailOptionsSender(user) {
  // Demo OTP
  let verificationOtp = await generateOTP();

  // send verification email on user email
  const verificationLink = `http://localhost:5173/verify-otp?userId=${user?._id}`;

  // Mail Options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user?.email,
    subject: "Welcome to MERN Auth System",
    html: `<p>Welcome to MERN Authentication System, Your Account is Created with Username : ${user?.username} Email : ${user?.email}</p>
    <br>
      <section
        style="width: 100%; height: 100%; padding: 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: rgb(255, 148, 72);">
        <h2>Please Verify the Email with OTP ${verificationOtp}</h2>
        <h1>
            By Clicking
            <button
                style="background: linear-gradient(90deg, #ff6a00, #ee0979); color: #fff; border: none; padding: 12px 28px; border-radius: 30px; font-size: 1.2em; cursor: pointer; box-shadow: 0 4px 14px rgba(238,9,121,0.2); transition: background 0.3s;">
                <a href="${verificationLink}" style="color: #fff; text-decoration: none;">Verify</a>
            </button>
        </h1>
    </section>`,
  };

  const transporter = await createTransporter();

  if (!transporter) {
    console.error(
      "Email Not Sent: Transporter is null.  Check your SMTP credentials."
    );
    return false;
  }

  await transporter.sendMail(mailOptions);
  // console.log("Email sent: %s", info.messageId);
  return verificationOtp;
}

export { mailOptionsSender };
