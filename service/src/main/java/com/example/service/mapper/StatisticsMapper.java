package com.example.service.mapper;

import com.example.service.domain.Statistics;
import com.example.service.service.dto.StatisticsResponse;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface StatisticsMapper {
    StatisticsResponse toResponse(Statistics statistics);
}
