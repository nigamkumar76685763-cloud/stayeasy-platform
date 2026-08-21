package com.stayeasy.service.impl;

import com.stayeasy.dto.OrderRequestDto;
import com.stayeasy.entity.FoodOrder;
import com.stayeasy.entity.Payment;
import com.stayeasy.repository.FoodOrderRepository;
import com.stayeasy.service.FoodOrderService;
import com.stayeasy.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FoodOrderServiceImpl implements FoodOrderService {

    @Autowired
    private FoodOrderRepository foodOrderRepository;

    @Autowired
    private PaymentService paymentService;

    @Override
    public List<FoodOrder> getAllOrders() {
        return foodOrderRepository.findAll();
    }

    @Override
    public Optional<FoodOrder> getOrderById(String id) {
        return foodOrderRepository.findById(id);
    }

    @Override
    public List<FoodOrder> getOrdersByGuestId(String guestId) {
        return foodOrderRepository.findByGuestId(guestId);
    }

    @Override
    public List<FoodOrder> getOrdersByRestaurantId(String restaurantId) {
        return foodOrderRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public FoodOrder createOrder(OrderRequestDto dto) {
        String orderId = "ORD-" + (int)(10000 + Math.random() * 90000);
        String paymentMode = dto.getPaymentMode() != null ? dto.getPaymentMode() : "ONLINE";
        String paymentMethod = dto.getPaymentMethod() != null ? dto.getPaymentMethod() : (paymentMode.equalsIgnoreCase("OFFLINE") ? "OFFLINE_CASH" : "UPI");
        String paymentStatus = paymentMode.equalsIgnoreCase("OFFLINE") ? "PENDING_OFFLINE" : "PAID_ONLINE";

        FoodOrder order = FoodOrder.builder()
                .id("ord_" + System.currentTimeMillis())
                .orderId(orderId)
                .guestId(dto.getGuestId())
                .guestName(dto.getGuestName())
                .restaurantId(dto.getRestaurantId())
                .restaurantName(dto.getRestaurantName())
                .hostId(dto.getHostId())
                .deliveryAddress(dto.getDeliveryAddress())
                .status("PLACED")
                .paymentMode(paymentMode)
                .paymentMethod(paymentMethod)
                .totalAmount(dto.getTotalAmount())
                .estimatedTime("20-25 mins")
                .orderPlacedAt(new Date().toString())
                .riderName("Deepak Verma (Speed Rider)")
                .riderPhone("+91 98123 45678")
                .build();

        FoodOrder savedOrder = foodOrderRepository.save(order);

        // Record Payment in PaymentService
        Payment payment = Payment.builder()
                .orderId(savedOrder.getId())
                .itemTitle(savedOrder.getRestaurantName() + " Gourmet Order #" + savedOrder.getOrderId())
                .mode(paymentMode)
                .method(paymentMethod)
                .amount(savedOrder.getTotalAmount())
                .status(paymentStatus)
                .paidBy(savedOrder.getGuestName())
                .paidTo(savedOrder.getRestaurantName() + " / Rider")
                .build();
        paymentService.recordPayment(payment);

        return savedOrder;
    }

    @Override
    public FoodOrder updateOrderStatus(String id, String status) {
        return foodOrderRepository.findById(id).map(order -> {
            order.setStatus(status);
            order.setStatusUpdatedAt(new Date().toString());
            return foodOrderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Food order not found for ID: " + id));
    }
}
