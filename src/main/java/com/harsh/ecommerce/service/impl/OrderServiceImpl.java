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
                .paymentStatus(PaymentStatus.PENDING)
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

        }

            order.setTotalAmount(totalAmount);

            Order savedOrder = orderRepository.save(order);



            return mapToOrderResponse(savedOrder);

    }

    @Override
    public OrderResponse createBuyNowOrder(Long productId, Integer quantity) {
        User user = getCurrentUser();

        if(quantity == null || quantity <= 0){
            throw new RuntimeException("Quantity must be greater than zero");
        }
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        if(product.getActive() == null || !product.getActive()) {
            throw new RuntimeException(
                    "Product is no longer available: "
                            + product.getName()
            );
        }
            if(product.getStockQuantity() < quantity){
                throw new RuntimeException(
                        "Insufficient stock for product: "
                        + product.getName()
                );
            }

            BigDecimal price = product.getPrice();

            BigDecimal subtotal = price.multiply(
                    BigDecimal.valueOf(quantity)
            );

            Order order = Order.builder()
                    .user(user)
                    .status(OrderStatus.PENDING)
                    .paymentStatus(PaymentStatus.PENDING)
                    .totalAmount(subtotal)
                    .build();

            OrderItem orderItem = OrderItem.builder()
                    .product(product)
                    .quantity(quantity)
                    .price(price)
                    .subtotal(subtotal)
                    .order(order).
                    build();


                    order.addItem(orderItem);

                    Order savedOrder = orderRepository.save(order);

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
        if (order.getPaymentStatus() == PaymentStatus.PAID) {

            for (OrderItem orderItem : order.getItems()) {

                Product product = orderItem.getProduct();

                product.setStockQuantity(
                        product.getStockQuantity() + orderItem.getQuantity()
                );

                productRepository.save(product);
            }
        }

        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);

        return mapToOrderResponse(order);
    }

    @Override
    public void shipOrder(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(
                ()-> new RuntimeException("Order not found")
        );

        if(order.getPaymentStatus() != PaymentStatus.PAID){
            throw new RuntimeException("Cannot ship an unpaid order");
        }


        if(order.getStatus() != OrderStatus.CONFIRMED){
            throw new RuntimeException("Only confirmed orders can be shipped");
        }

        order.setStatus(OrderStatus.SHIPPED);
        orderRepository.save(order);
    }

    @Override
    public void deliverOrder(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found")
                );

        if (order.getPaymentStatus() != PaymentStatus.PAID) {
            throw new RuntimeException(
                    "Only paid orders can be delivered"
            );
        }

        if (order.getStatus() != OrderStatus.SHIPPED) {
            throw new RuntimeException(
                    "Only shipped orders can be delivered"
            );
        }

        order.setStatus(OrderStatus.DELIVERED);

        orderRepository.save(order);

    }

    @Override
    public List<OrderResponse> getAllOrders() {
       List<Order>orders = orderRepository.findAll()
               .stream()
               .sorted(
                       (order1,order2) ->
                               order2.getCreatedAt().compareTo(
                                       order1.getCreatedAt()
                               )
               ).toList();



       return orders.stream().map(this::mapToOrderResponse).toList();
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
                .paymentStatus(order.getPaymentStatus())
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
