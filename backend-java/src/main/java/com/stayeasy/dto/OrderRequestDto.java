package com.stayeasy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequestDto {
    private String guestId;
    private String guestName;
    private String restaurantId;
    private String restaurantName;
    private String hostId;
    private String deliveryAddress;
    private String paymentMode; // ONLINE, OFFLINE
    private String paymentMethod; // UPI, CARD, NET_BANKING, OFFLINE_CASH
    private double totalAmount;
    private List<OrderItemDto> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemDto {
        private String itemId;
        private String itemName;
        private double price;
        private int qty;
        private String image;
    }
}
