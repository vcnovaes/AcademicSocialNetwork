import { EmailSenderFacade } from "../communication/external/EmailSenderFacade"
import { IEmailPayload } from "../communication/external/IEmailPayload"
import { CodeGenerator, RandomCodeStrategy } from "../utils/CodeGenerator"

interface Email extends IEmailPayload
{
  send(): void
}

class BasicEmail implements Email
{
  public subject: string
  public message: string
  public reciever: string

  constructor ( reciever: string, body: string = " ", subject: string = " " )
  {
    this.subject = subject
    this.message = body
    this.reciever = reciever
  }

  async send()
  {
    return EmailSenderFacade.sendEmail( {
      subject: this.subject,
      message: this.message,
      reciever: this.reciever
    } )
  }
}

interface EmailDecorator
{
  send(): void
  decorate(): void
}


export class EmailConfirmationDecorator implements EmailDecorator
{
  private email: Email
  private confirmationCode: string

  constructor ( email: Email, confirmationCode: string )
  {
    this.email = email
    this.confirmationCode = confirmationCode
  }

  decorate(): void
  {
    this.email.message = `Confirmation Code: ${ this.confirmationCode }`
    this.email.subject = "Jambo - Email Confirmation"
  }

  public async send()
  {
    this.decorate()
    this.email.send()
  }
}


export class ConfirmationEmail
{
  public static async send( reciever: string, confirmationCode: string )
  {
    const email = new EmailConfirmationDecorator( new BasicEmail( reciever ), confirmationCode )
    return email.send()
  }
}