package com.harsh.ecommerce.service;

import com.harsh.ecommerce.dto.request.RegisterRequest;
import com.harsh.ecommerce.dto.response.UserResponse;

public interface UserService {
    UserResponse register(RegisterRequest request);
}
