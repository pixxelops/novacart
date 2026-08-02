package com.harsh.ecommerce.controller;


import com.harsh.ecommerce.dto.request.RegisterRequest;
import com.harsh.ecommerce.dto.response.UserResponse;
import com.harsh.ecommerce.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public UserResponse register(
            @Valid @RequestBody RegisterRequest request
            ){
        return userService.register(request);
    }


}
