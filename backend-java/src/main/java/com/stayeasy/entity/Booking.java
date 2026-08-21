package com.stayeasy.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {
    @Id
    private String id;
    private String listingId;
    private String listingTitle;
    private String listingImage;
    private String city;
    private String guestId;
    private String guestName;
    private String guestEmail;
    private String guestPhone;
    private String checkIn;
    private String checkOut;
    private int guestsCount;
    private int roomsCount;
    private boolean foodOption;
    private String status; // PENDING, CONFIRMED, CHECKED_IN, COMPLETED, CANCELLED
    private double baseRate;
    private double foodPackageAmount;
    private String appliedCouponCode;
    private double discountAmount;
    private double gstAmount;
    private double totalAmount;
    private String paymentMode; // ONLINE, OFFLINE
    private String paymentMethod; // UPI, CARD, NET_BANKING, OFFLINE_CASH
    private String paymentStatus; // PENDING_OFFLINE, PAID_OFFLINE, PENDING_ONLINE, PAID_ONLINE, DISPUTED
    private String createdAt;
}
