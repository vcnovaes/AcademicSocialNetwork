package com.app.jambo.communication.clients.EmailSender;

public interface IExternalEmailApplication {
  public void sendEmail(EmailPayload emailPayload);
}
