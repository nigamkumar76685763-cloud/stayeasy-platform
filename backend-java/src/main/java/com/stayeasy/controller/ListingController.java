package com.stayeasy.controller;

import com.stayeasy.entity.Listing;
import com.stayeasy.service.ListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/listings")
@CrossOrigin(origins = "*")
public class ListingController {

    @Autowired
    private ListingService listingService;

    @GetMapping
    public ResponseEntity<List<Listing>> getAllListings(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {

        if (search != null || category != null || minPrice != null || maxPrice != null) {
            return ResponseEntity.ok(listingService.searchListings(search, category, minPrice, maxPrice));
        }
        return ResponseEntity.ok(listingService.getAllActiveListings());
    }

    @GetMapping("/nearby")
    public ResponseEntity<List<Listing>> getNearbyListings(
            @RequestParam double lat,
            @RequestParam double lng,
            @RequestParam(defaultValue = "1500") double radiusKm) {
        return ResponseEntity.ok(listingService.getNearbyListings(lat, lng, radiusKm));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Listing> getListingById(@PathVariable String id) {
        return listingService.getListingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<Listing>> getListingsByCity(@PathVariable String city) {
        return ResponseEntity.ok(listingService.getListingsByCity(city));
    }

    @GetMapping("/host/{hostId}")
    public ResponseEntity<List<Listing>> getListingsByHost(@PathVariable String hostId) {
        return ResponseEntity.ok(listingService.getListingsByHostId(hostId));
    }

    @PostMapping
    public ResponseEntity<Listing> createListing(@RequestBody Listing listing) {
        return ResponseEntity.ok(listingService.createListing(listing));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Listing> updateListing(@PathVariable String id, @RequestBody Listing listing) {
        return ResponseEntity.ok(listingService.updateListing(id, listing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteListing(@PathVariable String id) {
        listingService.deleteListing(id);
        return ResponseEntity.ok().build();
    }
}
