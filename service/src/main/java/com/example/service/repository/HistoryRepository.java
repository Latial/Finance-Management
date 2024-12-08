package com.example.service.repository;

import com.example.service.domain.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
@Repository
public interface HistoryRepository extends JpaRepository<History, Long> , JpaSpecificationExecutor<History> {
    List<Object> findByIdOrderByExpendPrice(Long id);
    @Query("SELECT SUM(h.expendPrice) FROM History as h WHERE EXTRACT(MONTH FROM h.date) = :month AND EXTRACT(YEAR FROM h.date) = :year")
    Double findTotalSpendingsForMonthAndYear(@Param("month") int month, @Param("year") int year);
}
