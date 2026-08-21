package com.stayeasy.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String phone;
    
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    
    private String role; // GUEST, HOST, RESTAURANT, ADMIN
    private boolean isVerified;
    private String profilePic;
    private double rating;
    private int totalBookings;
    private double walletBalance;
    private String createdAt;
}
