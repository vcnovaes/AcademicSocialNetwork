package com.app.jambo.utils;

import java.security.SecureRandom;

public class SecureCodeGenerator implements ISecureCodeGenerator {
  private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  private static final int CODE_LENGTH = 8;
  private static final SecureRandom RANDOM = new SecureRandom();

  private StringBuilder codeBuilder;

  public SecureCodeGenerator(int codeLength) {
    this.codeBuilder = new StringBuilder(codeLength);
  }

  @Override
  public String generate() {
    for (int i = 0; i < CODE_LENGTH; i++) {
      int randomIndex = RANDOM.nextInt(CHARACTERS.length());
      char randomChar = CHARACTERS.charAt(randomIndex);
      codeBuilder.append(randomChar);
    }

    return codeBuilder.toString();
  }
}
