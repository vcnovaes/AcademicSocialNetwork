package com.app.jambo.communication.infrastructure.queue;

public abstract class CommunicationQueue {
  private String name;
  private CommunicationQueueConfig configuration;

  CommunicationQueue(String name, CommunicationQueueConfig config) {
    this.name = name;
    this.configuration = config;
  }

  public String getName() {
    return name;
  }

  public CommunicationQueueConfig getConfig() {
    return configuration;
  }

}