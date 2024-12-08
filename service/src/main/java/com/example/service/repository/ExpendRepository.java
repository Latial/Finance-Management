package com.example.service.repository;

import com.example.service.domain.Expend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.awt.print.Pageable;
import java.util.List;

public interface ExpendRepository extends JpaRepository<Expend, Long> , JpaSpecificationExecutor<Expend> {
    @Query("SELECT e FROM Expend e WHERE e.user.id = :userId ORDER BY e.price DESC")
    List<Expend> findTopExpenseByUserId(@Param("userId") Long userId);
    @Query("SELECT e FROM Expend e WHERE e.user.id = :userId ORDER BY e.price ASC")
    List<Expend> findLowestExpenseByUserId(@Param("userId") Long userId);
}
