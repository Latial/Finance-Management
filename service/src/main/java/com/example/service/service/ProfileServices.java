package com.example.service.service;
import com.example.service.controller.ProfileController;
import com.example.service.domain.Expend;
import com.example.service.domain.User;
import com.example.service.mapper.ExpendMapper;
import com.example.service.mapper.UserMapper;
import com.example.service.repository.ExpendRepository;
import com.example.service.repository.UserRepository;
import com.example.service.service.dto.*;
import com.example.service.service.exception.EmailAlreadyUsedException;
import com.example.service.service.exception.UsernameAlreadyUsedException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor

public class ProfileServices {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final ExpendRepository expendRepository;
    private UserProfileResponse userProfileResponse;
    private final ExpendMapper expendMapper;

    @Transactional(readOnly = true)
    public UserProfileResponse getUserProfile(Long id) {
        return userRepository
                .findById(id)
                .map(userMapper::toUserProfileResponse)
                .orElseThrow(() -> new EntityNotFoundException("Talent user not found"));
    }

    @Transactional
    public ExpendAddResponse addExpend(ExpendAddRequest expendAddRequest) {
        var expend =  expendRepository.findById(expendAddRequest.getExpend_id())
                .orElseThrow(() -> new EntityNotFoundException("Expend not found"));
        var user = userRepository.findById(expendAddRequest.getUser_id())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        user.getUserExpends().add(expend);

        return ExpendAddResponse
                .builder()
                .build();
    }
    @Transactional
    public List<UserProfileResponse> getFavorite() {
        return userRepository
                .findAll()
                .stream()
                .map(userMapper::toUserProfileResponse)
                .toList();
    }
}