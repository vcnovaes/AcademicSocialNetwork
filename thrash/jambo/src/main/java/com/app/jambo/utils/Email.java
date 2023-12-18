package com.app.jambo.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import jakarta.persistence.Embeddable;

@Embeddable
public class Email {
  private static final String EMAIL_REGEX = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";

  private String email;

  Email() {

  }

  Email(String email) {
    if (isValidEmail(email)) {
      this.email = email;
    } else {
      throw new IllegalArgumentException("Invalid email address: " + email);
    }
  }

  @Override
  public String toString() {
    return email;
  }

  private boolean isValidEmail(String email) {
    Pattern pattern = Pattern.compile(EMAIL_REGEX);
    Matcher matcher = pattern.matcher(email);
    return matcher.matches();
  }
}
