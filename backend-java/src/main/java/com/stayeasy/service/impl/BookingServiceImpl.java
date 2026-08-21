package com.stayeasy.service.impl;

import com.stayeasy.dto.BookingRequestDto;
import com.stayeasy.entity.Booking;
import com.stayeasy.entity.Listing;
import com.stayeasy.entity.Payment;
import com.stayeasy.repository.BookingRepository;
import com.stayeasy.repository.ListingRepository;
import com.stayeasy.service.BookingService;
import com.stayeasy.service.OfferService;
import com.stayeasy.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private OfferService offerService;

    @Autowired
    private PaymentService paymentService;

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Optional<Booking> getBookingById(String id) {
        return bookingRepository.findById(id);
    }

    @Override
    public List<Booking> getBookingsByGuestId(String guestId) {
        return bookingRepository.findByGuestId(guestId);
    }

    @Override
    public List<Booking> getBookingsByListingId(String listingId) {
        return bookingRepository.findByListingId(listingId);
    }

    @Override
    public Booking createBooking(BookingRequestDto dto) {
        // Validate mandatory reservation parameters
        if (dto.getListingId() == null || dto.getListingId().isBlank()) {
            throw new IllegalArgumentException("Listing ID is required for reservation.");
        }

        Optional<Listing> optListing = listingRepository.findById(dto.getListingId());
        if (optListing.isEmpty()) {
            throw new IllegalArgumentException("Property not found with ID: " + dto.getListingId());
        }

        Listing listing = optListing.get();

        if (dto.getCheckIn() == null || dto.getCheckOut() == null) {
            throw new IllegalArgumentException("Check-in and Check-out dates are mandatory.");
        }

        // Validate date ranges and minimum stay length
        int nights = 1;
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date d1 = sdf.parse(dto.getCheckIn());
            Date d2 = sdf.parse(dto.getCheckOut());

            if (!d2.after(d1)) {
                throw new IllegalArgumentException("Check-out date must be strictly after Check-in date.");
            }

            long diff = d2.getTime() - d1.getTime();
            nights = (int) (diff / (1000 * 60 * 60 * 24));
            if (nights <= 0) {
                throw new IllegalArgumentException("Reservation must be for at least 1 night.");
            }
        } catch (Exception e) {
            if (e instanceof IllegalArgumentException) {
                throw (IllegalArgumentException) e;
            }
            throw new IllegalArgumentException("Invalid date format. Expected yyyy-MM-dd.");
        }

        int rooms = Math.max(1, Math.min(20, dto.getRoomsCount()));
        int guests = Math.max(1, Math.min(50, dto.getGuestsCount()));
        
        // Compute authoritative base rate server-side to guarantee pricing integrity
        double pricePerNight = listing.getPricePerNight();
        double baseRate = pricePerNight * nights * rooms;
        double foodPackage = dto.isFoodOption() ? (650.0 * nights * guests) : 0.0;
        double subtotal = baseRate + foodPackage;

        // Apply coupon with server-side validation
        double discount = 0;
        if (dto.getCouponCode() != null && !dto.getCouponCode().isBlank()) {
            Map<String, Object> offerRes = offerService.validateAndApplyCoupon(dto.getCouponCode(), subtotal);
            if (Boolean.TRUE.equals(offerRes.get("success"))) {
                Object discVal = offerRes.get("discount");
                discount = discVal instanceof Number ? ((Number) discVal).doubleValue() : 0.0;
            }
        }

        double taxable = Math.max(0, subtotal - discount);
        double gst = Math.round(taxable * 0.12); // 12% GST
        double total = taxable + gst;

        String bookingId = "bkg_" + System.currentTimeMillis();
        String paymentMode = "OFFLINE".equalsIgnoreCase(dto.getPaymentMode()) ? "OFFLINE" : "ONLINE";
        String paymentMethod = dto.getPaymentMethod() != null ? dto.getPaymentMethod() : (paymentMode.equals("OFFLINE") ? "OFFLINE_CASH" : "UPI");
        String paymentStatus = paymentMode.equals("OFFLINE") ? "PENDING_OFFLINE" : "PAID_ONLINE";

        Booking booking = Booking.builder()
                .id(bookingId)
                .listingId(listing.getId())
                .listingTitle(listing.getTitle())
                .listingImage(listing.getImageUrl())
                .city(listing.getCity())
                .guestId(dto.getGuestId())
                .guestName(dto.getGuestName())
                .guestEmail(dto.getGuestEmail())
                .guestPhone(dto.getGuestPhone())
                .checkIn(dto.getCheckIn())
                .checkOut(dto.getCheckOut())
                .guestsCount(guests)
                .roomsCount(rooms)
                .foodOption(dto.isFoodOption())
                .status("CONFIRMED")
                .baseRate(baseRate)
                .foodPackageAmount(foodPackage)
                .appliedCouponCode(discount > 0 ? dto.getCouponCode() : null)
                .discountAmount(discount)
                .gstAmount(gst)
                .totalAmount(total)
                .paymentMode(paymentMode)
                .paymentMethod(paymentMethod)
                .paymentStatus(paymentStatus)
                .createdAt(new Date().toString())
                .build();

        Booking savedBooking = bookingRepository.save(booking);

        // Generate Payment Record in PaymentService
        Payment payment = Payment.builder()
                .bookingId(savedBooking.getId())
                .itemTitle(savedBooking.getListingTitle() + " (" + savedBooking.getCheckIn() + " to " + savedBooking.getCheckOut() + ")")
                .mode(paymentMode)
                .method(paymentMethod)
                .amount(savedBooking.getTotalAmount())
                .status(paymentStatus)
                .paidBy(savedBooking.getGuestName())
                .paidTo("StayEasy Escrow / Host")
                .build();
        paymentService.recordPayment(payment);

        return savedBooking;
    }

    @Override
    public Booking updateBookingStatus(String id, String status) {
        return bookingRepository.findById(id).map(b -> {
            b.setStatus(status);
            return bookingRepository.save(b);
        }).orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
    }

    @Override
    public Booking cancelBooking(String id) {
        return bookingRepository.findById(id).map(b -> {
            b.setStatus("CANCELLED");
            return bookingRepository.save(b);
        }).orElseThrow(() -> new RuntimeException("Booking not found with ID: " + id));
    }
}
