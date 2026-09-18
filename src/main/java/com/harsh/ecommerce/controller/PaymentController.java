package com.harsh.ecommerce.controller;


import com.harsh.ecommerce.dto.request.PaymentVerificationRequest;
import com.harsh.ecommerce.dto.response.PaymentOrderResponse;
import com.harsh.ecommerce.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    @PostMapping("/create-order")
    public ResponseEntity<PaymentOrderResponse> createPaymentOrder(
            @RequestParam Long orderId
    ){
        return ResponseEntity.ok(
                paymentService.createPaymentOrder(orderId)
        );
    }

    @PostMapping("/verify")
    public ResponseEntity<Void> verifyPayment(
            @RequestBody PaymentVerificationRequest request
            ){
        paymentService.verifyPayment(request);

        return ResponseEntity.ok().build();
    }
}
