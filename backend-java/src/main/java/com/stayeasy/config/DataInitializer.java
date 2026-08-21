package com.stayeasy.config;

import com.stayeasy.entity.*;
import com.stayeasy.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
        seedListings();
        seedRestaurantsAndMenu();
        seedOffers();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            User guest = User.builder()
                    .id("usr_guest_01")
                    .name("Aarav Sharma")
                    .email("aarav@stayeasy.com")
                    .phone("+91 98765 43210")
                    .password(passwordEncoder.encode("pass123"))
                    .role("GUEST")
                    .isVerified(true)
                    .profilePic("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80")
                    .rating(4.95)
                    .totalBookings(14)
                    .walletBalance(4250.0)
                    .createdAt(new Date().toString())
                    .build();

            User host = User.builder()
                    .id("host_01")
                    .name("Vikramaditya Oberoi")
                    .email("vikram@oberoihotels.in")
                    .phone("+91 98234 56789")
                    .password(passwordEncoder.encode("host123"))
                    .role("HOST")
                    .isVerified(true)
                    .profilePic("https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80")
                    .rating(4.98)
                    .totalBookings(312)
                    .walletBalance(124800.0)
                    .createdAt(new Date().toString())
                    .build();

            userRepository.saveAll(Arrays.asList(guest, host));
        }
    }

    private void seedListings() {
        if (listingRepository.count() == 0) {
            Listing l1 = Listing.builder()
                    .id("prop_1")
                    .title("Signature Oceanview Presidential Suite")
                    .city("Goa")
                    .state("Goa")
                    .address("Candolim Beach Road, North Goa")
                    .landmark("Candolim Beach Pier")
                    .pinCode("403515")
                    .latitude(15.5173)
                    .longitude(73.7628)
                    .distanceKm(0.8)
                    .pricePerNight(6500.0)
                    .imageUrl("https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80")
                    .hostId("host_01")
                    .hostName("Vikramaditya Oberoi")
                    .hostAvatar("https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80")
                    .hostRating(4.98)
                    .foodAvailable(true)
                    .category("SUITE")
                    .maxGuests(4)
                    .bedrooms(2)
                    .bathrooms(2)
                    .sizeSqFt(1450)
                    .description("Ultra-luxurious Goan beachfront suite with private plunge pool, panoramic Arabian Sea sunset views.")
                    .isActive(true)
                    .rating(4.96)
                    .totalReviews(128)
                    .availableCount(3)
                    .createdAt(new Date().toString())
                    .build();

            Listing l2 = Listing.builder()
                    .id("prop_2")
                    .title("Sea-Facing Royal Penthouse Worli")
                    .city("Mumbai")
                    .state("Maharashtra")
                    .address("Worli Sea Face, South Mumbai")
                    .landmark("Bandra-Worli Sea Link View")
                    .pinCode("400018")
                    .latitude(19.0166)
                    .longitude(72.8166)
                    .distanceKm(2.4)
                    .pricePerNight(9800.0)
                    .imageUrl("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80")
                    .hostId("host_02")
                    .hostName("Radhika Singhania")
                    .hostAvatar("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80")
                    .hostRating(4.95)
                    .foodAvailable(true)
                    .category("PENTHOUSE")
                    .maxGuests(6)
                    .bedrooms(3)
                    .bathrooms(3)
                    .sizeSqFt(2200)
                    .description("Prestigious high-rise penthouse overlooking the iconic Mumbai skyline and Arabian waters.")
                    .isActive(true)
                    .rating(4.99)
                    .totalReviews(214)
                    .availableCount(2)
                    .createdAt(new Date().toString())
                    .build();

            Listing l3 = Listing.builder()
                    .id("prop_3")
                    .title("Royal Heritage Haveli & Courtyard Villa")
                    .city("Jaipur")
                    .state("Rajasthan")
                    .address("Civil Lines, Near Raj Mandir, Jaipur")
                    .landmark("Hawa Mahal Road")
                    .pinCode("302001")
                    .latitude(26.9124)
                    .longitude(75.7873)
                    .distanceKm(1.1)
                    .pricePerNight(5200.0)
                    .imageUrl("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80")
                    .hostId("host_03")
                    .hostName("Maharaja Gajendra Singh")
                    .hostAvatar("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80")
                    .hostRating(4.97)
                    .foodAvailable(true)
                    .category("VILLA")
                    .maxGuests(5)
                    .bedrooms(3)
                    .bathrooms(3)
                    .sizeSqFt(3100)
                    .description("Authentic 18th-century Rajputana haveli restored into a luxury heritage stay with marble courtyards.")
                    .isActive(true)
                    .rating(4.94)
                    .totalReviews(96)
                    .availableCount(4)
                    .createdAt(new Date().toString())
                    .build();

            listingRepository.saveAll(Arrays.asList(l1, l2, l3));
        }
    }

    private void seedRestaurantsAndMenu() {
        if (restaurantRepository.count() == 0) {
            Restaurant r1 = Restaurant.builder()
                    .id("rest_1")
                    .name("Dum Pukht & Dastarkhwan")
                    .ownerName("Chef Imtiaz Qureshi")
                    .phone("+91 98450 12345")
                    .area("Candolim Beach Resort")
                    .address("Ground Level, StayEasy Grand Palace, Candolim, Goa")
                    .rating(4.96)
                    .reviewsCount(542)
                    .isOpen(true)
                    .deliveryTime("20-25 mins")
                    .logoUrl("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=200&q=80")
                    .bannerUrl("https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80")
                    .createdAt(new Date().toString())
                    .build();

            restaurantRepository.save(r1);

            MenuItem m1 = MenuItem.builder()
                    .id("food_1")
                    .restaurantId("rest_1")
                    .restaurantName("Dum Pukht & Dastarkhwan")
                    .itemName("Royal Awadhi Gosht Biryani (Zaffrani)")
                    .category("Biryani")
                    .price(680.0)
                    .description("Slow-cooked prime tender mutton dum-sealed in purdah pot with saffron Basmati rice and Lucknowi spices.")
                    .image("https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80")
                    .isVeg(false)
                    .available(true)
                    .rating(4.98)
                    .prepTime("25 mins")
                    .createdAt(new Date().toString())
                    .build();

            MenuItem m2 = MenuItem.builder()
                    .id("food_2")
                    .restaurantId("rest_1")
                    .restaurantName("Dum Pukht & Dastarkhwan")
                    .itemName("Dal Bukhara (24-Hour Charcoal Simmered)")
                    .category("Indian Thali")
                    .price(490.0)
                    .description("Signature black lentils slow-simmered overnight over smouldering charcoal with pure churned white butter.")
                    .image("https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80")
                    .isVeg(true)
                    .available(true)
                    .rating(4.97)
                    .prepTime("18 mins")
                    .createdAt(new Date().toString())
                    .build();

            menuItemRepository.saveAll(Arrays.asList(m1, m2));
        }
    }

    private void seedOffers() {
        if (offerRepository.count() == 0) {
            Offer o1 = Offer.builder()
                    .id("off_01")
                    .code("DIWALI25")
                    .title("🪔 Shubh Festive Dhamaka 25% OFF")
                    .description("Celebrate Indian festivities with a grand 25% discount across all luxury suites & villas.")
                    .discountType("PERCENTAGE")
                    .discountValue(25.0)
                    .minBookingAmount(4000.0)
                    .maxDiscountAmount(2500.0)
                    .validTill("2026-11-30")
                    .hostId("host_01")
                    .hostName("Vikramaditya Oberoi")
                    .propertyId("ALL")
                    .propertyTitle("All Verified Indian Properties")
                    .isActive(true)
                    .usageCount(142)
                    .createdAt(new Date().toString())
                    .build();

            Offer o2 = Offer.builder()
                    .id("off_02")
                    .code("MONSOON1000")
                    .title("🌧️ Royal Monsoon Flat ₹1,000 Cash Voucher")
                    .description("Enjoy monsoon getaways in Goa and Udaipur with direct ₹1,000 cash deduction on room billing.")
                    .discountType("FLAT")
                    .discountValue(1000.0)
                    .minBookingAmount(6000.0)
                    .validTill("2026-09-30")
                    .hostId("host_02")
                    .hostName("Radhika Singhania")
                    .propertyId("ALL")
                    .propertyTitle("Goa & Udaipur Properties")
                    .isActive(true)
                    .usageCount(89)
                    .createdAt(new Date().toString())
                    .build();

            offerRepository.saveAll(Arrays.asList(o1, o2));
        }
    }
}
