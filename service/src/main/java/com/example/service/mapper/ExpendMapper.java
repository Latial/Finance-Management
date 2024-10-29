package com.example.service.mapper;

import com.example.service.domain.Expend;
import com.example.service.service.dto.ExpendResponse;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)

public interface ExpendMapper {
    ExpendResponse toResponse(Expend expend);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Expend partialUpdate(ExpendResponse userProfileResponse, @MappingTarget Expend expend);
}
