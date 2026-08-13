package com.harsh.ecommerce.dto.response;


import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartResponse {
    private Long cartId;

    private List<CartItemResponse> items;

    private Integer totalItems;

    private BigDecimal totalPrice;


}
