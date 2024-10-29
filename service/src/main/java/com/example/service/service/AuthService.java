package com.example.service.service;

import com.example.service.config.Constants;
import com.example.service.config.FinanceManagementProperties;
import com.example.service.mapper.UserMapper;
import com.example.service.service.dto.RegisterUserRequest;
import com.example.service.domain.User;
import com.example.service.repository.UserRepository;
import com.example.service.service.dto.AuthorizeRequest;
import com.example.service.service.dto.RegisterUserResponse;
import com.example.service.service.exception.EmailAlreadyUsedException;
import com.example.service.service.exception.UsernameAlreadyUsedException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

import java.time.Instant;
import java.util.stream.Collectors;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtEncoder jwtEncoder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final FinanceManagementProperties financeManagementProperties;
    //private final MailService mailService;

    public AuthorizationResponse authenticate(AuthorizeRequest authenticationRequest) {
        var authenticationToken = new UsernamePasswordAuthenticationToken(
                authenticationRequest.getEmail(),
                authenticationRequest.getPassword()
        );

        var authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        var authorities = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));

        var now = Instant.now();
        var validity = now.plus(365, ChronoUnit.DAYS);

        var user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        var claims = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(validity)
                .subject(authentication.getName())
                .claim(Constants.AUTHORITIES_KEY, authorities)
                .claim(Constants.ID_KEY, user.getId())
                .build();

        var jwsHeader = JwsHeader.with(MacAlgorithm.HS512).build();
        var jwt = this.jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();


        return new AuthorizationResponse(jwt);
    }

    @Transactional
    public RegisterUserResponse register(RegisterUserRequest registerUserRequest) {
        userRepository.findByEmail(registerUserRequest.getEmail())
                .ifPresent(_ -> {
                    throw new EmailAlreadyUsedException();
                });
        userRepository.findByUsername(registerUserRequest.getUsername())
                .ifPresent(_ -> {
                    throw new UsernameAlreadyUsedException();
                });

        var activationToken = UUID.randomUUID().toString();

        var user = userMapper.fromRegisterRequest(registerUserRequest);

        var encodedPassword = passwordEncoder.encode(registerUserRequest.getPassword());
        user.setPassword(encodedPassword);
        user.setUsername(registerUserRequest.getUsername());
        user.setEmail(registerUserRequest.getEmail());
        user.setActive(false);
        user.setActivationToken(activationToken);
        userRepository.save(user);

        var activationLink = "%s/api/auth/activate?token=%s".formatted(financeManagementProperties.getBaseUrl(), activationToken);
        //mailService.sendActivationEmail(user.getEmail(), user.getUsername(), activationLink);

        var authRequest = new AuthorizeRequest(registerUserRequest.getEmail(),registerUserRequest.getPassword());
        var authResponse = authenticate(authRequest);

        return RegisterUserResponse
                .builder()
                .token(authResponse.getToken())
                .build();
    }

    @Transactional
    public boolean activateAccount(String key) {
        return userRepository.findOneByActivationToken(key)
                .map(user -> {
                    user.setActive(true);
                    user.setActivationToken(null);
                    userRepository.save(user);
                    return true;
                })
                .orElse(false);


    }
}