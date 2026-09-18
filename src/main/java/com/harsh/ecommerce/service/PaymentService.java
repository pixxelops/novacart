package com.harsh.ecommerce.service;

import com.harsh.ecommerce.dto.request.PaymentVerificationRequest;
import com.harsh.ecommerce.dto.response.PaymentOrderResponse;

public interface PaymentService {

     PaymentOrderResponse createPaymentOrder(Long orderId);

     void verifyPayment(PaymentVerificationRequest request);
}