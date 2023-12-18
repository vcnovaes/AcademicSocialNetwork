package com.app.jambo.communication.clients.EmailSender;

import com.app.jambo.utils.Email;

public class EmailSender implements IEmailSender {

  IExternalEmailApplication emailApplication;

  EmailSender(IExternalEmailApplication emailApplicationServer) {
    emailApplication = emailApplicationServer;
  }

  @Override
  public void sendEmail(Email reciever, String subject, String message) {
    var emailPayload = new EmailPayload(reciever.toString(), subject, message);
    emailApplication.sendEmail(emailPayload);
  }
}
