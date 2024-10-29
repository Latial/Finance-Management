package com.example.service.controller;

import com.example.service.config.Constants;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

public class SecurityUtils {

    public static Long getCurrentUserId() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new IllegalStateException("No authentication found");
        }
        if (authentication.getCredentials() instanceof Jwt jwt) {
            return jwt.getClaim(Constants.ID_KEY);
        }
        throw new IllegalStateException("No JWT found");
    }
}