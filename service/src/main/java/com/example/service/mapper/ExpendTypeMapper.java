package com.example.service.mapper;

import com.example.service.domain.ExpendType;
import com.example.service.service.dto.ExpendTypeResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)

public interface ExpendTypeMapper {
    ExpendTypeResponse toResponse(ExpendType expendType);
}
