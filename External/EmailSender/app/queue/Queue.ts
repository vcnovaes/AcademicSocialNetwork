import * as amqp from "amqplib";

const QUEUE_NAME = Bun.env.QUEUE_NAME as string;
export async function setupConnectionWithBrocker() {
  let channel: amqp.Channel;
  try {
    const connectionString = Bun.env.RABBIT_MQ_HOST as string;
    console.log(connectionString);
    const connection = await amqp.connect(connectionString);
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
  } catch (error) {
    console.error("Error connecting to queue broker");
    console.error(error);
    throw error;
  }
  return channel;
}
export async function ConsumeAndExecute(
  channel: amqp.Channel,
  routine: (message: string) => Promise<any>
) {
  channel.consume(QUEUE_NAME, async (message) => {
    if (message === null) return;
    const content = message.content.toString();
    await routine(content);
    channel.ack(message);
  });
}
