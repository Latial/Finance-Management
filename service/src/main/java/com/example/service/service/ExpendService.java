package com.example.service.service;

import com.example.service.domain.Expend;
import com.example.service.mapper.ExpendMapper;
import com.example.service.repository.ExpendRepository;
import com.example.service.service.dto.ExpendResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpendService {
    private final ExpendRepository expendRepository;
    private final ExpendMapper expendMapper;

    @Transactional(readOnly = true)
    public List<ExpendResponse> getAllExpend() {
        return expendRepository
                .findAll()
                .stream()
                .map(expendMapper::toResponse)
                .toList();
    }
}
