package com.stayeasy.repository;

import com.stayeasy.entity.FoodOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FoodOrderRepository extends JpaRepository<FoodOrder, String> {
    List<FoodOrder> findByGuestId(String guestId);
    List<FoodOrder> findByRestaurantId(String restaurantId);
}
