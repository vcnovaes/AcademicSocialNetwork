package com.app.jambo.communication.infrastructure.queue.rabbitmq;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

import com.rabbitmq.client.ConnectionFactory;

public class RabbitMQConfig {
  @Value("${spring.rabbitmq.host}")
  private static String rabbitMQHost;

  @Value("${spring.rabbitmq.port}")
  private static int rabbitMQPort;

  @Bean
  public static ConnectionFactory connectionFactory() {
    ConnectionFactory connectionFactory = new ConnectionFactory();
    connectionFactory.setHost(rabbitMQHost);
    connectionFactory.setPort(rabbitMQPort);
    return connectionFactory;
  }
}