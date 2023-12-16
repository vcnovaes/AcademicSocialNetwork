package com.app.jambo.communication.infrastructure.queue.rabbitmq;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

import com.app.jambo.communication.infrastructure.queue.CommunicationQueue;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.AMQP.BasicProperties;

public class RabbitMQProducer {
  private Channel channel;
  private CommunicationQueue targetQueue;
  private Connection connection;

  RabbitMQProducer(CommunicationQueue queue) throws IOException, TimeoutException {
    connection = RabbitMQConfig.connectionFactory()
        .newConnection();
    channel = connection.createChannel();
    targetQueue = queue;
    initQueue();
  }

  private void initQueue() throws IOException {
    var queueConfig = targetQueue.getConfig();
    this.channel.queueDeclare(
        targetQueue.getName(),
        queueConfig.isDurable(),
        queueConfig.isExclusive(),
        queueConfig.shouldAutoDelete(),
        null);
  }

  public void publishWithoutExchange(String message, BasicProperties props) throws IOException {
    this.channel.basicPublish("", targetQueue.getName(), props, message.getBytes());
  }
}
