package com.harsh.ecommerce.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Builder
public class UserResponse {
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private Set<String> roles;

    private LocalDateTime createdAt;
}
