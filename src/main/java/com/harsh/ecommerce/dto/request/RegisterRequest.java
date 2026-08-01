package com.harsh.ecommerce.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {


    @NotBlank(message = "First name is Required")
    private String firstName;

    @NotBlank(message = "Last name is Required")
    private String lastName;

    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is Required")
    private String password;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must contain exactly 10 digits")
    private String phone;

}
