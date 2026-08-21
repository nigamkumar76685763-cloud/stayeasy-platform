package com.stayeasy.controller;

import com.stayeasy.entity.Payment;
import com.stayeasy.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable String id) {
        return paymentService.getPaymentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/bill/{billId}")
    public ResponseEntity<Payment> getPaymentByBillId(@PathVariable String billId) {
        return paymentService.getPaymentByBillId(billId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/pending-offline")
    public ResponseEntity<List<Payment>> getPendingOfflinePayments() {
        return ResponseEntity.ok(paymentService.getPendingOfflinePayments());
    }

    @PostMapping
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        return ResponseEntity.ok(paymentService.recordPayment(payment));
    }

    @PutMapping("/{id}/confirm-cash")
    public ResponseEntity<?> confirmOfflineCash(@PathVariable String id) {
        Payment confirmed = paymentService.confirmOfflineCashPayment(id);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "✅ Offline Cash Payment Confirmed! Bill generated.",
            "payment", confirmed
        ));
    }

    @PostMapping("/{id}/settle-online")
    public ResponseEntity<Payment> settleOnline(
            @PathVariable String id,
            @RequestParam(required = false) String transactionRef,
            @RequestParam(required = false) String method) {
        return ResponseEntity.ok(paymentService.settleOnlinePayment(id, transactionRef, method));
    }
}
