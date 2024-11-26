package com.example.service.domain;

import com.example.service.config.AuthoritiesConstants;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.proxy.HibernateProxy;

import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "lucyus_authority")

public class Authority extends AbstractAuditingEntity<String> {
    @Id
    @Column(name = "name", nullable = false)
    private String name;

    @Override
    public String getId() {
        return name;
    }

    public static Authority admin() {
        var authority = new Authority();
        authority.setName(AuthoritiesConstants.ADMIN);
        return authority;
    }

    public static Authority user() {
        var authority = new Authority();
        authority.setName(AuthoritiesConstants.USER);
        return authority;
    }
}