import * as amqp from "amqplib";

const QUEUE_NAME = Bun.env.QUEUE_NAME as string;
export async function setupConnectionWithBrocker() {
  const connectionString = Bun.env.RABBIT_MQ_HOST as string;
  const connection = await amqp.connect(connectionString);
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE_NAME, { durable: true });
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
