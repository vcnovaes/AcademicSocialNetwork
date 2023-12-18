package com.app.jambo.utils;

public class ConfirmationCodeGeneratorFactory {
  private final int CODE_LENGTH = 5;

  public ConfirmationCodeGenerator createConfirmationCodeGenerator() {
    return new ConfirmationCodeGenerator(CODE_LENGTH);
  }
}
