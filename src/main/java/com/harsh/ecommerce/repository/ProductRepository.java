package com.harsh.ecommerce.repository;

import com.harsh.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findByCategory(Long categoryId);

    List<Product> findByNameContainingIgnoreCase(String keyword);

    List<Product> findByBrandContainingIgnoreCase(String brand);

    List<Product>findByNameContainingIgnoreCaseOrBrandContainingIgnoreCase(
            String name,
            String brand
    );

    Page<Product> findByNameContainingIgnoreCaseOrBrandContainingIgnoreCase(
            String name,
            String brand,
            Pageable pageable);
}
