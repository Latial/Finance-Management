package com.example.service.service;

import com.example.service.domain.Expend;
import com.example.service.domain.ExpendType;
import com.example.service.mapper.ExpendMapper;
import com.example.service.repository.ExpendRepository;
import com.example.service.repository.ExpendTypeRepository;
import com.example.service.repository.UserRepository;
import com.example.service.service.dto.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpendService {
    private final ExpendRepository expendRepository;
    private final ExpendTypeRepository expendTypeRepository;
    private final ExpendMapper expendMapper;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<ExpendResponse> getAllExpend() {
        return expendRepository
                .findAll()
                .stream()
                .map(expendMapper::toResponse)
                .toList();
    }
    @Transactional
    public ExpendAloneResponse addExpendAlone(ExpendAloneRequest expendAloneRequest) {
        System.out.println(expendAloneRequest);
        var expendType = expendTypeRepository.findByType(expendAloneRequest.getTypeName())
                .orElseThrow(() -> new EntityNotFoundException("Expend type not found"));
        var user = userRepository.findById(Long.parseLong(expendAloneRequest.getUserId()))
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        var expend = new Expend();
        expend.setDate(new Date());
        expend.setName(expendAloneRequest.getName());
        expend.setPrice(expendAloneRequest.getPrice());
        expend.setType(expendType);
        expend.setUser(user);

        expendRepository.save(expend);
        return ExpendAloneResponse
                .builder()
                .build();
    }
}
