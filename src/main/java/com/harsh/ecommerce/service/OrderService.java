package com.harsh.ecommerce.service;

import com.harsh.ecommerce.dto.response.OrderResponse;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder();

    List<OrderResponse> getMyOrders();

    OrderResponse getOrderById(Long orderId);

    OrderResponse cancelOrder(Long orderId);

}
