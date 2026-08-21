package com.stayeasy.service;

import com.stayeasy.dto.BookingRequestDto;
import com.stayeasy.entity.Booking;
import java.util.List;
import java.util.Optional;

public interface BookingService {
    List<Booking> getAllBookings();
    Optional<Booking> getBookingById(String id);
    List<Booking> getBookingsByGuestId(String guestId);
    List<Booking> getBookingsByListingId(String listingId);
    Booking createBooking(BookingRequestDto dto);
    Booking cancelBooking(String id);
    Booking updateBookingStatus(String id, String status);
}
