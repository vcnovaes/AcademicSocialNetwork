package com.app.jambo.communication.clients.EmailSender;

import java.io.Serializable;

public record EmailPayload(String reciever, String message) implements Serializable {
}
