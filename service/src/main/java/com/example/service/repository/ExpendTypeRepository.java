package com.example.service.repository;

import com.example.service.domain.ExpendType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface ExpendTypeRepository extends JpaRepository<ExpendType, Long>, JpaSpecificationExecutor<ExpendType> {
    Optional<ExpendType> findByType(String name);
}
