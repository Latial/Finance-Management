package com.example.service.repository;

import com.example.service.domain.ExpendType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ExpendTypeRepository extends JpaRepository<ExpendType, Long>, JpaSpecificationExecutor<ExpendType> {
}
