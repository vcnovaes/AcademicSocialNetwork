import { EmailSenderClient } from "./EmailSenderClient"
import { IEmailPayload } from "./IEmailPayload"

export class EmailSenderSingleton
{
  private static emailSenderClient: EmailSenderClient
  private constructor ()
  {
  }
  public static async sendEmail( email: IEmailPayload )
  {
    if ( EmailSenderSingleton.emailSenderClient == undefined )
    {
      EmailSenderSingleton.emailSenderClient = new EmailSenderClient()
      await EmailSenderSingleton.emailSenderClient.checkConnection()
    }
    return EmailSenderSingleton.emailSenderClient.sendEmail( email )
  }
}

export class EmailSenderFacade
{
  public static async sendEmail( email: IEmailPayload )
  {
    return EmailSenderSingleton.sendEmail( email )
  }
}