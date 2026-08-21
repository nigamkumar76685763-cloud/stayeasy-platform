package com.stayeasy.controller;

import com.stayeasy.dto.OrderRequestDto;
import com.stayeasy.entity.FoodOrder;
import com.stayeasy.service.FoodOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@CrossOrigin(origins = "*")
public class FoodOrderController {

    @Autowired
    private FoodOrderService foodOrderService;

    @GetMapping
    public ResponseEntity<List<FoodOrder>> getAllOrders() {
        return ResponseEntity.ok(foodOrderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodOrder> getOrderById(@PathVariable String id) {
        return foodOrderService.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/guest/{guestId}")
    public ResponseEntity<List<FoodOrder>> getOrdersByGuest(@PathVariable String guestId) {
        return ResponseEntity.ok(foodOrderService.getOrdersByGuestId(guestId));
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<FoodOrder>> getOrdersByRestaurant(@PathVariable String restaurantId) {
        return ResponseEntity.ok(foodOrderService.getOrdersByRestaurantId(restaurantId));
    }

    @PostMapping
    public ResponseEntity<FoodOrder> createOrder(@RequestBody OrderRequestDto dto) {
        return ResponseEntity.ok(foodOrderService.createOrder(dto));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<FoodOrder> updateStatus(@PathVariable String id, @RequestParam String status) {
        return ResponseEntity.ok(foodOrderService.updateOrderStatus(id, status));
    }
}
