package com.app.jambo.communication.infrastructure.queue;

import java.io.IOException;

import javax.management.InvalidAttributeValueException;

public interface IProducer {
  public void publish(String message) throws IOException, InvalidAttributeValueException;

  public void setQueue(CommunicationQueue queue) throws IOException;
}
