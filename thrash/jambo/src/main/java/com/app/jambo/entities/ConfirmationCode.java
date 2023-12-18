package com.app.jambo.entities;

import com.app.jambo.utils.Email;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public record ConfirmationCode(Email email, @Id String code) {
}