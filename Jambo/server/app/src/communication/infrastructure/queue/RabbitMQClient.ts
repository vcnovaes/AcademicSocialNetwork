import * as amqp from 'amqplib'
import { IQueue } from './IQueue'
import { QueueClient } from './QueueClient'

export class RabbitMQClient extends QueueClient
{
  private url!: string
  private channel!: amqp.Channel
  private connection!: amqp.Connection
  private targetQueue!: IQueue

  constructor ( queue: IQueue )
  {
    super()
    this.url = Bun.env.rabbitMQUrl as string
    this.targetQueue = queue
  }

  async connect()
  {
    try
    {
      this.connection = await amqp.connect( this.url )
      this.channel = await this.connection.createChannel()
      await this.channel.assertQueue( this.targetQueue.name, {
        durable: this.targetQueue.isDurable,
        exclusive: this.targetQueue.isExclusive
      } )
    } catch ( error )
    {
      console.error( 'Error connecting to RabbitMQ:', error )
      throw error
    }
  }

  async publishMessage( message: string )
  {
    try
    {
      this.channel.sendToQueue( this.targetQueue.name, Buffer.from( message ) )
      console.log( 'Message sent:', message )
    } catch ( error )
    {
      console.error( 'Error publishing message:', error )
      throw error
    }
  }

}
// RabbitMQ connection details