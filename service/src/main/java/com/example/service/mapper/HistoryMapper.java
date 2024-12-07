package com.example.service.mapper;

import com.example.service.domain.History;
import com.example.service.service.dto.HistoryResponse;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface HistoryMapper {
    HistoryResponse toResponse(History history);
}
