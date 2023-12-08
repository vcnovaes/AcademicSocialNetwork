import * as nodemailer from "nodemailer";
import { sendEmail } from "./email_sender/EmailSender";
import { setupConnectionWithBrocker, ConsumeAndExecute } from "./queue/Queue";
try {
  const channel = await setupConnectionWithBrocker();
  ConsumeAndExecute(channel, sendEmail);
} catch (err) {
  console.error("Application error");
  console.log(err);
}
