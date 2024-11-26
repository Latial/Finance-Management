package com.example.service.controller;

import com.example.service.service.ExpendService;
import com.example.service.service.dto.*;
import jakarta.validation.Valid;
import lombok.Generated;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/expend")
public class ExpendController {
    private final ExpendService expendService;

    @GetMapping
    public ResponseEntity<List<ExpendResponse>> getAllExpends() {
        var expends = expendService.getAllExpend();
        return ResponseEntity.ok(expends);
    }
    @PostMapping("/addExpend")
    public ResponseEntity<ExpendAloneResponse> addExpendAlone(@RequestBody ExpendAloneRequest expendAloneRequest) {
        var response = expendService.addExpendAlone(expendAloneRequest);
        return ResponseEntity.ok(response);
    }
}
