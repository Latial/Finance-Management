package com.example.service.repository;

import com.example.service.domain.Expend;
import com.example.service.domain.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.awt.print.Pageable;
import java.time.LocalDate;
import java.util.List;

public interface ExpendRepository extends JpaRepository<Expend, Long> , JpaSpecificationExecutor<Expend> {
    @Query("SELECT e FROM Expend e WHERE e.user.id = :userId AND EXTRACT(MONTH FROM e.date) = :month AND EXTRACT(YEAR FROM e.date) = :year ORDER BY e.price DESC")
    List<Expend> findTopExpenseByUserId(@Param("userId") Long userId, @Param("month") int month, @Param("year") int year);
    @Query("SELECT e FROM Expend e WHERE e.user.id = :userId ORDER BY e.price ASC")
    List<Expend> findLowestExpenseByUserId(@Param("userId") Long userId);
    Long countExpendByTypeId(Long typeId);
    @Query("SELECT SUM(e.price) FROM Expend as e WHERE EXTRACT(MONTH FROM e.date) = :month AND EXTRACT(YEAR FROM e.date) = :year")
    Double findTotalSpendingsForMonthAndYear(@Param("month") int month, @Param("year") int year);
    @Query("SELECT COUNT(e.type.id) FROM Expend as e WHERE  e.type.id = 1 AND EXTRACT(MONTH FROM e.date) = :month AND EXTRACT(YEAR FROM e.date) = :year")
    Double findTotalFixedCountForMonthYear(@Param("month") int month, @Param("year") int year);
    @Query("SELECT COUNT(e.type.id) FROM Expend as e WHERE  e.type.id = 2 AND EXTRACT(MONTH FROM e.date) = :month AND EXTRACT(YEAR FROM e.date) = :year")
    Double findTotalFlexibleCountForMonthYear(@Param("month") int month, @Param("year") int year);
    @Query("SELECT COUNT(e.type.id) FROM Expend as e WHERE  e.type.id = 3 AND EXTRACT(MONTH FROM e.date) = :month AND EXTRACT(YEAR FROM e.date) = :year")
    Double findTotalBigPurchaseCountForMonthYear(@Param("month") int month, @Param("year") int year);
    @Query("SELECT e FROM Expend e WHERE e.date >= :startOfWeek AND e.date <= :endOfWeek")
    List<Expend> findRecordsBetweenDates(@Param("startOfWeek") LocalDate startOfWeek, @Param("endOfWeek") LocalDate endOfWeek);
    @Query("SELECT e FROM Expend e WHERE e.user.id = :userId AND EXTRACT(MONTH FROM e.date) = :month AND EXTRACT(YEAR FROM e.date) = :year ORDER BY e.price ASC")
    List<Expend> findTopExpenseByUserIdMonth(@Param("userId") Long userId, @Param("month") int month, @Param("year") int year);
}
