import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ServiceProvider } from './context/ServiceContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { Home } from './pages/Home';
import { RoomsListing } from './pages/Rooms/Listing';
import { FoodListing } from './pages/Food/Listing';
import { OffersPage } from './pages/OffersPage';
import { Dashboard } from './pages/Dashboard';

import { RoleSelectorModal } from './components/common/RoleSelectorModal';
import { AuthModal } from './components/common/AuthModal';
import { BookingModal } from './components/common/BookingModal';
import { OrderTrackerModal } from './components/common/OrderTrackerModal';
import { CashDenominationModal } from './components/common/CashDenominationModal';
import { BillReceiptModal } from './components/common/BillReceiptModal';

import { Listing, Payment } from './types';
import { Toaster } from 'react-hot-toast';

const AppContent: React.FC = () => {
  const { activeOrderTracker, setActiveOrderTracker, selectedBillModal, setSelectedBillModal } = useCart();

  // Modals state
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedPropertyForBooking, setSelectedPropertyForBooking] = useState<Listing | null>(null);
  const [selectedCashPaymentForHandshake, setSelectedCashPaymentForHandshake] = useState<Payment | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0F172A',
            color: '#FFFFFF',
            border: '1px solid #334155',
            borderRadius: '16px',
            fontSize: '13px',
            fontWeight: 'bold',
          },
        }}
      />

      {/* TOP NAVBAR WITH DUAL SERVICE SLIDER & ROLE SWITCHER */}
      <Navbar
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* MAIN ROUTES */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onOpenBooking={(p) => setSelectedPropertyForBooking(p)}
                onOpenAuth={() => setIsAuthModalOpen(true)}
              />
            }
          />
          <Route
            path="/rooms"
            element={<RoomsListing onOpenBooking={(p) => setSelectedPropertyForBooking(p)} />}
          />
          <Route
            path="/food"
            element={<FoodListing />}
          />
          <Route
            path="/offers"
            element={<OffersPage />}
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                onOpenCashModal={(p) => setSelectedCashPaymentForHandshake(p)}
                onOpenBillModal={(p) => setSelectedBillModal(p)}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* UNIFIED SLIDE-OVER MEAL & BOOKING CART DRAWER */}
      <CartDrawer />

      {/* ALL INTERACTIVE MODALS */}
      <RoleSelectorModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <BookingModal
        property={selectedPropertyForBooking}
        isOpen={!!selectedPropertyForBooking}
        onClose={() => setSelectedPropertyForBooking(null)}
      />

      <OrderTrackerModal
        order={activeOrderTracker}
        isOpen={!!activeOrderTracker}
        onClose={() => setActiveOrderTracker(null)}
      />

      <CashDenominationModal
        payment={selectedCashPaymentForHandshake}
        isOpen={!!selectedCashPaymentForHandshake}
        onClose={() => setSelectedCashPaymentForHandshake(null)}
      />

      <BillReceiptModal
        payment={selectedBillModal}
        isOpen={!!selectedBillModal}
        onClose={() => setSelectedBillModal(null)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ServiceProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </AuthProvider>
    </ServiceProvider>
  );
};

export default App;
