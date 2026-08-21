package com.stayeasy.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "listings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Listing {
    @Id
    private String id;
    private String title;
    private String city;
    private String state;
    private String address;
    private String landmark;
    private String pinCode;
    private double latitude;
    private double longitude;
    private double distanceKm;
    
    private double pricePerNight;
    
    @Column(length = 1000)
    private String imageUrl;
    
    @Column(length = 2000)
    private String images; // comma-separated image URLs
    
    @Column(length = 1000)
    private String amenities; // comma-separated amenities
    
    private String hostId;
    private String hostName;
    private String hostAvatar;
    private double hostRating;
    private boolean foodAvailable;
    private String category; // deluxe, suite, villa, penthouse, studio
    private int maxGuests;
    private int bedrooms;
    private int bathrooms;
    private int sizeSqFt;
    
    @Column(length = 2000)
    private String description;
    
    private boolean isActive;
    private double rating;
    private int totalReviews;
    private int availableCount;
    private String createdAt;
}
