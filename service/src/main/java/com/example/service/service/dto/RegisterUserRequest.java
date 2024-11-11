package com.example.service.service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class RegisterUserRequest implements Serializable {
    @NotNull
    @Size(min = 5, max = 60)
    private String password;
    @NotNull
    @Size(min = 5, max = 254)
    @Email
    private String email;
    @NotNull
    @Size(min = 5, max = 60)
    private String firstName;
    @NotNull
    @Size(min = 5, max = 60)
    private String lastName;
}