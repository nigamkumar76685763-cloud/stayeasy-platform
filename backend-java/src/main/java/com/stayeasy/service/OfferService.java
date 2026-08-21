package com.stayeasy.service;

import com.stayeasy.entity.Offer;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface OfferService {
    List<Offer> getAllActiveOffers();
    List<Offer> getOffersByHostId(String hostId);
    Offer createOffer(Offer offer);
    Offer toggleOfferStatus(String id);
    void deleteOffer(String id);
    Map<String, Object> validateAndApplyCoupon(String code, double amount);
}
