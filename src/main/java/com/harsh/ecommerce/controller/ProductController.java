package com.harsh.ecommerce.controller;

import com.harsh.ecommerce.dto.request.ProductRequest;
import com.harsh.ecommerce.dto.response.PageResponse;
import com.harsh.ecommerce.dto.response.ProductResponse;
import com.harsh.ecommerce.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ProductResponse createProduct(
            @Valid @RequestBody ProductRequest request
            ){
        return productService.createProduct(request);
    }

    @GetMapping
    public PageResponse<ProductResponse>getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id")String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ){
        return productService.getAllProducts(
                page,
                size,
                sortBy,
                direction
        );
    }
    @GetMapping("/{id}")
    public ProductResponse getProductById(@PathVariable Long id){
        return productService.getProductById(id);
    }

    @PutMapping("/{id}")
    public ProductResponse updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request
    ){
        return productService.updateProduct(id,request);
    }

    @DeleteMapping("/{id}")
    public void deleteProductById(@PathVariable Long id){
        productService.deleteProduct(id);
    }
}
