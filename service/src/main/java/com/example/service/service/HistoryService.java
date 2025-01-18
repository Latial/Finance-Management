package com.example.service.service;

import com.example.service.domain.History;
import com.example.service.mapper.HistoryMapper;
import com.example.service.repository.ExpendTypeRepository;
import com.example.service.repository.HistoryRepository;
import com.example.service.repository.UserRepository;
import com.example.service.service.dto.HistoryRequest;
import com.example.service.service.dto.HistoryResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HistoryService {
    private final HistoryRepository historyRepository;
    private final HistoryMapper historyMapper;
    private final ExpendTypeRepository expendTypeRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<HistoryResponse> getWholeHistory() {
        return historyRepository
                .findAll()
                .stream()
                .map(historyMapper::toResponse)
                .toList();
    }
    @Transactional
    public HistoryResponse addHistoryDate(HistoryRequest historyRequest) {
        var expendType = expendTypeRepository.findByType(historyRequest.getTypeName())
                .orElseThrow(() -> new EntityNotFoundException("Expend type not found"));
        var user = userRepository.findById(Long.parseLong(historyRequest.getUserId()))
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        var history = new History();
        history.setUser(user);
        history.setType(expendType);
        history.setDate(new Date());
        history.setExpendName(historyRequest.getName());
        history.setExpendPrice(historyRequest.getPrice());
        history.setStatus(historyRequest.getStatus());

        historyRepository.save(history);
        return HistoryResponse
                .builder()
                .build();
    }
}
