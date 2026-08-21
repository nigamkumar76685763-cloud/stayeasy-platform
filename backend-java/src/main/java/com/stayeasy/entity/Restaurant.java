package com.stayeasy.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "restaurants")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Restaurant {
    @Id
    private String id;
    private String name;
    private String ownerName;
    private String phone;
    private String area;
    private String address;
    private double rating;
    private int reviewsCount;
    private boolean isOpen;
    private String deliveryTime;
    private String logoUrl;
    private String bannerUrl;
    private String createdAt;
}
