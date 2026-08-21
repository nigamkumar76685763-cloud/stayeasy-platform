package com.stayeasy.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "menu_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItem {
    @Id
    private String id;
    private String restaurantId;
    private String restaurantName;
    private String itemName;
    private String category; // Biryani, Momos, Burger, Indian Thali, Fast Food, Desserts, Beverages
    private double price;
    
    @Column(length = 1000)
    private String description;
    
    private String image;
    private boolean isVeg;
    private boolean available;
    private double rating;
    private String prepTime;
    private String createdAt;
}
