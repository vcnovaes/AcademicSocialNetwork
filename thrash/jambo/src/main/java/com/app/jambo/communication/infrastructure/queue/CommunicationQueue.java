package com.app.jambo.communication.infrastructure.queue;

public class CommunicationQueue {
  private String name;
  private CommunicationQueueConfig configuration;

  public CommunicationQueue(String name, CommunicationQueueConfig config) {
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