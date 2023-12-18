package com.app.jambo.utils;

import com.app.jambo.entities.ConfirmationCode;

public class ConfirmationCodeGenerator extends SecureCodeGenerator {

  ConfirmationCodeGenerator(int codeLength) {
    super(codeLength);
  }

  public ConfirmationCode generate(Email email) {
    return new ConfirmationCode(email, super.generate());
  }
}
