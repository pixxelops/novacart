package com.harsh.ecommerce.service.impl;

import com.harsh.ecommerce.dto.request.RegisterRequest;
import com.harsh.ecommerce.dto.response.UserResponse;
import com.harsh.ecommerce.entity.Role;
import com.harsh.ecommerce.entity.User;
import com.harsh.ecommerce.exception.ResourceAlreadyExistsException;
import com.harsh.ecommerce.mapper.UserMapper;
import com.harsh.ecommerce.repository.RoleRepository;
import com.harsh.ecommerce.repository.UserRepository;
import com.harsh.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
@RequiredArgsConstructor

public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public UserResponse register(RegisterRequest request) {
        if(userRepository.existsByEmail(request.getEmail())) {
            throw new ResourceAlreadyExistsException("Email already exists");
        }
        if(userRepository.existsByPhone(request.getPhone())) {
            throw new ResourceAlreadyExistsException("Phone number already exists");
        }
        User user = UserMapper.toEntity(request);

        Role role = roleRepository.findByName("ROLE_USER")
        .orElseThrow(()-> new RuntimeException("Default role not found"));

        user.setRoles(new HashSet<>());
        user.getRoles().add(role);

        User savedUser = userRepository.save(user);

        return UserMapper.toResponse(savedUser);
    }
}
