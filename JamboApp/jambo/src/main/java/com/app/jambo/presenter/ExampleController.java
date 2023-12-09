package com.app.jambo.presenter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ExampleController {


    @GetMapping("/test")
    public String getTest() {
        return "Everything is in the right place...";
    }
}