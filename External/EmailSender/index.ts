import * as nodemailer from "nodemailer";
import { sendEmail } from "./email_sender/EmailSender";
import { setupConnectionWithBrocker, ConsumeAndExecute } from "./queue/Queue";

const channel = await setupConnectionWithBrocker();
ConsumeAndExecute(channel, sendEmail);
