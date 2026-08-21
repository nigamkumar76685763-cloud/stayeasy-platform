package com.stayeasy.service.impl;

import com.stayeasy.entity.Offer;
import com.stayeasy.repository.OfferRepository;
import com.stayeasy.service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OfferServiceImpl implements OfferService {

    @Autowired
    private OfferRepository offerRepository;

    @Override
    public List<Offer> getAllActiveOffers() {
        return offerRepository.findByIsActiveTrue();
    }

    @Override
    public List<Offer> getOffersByHostId(String hostId) {
        return offerRepository.findByHostId(hostId);
    }

    @Override
    public Offer createOffer(Offer offer) {
        if (offer.getId() == null) {
            offer.setId("off_" + System.currentTimeMillis());
        }
        if (offer.getCreatedAt() == null) {
            offer.setCreatedAt(new Date().toString());
        }
        if (offer.getCode() != null) {
            offer.setCode(offer.getCode().trim().toUpperCase());
        }
        offer.setActive(true);
        offer.setUsageCount(0);
        return offerRepository.save(offer);
    }

    @Override
    public Offer toggleOfferStatus(String id) {
        return offerRepository.findById(id).map(offer -> {
            offer.setActive(!offer.isActive());
            return offerRepository.save(offer);
        }).orElseThrow(() -> new RuntimeException("Offer not found with id: " + id));
    }

    @Override
    public void deleteOffer(String id) {
        offerRepository.deleteById(id);
    }

    @Override
    public Map<String, Object> validateAndApplyCoupon(String code, double amount) {
        Map<String, Object> response = new HashMap<>();

        if (code == null || code.isBlank()) {
            response.put("success", false);
            response.put("message", "Please provide a coupon code.");
            return response;
        }

        Optional<Offer> opt = offerRepository.findByCodeIgnoreCase(code.trim());
        if (opt.isEmpty() || !opt.get().isActive()) {
            response.put("success", false);
            response.put("message", "Invalid or expired coupon code: " + code);
            return response;
        }

        Offer offer = opt.get();
        if (amount < offer.getMinBookingAmount()) {
            response.put("success", false);
            response.put("message", "Minimum booking amount of ₹" + Math.round(offer.getMinBookingAmount()) + " required for code " + offer.getCode());
            return response;
        }

        double discount = 0;
        if ("PERCENTAGE".equalsIgnoreCase(offer.getDiscountType())) {
            discount = (amount * offer.getDiscountValue()) / 100.0;
            if (offer.getMaxDiscountAmount() != null && discount > offer.getMaxDiscountAmount()) {
                discount = offer.getMaxDiscountAmount();
            }
        } else {
            discount = offer.getDiscountValue();
        }

        discount = Math.min(discount, amount);

        // Increment usage
        offer.setUsageCount(offer.getUsageCount() + 1);
        offerRepository.save(offer);

        response.put("success", true);
        response.put("discount", Math.round(discount));
        response.put("offer", offer);
        response.put("message", "🎉 Coupon " + offer.getCode() + " applied! Saved ₹" + Math.round(discount));
        return response;
    }
}
