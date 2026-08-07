package com.harsh.ecommerce.repository;

import com.harsh.ecommerce.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductImageRepository extends JpaRepository<ProductImage,Long> {
    List<ProductImage>findByProductId(Long productId);
}
