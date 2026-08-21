package com.stayeasy.repository;

import com.stayeasy.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, String> {
    List<Booking> findByGuestId(String guestId);
    List<Booking> findByListingId(String listingId);
    List<Booking> findByStatus(String status);
}
