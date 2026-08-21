package com.stayeasy.service.impl;

import com.stayeasy.entity.Listing;
import com.stayeasy.repository.ListingRepository;
import com.stayeasy.service.ListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ListingServiceImpl implements ListingService {

    @Autowired
    private ListingRepository listingRepository;

    @Override
    public List<Listing> getAllActiveListings() {
        return listingRepository.findAll().stream()
                .filter(Listing::isActive)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Listing> getListingById(String id) {
        return listingRepository.findById(id);
    }

    @Override
    public List<Listing> getListingsByCity(String city) {
        return listingRepository.findByCityIgnoreCase(city);
    }

    @Override
    public List<Listing> getListingsByHostId(String hostId) {
        return listingRepository.findByHostId(hostId);
    }

    @Override
    public List<Listing> searchListings(String query, String category, Double minPrice, Double maxPrice) {
        return listingRepository.findAll().stream()
                .filter(Listing::isActive)
                .filter(l -> query == null || query.isBlank() 
                        || l.getTitle().toLowerCase().contains(query.toLowerCase())
                        || l.getCity().toLowerCase().contains(query.toLowerCase())
                        || (l.getLandmark() != null && l.getLandmark().toLowerCase().contains(query.toLowerCase())))
                .filter(l -> category == null || category.equalsIgnoreCase("ALL") || l.getCategory().equalsIgnoreCase(category))
                .filter(l -> minPrice == null || l.getPricePerNight() >= minPrice)
                .filter(l -> maxPrice == null || l.getPricePerNight() <= maxPrice)
                .collect(Collectors.toList());
    }

    @Override
    public List<Listing> getNearbyListings(double userLat, double userLng, double radiusKm) {
        List<Listing> listings = listingRepository.findAll().stream()
                .filter(Listing::isActive)
                .collect(Collectors.toList());

        for (Listing l : listings) {
            double distance = calculateHaversineDistance(userLat, userLng, l.getLatitude(), l.getLongitude());
            l.setDistanceKm(Math.round(distance * 10.0) / 10.0);
        }

        return listings.stream()
                .filter(l -> radiusKm <= 0 || l.getDistanceKm() <= radiusKm)
                .sorted(Comparator.comparingDouble(Listing::getDistanceKm))
                .collect(Collectors.toList());
    }

    // Haversine formula to calculate distance in KM between 2 GPS coordinates
    private double calculateHaversineDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radius of the Earth in KM
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    @Override
    public Listing createListing(Listing listing) {
        if (listing.getId() == null) {
            listing.setId("prop_" + System.currentTimeMillis());
        }
        if (listing.getCreatedAt() == null) {
            listing.setCreatedAt(new Date().toString());
        }
        listing.setActive(true);
        return listingRepository.save(listing);
    }

    @Override
    public Listing updateListing(String id, Listing updated) {
        return listingRepository.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setCity(updated.getCity());
            existing.setState(updated.getState());
            existing.setAddress(updated.getAddress());
            existing.setLandmark(updated.getLandmark());
            existing.setPinCode(updated.getPinCode());
            existing.setLatitude(updated.getLatitude());
            existing.setLongitude(updated.getLongitude());
            existing.setPricePerNight(updated.getPricePerNight());
            existing.setImageUrl(updated.getImageUrl());
            existing.setImages(updated.getImages());
            existing.setAmenities(updated.getAmenities());
            existing.setDescription(updated.getDescription());
            existing.setCategory(updated.getCategory());
            existing.setMaxGuests(updated.getMaxGuests());
            existing.setBedrooms(updated.getBedrooms());
            existing.setBathrooms(updated.getBathrooms());
            existing.setFoodAvailable(updated.isFoodAvailable());
            return listingRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Listing not found with id: " + id));
    }

    @Override
    public void deleteListing(String id) {
        listingRepository.deleteById(id);
    }
}
