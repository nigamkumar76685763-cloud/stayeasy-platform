package com.stayeasy.controller;

import com.stayeasy.dto.BookingRequestDto;
import com.stayeasy.entity.Booking;
import com.stayeasy.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable String id) {
        return bookingService.getBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/guest/{guestId}")
    public ResponseEntity<List<Booking>> getBookingsByGuest(@PathVariable String guestId) {
        return ResponseEntity.ok(bookingService.getBookingsByGuestId(guestId));
    }

    @GetMapping("/listing/{listingId}")
    public ResponseEntity<List<Booking>> getBookingsByListing(@PathVariable String listingId) {
        return ResponseEntity.ok(bookingService.getBookingsByListingId(listingId));
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequestDto dto) {
        return ResponseEntity.ok(bookingService.createBooking(dto));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(@PathVariable String id) {
        return ResponseEntity.ok(bookingService.cancelBooking(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Booking> updateStatus(@PathVariable String id, @RequestParam String status) {
        return ResponseEntity.ok(bookingService.updateBookingStatus(id, status));
    }
}
