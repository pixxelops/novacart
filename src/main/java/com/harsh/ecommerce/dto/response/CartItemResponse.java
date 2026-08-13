package com.harsh.ecommerce.dto.response;


import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemResponse {

    private Long productId;

    private String productName;

    private String brand;

    private BigDecimal price;

    private Double discountPercentage;

    private Integer quantity;

    private BigDecimal subtotal;

    private List<String> imageUrls;


}
