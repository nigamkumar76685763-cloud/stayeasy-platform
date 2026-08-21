package com.stayeasy.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "food_orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodOrder {
    @Id
    private String id;
    private String orderId;
    private String guestId;
    private String guestName;
    private String restaurantId;
    private String restaurantName;
    private String hostId;
    private String deliveryAddress;
    private String status; // PLACED, CONFIRMED, PREPARING, READY, PICKED, ON_THE_WAY, DELIVERED, CANCELLED
    private String paymentMode; // ONLINE, OFFLINE
    private String paymentMethod; // UPI, CARD, NET_BANKING, OFFLINE_CASH
    private double totalAmount;
    private String estimatedTime;
    private String orderPlacedAt;
    private String statusUpdatedAt;
    private String riderName;
    private String riderPhone;
}
