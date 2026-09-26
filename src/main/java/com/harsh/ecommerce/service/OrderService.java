package com.harsh.ecommerce.service;

import com.harsh.ecommerce.dto.response.OrderResponse;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder();

    OrderResponse createBuyNowOrder(Long productId, Integer quantity);


    List<OrderResponse> getMyOrders();

    OrderResponse getOrderById(Long orderId);

    OrderResponse cancelOrder(Long orderId);

}
