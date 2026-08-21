package com.stayeasy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingRequestDto {
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
    private String couponCode;
    private String paymentMode; // ONLINE, OFFLINE
    private String paymentMethod; // UPI, CARD, NET_BANKING, OFFLINE_CASH
}
