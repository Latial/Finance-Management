package com.example.service.repository;

import com.example.service.domain.History;
import com.example.service.domain.Statistics;
import com.example.service.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StatisticsRepository extends JpaRepository<Statistics, Long> , JpaSpecificationExecutor<Statistics> {
    Object findByUser(User user);
    Statistics findByUserId(Long id);
}
