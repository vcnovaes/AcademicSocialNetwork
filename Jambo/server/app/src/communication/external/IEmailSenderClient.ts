import { IEmailPayload } from "./IEmailPayload"

export abstract class EmailSender
{
  async sendEmail( email: IEmailPayload )
  {
    throw new Error( "Not implemented" )
  }
}