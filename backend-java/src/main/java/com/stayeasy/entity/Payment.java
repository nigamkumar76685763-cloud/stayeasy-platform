package com.stayeasy.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {
    @Id
    private String id;
    private String billId;
    private String bookingId;
    private String orderId;
    private String itemTitle;
    private String mode; // OFFLINE, ONLINE
    private String method; // UPI, CARD, NET_BANKING, OFFLINE_CASH
    private double amount;
    private String status; // PENDING_OFFLINE, PAID_OFFLINE, PENDING_ONLINE, PAID_ONLINE, REFUNDED
    private String paidBy;
    private String paidTo;
    private String dateTime;
    private String transactionRef;
}
