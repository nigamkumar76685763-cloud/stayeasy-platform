package com.stayeasy.service;

import com.stayeasy.entity.Listing;
import java.util.List;
import java.util.Optional;

public interface ListingService {
    List<Listing> getAllActiveListings();
    Optional<Listing> getListingById(String id);
    List<Listing> getListingsByCity(String city);
    List<Listing> getListingsByHostId(String hostId);
    List<Listing> searchListings(String query, String category, Double minPrice, Double maxPrice);
    List<Listing> getNearbyListings(double userLat, double userLng, double radiusKm);
    Listing createListing(Listing listing);
    Listing updateListing(String id, Listing listing);
    void deleteListing(String id);
}
