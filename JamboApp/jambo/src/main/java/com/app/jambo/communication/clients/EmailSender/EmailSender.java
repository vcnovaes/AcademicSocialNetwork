package com.app.jambo.communication.clients.EmailSender;

import com.app.jambo.utils.Email;

public class EmailSender implements IEmailSender {

  IExternalEmailApplication emailApplication;

  EmailSender(IExternalEmailApplication emailApplicationServer) {
    emailApplication = emailApplicationServer;
  }

  @Override
  public void sendEmail(Email reciever, String message) {
    var emailPayload = new EmailPayload(reciever.toString(), message);
    emailApplication.sendEmail(emailPayload);
  }
}
