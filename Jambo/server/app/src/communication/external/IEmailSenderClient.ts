import { IEmailPayload } from "./IEmailPayload"

export interface IEmailSenderClient
{
  sendEmail( email: IEmailPayload ): Promise<void>
}