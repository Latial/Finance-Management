package com.example.service.service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.LinkedHashSet;
import java.util.Set;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class UserProfileResponse {
    @NotNull
    private Long id;
    @NotNull
    @Size(min = 5, max = 254)
    @Email
    private String email;

    @NotNull
    @Size(min = 5, max = 254)
    private String firstName;

    @NotNull
    @Size(min = 5, max = 254)
    private String lastName;

    @NotNull
    private Set<ExpendResponse> userExpends = new LinkedHashSet<>();
}
