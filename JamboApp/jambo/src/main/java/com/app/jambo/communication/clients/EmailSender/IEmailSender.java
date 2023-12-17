package com.app.jambo.communication.clients.EmailSender;

import com.app.jambo.utils.Email;

public interface IEmailSender {
  public void sendEmail(Email reciever, String subject, String message);
}
