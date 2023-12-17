package com.app.jambo.communication.clients.EmailSender;

import java.io.Serializable;

public record EmailPayload(String reciever, String subject, String message) implements Serializable {
}
