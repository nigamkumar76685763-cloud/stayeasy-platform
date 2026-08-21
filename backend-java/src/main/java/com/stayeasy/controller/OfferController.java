package com.stayeasy.controller;

import com.stayeasy.entity.Offer;
import com.stayeasy.service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/offers")
@CrossOrigin(origins = "*")
public class OfferController {

    @Autowired
    private OfferService offerService;

    @GetMapping
    public ResponseEntity<List<Offer>> getAllActiveOffers() {
        return ResponseEntity.ok(offerService.getAllActiveOffers());
    }

    @GetMapping("/host/{hostId}")
    public ResponseEntity<List<Offer>> getHostOffers(@PathVariable String hostId) {
        return ResponseEntity.ok(offerService.getOffersByHostId(hostId));
    }

    @PostMapping
    public ResponseEntity<Offer> createOffer(@RequestBody Offer offer) {
        return ResponseEntity.ok(offerService.createOffer(offer));
    }

    @PutMapping("/{id}/toggle")
    public ResponseEntity<?> toggleOfferStatus(@PathVariable String id) {
        Offer updated = offerService.toggleOfferStatus(id);
        return ResponseEntity.ok(Map.of("message", "Offer status toggled!", "offer", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOffer(@PathVariable String id) {
        offerService.deleteOffer(id);
        return ResponseEntity.ok(Map.of("message", "Offer deleted successfully!"));
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateCoupon(
            @RequestParam(required = false) String code,
            @RequestParam(required = false) Double amount,
            @RequestBody(required = false) Map<String, Object> body) {

        String couponCode = code;
        Double billAmount = amount;

        if (body != null) {
            if (body.containsKey("code")) {
                couponCode = String.valueOf(body.get("code"));
            }
            if (body.containsKey("amount")) {
                Object amt = body.get("amount");
                billAmount = amt instanceof Number ? ((Number) amt).doubleValue() : 0.0;
            }
        }

        if (couponCode == null || billAmount == null) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Coupon code and bill amount are required for validation."
            ));
        }

        Map<String, Object> result = offerService.validateAndApplyCoupon(couponCode, billAmount);
        if (Boolean.TRUE.equals(result.get("success"))) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
}
