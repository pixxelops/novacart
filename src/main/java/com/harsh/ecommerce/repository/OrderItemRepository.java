package com.harsh.ecommerce.repository;
import com.harsh.ecommerce.entity.Order;
import com.harsh.ecommerce.entity.OrderItem;
import com.harsh.ecommerce.entity.User;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {


    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT o FROM Order o WHERE o.id = :orderId AND o.user = :user")
    Optional<Order> findByIdAndUserWithLock(
            @Param("orderId") Long orderId,
            @Param("user") User user
    );
}