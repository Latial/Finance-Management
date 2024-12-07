package com.example.service.controller;

import com.example.service.service.ExpendService;
import com.example.service.service.HistoryService;
import com.example.service.service.dto.*;
import jakarta.validation.Valid;
import lombok.Generated;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/history")
public class HistoryController {
    private final HistoryService historyService;

    @GetMapping
    public ResponseEntity<List<HistoryResponse>> getWholeHistory() {
        var history = historyService.getWholeHistory();
        return ResponseEntity.ok(history);
    }
    @PostMapping("/addHistoryDate")
    public ResponseEntity<HistoryResponse> addHistoryDate(@RequestBody HistoryRequest historyRequest) {
        var response = historyService.addHistoryDate(historyRequest);
        return ResponseEntity.ok(response);
    }
}
