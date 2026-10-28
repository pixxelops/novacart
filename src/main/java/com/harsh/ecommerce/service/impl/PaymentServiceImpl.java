package com.harsh.ecommerce.service.impl;


import com.harsh.ecommerce.config.RazorpayConfig;
import com.harsh.ecommerce.dto.request.PaymentVerificationRequest;
import com.harsh.ecommerce.dto.response.PaymentOrderResponse;
import com.harsh.ecommerce.entity.*;
import com.harsh.ecommerce.repository.*;
import com.harsh.ecommerce.service.PaymentService;
import com.razorpay.Payment;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final RazorpayConfig razorpayConfig;

    @Override
    public PaymentOrderResponse createPaymentOrder(Long orderId){
        User user = getCurrentUser();

        Order order = orderRepository.findByIdAndUser(orderId,user)
                .orElseThrow(()->
                        new RuntimeException("Order not found"));

        if(order.getStatus() != OrderStatus.PENDING){
            throw new RuntimeException("Payment cannot be initiated for this order");
        }

        if (order.getPaymentStatus() == PaymentStatus.PAID) {
            throw new RuntimeException(
                    "Payment has already been processed for this order"
            );
        }

        if (order.getPaymentStatus() == PaymentStatus.FAILED) {
            order.setPaymentStatus(PaymentStatus.PENDING);
        }

        //get amount directly from database
        //never trust an amount sent by frontend;
        BigDecimal amountInRupees = order.getTotalAmount();

        if(amountInRupees == null || amountInRupees.compareTo(BigDecimal.ZERO) <= 0){
            throw new RuntimeException(
                    "Invalid order amount"
            );
        }


        //Razorpy expects amount in smallest currency units
        // ex. ₹1499.00 -> 149900 paise

        long amountInPaise = amountInRupees
                .multiply(BigDecimal.valueOf(100))
                .longValueExact();


        try {
            RazorpayClient razorpayClient = new RazorpayClient(
                    razorpayConfig.getKeyId(),
                    razorpayConfig.getKeySecret()
            );

            JSONObject razorpayOrderRequest = new JSONObject();

            razorpayOrderRequest.put(
                    "amount",
                    amountInPaise
            );

            razorpayOrderRequest.put(
                    "currency",
                    "INR"
            );

            razorpayOrderRequest.put(
                    "receipt",
                    "novacart_order_" + order.getId()
            );


             com.razorpay.Order razorpayorder = razorpayClient.orders.create(
                    razorpayOrderRequest
            );

             String razorpayOrderId = razorpayorder.get("id");
             order.setRazorpayOrderId(razorpayOrderId);
             orderRepository.save(order);

             return PaymentOrderResponse.builder()
                     .orderId(order.getId())
                     .razorpayOrderId(razorpayOrderId)
                     .amount(BigDecimal.valueOf(amountInPaise))
                     .currency("INR")
                     .keyId(razorpayConfig.getKeyId())
                     .build();
        } catch (RazorpayException e) {
            throw new RuntimeException(
                    "Failed to create Razorpay order",
                    e
            );
        }
    }

    @Override
    public void verifyPayment(PaymentVerificationRequest request) {
        User user  = getCurrentUser();

        Order order = orderRepository
                .findByIdAndUserWithLock(request.getOrderId(), user)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if(order.getPaymentStatus() == PaymentStatus.PAID){
            throw new RuntimeException("Payment has already been verified for this order");
        }

        if(order.getRazorpayOrderId() == null || !order.getRazorpayOrderId()
                .equals(request.getRazorpayOrderId())){
            throw new RuntimeException("Invalid Razorpay order ID");
        }

        try{

            RazorpayClient razorpayClient = new RazorpayClient(
                    razorpayConfig.getKeyId(),
                    razorpayConfig.getKeySecret()
            );

            JSONObject attributes = new JSONObject();

            attributes.put(
                    "razorpay_order_id",
                    request.getRazorpayOrderId()
            );

            attributes.put(
                    "razorpay_payment_id",
                    request.getRazorpayPaymentId()
            );
            attributes.put(
                    "razorpay_signature",
                    request.getRazorpaySignature()
            );

            boolean signatureValid =
                    Utils.verifyPaymentSignature(
                            attributes,
                            razorpayConfig.getKeySecret()
                    );

            if(!signatureValid){
                throw new RuntimeException("Payment signature verification failed");
            }
            Payment razorpayPayment = razorpayClient.payments.fetch(request.getRazorpayPaymentId());

            if(!"captured".equals(razorpayPayment.get("status"))){
                throw new RuntimeException("Payment status is not captured");
            }

            if(!request.getRazorpayOrderId().equals(
                    razorpayPayment.get("order_id")
            )){
                throw new  RuntimeException("Payment order Id mismatch");
            }

            long expectedAmountInPaise = order.getTotalAmount().multiply(BigDecimal.valueOf(100))
                            .longValueExact();


            long actualAmountInPaise = ((Number) razorpayPayment.get("amount"))
                    .longValue();


            if (actualAmountInPaise != expectedAmountInPaise) {
                throw new RuntimeException("Payment amount mismatch");
            }

            if (!"INR".equals(razorpayPayment.get("currency"))) {
                throw new RuntimeException("Payment currency mismatch");
            }


            order.setRazorpayPaymentId(
                    request.getRazorpayPaymentId()
            );

            for(OrderItem orderItem : order.getItems()){
                Product product = productRepository
                        .findByIdWithLock(orderItem.getProduct().getId())
                        .orElseThrow(()-> new RuntimeException("Product not found"));

                if(product.getStockQuantity() < orderItem.getQuantity()){
                    throw new RuntimeException(
                            "Insufficient stock for product: " + product.getName()
                            );
                }

                product.setStockQuantity(
                        product.getStockQuantity() - orderItem.getQuantity()
                );
                productRepository.save(product);
            }


            Cart cart = cartRepository.findByUserId(user.getId())
                            .orElseThrow(() -> new RuntimeException("Cart not found"));

            for(OrderItem orderItem : order.getItems()){
                Long productId = orderItem.getProduct().getId();

                cartItemRepository.findByCartIdAndProductId(
                        cart.getId(),
                        productId
                ).ifPresent(cartItem -> {

                    int remainingQuality = cartItem.getQuantity()
                            - orderItem.getQuantity();

                    if(remainingQuality <= 0){
                        cartItemRepository.delete(cartItem);
                    }else{
                        cartItem.setQuantity(remainingQuality);
                        cartItemRepository.save(cartItem);
                    }
                });
            }

            order.setPaymentStatus(PaymentStatus.PAID);
            order.setStatus(OrderStatus.CONFIRMED);

            orderRepository.save(order);

        } catch (RazorpayException e) {
            throw new RuntimeException(
                    "Payment verification failed",
                    e
            );
        }
    }

    @Override
    public void markPaymentFailed(Long orderId) {
        User user = getCurrentUser();

        Order order = orderRepository.findByIdAndUser(orderId,user)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getPaymentStatus() == PaymentStatus.PAID) {
            throw new RuntimeException(
                    "Payment has already been processed for this order"
            );
        }


        order.setPaymentStatus(PaymentStatus.FAILED);
        orderRepository.save(order);

    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()) {

            throw new RuntimeException(
                    "User is not authenticated"
            );
        }

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );
    }



}
