package com.app.jambo.communication.infrastructure.queue;

public class CommunicationQueueConfig {
  private boolean durable = false;
  private boolean autoDelete = false;
  private boolean exclusive = false;

  CommunicationQueueConfig() {
  }

  public void setDurable(boolean value) {
    durable = value;
  }

  public void setAutoDelete(boolean value) {
    autoDelete = value;
  }

  public void setExclusive(boolean value) {
    exclusive = value;
  }

  public boolean isDurable() {
    return this.durable;
  }

  public boolean shouldAutoDelete() {
    return this.autoDelete;
  }

  public boolean isExclusive() {
    return this.exclusive;
  }
}
