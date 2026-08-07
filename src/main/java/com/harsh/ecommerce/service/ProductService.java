package com.harsh.ecommerce.service;

import com.harsh.ecommerce.dto.request.ProductRequest;
import com.harsh.ecommerce.dto.response.PageResponse;
import com.harsh.ecommerce.dto.response.ProductResponse;

import java.util.List;

public interface ProductService {

    ProductResponse createProduct(ProductRequest request);

    PageResponse<ProductResponse> getAllProducts(
            int page,
            int size,
            String sortBy,
            String direction
    );

    ProductResponse getProductById(Long id);

    ProductResponse updateProduct(Long id, ProductRequest request);

    void deleteProduct(Long id);


    PageResponse<ProductResponse>searchProducts(
            String keyword,
            int page,
            int size
    );

}
