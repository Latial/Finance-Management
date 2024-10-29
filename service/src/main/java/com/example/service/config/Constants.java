package com.example.service.config;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;


public final class Constants {
    public static final String SYSTEM = "system";
    public static final String SPRING_PROFILE_DEVELOPMENT = "dev";
    public static final MacAlgorithm JWT_ALGORITHM = MacAlgorithm.HS512;
    public static final String AUTHORITIES_KEY = "auth";
    public static final String ID_KEY = "id";
}
