package com.harsh.ecommerce.service.impl;

import com.harsh.ecommerce.config.JwtService;
import com.harsh.ecommerce.dto.request.LoginRequest;

import com.harsh.ecommerce.dto.response.AuthResponse;
import com.harsh.ecommerce.entity.User;
import com.harsh.ecommerce.repository.UserRepository;
import com.harsh.ecommerce.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        String token = jwtService.generateToken(user);


return AuthResponse.builder()
        .token(token)
        .build();
    }
}

