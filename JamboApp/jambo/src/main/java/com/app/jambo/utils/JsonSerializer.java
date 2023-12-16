package com.app.jambo.utils;

import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonSerializer {
  public static String serializeToJson(Object object) {
    try {
      ObjectMapper objectMapper = new ObjectMapper();
      return objectMapper.writeValueAsString(object);
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }
}
