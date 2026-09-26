package com.harsh.ecommerce.controller;

import com.harsh.ecommerce.dto.request.BuyNowRequest;
import com.harsh.ecommerce.dto.response.OrderResponse;
import com.harsh.ecommerce.entity.Order;
import com.harsh.ecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse>createOrder(){
        OrderResponse order = orderService.createOrder();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(order);
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>>getMyOrders(){
        return ResponseEntity.ok(
                orderService.getMyOrders()
        );
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse>getOrderById(
            @PathVariable Long orderId
    ){
        return ResponseEntity.ok(
                orderService.getOrderById(orderId)
        );
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<OrderResponse>cancelOrder(
            @PathVariable Long orderId
    ){
        return  ResponseEntity.ok(
                orderService.cancelOrder(orderId)
        );
    }

    @PostMapping("/buy-now")
    public ResponseEntity<OrderResponse> buyNow(
            @RequestBody BuyNowRequest request
            ){

        OrderResponse order = orderService.createBuyNowOrder(
                request.getProductId(),
                request.getQuantity()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(order);

    }



}
