package com.example.service.controller;

import com.example.service.service.StatisticsService;
import com.example.service.service.dto.StatisticsRequest;
import com.example.service.service.dto.StatisticsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/stats")
public class StatisticsController {
    private final StatisticsService statisticsService;

    @GetMapping
    public ResponseEntity<List<StatisticsResponse>> getStatistics() {
        var statistics = statisticsService.getStatistics();
        return ResponseEntity.ok(statistics);
    }
    @PostMapping("/addStat")
    public ResponseEntity<StatisticsResponse> addStat(@RequestBody StatisticsRequest statisticsRequest) {
        var response = statisticsService.addStat(statisticsRequest);
        return ResponseEntity.ok(response);
    }
}
