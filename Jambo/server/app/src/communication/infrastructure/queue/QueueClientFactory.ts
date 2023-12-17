import { IQueue } from "./IQueue"
import { RabbitMQClient } from "./RabbitMQClient"

export class QueueClientFactory
{
  public static async getInstance( queue: IQueue )
  {
    if ( Bun.env.queueManagerService == "rabbitmq" )
    {
      const client = new RabbitMQClient( queue )
      await client.connect()
      return client
    }
  }
}