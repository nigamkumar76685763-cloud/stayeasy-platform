import React, { createContext, useContext, useState } from 'react';
import { CartFoodItem, Booking, FoodOrder, Payment, Offer, Listing } from '../types';
import { MOCK_BOOKINGS, MOCK_FOOD_ORDERS, MOCK_PAYMENTS, MOCK_OFFERS, MOCK_PROPERTIES } from '../data/mockData';
import toast from 'react-hot-toast';

interface CartContextType {
  foodCart: CartFoodItem[];
  addToFoodCart: (item: CartFoodItem) => void;
  updateFoodQty: (itemId: string, delta: number) => void;
  removeFoodItem: (itemId: string) => void;
  clearFoodCart: () => void;
  foodCartTotal: number;
  totalFoodItemsCount: number;

  // Active properties, bookings & orders
  properties: Listing[];
  addHostProperty: (property: Omit<Listing, 'id' | 'createdAt'>) => Listing;
  deleteHostProperty: (id: string) => void;

  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => Booking;
  cancelBooking: (bookingId: string) => void;

  orders: FoodOrder[];
  addFoodOrder: (order: Omit<FoodOrder, 'id' | 'orderId' | 'orderPlacedAt'>) => FoodOrder;
  updateOrderStatus: (orderId: string, status: FoodOrder['status']) => void;

  payments: Payment[];
  addPayment: (payment: Omit<Payment, 'id' | 'billId' | 'dateTime'>) => Payment;
  confirmCashPayment: (paymentId: string) => { success: boolean; message: string };

  // Host Offers & Promo Codes
  offers: Offer[];
  addHostOffer: (offer: Omit<Offer, 'id' | 'createdAt' | 'usageCount'>) => Offer;
  toggleOfferStatus: (offerId: string) => void;
  deleteOffer: (offerId: string) => void;
  appliedOffer: Offer | null;
  applyCouponCode: (code: string, amount: number) => { success: boolean; discount: number; message: string };
  removeCouponCode: () => void;

  // Modals state
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  toggleCartDrawer: () => void;
  activeOrderTracker: FoodOrder | null;
  setActiveOrderTracker: (order: FoodOrder | null) => void;
  selectedBillModal: Payment | null;
  setSelectedBillModal: (payment: Payment | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Listing[]>(MOCK_PROPERTIES);
  const [foodCart, setFoodCart] = useState<CartFoodItem[]>([]);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [orders, setOrders] = useState<FoodOrder[]>(MOCK_FOOD_ORDERS);
  const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);
  const [offers, setOffers] = useState<Offer[]>(MOCK_OFFERS);
  const [appliedOffer, setAppliedOffer] = useState<Offer | null>(null);

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [activeOrderTracker, setActiveOrderTracker] = useState<FoodOrder | null>(null);
  const [selectedBillModal, setSelectedBillModal] = useState<Payment | null>(null);

  const toggleCartDrawer = () => setIsCartDrawerOpen(prev => !prev);

