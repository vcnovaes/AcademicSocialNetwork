import * as nodemailer from "nodemailer";

export function CreateNodeMailerTransporter() {
  // Create a Nodemailer transporter using SMTP
  return nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: Bun.env.EMAIL_USER,
      pass: Bun.env.EMAIL_PASSWORD,
    },
  });
}

export function buildEmailMessage({
  reciever,
  subject,
  message,
}: IEmailPayload) {
  return {
    from: Bun.env.EMAIL_USER,
    to: reciever,
    subject: subject,
    text: message,
  };
}
export interface IEmailPayload {
  reciever: string;
  subject: string;
  message: string;
}
export async function sendEmail(rawMessage: string) {
  const msg = JSON.parse(rawMessage) as IEmailPayload;
  const transporter = CreateNodeMailerTransporter();
  try {
    const info = await transporter.sendMail(buildEmailMessage(msg));
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}
