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
@Table(name = "user_history")
public class History {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "date", unique = false, nullable = false)
    private Date date;

    @Column(name = "expend_name", unique = false)
    private String expendName;

    @Column(name = "expend_price", unique = false)
    private Double expendPrice;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private ExpendType type;

    @Column(name = "status", unique = false)
    private String status;

}
