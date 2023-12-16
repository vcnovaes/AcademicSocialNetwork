package com.app.jambo.communication.infrastructure.queue;

public class CommunicationQueueConfigBuilder {
  CommunicationQueueConfig config;

  public CommunicationQueueConfig getConfiguration() {
    return this.config;
  }

  CommunicationQueueConfigBuilder() {
    config = new CommunicationQueueConfig();
  }

  public CommunicationQueueConfigBuilder setDurable(boolean isDurable) {
    config.setDurable(isDurable);
    return this;
  }

  public CommunicationQueueConfigBuilder setAutoDelete(boolean autoDelete) {
    config.setDurable(autoDelete);
    return this;
  }

  public CommunicationQueueConfigBuilder setExclusive(boolean isExclusive) {
    config.setExclusive(isExclusive);
    return this;
  }
}
