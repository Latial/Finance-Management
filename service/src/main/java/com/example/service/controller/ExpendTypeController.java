package com.example.service.controller;

import com.example.service.service.ExpendTypeService;
import com.example.service.service.dto.ExpendTypeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/expendType")
@RequiredArgsConstructor
public class ExpendTypeController {
    private final ExpendTypeService expendTypeService;

    @GetMapping
    public ResponseEntity<List<ExpendTypeResponse>> getAllExpendTypes() {
        var expendTypes = expendTypeService.getAllExpendTypes();
        return ResponseEntity.ok(expendTypes);
    }
}
