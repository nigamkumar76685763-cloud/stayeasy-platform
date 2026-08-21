package com.stayeasy.repository;

import com.stayeasy.entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface OfferRepository extends JpaRepository<Offer, String> {
    Optional<Offer> findByCodeIgnoreCase(String code);
    List<Offer> findByHostId(String hostId);
    List<Offer> findByIsActiveTrue();
}
