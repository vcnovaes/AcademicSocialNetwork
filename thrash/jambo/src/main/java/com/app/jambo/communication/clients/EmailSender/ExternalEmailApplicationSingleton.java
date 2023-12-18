package com.app.jambo.communication.clients.EmailSender;

public class ExternalEmailApplicationSingleton {
  static private ExternalEmailApplicationClientWrapper applicationWrapper;

  public static void sendEmail(EmailPayload emailPayload) {
    if (applicationWrapper == null) {
      applicationWrapper = new ExternalEmailApplicationClientWrapper();
    }
    applicationWrapper.sendEmail(emailPayload);
  }
}
