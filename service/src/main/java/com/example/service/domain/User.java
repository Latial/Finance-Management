package com.example.service.domain;

import com.example.service.config.AuthoritiesConstants;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import jakarta.persistence.*;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Service
@DiscriminatorValue(AuthoritiesConstants.USER)
@Table(name = "finance_user")
public class User {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "first_name", unique = false, nullable = false)
    private String firstName;

    @Column(name = "last_name", unique = false, nullable = false)
    private String lastName;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "active", nullable = false)
    private Boolean active = false;

    @Column(name = "activation_token")
    private String activationToken;

    @ManyToMany
    @JoinTable(
            name = "userExpends",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "expend_id"))
    private Set<Expend> userExpends = new LinkedHashSet<>();
}