package com.stayeasy.service;

import com.stayeasy.dto.OrderRequestDto;
import com.stayeasy.entity.FoodOrder;
import java.util.List;
import java.util.Optional;

public interface FoodOrderService {
    List<FoodOrder> getAllOrders();
    Optional<FoodOrder> getOrderById(String id);
    List<FoodOrder> getOrdersByGuestId(String guestId);
    List<FoodOrder> getOrdersByRestaurantId(String restaurantId);
    FoodOrder createOrder(OrderRequestDto dto);
    FoodOrder updateOrderStatus(String id, String status);
}
