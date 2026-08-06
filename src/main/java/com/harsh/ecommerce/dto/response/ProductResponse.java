package com.harsh.ecommerce.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class ProductResponse {

    private Long id;

    private String name;

    private String description;

    private String brand;

    private BigDecimal price;

    private Integer stockQuantity;

    private Double discountPercentage;

    private Boolean active;

    private Long categoryId;

    private String categoryName;



}