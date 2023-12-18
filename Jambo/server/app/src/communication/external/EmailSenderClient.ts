import { QueueClientFactory } from "../infrastructure/queue/QueueClientFactory"
import { RabbitMQClient } from "../infrastructure/queue/RabbitMQClient"
import { IEmailPayload } from "./IEmailPayload"
import { IEmailSenderClient } from "./IEmailSenderClient"

export class EmailSenderClient implements IEmailSenderClient
{
  private client: RabbitMQClient | undefined = undefined
  private communicationQueue: string = ''
  constructor ()
  {
    this.communicationQueue = Bun.env.emailApplicationQueue as string
  }
  async checkConnection()
  {
    if ( this.client == undefined )
    {
      this.client = await QueueClientFactory.getInstance( {
        name: this.communicationQueue,
        isDurable: true,
        isExclusive: false
      } )
    }
  }

  public async sendEmail( email: IEmailPayload ): Promise<void>
  {
    await this.checkConnection()
    const message = JSON.stringify( email )
    await this.client?.publishMessage( message )
  }
}