package com.app.jambo.communication.infrastructure.queue.rabbitmq;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.rabbitmq.client.ConnectionFactory;

@Configuration
public class RabbitMQConfig {
  @Value("${spring.queuemanager.url}")
  private static String rabbitMQHost;

  @Value("${spring.queuemanager.port}")
  private static int rabbitMQPort;

  @Bean
  public static ConnectionFactory connectionFactory() {
    ConnectionFactory connectionFactory = new ConnectionFactory();
    if (rabbitMQHost == null) {
      rabbitMQHost = "amqp://localhost";
    }
    if (rabbitMQPort == 0) {
      rabbitMQPort = 5672;
    }
    connectionFactory.setHost(rabbitMQHost);
    connectionFactory.setPort(rabbitMQPort);
    return connectionFactory;
  }
}