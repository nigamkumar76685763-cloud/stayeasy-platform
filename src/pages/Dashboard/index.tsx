import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useService } from '../../context/ServiceContext';
import { UserRole, Payment } from '../../types';
import toast from 'react-hot-toast';
import { GuestView } from './GuestView';
import { HostView } from './HostView';
import { AdminView } from './AdminView';
import { AddPropertyModal } from './AddPropertyModal';
import { CreateOfferModal } from './CreateOfferModal';

interface DashboardProps {
  onOpenCashModal: (payment: Payment) => void;
  onOpenBillModal: (payment: Payment) => void;
}

const REVENUE_DATA = [
  { name: 'Mon', revenue: 4200, orders: 12 },
  { name: 'Tue', revenue: 5800, orders: 18 },
  { name: 'Wed', revenue: 7100, orders: 24 },
  { name: 'Thu', revenue: 6400, orders: 19 },
  { name: 'Fri', revenue: 9800, orders: 32 },
  { name: 'Sat', revenue: 14500, orders: 48 },
  { name: 'Sun', revenue: 12200, orders: 41 },
];

export const Dashboard: React.FC<DashboardProps> = ({ onOpenCashModal, onOpenBillModal }) => {
  const { user, role, setRole } = useAuth();
  const {
    properties,
    addHostProperty,
    deleteHostProperty,
    bookings,
    cancelBooking,
    orders,
    setActiveOrderTracker,
    payments,
    offers,
    addHostOffer,
    toggleOfferStatus,
    deleteOffer,
  } = useCart();
  const { formatPrice } = useService();

  const [walletAmount, setWalletAmount] = useState<number>(user?.walletBalance || 4250);
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [isCreateOfferOpen, setIsCreateOfferOpen] = useState(false);

  const handleAddWalletMoney = () => {
    setWalletAmount((prev) => prev + 1000);
    toast.success('₹1,000 added to your StayEasy Wallet via UPI!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ROLE NAVIGATION STRIP & WELCOME */}
        <div className="glass-panel p-6 rounded-3xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={
                user?.profilePic ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
              }
              alt={user?.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shadow-lg shadow-indigo-500/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white font-heading">
                  Welcome back, {user?.name || 'Aarav Sharma'}!
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                  ✓ Verified
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Current Active Portal: <strong className="text-amber-400 uppercase">{role}</strong> • {user?.email}
              </p>
            </div>
          </div>

          {/* ROLE SWITCHER PILLS */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 self-start md:self-auto overflow-x-auto">
            {(['GUEST', 'HOST', 'RESTAURANT', 'ADMIN'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
                  role === r
                    ? r === 'GUEST'
                      ? 'theme-room-gradient text-white shadow-lg shadow-indigo-600/30'
                      : r === 'HOST'
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                      : r === 'RESTAURANT'
                      ? 'theme-food-gradient text-white shadow-lg shadow-red-600/30'
                      : 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r === 'GUEST' && '👤 Guest'}
                {r === 'HOST' && '🏨 Host'}
                {r === 'RESTAURANT' && '🍳 Kitchen'}
                {r === 'ADMIN' && '🛡️ Admin'}
              </button>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* VIEW 1: GUEST PORTAL                                           */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {role === 'GUEST' && (
          <GuestView
            bookings={bookings}
            orders={orders}
            payments={payments}
            walletAmount={walletAmount}
            formatPrice={formatPrice}
            onAddWalletMoney={handleAddWalletMoney}
            onOpenBillModal={onOpenBillModal}
            onCancelBooking={cancelBooking}
            onOpenOrderTracker={setActiveOrderTracker}
          />
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* VIEW 2: HOST PORTAL                                            */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {role === 'HOST' && (
          <HostView
            properties={properties}
            offers={offers}
            payments={payments}
            formatPrice={formatPrice}
            revenueData={REVENUE_DATA}
            onOpenAddPropertyModal={() => setIsAddPropertyOpen(true)}
            onOpenCreateOfferModal={() => setIsCreateOfferOpen(true)}
            onDeleteProperty={deleteHostProperty}
            onToggleOfferStatus={toggleOfferStatus}
            onDeleteOffer={deleteOffer}
            onOpenCashModal={onOpenCashModal}
          />
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* VIEW 3: ADMIN & RESTAURANT PORTAL                              */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {(role === 'ADMIN' || role === 'RESTAURANT') && (
          <AdminView payments={payments} formatPrice={formatPrice} />
        )}
      </div>

      {/* MODALS */}
      <AddPropertyModal
        isOpen={isAddPropertyOpen}
        onClose={() => setIsAddPropertyOpen(false)}
        onAddProperty={addHostProperty}
        userName={user?.name}
        userId={user?.id}
        userAvatar={user?.profilePic}
      />

      <CreateOfferModal
        isOpen={isCreateOfferOpen}
        onClose={() => setIsCreateOfferOpen(false)}
        onAddOffer={addHostOffer}
        userId={user?.id}
        userName={user?.name}
      />
    </div>
  );
};
