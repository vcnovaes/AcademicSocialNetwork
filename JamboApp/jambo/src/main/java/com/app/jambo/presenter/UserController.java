package com.app.jambo.presenter;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.jambo.communication.clients.EmailSender.EmailPayload;
import com.app.jambo.communication.clients.EmailSender.ExternalEmailApplicationSingleton;
import com.app.jambo.utils.JsonSerializer;

@RestController
public class UserController {

    @GetMapping("/test")
    public String getTest() {
        var email = new EmailPayload("vini2novaes@gmail.com", "Test", "Test");
        ExternalEmailApplicationSingleton.sendEmail(email);
        return JsonSerializer.serializeToJson(email);
    }
}