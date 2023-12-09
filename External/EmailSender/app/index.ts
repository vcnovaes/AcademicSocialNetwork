import * as nodemailer from "nodemailer";
import {
  CreateNodeMailerTransporter,
  sendEmail,
} from "./email_sender/EmailSender";
import { setupConnectionWithBrocker, ConsumeAndExecute } from "./queue/Queue";
try {
  const channel = await setupConnectionWithBrocker();
  const transporter = CreateNodeMailerTransporter();
  ConsumeAndExecute(channel, (rawmsg: string) => {
    return sendEmail(rawmsg, transporter);
  });
} catch (err) {
  console.error("Application error");
  console.log(err);
}
