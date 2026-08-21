import React from 'react';
import { Listing, Offer, Payment } from '../../types';
import { Plus, Trash2, ShieldCheck } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface HostViewProps {
  properties: Listing[];
  offers: Offer[];
  payments: Payment[];
  formatPrice: (amt: number) => string;
  revenueData: Array<{ name: string; revenue: number; orders: number }>;
  onOpenAddPropertyModal: () => void;
  onOpenCreateOfferModal: () => void;
  onDeleteProperty: (id: string) => void;
  onToggleOfferStatus: (id: string) => void;
  onDeleteOffer: (id: string) => void;
  onOpenCashModal: (payment: Payment) => void;
}

export const HostView: React.FC<HostViewProps> = ({
  properties,
  offers,
  payments,
  formatPrice,
  revenueData,
  onOpenAddPropertyModal,
  onOpenCreateOfferModal,
  onDeleteProperty,
  onToggleOfferStatus,
  onDeleteOffer,
  onOpenCashModal,
}) => {
  return (
    <div className="space-y-8">
      {/* STATS STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-bold block mb-1">Managed Properties</span>
          <div className="text-2xl font-black text-amber-400 font-heading">{properties.length} Units</div>
          <span className="text-[10px] text-emerald-400 mt-1 block">✓ 100% Verified</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-bold block mb-1">Pending Offline Handshakes</span>
          <div className="text-2xl font-black text-amber-300 font-heading">
            {payments.filter((p) => p.status === 'PENDING_OFFLINE').length} Action Required
          </div>
          <span className="text-[10px] text-amber-400 mt-1 block">Anti-Scam Note Protocol</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-bold block mb-1">Host Monthly Revenue</span>
          <div className="text-2xl font-black text-emerald-400 font-heading">{formatPrice(124800)}</div>
          <span className="text-[10px] text-emerald-400 mt-1 block">+18.4% vs last month</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-bold block mb-1">Superhost Rating</span>
          <div className="text-2xl font-black text-white font-heading">⭐ 4.98 / 5.0</div>
          <span className="text-[10px] text-slate-400 mt-1 block">312 Verified Guest Reviews</span>
        </div>
      </div>

      {/* REVENUE CHART */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl">
        <h3 className="text-xl font-black text-white font-heading mb-1">Weekly Host Earnings & Booking Volume</h3>
        <p className="text-xs text-slate-400 mb-6">
          Real-time revenue settled directly via online escrow and anti-scam cash handshakes.
        </p>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="hostRevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#64748B" textAnchor="middle" />
              <YAxis stroke="#64748B" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px' }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#F59E0B"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#hostRevGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🏢 HOST MANAGED PROPERTIES & FLATS MANAGER */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-black uppercase text-amber-400 block mb-0.5">PORTFOLIO INVENTORY</span>
            <h3 className="text-xl font-black text-white font-heading">Host Managed Flats & Luxury Stays</h3>
            <p className="text-xs text-slate-400">
              List your apartment, luxury flat, or villa to start receiving verified reservations.
            </p>
          </div>

          <button
            onClick={onOpenAddPropertyModal}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 text-white font-black text-xs shadow-xl shadow-indigo-500/30 flex items-center gap-2 self-start sm:self-auto transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ List New Flat / Property</span>
          </button>
        </div>

        {/* PROPERTIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="relative rounded-xl overflow-hidden aspect-video mb-3 bg-slate-950">
                  <img
                    src={p.images[0] || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-black text-amber-300 border border-amber-500/30">
                    👑 {p.category.toUpperCase()}
                  </span>
                  <span className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-bold text-slate-200">
                    📍 {p.city}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white font-heading line-clamp-1 mb-1">{p.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">{p.description}</p>

                <div className="flex items-center gap-2 text-[11px] text-slate-300 font-semibold mb-3">
                  <span>👥 {p.maxGuests} Guests</span>
                  <span>•</span>
                  <span>🛏️ {p.bedrooms} Beds</span>
                  <span>•</span>
                  <span>🚿 {p.bathrooms} Baths</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-base font-black text-gradient-gold font-heading block">
                    {formatPrice(p.pricePerNight)}
                  </span>
                  <span className="text-[10px] text-slate-400">per night</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded-lg border border-emerald-800">
                    ● Active
                  </span>
                  <button
                    onClick={() => onDeleteProperty(p.id)}
                    className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs border border-rose-800"
                    title="Unlist Property"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HOST OFFERS & DISCOUNT PROMO ENGINE */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-black uppercase text-amber-400 block mb-0.5">DIRECT HOST MARKETING</span>
            <h3 className="text-xl font-black text-white font-heading">Host Promo Codes & Discount Offers</h3>
            <p className="text-xs text-slate-400">
              Set custom seasonal discounts, festive promo codes, and minimum booking rules for your properties.
            </p>
          </div>

          <button
            onClick={onOpenCreateOfferModal}
            className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 self-start sm:self-auto transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Offer</span>
          </button>
        </div>

        {/* OFFERS LIST TABLE */}
        <div className="space-y-3">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                offer.isActive
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-slate-900/40 border-slate-800/40 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-black text-xs">
                    {offer.code}
                  </span>
                  <h4 className="text-sm font-bold text-white font-heading">{offer.title}</h4>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      offer.isActive
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {offer.isActive ? '● Live on Platform' : '⏸️ Paused'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{offer.description}</p>
                <div className="flex flex-wrap gap-3 text-[11px] text-slate-400 mt-2">
                  <span>
                    💰 Discount:{' '}
                    <strong className="text-emerald-400">
                      {offer.discountType === 'PERCENTAGE' ? `${offer.discountValue}% OFF` : `₹${offer.discountValue} FLAT`}
                    </strong>
                  </span>
                  <span>•</span>
                  <span>
                    Min Booking: <strong className="text-slate-200">{formatPrice(offer.minBookingAmount)}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Valid Till: <strong className="text-slate-200">{offer.validTill}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Used by: <strong className="text-amber-400">{offer.usageCount} Guests</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto">
                <button
                  onClick={() => onToggleOfferStatus(offer.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    offer.isActive
                      ? 'bg-slate-800 hover:bg-slate-700 text-amber-400'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}
                >
                  {offer.isActive ? 'Pause Offer' : 'Activate Live'}
                </button>

                <button
                  onClick={() => onDeleteOffer(offer.id)}
                  className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs border border-rose-800"
                  title="Delete Offer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OFFLINE CASH HANDSHAKE VERIFICATION MANAGER */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-black uppercase text-amber-400 block mb-0.5">ANTI-SCAM SYSTEM</span>
            <h3 className="text-xl font-black text-white font-heading">Pending Offline Cash Handshakes</h3>
          </div>
        </div>

        <div className="space-y-4">
          {payments
            .filter((p) => p.mode === 'OFFLINE')
            .map((pay) => (
              <div
                key={pay.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-amber-400 font-mono">{pay.billId}</span>
                    <span className="text-xs font-bold text-slate-300">Guest: {pay.paidBy}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{pay.itemTitle}</p>
                  <span className="text-[11px] text-amber-300 font-bold">
                    Declared Amount: {formatPrice(pay.amount)} (Offline Cash)
                  </span>
                </div>

                <button
                  onClick={() => onOpenCashModal(pay)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs shadow-lg shadow-amber-600/30 flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Count & Verify Notes ➔</span>
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
