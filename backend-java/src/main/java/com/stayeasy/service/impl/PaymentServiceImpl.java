package com.stayeasy.service.impl;

import com.stayeasy.entity.Payment;
import com.stayeasy.repository.PaymentRepository;
import com.stayeasy.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Optional<Payment> getPaymentById(String id) {
        return paymentRepository.findById(id);
    }

    @Override
    public Optional<Payment> getPaymentByBillId(String billId) {
        return paymentRepository.findByBillId(billId);
    }

    @Override
    public List<Payment> getPendingOfflinePayments() {
        return paymentRepository.findAll().stream()
                .filter(p -> "OFFLINE".equalsIgnoreCase(p.getMode()) && "PENDING_OFFLINE".equalsIgnoreCase(p.getStatus()))
                .collect(Collectors.toList());
    }

    @Override
    public Payment recordPayment(Payment payment) {
        if (payment.getId() == null) {
            payment.setId("pay_" + System.currentTimeMillis());
        }
        if (payment.getBillId() == null) {
            payment.setBillId("BILL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        if (payment.getDateTime() == null) {
            payment.setDateTime(new Date().toString());
        }
        return paymentRepository.save(payment);
    }

    @Override
    public Payment confirmOfflineCashPayment(String paymentId) {
        return paymentRepository.findById(paymentId).map(payment -> {
            payment.setStatus("PAID_OFFLINE");
            payment.setTransactionRef("OFFLINE-CASH-" + System.currentTimeMillis());
            return paymentRepository.save(payment);
        }).orElseThrow(() -> new RuntimeException("Payment record not found for ID: " + paymentId));
    }

    @Override
    public Payment settleOnlinePayment(String paymentId, String transactionRef, String method) {
        return paymentRepository.findById(paymentId).map(payment -> {
            payment.setMode("ONLINE");
            payment.setMethod(method != null ? method : "UPI");
            payment.setStatus("PAID_ONLINE");
            payment.setTransactionRef(transactionRef != null ? transactionRef : "TXN-" + System.currentTimeMillis());
            return paymentRepository.save(payment);
        }).orElseThrow(() -> new RuntimeException("Payment not found for ID: " + paymentId));
    }
}
