package com.harsh.ecommerce.service;

import com.harsh.ecommerce.dto.request.LoginRequest;
import com.harsh.ecommerce.dto.response.AuthResponse;

public interface AuthenticationService {
    AuthResponse login(LoginRequest request);
}
