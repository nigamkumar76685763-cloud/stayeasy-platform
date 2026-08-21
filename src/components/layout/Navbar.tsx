import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useService } from '../../context/ServiceContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { 
  Building2, 
  UtensilsCrossed, 
  ShoppingBag, 
  Heart, 
  User as UserIcon, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Zap,
  Menu,
  X,
  Compass,
  Gift,
  Wallet,
  Receipt,
  PhoneCall,
  ChevronRight,
  MapPin,
  Clock,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

interface NavbarProps {
  onOpenRoleModal: () => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRoleModal, onOpenAuthModal }) => {
  const { service, setService } = useService();
  const { user, role, isAuthenticated, logout } = useAuth();
  const { totalFoodItemsCount, toggleCartDrawer } = useCart();
  const location = useLocation();

  const isRoom = service === 'ROOM';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Bomb Blast Confetti / Firecracker Explosion Function
  const triggerBombBlast = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: 0.2, y: 0.2 },
      colors: ['#FF4500', '#FFD700', '#FF1493', '#00FFFF', '#7C3AED'],
    });
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: 0.8, y: 0.2 },
      colors: ['#FF4500', '#FFD700', '#FF1493', '#00FFFF', '#7C3AED'],
    });
    confetti({
      particleCount: 120,
      spread: 120,
      origin: { x: 0.5, y: 0.1 },
      colors: ['#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#00BFFF', '#9932CC'],
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerBombBlast();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleBombClick = () => {
    triggerBombBlast();
    toast.success('💣 BOOM! Mega Festive Offer Activated: Use Code DIWALI25 for Flat 25% OFF!', {
      icon: '💥',
      duration: 4000,
    });
  };

  const copyPromoCode = () => {
    navigator.clipboard.writeText('DIWALI25');
    toast.success('Promo Code DIWALI25 Copied! Enjoy 25% OFF 🪔', {
      icon: '🎉',
    });
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-2xl bg-[#070B14]/85 border-b border-slate-800/80 transition-all duration-300">
      
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* EXPLOSIVE BOMB BLAST OFFER TOP STRIP                           */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-950 via-amber-950 to-orange-950 border-b border-amber-500/40 py-2 px-4 shadow-lg shadow-amber-500/10">
        
        {/* BACKGROUND GLOW PULSE */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-amber-500/20 to-orange-600/10 animate-pulse pointer-events-none" />

        <div className="max-w-7xl mx-auto flex items-center justify-center relative z-10">
          <motion.div
            onClick={handleBombClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer group flex items-center gap-2.5 sm:gap-4 px-4 py-1 rounded-full bg-[#070B14]/90 border border-amber-400/60 shadow-xl shadow-red-500/20 hover:border-amber-300 transition-all"
          >
            <motion.span
              animate={{
                scale: [1, 1.35, 1],
                rotate: [0, -12, 12, -8, 8, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
              }}
              className="text-lg sm:text-xl drop-shadow-[0_0_12px_rgba(255,100,0,0.8)]"
            >
              💣
            </motion.span>

            {/* BLAZING DHAMAKA TAG */}
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-slate-950 font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-md animate-bounce">
                💥 DHAMAKA BLAST
              </span>

              <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide flex items-center gap-1.5">
                <span>FLAT 25% OFF LIVE!</span>
                <span className="hidden md:inline text-amber-300 font-mono bg-slate-900 px-2 py-0.5 rounded border border-amber-500/40">
                  CODE: DIWALI25
                </span>
              </span>
            </div>

            {/* SPARK BLAST BADGE */}
            <span className="text-xs font-black text-amber-400 group-hover:text-amber-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span className="hidden sm:inline">Tap to Explode 🧨</span>
            </span>
          </motion.div>
        </div>
      </div>

      {/* MAIN NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* LEFT: BRAND LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-lg transition-all duration-300 group-hover:scale-105 ${
            isRoom ? 'theme-room-gradient shadow-indigo-500/30' : 'theme-food-gradient shadow-red-500/30'
          }`}>
            {isRoom ? '🏨' : '🍛'}
          </div>
          <div>
            <div className="text-2xl font-black tracking-tight font-heading flex items-center gap-1">
              <span>Stay</span>
              <span className={isRoom ? 'text-indigo-400' : 'text-orange-500'}>Easy</span>
            </div>
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400 block -mt-1">
              {isRoom ? 'Luxury Rooms & Suites' : 'Gourmet Food Delivery'}
            </span>
          </div>
        </Link>

        {/* ── KEY FEATURE: SERVICE SLIDER TOGGLE ── */}
        <div className="hidden md:flex p-1 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-lg shadow-black/40 relative">
          <button
            onClick={() => setService('ROOM')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-300 relative z-10 ${
              isRoom ? 'text-white shadow-lg shadow-indigo-600/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isRoom && (
              <motion.div
                layoutId="servicePill"
                className="absolute inset-0 theme-room-gradient rounded-full -z-10"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <Building2 className="w-3.5 h-3.5" />
            <span>Rooms & Stays</span>
          </button>

          <button
            onClick={() => setService('FOOD')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-300 relative z-10 ${
              !isRoom ? 'text-white shadow-lg shadow-orange-600/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            {!isRoom && (
              <motion.div
                layoutId="servicePill"
                className="absolute inset-0 theme-food-gradient rounded-full -z-10"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Food Delivery</span>
          </button>
        </div>

        {/* RIGHT ACTIONS: CART + AUTH + UNIFIED MENU BUTTON */}
        <div className="flex items-center gap-3">
          
          {/* CART DRAWER BUTTON */}
          <button
            onClick={toggleCartDrawer}
            className="relative p-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/90 text-slate-300 hover:text-white hover:border-slate-500 transition-all flex items-center justify-center shadow-md"
            title="Open Meal Cart"
          >
            <ShoppingBag className="w-5 h-5 text-orange-400" />
            {totalFoodItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white text-[11px] font-extrabold flex items-center justify-center shadow-lg shadow-red-600/50 animate-bounce">
                {totalFoodItemsCount}
              </span>
            )}
          </button>

          {/* AUTH / PROFILE BUTTON */}
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/90 hover:border-slate-500 text-xs font-bold text-white transition-all shadow-md"
          >
            {user?.profilePic ? (
              <img src={user.profilePic} alt={user.name} className="w-5 h-5 rounded-full object-cover border border-indigo-400" />
            ) : (
              <UserIcon className="w-4 h-4 text-indigo-400" />
            )}
            <span className="hidden sm:inline">{isAuthenticated ? user?.name.split(' ')[0] : 'Sign In'}</span>
          </button>

          {/* 🌟 UNIFIED MENU BUTTON (Clean & Prominent) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-black transition-all shadow-lg ${
              isMenuOpen 
                ? 'bg-indigo-600 border-indigo-400 text-white shadow-indigo-600/50 scale-105' 
                : 'bg-gradient-to-r from-slate-900 to-indigo-950/80 border-indigo-500/40 text-indigo-200 hover:text-white hover:border-indigo-400 shadow-indigo-950/40'
            }`}
            title="Open Main Menu"
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4 text-amber-400" />}
            <span className="font-heading tracking-wide">{isMenuOpen ? 'Close' : 'Menu'}</span>
          </button>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 🌟 UNIFIED ZERO-DUPLICATION MEGA MENU HUB                      */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* BACKDROP OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 top-[116px] bg-slate-950/80 backdrop-blur-md z-40"
            />

            {/* MEGA MENU CONTAINER */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed top-[116px] left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-50 pointer-events-auto"
            >
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/40 shadow-2xl shadow-black/90 max-h-[82vh] overflow-y-auto">
                
                {/* MENU TOP BAR */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-700/80 mb-6 flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl theme-room-gradient flex items-center justify-center text-lg shadow-md">
                      ✨
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
                        StayEasy Navigation & Feature Hub
                      </h3>
                      <p className="text-xs text-slate-300">
                        Everything in one unified place — explore stays, cuisines, offers, wallet & concierge.
                      </p>
                    </div>
                  </div>

                  {/* QUICK ROLE BADGE IN HEADER */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => { setIsMenuOpen(false); onOpenRoleModal(); }}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 border border-amber-500/40 text-xs font-bold text-amber-300 hover:border-amber-400 transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span>Active Role: <strong className="text-white uppercase">{role}</strong></span>
                      <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">Switch</span>
                    </button>

                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
                      title="Close Menu"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* 4 UNIFIED CATEGORY COLUMNS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* COLUMN 1: MAIN PAGES & CORE DISCOVERY */}
                  <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 transition-all">
                    <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-sm mb-4">
                      <Compass className="w-5 h-5" />
                      <span>Core Navigation</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li>
                        <Link 
                          to="/" 
                          onClick={() => setIsMenuOpen(false)} 
                          className={`flex items-center justify-between p-2.5 rounded-xl transition-all ${
                            location.pathname === '/' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800/80 hover:text-white'
                          }`}
                        >
                          <span>🏠 Home (Dual Experience)</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/rooms" 
                          onClick={() => setIsMenuOpen(false)} 
                          className={`flex items-center justify-between p-2.5 rounded-xl transition-all ${
                            location.pathname === '/rooms' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800/80 hover:text-white'
                          }`}
                        >
                          <span>🏨 Luxury Stays & Suites</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/food" 
                          onClick={() => setIsMenuOpen(false)} 
                          className={`flex items-center justify-between p-2.5 rounded-xl transition-all ${
                            location.pathname === '/food' ? 'bg-orange-600 text-white font-bold' : 'hover:bg-slate-800/80 hover:text-white'
                          }`}
                        >
                          <span>🍛 Gourmet Food Delivery</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/offers" 
                          onClick={() => setIsMenuOpen(false)} 
                          className={`flex items-center justify-between p-2.5 rounded-xl transition-all ${
                            location.pathname === '/offers' ? 'bg-amber-600 text-white font-bold' : 'hover:bg-slate-800/80 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>🪔 Festive Offers Hub</span>
                            <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.2 rounded font-black">25% OFF</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/dashboard" 
                          onClick={() => setIsMenuOpen(false)} 
                          className={`flex items-center justify-between p-2.5 rounded-xl transition-all ${
                            location.pathname.startsWith('/dashboard') ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800/80 hover:text-white'
                          }`}
                        >
                          <span>📊 My Bookings & Orders</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* COLUMN 2: TOP DESTINATION STAYS */}
                  <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 transition-all">
                    <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-sm mb-4">
                      <Building2 className="w-5 h-5" />
                      <span>Signature Stays</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li>
                        <Link to="/rooms" onClick={() => setIsMenuOpen(false)} className="hover:text-white flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/70 transition-all">
                          <div>
                            <strong className="block text-white">Candolim Oceanview Suite</strong>
                            <span className="text-[11px] text-slate-400">Goa • ₹6,500/night</span>
                          </div>
                          <span className="text-amber-400 font-bold">⭐ 4.96</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/rooms" onClick={() => setIsMenuOpen(false)} className="hover:text-white flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/70 transition-all">
                          <div>
                            <strong className="block text-white">Sea-Facing Royal Penthouse</strong>
                            <span className="text-[11px] text-slate-400">Worli, Mumbai • ₹9,800/night</span>
                          </div>
                          <span className="text-amber-400 font-bold">⭐ 4.99</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/rooms" onClick={() => setIsMenuOpen(false)} className="hover:text-white flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/70 transition-all">
                          <div>
                            <strong className="block text-white">Heritage Rajputana Haveli</strong>
                            <span className="text-[11px] text-slate-400">Civil Lines, Jaipur • ₹5,200/night</span>
                          </div>
                          <span className="text-amber-400 font-bold">⭐ 4.94</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* COLUMN 3: GOURMET EXPRESS DINING */}
                  <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-orange-500/50 transition-all">
                    <div className="flex items-center gap-2 text-orange-400 font-extrabold text-sm mb-4">
                      <UtensilsCrossed className="w-5 h-5" />
                      <span>Gourmet Cuisines</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li>
                        <Link to="/food" onClick={() => setIsMenuOpen(false)} className="hover:text-white flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/70 transition-all">
                          <div>
                            <strong className="block text-white">Royal Awadhi Gosht Biryani</strong>
                            <span className="text-[11px] text-slate-400">Dum Pukht • 25 mins</span>
                          </div>
                          <span className="text-gradient-gold font-bold">₹680</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/food" onClick={() => setIsMenuOpen(false)} className="hover:text-white flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/70 transition-all">
                          <div>
                            <strong className="block text-white">Artisan Truffle Smash Burger</strong>
                            <span className="text-[11px] text-slate-400">The Burger Club • 20 mins</span>
                          </div>
                          <span className="text-gradient-gold font-bold">₹390</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/food" onClick={() => setIsMenuOpen(false)} className="hover:text-white flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/70 transition-all">
                          <div>
                            <strong className="block text-white">Royal Rajasthani Thali</strong>
                            <span className="text-[11px] text-emerald-400">Pure Veg 🟢 • 30 mins</span>
                          </div>
                          <span className="text-gradient-gold font-bold">₹540</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* COLUMN 4: PROMO CODE, WALLET & CONCIERGE */}
                  <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 transition-all">
                    <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm mb-4">
                      <Gift className="w-5 h-5" />
                      <span>Wallet & Concierge</span>
                    </div>
                    <div className="space-y-3">
                      
                      {/* PROMO CODE CARD */}
                      <div 
                        onClick={copyPromoCode} 
                        className="cursor-pointer p-3 rounded-xl bg-amber-950/50 border border-amber-500/40 text-amber-300 hover:border-amber-300 transition-all flex items-center justify-between"
                      >
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Festive Promo</span>
                          <strong className="text-xs font-mono font-bold text-amber-200">DIWALI25 (25% OFF)</strong>
                        </div>
                        <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-lg font-black shadow-sm">
                          COPY
                        </span>
                      </div>

                      {/* WALLET SHORTCUT */}
                      <Link 
                        to="/dashboard" 
                        onClick={() => setIsMenuOpen(false)}
                        className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-between text-xs text-slate-200"
                      >
                        <div className="flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-emerald-400" />
                          <span>Instant UPI Wallet</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-bold">Top-up ➔</span>
                      </Link>

                      {/* CONCIERGE CALL */}
                      <a 
                        href="tel:+918000123456" 
                        className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-between text-xs text-slate-200"
                      >
                        <div className="flex items-center gap-2">
                          <PhoneCall className="w-4 h-4 text-indigo-400" />
                          <span>24/7 Concierge Support</span>
                        </div>
                        <span className="text-[10px] text-indigo-400 font-bold">Call ➔</span>
                      </a>

                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </header>
  );
};

