import * as nodemailer from "nodemailer";

async function sendEmail() {
  // Create a Nodemailer transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: Bun.env.EMAIL_USER,
      pass: Bun.env.EMAIL_PASSWORD,
    },
  });

  // Define email options
  const mailOptions = {
    from: "jambo.social@hotmail.com",
    to: "vini2novaes@gmail.com",
    subject: "Test Email",
    text: "This is a test email sent from Node.js using Nodemailer.",
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

// Call the sendEmail function
sendEmail();
