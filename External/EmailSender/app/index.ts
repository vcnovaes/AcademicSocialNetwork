import * as nodemailer from "nodemailer";
import {
  CreateNodeMailerTransporter,
  sendEmail,
} from "./email_sender/EmailSender";
import { setupConnectionWithBrocker, ConsumeAndExecute } from "./queue/Queue";

const channel = await setupConnectionWithBrocker();
try {
  const transporter = CreateNodeMailerTransporter();
  ConsumeAndExecute(channel, (rawmsg: string) => {
    return sendEmail(rawmsg, transporter);
  });
} catch (err) {
  console.error("Application error");
  await channel.close();
  console.log(err);
}
