package com.harsh.ecommerce.service.impl;

import com.harsh.ecommerce.dto.response.OrderItemResponse;
import com.harsh.ecommerce.dto.response.OrderResponse;
import com.harsh.ecommerce.entity.*;
import com.harsh.ecommerce.repository.CartRepository;
import com.harsh.ecommerce.repository.OrderRepository;
import com.harsh.ecommerce.repository.ProductRepository;
import com.harsh.ecommerce.repository.UserRepository;
import com.harsh.ecommerce.service.OrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public OrderResponse createOrder() {

        //getting user and cart
        User user = getCurrentUser();

        Cart cart = cartRepository.findByUserId(
                user.getId()).orElseThrow(()->
                new RuntimeException("Cart not found"));

        //if the cart is Empty throw new error
        if(cart.getItems() == null || cart.getItems().isEmpty()){
            throw new RuntimeException("Cannot create order from an empty cart");
        }


        //Crtre the order
        Order order = Order.builder()
                .user(user)
                .status(OrderStatus.PENDING)
                .totalAmount(BigDecimal.ZERO)
                .build();

        BigDecimal totalAmount = BigDecimal.ZERO;

       // Convert every CartItem into OrderItem
        for(CartItem cartItem : cart.getItems()) {
            Product product = cartItem.getProduct();

            if (product.getActive() == null || !product.getActive()) {
                throw new RuntimeException(
                        "Product is no longer available: "
                                + product.getName());
            }

            if (product.getStockQuantity() < cartItem.getQuantity()) {
                throw new RuntimeException(
                        "Insufficient stock for product: "
                                + product.getName()
                );
            }

            BigDecimal price = product.getPrice();

            BigDecimal subtotal = price.multiply(
                    BigDecimal.valueOf(cartItem.getQuantity())
            );

            OrderItem orderItem = OrderItem.builder()
                    .product(product)
                    .quantity(cartItem.getQuantity())
                    .price(price)
                    .subtotal(subtotal)
                    .order(order)
                    .build();


            order.addItem(orderItem);

            totalAmount = totalAmount.add(subtotal);

            product.setStockQuantity(
                    product.getStockQuantity() - cartItem.getQuantity()
            );

            productRepository.save(product);
        }

            order.setTotalAmount(totalAmount);

            Order savedOrder = orderRepository.save(order);

            cart.getItems().clear();

            cartRepository.save(cart);

            return mapToOrderResponse(savedOrder);

    }

    @Override
    public List<OrderResponse> getMyOrders() {
        User user = getCurrentUser();

        List<Order>orders = orderRepository.findByUserOrderByCreatedAtDesc(user);


        return orders.stream()
                .map(this::mapToOrderResponse)
                .toList();
    }

    @Override
    public OrderResponse getOrderById(Long orderId) {
       User user = getCurrentUser();

       Order order = orderRepository.findByIdAndUser(orderId,user)
               .orElseThrow(()->new RuntimeException("Order not found"));

       return mapToOrderResponse(order);
    }

    @Override
    public OrderResponse cancelOrder(Long orderId) {
        User user = getCurrentUser();

        Order order = orderRepository.findByIdAndUser(orderId,user)
                .orElseThrow(()->new RuntimeException("Order not found"));

        if (order.getStatus() != OrderStatus.PENDING
                && order.getStatus() != OrderStatus.CONFIRMED) {

            throw new RuntimeException(
                    "Order cannot be cancelled at this stage"
            );
        }

        for(OrderItem orderItem : order.getItems()){
            Product product = orderItem.getProduct();

            product.setStockQuantity(
                    product.getStockQuantity()+orderItem.getQuantity()
            );

            productRepository.save(product);
        }

        order.setStatus(OrderStatus.CANCELLED);
        Order savedOrder = orderRepository.save(order);

        return mapToOrderResponse(savedOrder);
    }

    private User getCurrentUser(){
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        if(authentication == null
        || !authentication.isAuthenticated()){
            throw  new  RuntimeException("User is not authenticated");
        }

        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("User not found"));

    }
    private OrderResponse mapToOrderResponse(Order order) {

        List<OrderItemResponse> items =
                order.getItems()
                        .stream()
                        .map(this::mapToOrderItemResponse)
                        .toList();

        return OrderResponse.builder()
                .orderId(order.getId())
                .userId(order.getUser().getId())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .items(items)
                .build();
    }

    /*
     * Convert OrderItem → OrderItemResponse
     */
    private OrderItemResponse mapToOrderItemResponse(
            OrderItem orderItem) {

        return OrderItemResponse.builder()
                .productId(orderItem.getProduct().getId())
                .productName(orderItem.getProduct().getName())
                .quantity(orderItem.getQuantity())
                .price(orderItem.getPrice())
                .subtotal(orderItem.getSubtotal())
                .build();
    }
}
