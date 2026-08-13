package com.harsh.ecommerce.service;


import com.harsh.ecommerce.dto.response.CartResponse;

public interface CartService {

    CartResponse getMyCart();

    CartResponse addToCart(Long productId, Integer quantity);

    CartResponse updateCartItem(Long productId, Integer quantity);

    CartResponse removeFromCart(Long productId);


    void clearCart();
}
