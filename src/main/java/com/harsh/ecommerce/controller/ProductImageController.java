package com.harsh.ecommerce.controller;


import com.harsh.ecommerce.service.ProductImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/product-images")
@RequiredArgsConstructor
public class ProductImageController {
    private final ProductImageService productImageService;

    @PostMapping("/migrate-to-cloudinary")
    public String migrateToCloudinary(){
        return productImageService.migrateLocalImagesToCloudinary();
    }
}
