package com.stayeasy.repository;

import com.stayeasy.entity.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ListingRepository extends JpaRepository<Listing, String> {
    List<Listing> findByCityIgnoreCase(String city);
    List<Listing> findByCategoryIgnoreCase(String category);
    List<Listing> findByHostId(String hostId);
}
