package com.example.service.service;

import com.example.service.domain.History;
import com.example.service.domain.Statistics;
import com.example.service.mapper.StatisticsMapper;
import com.example.service.repository.ExpendRepository;
import com.example.service.repository.HistoryRepository;
import com.example.service.repository.StatisticsRepository;
import com.example.service.repository.UserRepository;
import com.example.service.service.dto.HistoryRequest;
import com.example.service.service.dto.HistoryResponse;
import com.example.service.service.dto.StatisticsRequest;
import com.example.service.service.dto.StatisticsResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticsService {
    private final StatisticsRepository statisticsRepository;
    private final StatisticsMapper statisticsMapper;
    private final UserRepository userRepository;
    private final HistoryRepository historyRepository;
    private final ExpendRepository expendRepository;

    @Transactional(readOnly = true)
    public List<StatisticsResponse> getStatistics() {
        return statisticsRepository
                .findAll()
                .stream()
                .map(statisticsMapper::toResponse)
                .toList();
    }
    public StatisticsResponse addStat(StatisticsRequest statisticsRequest) {
        var user = userRepository.findById(Long.parseLong(statisticsRequest.getUserId()))
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        var expendHigh = expendRepository.findTopExpenseByUserId(Long.parseLong(statisticsRequest.getUserId()),Math.toIntExact(statisticsRequest.getMonth()),Math.toIntExact(statisticsRequest.getYear()));
        var expendLow = expendRepository.findLowestExpenseByUserId(Long.parseLong(statisticsRequest.getUserId()));
        var monthlyExpends = expendRepository.findTotalSpendingsForMonthAndYear(Math.toIntExact(statisticsRequest.getMonth()),Math.toIntExact(statisticsRequest.getYear()));
        var fixedCostsCount = expendRepository.countExpendByTypeId(1L);
        var flexibleCostsCount = expendRepository.countExpendByTypeId(2L);
        var bigPurchaseCount = expendRepository.countExpendByTypeId(3L);
        var fixCostsCountMoth = expendRepository.findTotalFixedCountForMonthYear(Math.toIntExact(statisticsRequest.getMonth()),Math.toIntExact(statisticsRequest.getYear()));
        var flexibleCostsCountMoth = expendRepository.findTotalFlexibleCountForMonthYear(Math.toIntExact(statisticsRequest.getMonth()),Math.toIntExact(statisticsRequest.getYear()));
        var bigPurchaseCountMoth = expendRepository.findTotalBigPurchaseCountForMonthYear(Math.toIntExact(statisticsRequest.getMonth()),Math.toIntExact(statisticsRequest.getYear()));
        var smallestMonthlyPurchase = expendRepository.findTopExpenseByUserIdMonth(Long.parseLong(statisticsRequest.getUserId()), Math.toIntExact(statisticsRequest.getMonth()),Math.toIntExact(statisticsRequest.getYear()));
        Statistics stat = statisticsRepository.count() > 0
                ? statisticsRepository.findByUserId(Long.parseLong(statisticsRequest.getUserId()))
                : new Statistics();

        if (stat.getId() == null) {
            stat.setUser(user);
        }
        stat.setBiggestExpend(expendHigh.getFirst().getPrice());
        stat.setMonthlyExpend(monthlyExpends);
        stat.setSmallestExpend(expendLow.getFirst().getPrice());
        stat.setFixedCostsCount(Double.valueOf(fixedCostsCount));
        stat.setFlexibleCostsCount(Double.valueOf(flexibleCostsCount));
        stat.setBigPurchasesCount(Double.valueOf(bigPurchaseCount));
        stat.setFixedCostsCountMonth(fixCostsCountMoth);
        stat.setFlexibleCostsCountMonth(flexibleCostsCountMoth);
        stat.setBigPurchasesCountMonth(bigPurchaseCountMoth);
        stat.setSmallestMonthlyPurchase(smallestMonthlyPurchase.getFirst().getPrice());

        statisticsRepository.save(stat);
        return statisticsRepository.findById(stat.getId())
                .map(statisticsMapper::toResponse)
                .orElseThrow();
    }
}
