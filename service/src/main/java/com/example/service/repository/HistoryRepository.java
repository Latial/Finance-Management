package com.example.service.repository;

import com.example.service.domain.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
@Repository
public interface HistoryRepository extends JpaRepository<History, Long> , JpaSpecificationExecutor<History> {
    List<Object> findByIdOrderByExpendPrice(Long id);
    @Query("SELECT SUM(h.expendPrice) FROM History as h WHERE EXTRACT(MONTH FROM h.date) = :month AND EXTRACT(YEAR FROM h.date) = :year")
    Double findTotalSpendingsForMonthAndYear(@Param("month") int month, @Param("year") int year);
    @Query("SELECT COUNT(h.type.id) FROM History as h WHERE  h.type.id = 1 AND EXTRACT(MONTH FROM h.date) = :month AND EXTRACT(YEAR FROM h.date) = :year")
    Double findTotalFixedCountForMonthYear(@Param("month") int month, @Param("year") int year);
    @Query("SELECT COUNT(h.type.id) FROM History as h WHERE  h.type.id = 2 AND EXTRACT(MONTH FROM h.date) = :month AND EXTRACT(YEAR FROM h.date) = :year")
    Double findTotalFlexibleCountForMonthYear(@Param("month") int month, @Param("year") int year);
    @Query("SELECT COUNT(h.type.id) FROM History as h WHERE  h.type.id = 3 AND EXTRACT(MONTH FROM h.date) = :month AND EXTRACT(YEAR FROM h.date) = :year")
    Double findTotalBigPurchaseCountForMonthYear(@Param("month") int month, @Param("year") int year);
    @Query("SELECT h FROM History h WHERE h.date >= :startOfWeek AND h.date <= :endOfWeek")
    List<History> findRecordsBetweenDates(@Param("startOfWeek") LocalDate startOfWeek, @Param("endOfWeek") LocalDate endOfWeek);
}
