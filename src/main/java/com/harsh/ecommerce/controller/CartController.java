package com.harsh.ecommerce.controller;

import com.harsh.ecommerce.dto.response.CartResponse;
import com.harsh.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartResponse> getMyCart(){
        return ResponseEntity.ok(cartService.getMyCart());
    }

    @PostMapping("/items")
    public ResponseEntity<CartResponse>addToCart(
            @RequestParam Long productId,
            @RequestParam Integer quantity
    ){
        return ResponseEntity.ok(
                cartService.addToCart(productId,quantity)
        );
    }


    @PutMapping("/items/{productId}")
    public ResponseEntity<CartResponse>updateCartItem(
            @PathVariable Long productId,
            @RequestParam Integer quantity
    ){
        return ResponseEntity.ok(
                cartService.updateCartItem(productId,quantity)
        );
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<CartResponse>removeFromCart(
            @PathVariable Long productId
    ){
        return ResponseEntity.ok(
                cartService.removeFromCart(productId)
        );
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart() {
        cartService.clearCart();
        return ResponseEntity.noContent().build();
    }
}
