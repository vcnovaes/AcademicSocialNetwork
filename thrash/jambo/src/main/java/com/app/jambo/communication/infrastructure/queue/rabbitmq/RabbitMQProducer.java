package com.app.jambo.communication.infrastructure.queue.rabbitmq;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

import javax.management.InvalidAttributeValueException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.app.jambo.communication.infrastructure.queue.CommunicationQueue;
import com.app.jambo.communication.infrastructure.queue.IProducer;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.AMQP.BasicProperties;

public class RabbitMQProducer implements IProducer {
  private Channel channel;
  private CommunicationQueue targetQueue;
  private Connection connection;

  public void setQueue(CommunicationQueue queue) throws IOException {
    this.targetQueue = queue;
    initQueue();
  }

  public RabbitMQProducer() throws IOException, TimeoutException {
    this(new RabbitMQConfig());
  }

  public RabbitMQProducer(RabbitMQConfig config) throws IOException, TimeoutException {
    connection = RabbitMQConfig.connectionFactory()
        .newConnection();
    channel = connection.createChannel();
    targetQueue = null;
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

  public void publish(String message, BasicProperties props, String exchange)
      throws IOException, InvalidAttributeValueException {
    if (targetQueue == null) {
      throw new InvalidAttributeValueException("Target queue was not defined");
    }
    this.channel.basicPublish(exchange, targetQueue.getName(), props, message.getBytes());
  }

  @Override
  public void publish(String message) throws IOException, InvalidAttributeValueException {
    this.publish(message, null, "");
  }
}
