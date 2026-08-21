import React, { useState } from 'react';
import { Booking, FoodOrder, Payment } from '../../types';
import { FileText, Clock, Star } from 'lucide-react';
import { ReviewModal } from '../../components/common/ReviewModal';

interface GuestViewProps {
  bookings: Booking[];
  orders: FoodOrder[];
  payments: Payment[];
  walletAmount: number;
  formatPrice: (amt: number) => string;
  onAddWalletMoney: () => void;
  onOpenBillModal: (payment: Payment) => void;
  onCancelBooking: (bookingId: string) => void;
  onOpenOrderTracker: (order: FoodOrder) => void;
}

export const GuestView: React.FC<GuestViewProps> = ({
  bookings,
  orders,
  payments,
  walletAmount,
  formatPrice,
  onAddWalletMoney,
  onOpenBillModal,
  onCancelBooking,
  onOpenOrderTracker,
}) => {
  const [reviewTarget, setReviewTarget] = useState<{ title: string; type: 'STAY' | 'FOOD' } | null>(null);

  return (
    <div className="space-y-8">
      {/* STATS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-bold block mb-1">Total Room Bookings</span>
          <div className="text-2xl font-black text-white font-heading">{bookings.length} Stays</div>
          <span className="text-[10px] text-emerald-400 mt-1 block">✓ 1 Active in Goa</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-bold block mb-1">Active Food Orders</span>
          <div className="text-2xl font-black text-orange-400 font-heading">{orders.length} Feasts</div>
          <span className="text-[10px] text-orange-300 mt-1 block">⚡ Live rider dispatch</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-bold block mb-1">StayEasy Wallet</span>
          <div className="text-2xl font-black text-amber-400 font-heading">{formatPrice(walletAmount)}</div>
          <button onClick={onAddWalletMoney} className="text-[10px] text-indigo-400 hover:underline mt-1 font-bold">
            + Add ₹1,000 via UPI
          </button>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-bold block mb-1">Anti-Scam Bills</span>
          <div className="text-2xl font-black text-emerald-400 font-heading">{payments.length} Verified</div>
          <span className="text-[10px] text-slate-500 mt-1 block">Shared ledger proof</span>
        </div>
      </div>

      {/* MY ROOM RESERVATIONS */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-black text-white font-heading">My Room Reservations</h3>
            <p className="text-xs text-slate-400">View upcoming stays, digital keys, and downloadable invoices.</p>
          </div>
        </div>

        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={b.listingImage}
                  alt={b.listingTitle}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                      {b.city}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">● {b.status}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1 font-heading">{b.listingTitle}</h4>
                  <span className="text-xs text-slate-400">
                    📅 {b.checkIn} to {b.checkOut} ({b.guestsCount} Guests) • Mode: {b.paymentMode}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-end md:self-auto">
                <div className="text-right mr-2">
                  <span className="text-base font-black text-white font-heading block">{formatPrice(b.totalAmount)}</span>
                  <span className="text-[10px] text-emerald-400">{b.paymentStatus}</span>
                </div>

                <button
                  onClick={() => setReviewTarget({ title: b.listingTitle, type: 'STAY' })}
                  className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-xs font-bold flex items-center gap-1 border border-amber-500/30"
                  title="Rate Stay"
                >
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span className="hidden sm:inline">Rate</span>
                </button>

                <button
                  onClick={() => {
                    const p = payments.find((pay) => pay.bookingId === b.id) || payments[0];
                    onOpenBillModal(p);
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                  title="Download Bill Receipt"
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Receipt</span>
                </button>

                {b.status !== 'CANCELLED' && (
                  <button
                    onClick={() => onCancelBooking(b.id)}
                    className="p-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs font-bold border border-rose-800"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MY LIVE FOOD ORDERS */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-black text-white font-heading">My Gourmet Food Orders</h3>
            <p className="text-xs text-slate-400">Track kitchen preparation, rider dispatch, and handshake invoices.</p>
          </div>
        </div>

        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-orange-950 text-orange-300 border border-orange-800">
                    #{ord.orderId}
                  </span>
                  <span className="text-xs font-extrabold text-amber-400 animate-pulse">
                    ⚡ Status: {ord.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-1 font-heading">{ord.restaurantName}</h4>
                <p className="text-xs text-slate-400">
                  {ord.items.map((i) => `${i.qty}x ${i.itemName}`).join(', ')} • ETA: {ord.estimatedTime}
                </p>
              </div>

              <div className="flex items-center gap-3 self-end md:self-auto">
                <div className="text-right">
                  <span className="text-base font-black text-orange-400 font-heading block">{formatPrice(ord.totalAmount)}</span>
                  <span className="text-[10px] text-slate-400">{ord.paymentMode}</span>
                </div>

                <button
                  onClick={() => onOpenOrderTracker(ord)}
                  className="px-4 py-2.5 rounded-xl theme-food-gradient text-white text-xs font-black shadow-lg shadow-orange-600/30 flex items-center gap-1.5"
                >
                  <Clock className="w-4 h-4" />
                  <span>Live Tracker ➔</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REVIEW MODAL */}
      {reviewTarget && (
        <ReviewModal
          isOpen={true}
          onClose={() => setReviewTarget(null)}
          targetTitle={reviewTarget.title}
          targetType={reviewTarget.type}
        />
      )}
    </div>
  );
};
