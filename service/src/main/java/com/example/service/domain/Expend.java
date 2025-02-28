package com.example.service.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "expend")
@Getter
@Setter
public class Expend {
    @Id
    @GeneratedValue
    @OrderBy
    @Column(name = "id")
    private Long id;

    @Column(name = "date", unique = false, nullable = false)
    private Date date;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Double price;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private ExpendType type;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany(mappedBy = "userExpends")
    private Set<User> expends = new LinkedHashSet<>();
}
