package com.stayeasy.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "offers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Offer {
    @Id
    private String id;
    private String code;
    private String title;
    
    @Column(length = 1000)
    private String description;
    
    private String discountType; // PERCENTAGE, FLAT
    private double discountValue;
    private double minBookingAmount;
    private Double maxDiscountAmount;
    private String validTill;
    private String hostId;
    private String hostName;
    private String propertyId;
    private String propertyTitle;
    private boolean isActive;
    private int usageCount;
    private String createdAt;
}
