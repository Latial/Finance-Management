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
        var expendHigh = expendRepository.findTopExpenseByUserId(Long.parseLong(statisticsRequest.getUserId()));
        var expendLow = expendRepository.findLowestExpenseByUserId(Long.parseLong(statisticsRequest.getUserId()));
        if (statisticsRepository.count() > 0) {
            Statistics stat = statisticsRepository.findByUserId(Long.parseLong(statisticsRequest.getUserId()));
            stat.setBiggestExpend(expendHigh.getFirst().getPrice());
            stat.setMonthlyExpend(0.0);
            stat.setSmallestExpend(expendLow.getFirst().getPrice());
            statisticsRepository.save(stat);
        }
        else {
            var stat = new Statistics();
            stat.setUser(user);
            stat.setBiggestExpend(expendHigh.getFirst().getPrice());
            stat.setMonthlyExpend(0.0);
            stat.setSmallestExpend(expendLow.getFirst().getPrice());
            statisticsRepository.save(stat);
        }
        return StatisticsResponse
                .builder()
                .build();
    }
}
