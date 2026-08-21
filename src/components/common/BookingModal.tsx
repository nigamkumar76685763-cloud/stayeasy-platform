import React, { useState } from 'react';
import { Listing } from '../../types';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useService } from '../../context/ServiceContext';
import { X, Calendar, Users, ShieldCheck, CreditCard, Banknote, Sparkles, CheckCircle2, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { UpiQrModal } from './UpiQrModal';

interface BookingModalProps {
  property: Listing | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ property, isOpen, onClose }) => {
  const { addBooking, offers, appliedOffer, applyCouponCode, removeCouponCode } = useCart();
  const { user } = useAuth();
  const { formatPrice } = useService();

  const [checkIn, setCheckIn] = useState('2026-08-25');
  const [checkOut, setCheckOut] = useState('2026-08-28');
  const [guestsCount, setGuestsCount] = useState(2);
  const [roomsCount, setRoomsCount] = useState(1);
  const [includeFood, setIncludeFood] = useState(true);
  const [paymentMode, setPaymentMode] = useState<'ONLINE' | 'OFFLINE'>('ONLINE');
  const [onlineMethod, setOnlineMethod] = useState<'UPI' | 'CARD' | 'NET_BANKING'>('UPI');
  const [isSuccess, setIsSuccess] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [showOffersList, setShowOffersList] = useState(false);
  const [isUpiQrOpen, setIsUpiQrOpen] = useState(false);

  if (!isOpen || !property) return null;

  // Nights calculation
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const nights = Math.max(1, Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));

  const baseRate = property.pricePerNight * nights * roomsCount;
  const foodPackage = includeFood ? 650 * nights * guestsCount : 0;
  const subtotal = baseRate + foodPackage;

  // Calculate Host Discount
  let discountAmount = 0;
  if (appliedOffer && subtotal >= appliedOffer.minBookingAmount) {
    if (appliedOffer.discountType === 'PERCENTAGE') {
      discountAmount = Math.round((subtotal * appliedOffer.discountValue) / 100);
      if (appliedOffer.maxDiscountAmount && discountAmount > appliedOffer.maxDiscountAmount) {
        discountAmount = appliedOffer.maxDiscountAmount;
      }
    } else {
      discountAmount = appliedOffer.discountValue;
    }
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const serviceTax = Math.round(taxableAmount * 0.12); // 12% GST
  const totalAmount = taxableAmount + serviceTax;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    addBooking({
      listingId: property.id,
      listingTitle: property.title,
      listingImage: property.images[0],
      city: property.city,
      guestId: user?.id || 'usr_guest_01',
      guestName: user?.name || 'Aarav Sharma',
      guestEmail: user?.email || 'aarav@stayeasy.com',
      guestPhone: user?.phone || '+91 98765 43210',
      checkIn,
      checkOut,
      guestsCount,
      roomsCount,
      foodOption: includeFood,
      status: 'CONFIRMED',
      totalAmount,
      paymentMode,
      paymentMethod: paymentMode === 'ONLINE' ? onlineMethod : 'OFFLINE_CASH',
      paymentStatus: paymentMode === 'OFFLINE' ? 'PENDING_OFFLINE' : 'PAID_ONLINE',
    });

    setIsSuccess(true);
    toast.success(`🎉 Reservation Confirmed for ${property.title}!`);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* BACKDROP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl"
        />

        {/* MODAL BODY */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {!isSuccess ? (
            <div>
              {/* HEADER WITH PROPERTY PREVIEW & INDIAN LOCATION */}
              <div className="flex items-center gap-4 pb-5 border-b border-slate-800 mb-6">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-20 h-20 rounded-2xl object-cover border border-slate-700"
                />
                <div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 uppercase tracking-wider">
                    {property.category} • {property.city}, {property.state}
                  </span>
                  <h2 className="text-lg font-bold text-white font-heading mt-1">
                    {property.title}
                  </h2>
                  <p className="text-xs text-amber-400 font-semibold mt-0.5">
                    📍 {property.landmark || property.address}
                  </p>
                </div>
              </div>

              {/* BOOKING PREFERENCES FORM */}
              <form onSubmit={handleConfirm} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/80">
                    <label className="text-[11px] font-bold text-slate-400 block mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Check-In Date</span>
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500 font-semibold"
                      required
                    />
                  </div>

                  <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/80">
                    <label className="text-[11px] font-bold text-slate-400 block mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Check-Out Date</span>
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500 font-semibold"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/80">
                    <label className="text-[11px] font-bold text-slate-400 block mb-1 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Guests</span>
                    </label>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500 font-semibold"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/80">
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Rooms</label>
                    <select
                      value={roomsCount}
                      onChange={(e) => setRoomsCount(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500 font-semibold"
                    >
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* IN-ROOM DINING ADD-ON */}
                <label className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-orange-950/40 to-slate-800/60 border border-orange-900/40 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🍛</span>
                    <div>
                      <strong className="text-xs text-white block">Include Indian Gourmet Breakfast & Thali (₹650/day)</strong>
                      <span className="text-[11px] text-orange-300">Fresh breakfast & Royal Awadhi/Rajasthani dinner in-room</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeFood}
                    onChange={(e) => setIncludeFood(e.target.checked)}
                    className="w-5 h-5 accent-orange-500 rounded cursor-pointer"
                  />
                </label>

                {/* PAYMENT METHOD TOGGLE (ONLINE VS OFFLINE) */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-2">Payment Mode</label>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMode('ONLINE')}
                      className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
                        paymentMode === 'ONLINE'
                          ? 'bg-indigo-950/90 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-500'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-indigo-400" />
                      <div className="text-left">
                        <strong className="text-xs block">🌐 Online Payment</strong>
                        <span className="text-[10px] text-indigo-300/80">UPI / Card / NetBanking</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMode('OFFLINE')}
                      className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
                        paymentMode === 'OFFLINE'
                          ? 'bg-amber-950/90 border-amber-500 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-500'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Banknote className="w-5 h-5 text-amber-400" />
                      <div className="text-left">
                        <strong className="text-xs block">🏨 Offline Payment</strong>
                        <span className="text-[10px] text-amber-300/80">Cash on Arrival Only</span>
                      </div>
                    </button>
                  </div>

                  {/* ONLINE SUB-METHODS (UPI, CARD, NET BANKING) */}
                  {paymentMode === 'ONLINE' ? (
                    <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 space-y-2">
                      <span className="text-[10px] font-bold uppercase text-indigo-300 block">Select Online Method</span>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setOnlineMethod('UPI')}
                          className={`p-2 rounded-xl text-center text-xs font-bold transition-all ${
                            onlineMethod === 'UPI'
                              ? 'bg-indigo-600 text-white shadow-md'
                              : 'bg-slate-900 text-slate-300 border border-slate-700'
                          }`}
                        >
                          ⚡ UPI (GPay/PhonePe)
                        </button>
                        <button
                          type="button"
                          onClick={() => setOnlineMethod('CARD')}
                          className={`p-2 rounded-xl text-center text-xs font-bold transition-all ${
                            onlineMethod === 'CARD'
                              ? 'bg-indigo-600 text-white shadow-md'
                              : 'bg-slate-900 text-slate-300 border border-slate-700'
                          }`}
                        >
                          💳 Card (RuPay/Visa)
                        </button>
                        <button
                          type="button"
                          onClick={() => setOnlineMethod('NET_BANKING')}
                          className={`p-2 rounded-xl text-center text-xs font-bold transition-all ${
                            onlineMethod === 'NET_BANKING'
                              ? 'bg-indigo-600 text-white shadow-md'
                              : 'bg-slate-900 text-slate-300 border border-slate-700'
                          }`}
                        >
                          🏦 Net Banking (SBI/HDFC)
                        </button>
                      </div>

                      {onlineMethod === 'UPI' && (
                        <button
                          type="button"
                          onClick={() => setIsUpiQrOpen(true)}
                          className="w-full mt-2 py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-black flex items-center justify-center gap-2 transition-all shadow-sm"
                        >
                          <QrCode className="w-4 h-4 text-amber-400" />
                          <span>📱 Scan & Pay via Dynamic UPI QR Code ({formatPrice(totalAmount)})</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    /* OFFLINE CASH ON ARRIVAL NOTICE */
                    <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200/90 flex items-center gap-2">
                      <span className="text-base">💵</span>
                      <span>Pay in cash (₹500 / ₹200 / ₹100 notes) directly to host upon arrival with digital bill handshake.</span>
                    </div>
                  )}
                </div>

                {/* HOST PROMO CODE & COUPON INPUT */}
                <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/80">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                      <span className="text-amber-400">🎁</span>
                      <span>Have a Host Promo Code / Coupon?</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowOffersList(prev => !prev)}
                      className="text-[11px] font-bold text-amber-400 hover:underline"
                    >
                      {showOffersList ? 'Hide Deals ▲' : 'View Host Deals ▼'}
                    </button>
                  </div>

                  {appliedOffer ? (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700 text-xs">
                      <div>
                        <strong className="text-emerald-300 block">✓ Applied: {appliedOffer.code} ({appliedOffer.title})</strong>
                        <span className="text-[11px] text-emerald-400">Discount: -{formatPrice(discountAmount)}</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeCouponCode}
                        className="px-2.5 py-1 rounded-lg bg-red-950 text-red-300 border border-red-800 text-[10px] font-bold hover:bg-red-900"
                      >
                        Remove ✕
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code e.g. DIWALI25, FIRSTSTAY15"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-amber-400 outline-none uppercase placeholder-slate-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!couponInput) return;
                          applyCouponCode(couponInput, subtotal);
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md shadow-amber-500/20"
                      >
                        Apply
                      </button>
                    </div>
                  )}

                  {/* ACTIVE OFFERS LIST ACCORDION */}
                  {showOffersList && (
                    <div className="mt-3 pt-3 border-t border-slate-700/80 space-y-2 max-h-40 overflow-y-auto">
                      {offers.filter(o => o.isActive).map(offer => (
                        <div
                          key={offer.id}
                          onClick={() => {
                            setCouponInput(offer.code);
                            applyCouponCode(offer.code, subtotal);
                          }}
                          className="p-2 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-amber-500 cursor-pointer flex items-center justify-between text-xs transition-all"
                        >
                          <div>
                            <span className="font-mono font-bold text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-amber-500/40 text-[10px]">
                              {offer.code}
                            </span>
                            <span className="text-slate-300 ml-2 text-[11px] font-semibold">{offer.title}</span>
                          </div>
                          <span className="text-[10px] font-black text-emerald-400">
                            {offer.discountType === 'PERCENTAGE' ? `${offer.discountValue}% OFF` : `₹${offer.discountValue} OFF`}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* GST & PRICE BREAKDOWN */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>{formatPrice(property.pricePerNight)} × {nights} Night{nights > 1 ? 's' : ''} ({roomsCount} Room)</span>
                    <strong className="text-slate-200">{formatPrice(baseRate)}</strong>
                  </div>
                  {includeFood && (
                    <div className="flex justify-between text-slate-400">
                      <span>Indian In-Room Dining Pass</span>
                      <strong className="text-slate-200">{formatPrice(foodPackage)}</strong>
                    </div>
                  )}
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>🎉 Host Discount ({appliedOffer?.code})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>GST (12% - CGST 6% + SGST 6%)</span>
                    <strong className="text-slate-200">{formatPrice(serviceTax)}</strong>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-bold">
                    <span className="text-white">Total Payable Amount</span>
                    <span className="text-lg font-black text-amber-400 font-heading">{formatPrice(totalAmount)}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 block pt-1">
                    ✓ Mandatory Govt ID / Aadhaar verification at check-in
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full theme-room-gradient text-white py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Confirm Reservation ({formatPrice(totalAmount)})</span>
                </button>
              </form>
            </div>
          ) : (
            /* SUCCESS CONFIRMATION STATE */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800">
                BOOKING CONFIRMED ✓
              </span>
              <h2 className="text-2xl font-black text-white font-heading mt-2">
                Your Luxury Stay is Locked In!
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-2 mb-6">
                Thank you, <strong className="text-white">{user?.name || 'Aarav Sharma'}</strong>. Your reservation at <strong className="text-white">{property.title}</strong> has been saved. Host <strong className="text-white">{property.hostName}</strong> has been notified.
              </p>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left text-xs space-y-1.5 mb-6 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500">Dates:</span>
                  <strong className="text-slate-200">{checkIn} to {checkOut} ({nights} nights)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Guests:</span>
                  <strong className="text-slate-200">{guestsCount} Guests • {roomsCount} Room</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Status:</span>
                  <strong className="text-amber-400">{paymentMode === 'OFFLINE' ? 'Pending Offline Cash Handshake' : 'Paid Online (256-Bit SSL)'}</strong>
                </div>
              </div>

              <div className="flex gap-3 max-w-md mx-auto">
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700"
                >
                  Close
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 rounded-xl theme-room-gradient text-white font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  View in My Bookings
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>

      <UpiQrModal
        isOpen={isUpiQrOpen}
        onClose={() => setIsUpiQrOpen(false)}
        amount={totalAmount}
        orderTitle={`Booking: ${property.title} (${nights} nights)`}
        onPaymentSuccess={() => {
          addBooking({
            listingId: property.id,
            listingTitle: property.title,
            listingImage: property.images[0],
            city: property.city,
            guestId: user?.id || 'usr_guest_01',
            guestName: user?.name || 'Aarav Sharma',
            guestEmail: user?.email || 'aarav@stayeasy.com',
            guestPhone: user?.phone || '+91 98765 43210',
            checkIn,
            checkOut,
            guestsCount,
            roomsCount,
            foodOption: includeFood,
            status: 'CONFIRMED',
            totalAmount,
            paymentMode: 'ONLINE',
            paymentMethod: 'UPI',
            paymentStatus: 'PAID_ONLINE',
          });
          setIsSuccess(true);
        }}
      />
    </AnimatePresence>
  );
};
