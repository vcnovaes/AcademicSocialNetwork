package com.app.jambo.entities;

import java.util.Objects;

import com.app.jambo.utils.Email;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "_user")
public class User {
  private @Id @GeneratedValue Long id;

  private String firstName;
  private String lastName;

  private Email email;

  public Email getEmail() {
    return this.email;
  }

  public void setEmail(Email email) {
    this.email = email;
  }

  public String getFirstName() {
    return this.firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return this.lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  User() {
  }

  @Override
  public boolean equals(Object o) {

    if (this == o)
      return true;
    if (!(o instanceof User))
      return false;
    User user = (User) o;
    return Objects.equals(this.id, user.id) && Objects.equals(this.email, user.email);
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.email, this.firstName, this.lastName);
  }

  User(String firstName, String lastName, Email email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
