import nodemailer from "nodemailer";

const transPorter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kotakh311@gmail.com",
    pass: "casv enss rkeh viaw", // Ensure this is your correct app password
  },
});

async function sendEmail(to, subject, html) {
  if (!to || typeof to !== "string") {
    console.error("Error: No recipient email address provided.");
    return;
  }

  const mailFormat = {
    from: "kotakh311@gmail.com",
    to: to,
    subject: subject,
    html: html,
  };

  try {
    await transPorter.sendMail(mailFormat, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Mail sent:", info.response);
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}

export default sendEmail;