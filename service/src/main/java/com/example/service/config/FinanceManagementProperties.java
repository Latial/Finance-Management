package com.example.service.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework. web.cors.CorsConfiguration;

@Data
@ConfigurationProperties(prefix = "finance", ignoreUnknownFields = false)

public class FinanceManagementProperties {
    private final String baseUrl = "http://localhost:8080";
    private final String baseUrlRedirect = "http://localhost:3000";
    private Security security = new Security();
    private CorsConfiguration cors = new CorsConfiguration();
    private User user = new User();
    private Batch batch = new Batch();

    @Data
    public static class Security {
        private String base64Secret;
    }

    @Data
    public static class User {
        private String email;
        private String password;
    }

    @Data
    public static class Batch {
        private Boolean importData;
        private Boolean writeDescription;
    }
}