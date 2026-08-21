package com.stayeasy.service;

import com.stayeasy.entity.Payment;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface PaymentService {
    List<Payment> getAllPayments();
    Optional<Payment> getPaymentById(String id);
    Optional<Payment> getPaymentByBillId(String billId);
    List<Payment> getPendingOfflinePayments();
    Payment recordPayment(Payment payment);
    Payment confirmOfflineCashPayment(String paymentId);
    Payment settleOnlinePayment(String paymentId, String transactionRef, String method);
}
