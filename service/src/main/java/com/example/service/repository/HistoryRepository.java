package com.example.service.repository;

import com.example.service.domain.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface HistoryRepository extends JpaRepository<History, Long> , JpaSpecificationExecutor<History> {

}
