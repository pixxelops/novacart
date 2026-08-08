package com.harsh.ecommerce.mapper;

import com.harsh.ecommerce.dto.request.ProductRequest;
import com.harsh.ecommerce.dto.response.ProductResponse;
import com.harsh.ecommerce.entity.Product;

import java.util.List;

public class ProductMapper {

    private ProductMapper(){

    }

    public static Product toEntity(ProductRequest request){
        return Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .brand(request.getBrand())
                .price(request.getPrice())
                .stockQuantity(request.getStockQuantity())
                .discountPercentage(request.getDiscountPercentage())
                .build();
    }

    public static ProductResponse toResponse(Product product){
        List<String>imageUrls = product.getImages()
                .stream()
                .map(image -> image.getImageUrl())
                .toList();
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .brand(product.getBrand())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .discountPercentage(product.getDiscountPercentage())
                .active(product.getActive())
                .categoryName(product.getCategory().getName())
                .imageUrls(imageUrls)
                .build();
    }


}
