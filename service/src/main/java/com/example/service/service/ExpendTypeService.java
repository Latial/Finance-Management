package com.example.service.service;

import com.example.service.mapper.ExpendTypeMapper;
import com.example.service.repository.ExpendTypeRepository;
import com.example.service.service.dto.ExpendTypeResponse;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpendTypeService {
    private final ExpendTypeRepository expendTypeRepository;
    private final ExpendTypeMapper expendTypeMapper;

    @Transactional(readOnly = true)
    public List<ExpendTypeResponse> getAllExpendTypes() {
        return expendTypeRepository
                .findAll()
                .stream()
                .map(expendTypeMapper::toResponse)
                .toList();
    }
}
