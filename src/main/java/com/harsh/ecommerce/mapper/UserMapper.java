package com.harsh.ecommerce.mapper;

import com.harsh.ecommerce.dto.request.RegisterRequest;
import com.harsh.ecommerce.dto.response.UserResponse;
import com.harsh.ecommerce.entity.Role;
import com.harsh.ecommerce.entity.User;

import java.util.Set;
import java.util.stream.Collectors;

public class UserMapper {
    private UserMapper() {}

    public static User toEntity(RegisterRequest request){

        return User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(request.getPassword())
                .phone(request.getPhone())
                .build();
    }

    public static UserResponse toResponse(User user){
        Set<String>roleNames = user.getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .roles(roleNames).
                createdAt(user.getCreatedAt())
                .build();

    }
}
