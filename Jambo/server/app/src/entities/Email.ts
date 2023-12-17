import { EmailSenderFacade } from "../communication/external/EmailSenderFacade"
import { IEmailPayload } from "../communication/external/IEmailPayload"
import { CodeGenerator, RandomCodeStrategy } from "../persistence/utils/CodeGenerator"

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

  constructor ( email: Email )
  {
    this.email = email
  }

  decorate(): void
  {
    const code = new CodeGenerator( new RandomCodeStrategy() ).generateCode()
    this.email.message = `Confirmation Code: ${ code }`
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
  public static async send( reciever: string )
  {
    const email = new EmailConfirmationDecorator( new BasicEmail( reciever ) )
    return email.send()
  }
}