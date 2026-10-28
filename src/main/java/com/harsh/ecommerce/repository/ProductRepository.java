package com.harsh.ecommerce.repository;

import com.harsh.ecommerce.entity.Product;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

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

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Product p WHERE p.id =:id")
    Optional<Product> findByIdWithLock(@Param("id") Long id);
}
