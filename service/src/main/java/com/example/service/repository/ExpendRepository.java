package com.example.service.repository;

import com.example.service.domain.Expend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ExpendRepository extends JpaRepository<Expend, Long> , JpaSpecificationExecutor<Expend> {

}
