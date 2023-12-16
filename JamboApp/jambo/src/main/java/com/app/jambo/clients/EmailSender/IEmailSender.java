package com.app.jambo.clients.EmailSender;

import com.app.jambo.utils.Email;

public interface IEmailSender {
  public void sendEmail(Email reciever, String message);
}
