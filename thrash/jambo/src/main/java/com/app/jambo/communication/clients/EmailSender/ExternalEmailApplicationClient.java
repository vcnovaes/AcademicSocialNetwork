package com.app.jambo.communication.clients.EmailSender;

import org.springframework.beans.factory.annotation.Value;

import com.app.jambo.communication.infrastructure.queue.CommunicationQueue;
import com.app.jambo.communication.infrastructure.queue.CommunicationQueueConfigBuilder;
import com.app.jambo.communication.infrastructure.queue.IProducer;
import com.app.jambo.utils.JsonSerializer;

public class ExternalEmailApplicationClient implements IExternalEmailApplication {

  class ExternalEmailApplicationQueueFactory {
    @Value("${external.app.emailsender.queue}")
    private String communicationQueueName;
    private CommunicationQueue queue;

    ExternalEmailApplicationQueueFactory() {
      var queueConfig = new CommunicationQueueConfigBuilder()
          .setAutoDelete(false)
          .setDurable(true)
          .setExclusive(false)
          .getConfiguration();
      queue = new CommunicationQueue(communicationQueueName, queueConfig);
    }

    public CommunicationQueue getQueue() {
      return this.queue;
    }
  }

  private IProducer broker;
  private CommunicationQueue queue;

  ExternalEmailApplicationClient(IProducer producer) {
    broker = producer;
    queue = new ExternalEmailApplicationQueueFactory().getQueue();
    try {
      this.broker.setQueue(queue);
    } catch (Exception exception) {
      System.err.println("Error on external email application");
      System.err.println(exception.getMessage());
    }
  }

  @Override
  public void sendEmail(EmailPayload emailPayload) {
    var serializedPayload = JsonSerializer.serializeToJson(emailPayload);
    try {
      this.broker.publish(serializedPayload);
    } catch (Exception e) {
      System.err.println("Error on publish message on queue");
      e.printStackTrace();
    }
    throw new UnsupportedOperationException("Unimplemented method 'sendEmail'");
  }

}
