package com.stayeasy.service.impl;

import com.stayeasy.entity.User;
import com.stayeasy.repository.UserRepository;
import com.stayeasy.security.JwtUtils;
import com.stayeasy.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Map<String, Object> authenticate(String email, String password) {
        Map<String, Object> response = new HashMap<>();

        if (email == null || password == null || email.isBlank() || password.isBlank()) {
            response.put("success", false);
            response.put("message", "Email and password are required.");
            return response;
        }

        Optional<User> opt = userRepository.findByEmail(email.trim().toLowerCase());
        if (opt.isPresent()) {
            User user = opt.get();
            boolean isPasswordMatch = passwordEncoder.matches(password, user.getPassword());

            if (isPasswordMatch) {
                String token = jwtUtils.generateToken(user.getEmail(), user.getRole(), user.getId());
                response.put("success", true);
                response.put("token", token);
                response.put("user", user);
                response.put("message", "Welcome back, " + user.getName() + "!");
                return response;
            }
        }

        response.put("success", false);
        response.put("message", "Invalid email or password.");
        return response;
    }

    @Override
    public Map<String, Object> register(User user) {
        Map<String, Object> response = new HashMap<>();

        if (user.getEmail() == null || user.getEmail().isBlank()) {
            response.put("success", false);
            response.put("message", "Valid email is required.");
            return response;
        }

        String normalizedEmail = user.getEmail().trim().toLowerCase();
        if (userRepository.findByEmail(normalizedEmail).isPresent()) {
            response.put("success", false);
            response.put("message", "Email already registered!");
            return response;
        }

        if (user.getId() == null) {
            user.setId("usr_" + System.currentTimeMillis());
        }
        
        user.setEmail(normalizedEmail);

        // Role-Based Access Control: Restrict self-registration to non-administrative roles
        String requestedRole = user.getRole() != null ? user.getRole().toUpperCase() : "GUEST";
        if ("ADMIN".equals(requestedRole)) {
            user.setRole("GUEST");
        } else if ("HOST".equals(requestedRole) || "RESTAURANT".equals(requestedRole)) {
            user.setRole(requestedRole);
        } else {
            user.setRole("GUEST");
        }
        
        // Encode password with BCrypt
        if (user.getPassword() != null && !user.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        } else {
            response.put("success", false);
            response.put("message", "Password cannot be empty.");
            return response;
        }

        user.setVerified(true);
        user.setCreatedAt(new Date().toString());
        User saved = userRepository.save(user);

        String token = jwtUtils.generateToken(saved.getEmail(), saved.getRole(), saved.getId());
        response.put("success", true);
        response.put("token", token);
        response.put("user", saved);
        response.put("message", "Registration successful! Welcome to StayEasy.");
        return response;
    }

    @Override
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public User updateUserProfile(String id, User updatedUser) {
        return userRepository.findById(id).map(u -> {
            if (updatedUser.getName() != null && !updatedUser.getName().isBlank()) {
                u.setName(updatedUser.getName());
            }
            if (updatedUser.getPhone() != null && !updatedUser.getPhone().isBlank()) {
                u.setPhone(updatedUser.getPhone());
            }
            if (updatedUser.getProfilePic() != null && !updatedUser.getProfilePic().isBlank()) {
                u.setProfilePic(updatedUser.getProfilePic());
            }
            return userRepository.save(u);
        }).orElseThrow(() -> new RuntimeException("User not found for id: " + id));
    }

    @Override
    public Map<String, Object> addWalletBalance(String userId, double amount) {
        Map<String, Object> response = new HashMap<>();

        // Security Patch: Anti-Fraud & Negative Balance Attack Prevention
        if (Double.isNaN(amount) || Double.isInfinite(amount) || amount <= 0) {
            response.put("success", false);
            response.put("message", "Invalid top-up amount. Amount must be greater than ₹0.");
            return response;
        }

        if (amount > 100000) {
            response.put("success", false);
            response.put("message", "Maximum single wallet top-up limit is ₹1,00,000 as per RBI guidelines.");
            return response;
        }

        Optional<User> opt = userRepository.findById(userId);
        if (opt.isEmpty()) {
            response.put("success", false);
            response.put("message", "User not found for ID: " + userId);
            return response;
        }

        User user = opt.get();
        user.setWalletBalance(user.getWalletBalance() + amount);
        User saved = userRepository.save(user);

        response.put("success", true);
        response.put("walletBalance", saved.getWalletBalance());
        response.put("message", "₹" + Math.round(amount) + " added successfully to your StayEasy Wallet via UPI!");
        response.put("user", saved);
        return response;
    }
}
