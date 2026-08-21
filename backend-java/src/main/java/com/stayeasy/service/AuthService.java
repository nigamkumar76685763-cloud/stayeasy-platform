package com.stayeasy.service;

import com.stayeasy.entity.User;
import java.util.Map;
import java.util.Optional;

public interface AuthService {
    Map<String, Object> authenticate(String email, String password);
    Map<String, Object> register(User user);
    Optional<User> getUserById(String id);
    User updateUserProfile(String id, User updatedUser);
    Map<String, Object> addWalletBalance(String userId, double amount);
}
