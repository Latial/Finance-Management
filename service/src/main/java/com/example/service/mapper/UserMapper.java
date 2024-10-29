package com.example.service.mapper;

import com.example.service.service.dto.RegisterUserRequest;
import com.example.service.domain.User;
import com.example.service.service.dto.RegisterUserResponse;
import com.example.service.service.dto.UserProfileResponse;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    User fromRegisterRequest(RegisterUserRequest registerUserRequest);

    UserProfileResponse toUserProfileResponse(User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)

    User partialUpdate(RegisterUserResponse updateTalentUserRequest, @MappingTarget User user);
}