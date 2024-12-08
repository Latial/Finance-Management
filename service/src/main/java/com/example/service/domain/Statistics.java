package com.example.service.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.Date;

@Entity
@Getter
@Setter
@Service
@Table(name = "user_statistics")
public class Statistics {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "biggestExpend", nullable = true)
    private Double biggestExpend;

    @Column(name = "smallestExpend", nullable = true)
    private Double smallestExpend;

    @Column(name = "monthlyExpend", nullable = true)
    private Double monthlyExpend;
}
