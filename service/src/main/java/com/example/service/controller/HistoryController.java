package com.example.service.controller;

import com.example.service.service.HistoryService;
import com.example.service.service.dto.*;
import jakarta.validation.Valid;
import org.springdoc.core.annotations.ParameterObject;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/history")
public class HistoryController {
    private final HistoryService historyService;

    @GetMapping
    @SneakyThrows
    public ResponseEntity<Page<HistoryResponse>> getWholeHistory(@ParameterObject Pageable pageable) {
        var history = historyService.getWholeHistory(pageable);
        return ResponseEntity.ok(history);
    }

    @PostMapping("/addHistoryDate")
    public ResponseEntity<HistoryResponse> addHistoryDate(@RequestBody HistoryRequest historyRequest) {
        var response = historyService.addHistoryDate(historyRequest);
        return ResponseEntity.ok(response);
    }
}
