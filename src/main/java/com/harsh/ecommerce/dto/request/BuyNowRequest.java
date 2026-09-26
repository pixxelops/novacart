package com.harsh.ecommerce.dto.request;

import lombok.Data;

@Data
public class BuyNowRequest {

    private Long productId;

    private Integer quantity;
}