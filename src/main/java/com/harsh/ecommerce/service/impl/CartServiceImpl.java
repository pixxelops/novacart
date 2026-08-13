
package com.harsh.ecommerce.service.impl;

import com.harsh.ecommerce.dto.response.CartItemResponse;
import com.harsh.ecommerce.dto.response.CartResponse;
import com.harsh.ecommerce.entity.Cart;
import com.harsh.ecommerce.entity.CartItem;
import com.harsh.ecommerce.entity.Product;
import com.harsh.ecommerce.entity.User;
import com.harsh.ecommerce.repository.CartItemRepository;
import com.harsh.ecommerce.repository.CartRepository;
import com.harsh.ecommerce.repository.ProductRepository;
import com.harsh.ecommerce.repository.UserRepository;
import com.harsh.ecommerce.service.CartService;
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
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;


    @Override
    public CartResponse getMyCart() {
        User user =  getCurrentUser();

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> createCart(user));

        return buildCartResponse(cart);
    }

    @Override
    public CartResponse addToCart(Long productId, Integer quantity) {
      if(quantity == null || quantity <=0 ){
          throw new IllegalArgumentException("Quantity must be greater than 0");
      }

      User user = getCurrentUser();

        Product product = productRepository.findById(productId).orElseThrow(()->
                new RuntimeException("Product not found with id: " + productId));

        if(product.getActive() == null || !product.getActive()){
            throw new RuntimeException("product is not active");
        }


        if (product.getStockQuantity() < quantity) {
            throw new RuntimeException("Insufficient stock");
        }

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> createCart(user));

        CartItem cartItem  = cartItemRepository.findByCartIdAndProductId(
                cart.getId(),productId
        ).orElse(null);

        if(cartItem != null){
            int newQuantity = cartItem.getQuantity() + quantity;

            if(newQuantity > product.getStockQuantity()){
                throw new RuntimeException("Insufficient stock");
            }

            cartItem.setQuantity(newQuantity);
        }
        else{
            cartItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(quantity)
                    .build();

            cart.getItems().add(cartItem);
        }

        cartItemRepository.save(cartItem);
        return buildCartResponse(cart);
    }

    @Override
    public CartResponse updateCartItem(Long productId, Integer quantity) {
       if(quantity == null || quantity <=0 ){
           throw new IllegalArgumentException("Quantity must be greater than 0");
       }
       User user = getCurrentUser();

       Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));

       Product product  = productRepository.findById(productId)
               .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));
       if(product.getStockQuantity() < quantity){
           throw new RuntimeException("Insufficient stock");
       }

       CartItem cartItem = cartItemRepository.findByCartIdAndProductId(
               cart.getId(),productId
       ).orElseThrow(() -> new RuntimeException("Product is not in your cart"));

       cartItem.setQuantity(quantity);
       cartItemRepository.save(cartItem);
       return buildCartResponse(cart);


    }

    @Override
    public CartResponse removeFromCart(Long productId) {
       User user = getCurrentUser();

       Cart cart = cartRepository.findByUserId(user.getId())
               .orElseThrow(()-> new RuntimeException("Cart not found"));


       CartItem cartItem = cartItemRepository
               .findByCartIdAndProductId(cart.getId(),productId)
               .orElseThrow(() -> new RuntimeException("Product is not in your cart"));


       cart.getItems().remove(cartItem);
       cartItemRepository.delete(cartItem);
       return buildCartResponse(cart);
    }

    @Override
    public void clearCart() {

        User user = getCurrentUser();

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        cartItemRepository.deleteAll(cart.getItems());
        cart.getItems().clear();

    }
    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User is not authenticated");
        }

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Authenticated user not found"));
    }

    private Cart createCart(User user) {

        Cart cart = Cart.builder()
                .user(user)
                .build();

        return cartRepository.save(cart);
    }

    private CartResponse buildCartResponse(Cart cart) {

        List<CartItemResponse> items = cart.getItems()
                .stream()
                .map(this::mapToCartItemResponse)
                .toList();

        int totalItems = cart.getItems()
                .stream()
                .mapToInt(CartItem::getQuantity)
                .sum();

        BigDecimal totalPrice = cart.getItems()
                .stream()
                .map(item ->
                        item.getProduct()
                                .getPrice()
                                .multiply(
                                        BigDecimal.valueOf(item.getQuantity())
                                )
                )
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return CartResponse.builder()
                .cartId(cart.getId())
                .items(items)
                .totalItems(totalItems)
                .totalPrice(totalPrice)
                .build();
    }

    private CartItemResponse mapToCartItemResponse(CartItem cartItem) {

        Product product = cartItem.getProduct();

        BigDecimal subtotal = product.getPrice()
                .multiply(
                        BigDecimal.valueOf(cartItem.getQuantity())
                );

        List<String> imageUrls = product.getImages()
                .stream()
                .map(image -> image.getImageUrl())
                .toList();

        return CartItemResponse.builder()
                .productId(product.getId())
                .productName(product.getName())
                .price(product.getPrice())
                .quantity(cartItem.getQuantity())
                .subtotal(subtotal)
                .imageUrls(imageUrls)
                .build();
    }
}