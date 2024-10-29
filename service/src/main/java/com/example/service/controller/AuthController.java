package com.example.service.controller;

import com.example.service.config.FinanceManagementProperties;
import com.example.service.service.dto.RegisterUserRequest;
import com.example.service.service.AuthService;
import com.example.service.service.AuthorizationResponse;
import com.example.service.service.dto.AuthorizeRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.example.service.service.dto.RegisterUserResponse;
import org.springframework.http.HttpHeaders;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;
import com.example.service.config.FinanceManagementProperties;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final Environment environment;
    private final AuthService authService;
    private final FinanceManagementProperties financeManagementProperties;

    @PostMapping("/authorize")
    public ResponseEntity<AuthorizationResponse> authorize(@Valid @RequestBody AuthorizeRequest authorizeRequest) {
        var response = authService.authenticate(authorizeRequest);
        var httpHeaders = new HttpHeaders();
        httpHeaders.setBearerAuth(response.getToken());
        var profiles = environment.getActiveProfiles();
        return ResponseEntity
                .ok()
                .headers(httpHeaders)
                .body(response);
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponse> register(@Valid @RequestBody RegisterUserRequest registerUserRequest) {
        var response = authService.register(registerUserRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse httpServletResponse) {
        httpServletResponse.addHeader("token", "");
        return ResponseEntity
                .noContent()
                .build();
    }

    @GetMapping("/activate")
    public void activateAccount(@RequestParam("token") String token, HttpServletResponse httpServletResponse) throws IOException, IOException {
        var activated = authService.activateAccount(token);

        if (activated) {
            httpServletResponse.sendRedirect(
                    "%s/sign-in?activated=true".formatted(financeManagementProperties.getBaseUrlRedirect())
            );
        } else {
            httpServletResponse.sendRedirect(
                    "%s/invalid-activation-token".formatted(financeManagementProperties.getBaseUrl())
            );
        }


    }
}