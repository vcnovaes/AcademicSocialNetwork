package com.app.jambo.communication.clients.EmailSender;

import com.app.jambo.communication.infrastructure.queue.IProducer;
import com.app.jambo.communication.infrastructure.queue.rabbitmq.RabbitMQProducer;

public class ExternalEmailApplicationClientWrapper {
  private ExternalEmailApplicationClient client;

  public ExternalEmailApplicationClientWrapper(IProducer producer) {
    if (producer == null) {
      try {
        producer = new RabbitMQProducer();
        client = new ExternalEmailApplicationClient(producer);
      } catch (Exception e) {
        System.err.println("An error occurred when try to start communication with email application");
        System.err.println(e.getMessage());
        e.printStackTrace();
      }
    }
  }

  public ExternalEmailApplicationClientWrapper() {
    this(null);
  }

  public void sendEmail(EmailPayload emailPayload) {
    this.client.sendEmail(emailPayload);
  }
}