  const addToFoodCart = (item: CartFoodItem) => {
    setFoodCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + item.qty } : i);
      }
      return [...prev, item];
    });
    toast.success(`🍽️ Added "${item.itemName}" to your meal cart!`);
  };

  const updateFoodQty = (itemId: string, delta: number) => {
    setFoodCart(prev => {
      return prev.map(i => {
        if (i.id === itemId) {
          const newQty = i.qty + delta;
          return newQty > 0 ? { ...i, qty: newQty } : null;
        }
        return i;
      }).filter(Boolean) as CartFoodItem[];
    });
  };

  const removeFoodItem = (itemId: string) => {
    setFoodCart(prev => prev.filter(i => i.id !== itemId));
    toast('Item removed from cart');
  };

  const clearFoodCart = () => setFoodCart([]);

  const foodCartTotal = foodCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalFoodItemsCount = foodCart.reduce((sum, item) => sum + item.qty, 0);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `bkg_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setBookings(prev => [newBooking, ...prev]);

    // Create payment entry
    addPayment({
      bookingId: newBooking.id,
      itemTitle: `${newBooking.listingTitle} (${newBooking.checkIn} to ${newBooking.checkOut})`,
      mode: newBooking.paymentMode,
      method: newBooking.paymentMethod || (newBooking.paymentMode === 'OFFLINE' ? 'OFFLINE_CASH' : 'UPI'),
      amount: newBooking.totalAmount,
      status: newBooking.paymentMode === 'OFFLINE' ? 'PENDING_OFFLINE' : 'PAID_ONLINE',
      paidBy: newBooking.guestName,
      paidTo: 'StayEasy Escrow / Host',
    });

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'CANCELLED' } : b));
    toast.success('Reservation cancelled successfully.');
  };

  const addFoodOrder = (orderData: Omit<FoodOrder, 'id' | 'orderId' | 'orderPlacedAt'>): FoodOrder => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newOrder: FoodOrder = {
      ...orderData,
      id: `ord_${Date.now()}`,
      orderId: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      orderPlacedAt: timeStr,
      estimatedTime: '20-25 mins',
      riderName: 'Tariq Al-Mansoor',
      riderPhone: '+91 98765 12345',
    };
    setOrders(prev => [newOrder, ...prev]);
    clearFoodCart();
    setActiveOrderTracker(newOrder);

    // Create payment entry
    addPayment({
      orderId: newOrder.id,
      itemTitle: `${newOrder.items.map(i => `${i.qty}x ${i.itemName}`).join(', ')}`,
      mode: newOrder.paymentMode,
      method: newOrder.paymentMethod || (newOrder.paymentMode === 'OFFLINE' ? 'OFFLINE_CASH' : 'UPI'),
      amount: newOrder.totalAmount,
      status: newOrder.paymentMode === 'OFFLINE' ? 'PENDING_OFFLINE' : 'PAID_ONLINE',
      paidBy: newOrder.guestName,
      paidTo: `${newOrder.restaurantName} / Delivery Host`,
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: FoodOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status, statusUpdatedAt: new Date().toLocaleTimeString() } : o));
    if (activeOrderTracker && activeOrderTracker.id === orderId) {
      setActiveOrderTracker(prev => prev ? { ...prev, status } : null);
    }
  };

  const addPayment = (paymentData: Omit<Payment, 'id' | 'billId' | 'dateTime'>): Payment => {
    const newPayment: Payment = {
      ...paymentData,
      id: `pay_${Date.now()}`,
      billId: `BILL-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      dateTime: new Date().toLocaleString(),
    };
    setPayments(prev => [newPayment, ...prev]);
    return newPayment;
  };

  const confirmCashPayment = (paymentId: string) => {
    const payment = payments.find(p => p.id === paymentId);
    if (!payment) return { success: false, message: 'Payment record not found.' };

    setPayments(prev => prev.map(p => p.id === paymentId ? {
      ...p,
      status: 'PAID_OFFLINE',
    } : p));

    return {
      success: true,
      message: `✅ Offline Cash Payment Confirmed for ₹${payment.amount.toLocaleString('en-IN')}! Official Tax Bill is ready.`
    };
  };

  // Host creates an offer
  const addHostOffer = (newOfferData: Omit<Offer, 'id' | 'createdAt' | 'usageCount'>) => {
    const newOffer: Offer = {
      ...newOfferData,
      id: 'off_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      usageCount: 0,
    };
    setOffers(prev => [newOffer, ...prev]);
    toast.success(`🎉 Promo Offer "${newOffer.code}" published live by Host!`);
    return newOffer;
  };

  // Toggle active/inactive
  const toggleOfferStatus = (offerId: string) => {
    setOffers(prev => prev.map(o => {
      if (o.id === offerId) {
        const nextState = !o.isActive;
        toast(nextState ? `Offer ${o.code} activated` : `Offer ${o.code} paused`);
        return { ...o, isActive: nextState };
      }
      return o;
    }));
  };

  // Delete offer
  const deleteOffer = (offerId: string) => {
    setOffers(prev => prev.filter(o => o.id !== offerId));
    toast.success('Offer removed successfully');
  };

  // Guest applies coupon code
  const applyCouponCode = (code: string, amount: number) => {
    const normalized = code.trim().toUpperCase();
    const found = offers.find(o => o.code.toUpperCase() === normalized && o.isActive);

    if (!found) {
      toast.error('❌ Invalid or expired coupon code!');
      return { success: false, discount: 0, message: 'Invalid or expired coupon code.' };
    }

    if (amount < found.minBookingAmount) {
      toast.error(`⚠️ Minimum booking value of ₹${found.minBookingAmount} required for this coupon.`);
      return {
        success: false,
        discount: 0,
        message: `Min booking of ₹${found.minBookingAmount} required.`
      };
    }

    let calculatedDiscount = 0;
    if (found.discountType === 'PERCENTAGE') {
      calculatedDiscount = Math.round((amount * found.discountValue) / 100);
      if (found.maxDiscountAmount && calculatedDiscount > found.maxDiscountAmount) {
        calculatedDiscount = found.maxDiscountAmount;
      }
    } else {
      calculatedDiscount = found.discountValue;
    }

    setAppliedOffer(found);
    toast.success(`🎉 Coupon "${found.code}" applied! You saved ₹${calculatedDiscount}!`);
    return {
      success: true,
      discount: calculatedDiscount,
      message: `Saved ₹${calculatedDiscount} with ${found.code}!`
    };
  };

  const removeCouponCode = () => {
    setAppliedOffer(null);
    toast('Coupon removed');
  };

  const addHostProperty = (propertyData: Omit<Listing, 'id' | 'createdAt'>): Listing => {
    const newProp: Listing = {
      ...propertyData,
      id: `prop_${Date.now()}`,
      createdAt: new Date().toISOString(),
      rating: 5.0,
      totalReviews: 1,
      isActive: true,
    };
    setProperties(prev => [newProp, ...prev]);

    // Async push to backend API
    fetch('http://localhost:5000/api/v1/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProp),
    }).catch(() => {});

    toast.success(`🏡 Flat/Property "${newProp.title}" listed live on StayEasy!`);
    return newProp;
  };

  const deleteHostProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    toast.success('Property removed from listing');
  };

  return (
    <CartContext.Provider value={{
      properties,
      addHostProperty,
      deleteHostProperty,
      foodCart,
      addToFoodCart,
      updateFoodQty,
      removeFoodItem,
      clearFoodCart,
      foodCartTotal,
      totalFoodItemsCount,
      bookings,
      addBooking,
      cancelBooking,
      orders,
      addFoodOrder,
      updateOrderStatus,
      payments,
      addPayment,
      confirmCashPayment,
      offers,
      addHostOffer,
      toggleOfferStatus,
      deleteOffer,
      appliedOffer,
      applyCouponCode,
      removeCouponCode,
      isCartDrawerOpen,
      setIsCartDrawerOpen,
      toggleCartDrawer,
      activeOrderTracker,
      setActiveOrderTracker,
      selectedBillModal,
      setSelectedBillModal,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
