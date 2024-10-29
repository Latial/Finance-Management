package com.example.service.controller;

import com.example.service.service.ExpendService;
import com.example.service.service.dto.ExpendResponse;
import lombok.Generated;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/expend")
public class ExpendController {
    private final ExpendService expendService;

    @GetMapping
    public ResponseEntity<List<ExpendResponse>> getAllExpends() {
        var expends = expendService.getAllExpend();
        return ResponseEntity.ok(expends);
    }
}
