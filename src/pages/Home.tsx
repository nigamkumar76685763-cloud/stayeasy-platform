import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  UtensilsCrossed, 
  MapPin, 
  Star, 
  Clock, 
  Compass, 
  ChevronRight, 
  Heart, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Search,
  Plus,
  Zap,
  ChevronLeft,
  Users
} from 'lucide-react';
import { useService } from '../context/ServiceContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { MOCK_PROPERTIES, MOCK_RESTAURANTS, MOCK_FOOD_ITEMS } from '../data/mockData';
import { Listing } from '../types';
import { IndiaLocationMap } from '../components/room/IndiaLocationMap';
import { motion, AnimatePresence } from 'framer-motion';

interface HomeProps {
  onOpenBooking: (property: Listing) => void;
  onOpenAuth: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenBooking, onOpenAuth }) => {
  const { service, setService, formatPrice } = useService();
  const { addToFoodCart, setIsCartDrawerOpen, toggleCartDrawer } = useCart();
  const { user, toggleFavoriteProperty, toggleFavoriteFood } = useAuth();

  const isRoom = service === 'ROOM';

  // Slider State (Auto-play every 5s)
  const [activeSlide, setActiveSlide] = useState<number>(isRoom ? 0 : 1);

  // Sync activeSlide when service changes from navbar
  useEffect(() => {
    setActiveSlide(service === 'ROOM' ? 0 : 1);
  }, [service]);

  // Handle slide change manually
  const handleSlideChange = (slideIndex: number) => {
    setActiveSlide(slideIndex);
    setService(slideIndex === 0 ? 'ROOM' : 'FOOD');
  };

  // Search filter states
  const [cityFilter, setCityFilter] = useState('All');
  const [foodCategory, setFoodCategory] = useState('All');

  const filteredProperties = cityFilter === 'All'
    ? MOCK_PROPERTIES
    : MOCK_PROPERTIES.filter(p => p.city.toLowerCase() === cityFilter.toLowerCase());

  const filteredFood = foodCategory === 'All'
    ? MOCK_FOOD_ITEMS
    : MOCK_FOOD_ITEMS.filter(f => f.category.toLowerCase() === foodCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 relative overflow-hidden">
      {/* 🌟 VIBRANT AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-ambient-glow" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-ambient-glow" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-ambient-glow" style={{ animationDelay: '8s' }} />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 1. KEY FEATURE: HERO SLIDER (DUAL ROOM / FOOD CAROUSEL)        */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center overflow-hidden">
        
        {/* SLIDE BACKGROUNDS WITH PARALLAX & GRADIENT OVERLAYS */}
        <AnimatePresence mode="wait">
          {activeSlide === 0 ? (
            /* SLIDE 1 (LEFT): ROOM BOOKING SERVICE */
            <motion.div
              key="room-slide"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 z-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=80')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070B14]/95 via-[#070B14]/75 to-indigo-950/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent" />
            </motion.div>
          ) : (
            /* SLIDE 2 (RIGHT): FOOD DELIVERY SERVICE */
            <motion.div
              key="food-slide"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 z-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070B14]/95 via-[#070B14]/75 to-red-950/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="max-w-3xl">
            
            {/* BADGE */}
            <motion.div
              key={`badge-${activeSlide}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 border backdrop-blur-md"
              style={{
                backgroundColor: activeSlide === 0 ? 'rgba(79, 70, 229, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                color: activeSlide === 0 ? '#A5B4FC' : '#FCA5A5',
                borderColor: activeSlide === 0 ? 'rgba(99, 102, 241, 0.4)' : 'rgba(239, 68, 68, 0.4)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeSlide === 0 ? '5-Star Sanctuary & Suite Escapes' : 'Michelin-Inspired In-Room & Cloud Kitchens'}</span>
            </motion.div>

            {/* HEADLINE */}
            <motion.h1
              key={`heading-${activeSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight leading-tight"
            >
              {activeSlide === 0 ? (
                <>
                  Find Your <span className="text-gradient-indigo">Perfect Luxury Stay</span>
                </>
              ) : (
                <>
                  Order <span className="text-gradient-orange">Delicious Gourmet Food</span>
                </>
              )}
            </motion.h1>

            {/* SUBHEADLINE */}
            <motion.p
              key={`subheading-${activeSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-base sm:text-lg text-slate-300 mt-4 max-w-2xl leading-relaxed"
            >
              {activeSlide === 0
                ? 'Handpicked oceanview presidential suites, skyline penthouses, and heritage royal havelis with anti-scam payment protection.'
                : 'Slow-cooked royal dum biryanis, artisan smash burgers, and Himalayan momos delivered straight to your suite or doorstep in 20 mins.'}
            </motion.p>

            {/* CTA BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-4 mt-8 flex-wrap"
            >
              {activeSlide === 0 ? (
                <a
                  href="#rooms-section"
                  className="px-8 py-4 rounded-2xl theme-room-gradient text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 flex items-center gap-2 hover:scale-105 transition-all"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Browse Luxury Rooms</span>
                </a>
              ) : (
                <a
                  href="#food-section"
                  className="px-8 py-4 rounded-2xl theme-food-gradient text-white font-extrabold text-sm shadow-xl shadow-red-600/30 flex items-center gap-2 hover:scale-105 transition-all"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Explore Gourmet Menu</span>
                </a>
              )}

              <button
                onClick={() => handleSlideChange(activeSlide === 0 ? 1 : 0)}
                className="px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-700 backdrop-blur-xl flex items-center gap-2 transition-all"
              >
                <span>Switch to {activeSlide === 0 ? 'Food Delivery 🍛' : 'Room Booking 🏨'}</span>
              </button>
            </motion.div>

          </div>
        </div>

        {/* SLIDER CONTROLS (ARROWS + DOTS) */}
        <div className="absolute bottom-6 right-6 sm:right-12 z-20 flex items-center gap-3">
          <button
            onClick={() => handleSlideChange(activeSlide === 0 ? 1 : 0)}
            className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 backdrop-blur-md"
            title="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => handleSlideChange(0)}
              className={`w-3 h-3 rounded-full transition-all ${activeSlide === 0 ? 'w-8 bg-indigo-500' : 'bg-slate-600'}`}
            />
            <button
              onClick={() => handleSlideChange(1)}
              className={`w-3 h-3 rounded-full transition-all ${activeSlide === 1 ? 'w-8 bg-orange-500' : 'bg-slate-600'}`}
            />
          </div>

          <button
            onClick={() => handleSlideChange(activeSlide === 0 ? 1 : 0)}
            className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 backdrop-blur-md"
            title="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 2. GLASSMORPHISM BOOKING PREFERENCES BAR (IMAGE 1 EXACT MATCH) */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-30">
        <div className="glass-panel p-6 rounded-3xl">
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
              {isRoom ? 'Booking Preferences' : 'Food Delivery Location'}
            </h3>
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available {isRoom ? '05 Stays' : '30+ Dishes'}</span>
            </span>
          </div>

          {isRoom ? (
            /* ROOM SEARCH INPUTS (IMAGE 1 MATCH) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              <div className="glass-pill p-3 rounded-2xl">
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Destination</label>
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-white outline-none cursor-pointer"
                >
                  <option value="All" className="bg-slate-900">All Cities</option>
                  <option value="Goa" className="bg-slate-900">Goa Beachfront</option>
                  <option value="Mumbai" className="bg-slate-900">Mumbai South</option>
                  <option value="Jaipur" className="bg-slate-900">Jaipur Heritage</option>
                  <option value="Udaipur" className="bg-slate-900">Udaipur Lake</option>
                  <option value="Bangalore" className="bg-slate-900">Bangalore Tech</option>
                  <option value="Delhi" className="bg-slate-900">Delhi Diplomatic</option>
                </select>
              </div>

              <div className="glass-pill p-3 rounded-2xl">
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Check-in Date</label>
                <input
                  type="date"
                  defaultValue="2026-08-25"
                  className="w-full bg-transparent text-xs font-bold text-white outline-none"
                />
              </div>

              <div className="glass-pill p-3 rounded-2xl">
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Check-out Date</label>
                <input
                  type="date"
                  defaultValue="2026-08-28"
                  className="w-full bg-transparent text-xs font-bold text-white outline-none"
                />
              </div>

              <div className="glass-pill p-3 rounded-2xl">
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Rooms</label>
                <select className="w-full bg-transparent text-xs font-bold text-white outline-none">
                  <option value="1" className="bg-slate-900">01 Room</option>
                  <option value="2" className="bg-slate-900">02 Rooms</option>
                  <option value="3" className="bg-slate-900">03 Rooms</option>
                </select>
              </div>

              <div className="glass-pill p-3 rounded-2xl">
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Guests</label>
                <select className="w-full bg-transparent text-xs font-bold text-white outline-none">
                  <option value="2" className="bg-slate-900">02 Adults</option>
                  <option value="1" className="bg-slate-900">01 Adult</option>
                  <option value="4" className="bg-slate-900">04 Adults (Family)</option>
                </select>
              </div>

              <button
                onClick={() => {}}
                className="py-3 px-6 rounded-2xl theme-room-gradient text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 hover:opacity-95"
              >
                <Search className="w-4 h-4" />
                <span>Search Stays</span>
              </button>
            </div>
          ) : (
            /* FOOD SEARCH INPUTS (IMAGE 2 MATCH) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="glass-pill p-3 rounded-2xl lg:col-span-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Delivery Address</label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <input
                    type="text"
                    defaultValue="Signature Presidential Suite #402, Candolim, Goa"
                    className="w-full bg-transparent text-xs font-bold text-white outline-none"
                  />
                </div>
              </div>

              <div className="glass-pill p-3 rounded-2xl">
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Cuisine Category</label>
                <select
                  value={foodCategory}
                  onChange={(e) => setFoodCategory(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-white outline-none cursor-pointer"
                >
                  <option value="All" className="bg-slate-900">All Cuisines</option>
                  <option value="Biryani" className="bg-slate-900">Awadhi Biryani</option>
                  <option value="Burger" className="bg-slate-900">Gourmet Burgers</option>
                  <option value="Momos" className="bg-slate-900">Himalayan Momos</option>
                  <option value="Indian Thali" className="bg-slate-900">Royal Rajasthani Thali</option>
                  <option value="Fast Food" className="bg-slate-900">Loaded Fries</option>
                  <option value="Desserts" className="bg-slate-900">Desserts</option>
                </select>
              </div>

              <div className="glass-pill p-3 rounded-2xl">
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Dietary Preference</label>
                <select className="w-full bg-transparent text-xs font-bold text-white outline-none">
                  <option value="all" className="bg-slate-900">All (Veg & Non-Veg)</option>
                  <option value="veg" className="bg-slate-900">Pure Veg 🟢</option>
                  <option value="nonveg" className="bg-slate-900">Non-Veg Only 🔴</option>
                </select>
              </div>

              <button
                onClick={() => {}}
                className="py-3 px-6 rounded-2xl theme-food-gradient text-white font-extrabold text-xs shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 hover:opacity-95"
              >
                <Search className="w-4 h-4" />
                <span>Search Dishes</span>
              </button>
            </div>
          )}

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 2.5 LIVE INTERACTIVE INDIA LOCATION MAP & NEARBY ROOM RADAR    */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {isRoom && (
        <section className="pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IndiaLocationMap
            properties={filteredProperties}
            onSelectProperty={() => {}}
            onBookProperty={onOpenBooking}
          />
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 3. SIGNATURE GLASSMORPHISM ROOM SHOWCASE (SCREENSHOT 1 MATCH)  */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section id="rooms-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-indigo-400 block mb-1">
              Results based on your preferences
            </span>
            <h2 className="text-3xl font-black text-white font-heading">
              Handpicked Luxury Stays
            </h2>
          </div>
          <div className="flex gap-2">
            {['All', 'Goa', 'Mumbai', 'Jaipur', 'Udaipur'].map((c) => (
              <button
                key={c}
                onClick={() => setCityFilter(c)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  cityFilter === c
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* HORIZONTAL GLASS ROOM CARD (SCREENSHOT 1 EXACT DESIGN) */}
        <div className="space-y-8">
          {filteredProperties.map((property) => {
            const isFav = user?.savedProperties?.includes(property.id);

            return (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-3xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden group hover:border-indigo-400/50"
              >
                {/* AMBIENT CORNER GLOW */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10 group-hover:bg-indigo-500/20 transition-all" />

                {/* LEFT: ROOM IMAGE SLIDER PREVIEW */}
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-700/60 shadow-xl">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-extrabold text-amber-300 border border-amber-500/30 flex items-center gap-1 shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{property.rating} ({property.totalReviews} reviews)</span>
                  </div>

                  <button
                    onClick={() => toggleFavoriteProperty(property.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-950/85 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-red-400 transition-colors border border-slate-700/80 shadow-lg"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-bold text-slate-200 border border-slate-700/80 flex items-center gap-1.5 shadow-lg">
                    <span>📍 {property.city}, {property.address.split(',')[0]}</span>
                    <span className="text-indigo-400 font-bold">• {property.distanceKm} km away</span>
                  </div>
                </div>

                {/* RIGHT: DETAILS, KEY FEATURES, BOOK BUTTON */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <span className="text-[11px] font-black uppercase px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 tracking-wider shadow-sm inline-block">
                          👑 {property.category}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-white font-heading mt-2 group-hover:text-indigo-200 transition-colors">
                          {property.title}
                        </h3>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-2xl sm:text-3xl font-black text-gradient-gold font-heading block">
                          {formatPrice(property.pricePerNight)}
                        </span>
                        <span className="text-[11px] text-slate-300 font-bold uppercase tracking-wider">/ night + GST</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                      {property.description}
                    </p>

                    {/* KEY FEATURES PILLS */}
                    <div className="mb-8">
                      <span className="text-[11px] font-extrabold text-amber-400/90 uppercase tracking-widest block mb-2.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Included Amenities & Perks</span>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {property.keyFeatures.map((feat, idx) => (
                          <span
                            key={idx}
                            className="px-3.5 py-1.5 rounded-xl bg-slate-800/90 border border-slate-600/60 text-xs font-semibold text-slate-200 shadow-sm"
                          >
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ACTION FOOTER */}
                  <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={property.hostAvatar}
                        alt={property.hostName}
                        className="w-11 h-11 rounded-full object-cover border-2 border-amber-500/40 shadow-md"
                      />
                      <div>
                        <strong className="text-xs text-white block font-heading">Host: {property.hostName}</strong>
                        <span className="text-[10px] text-emerald-400 font-bold">✓ Verified Superhost (⭐ {property.hostRating})</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenBooking(property)}
                      className="px-8 py-3.5 rounded-2xl theme-room-gradient text-white font-black text-xs shadow-xl shadow-indigo-600/40 hover:scale-105 transition-all uppercase tracking-wider flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4 fill-white" />
                      <span>Instant Book Room</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 4. GOURMET FOOD & IN-ROOM DINING (SCREENSHOT 2 EXACT MATCH)    */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section id="food-section" className="py-20 bg-gradient-to-b from-[#070B14] via-slate-900/80 to-[#070B14] border-t border-slate-800/80 relative">
        {/* VIBRANT AMBIENT GLOW */}
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-[130px] pointer-events-none -z-10 animate-ambient-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-orange-400 block mb-1 flex items-center gap-1.5">
                <span>🔥</span>
                <span>Taste & In-Room Culinary Craft</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-heading">
                Delicious Gourmet Food is Waiting For You
              </h2>
            </div>
            <button
              onClick={toggleCartDrawer}
              className="px-6 py-3 rounded-full theme-food-gradient text-white text-xs font-black shadow-xl shadow-orange-600/30 flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>View Cart & Order (Instant Delivery)</span>
            </button>
          </div>

          {/* CUISINE PILLS */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-8">
            {['All', 'Biryani', 'Burger', 'Momos', 'Indian Thali', 'Fast Food', 'Desserts'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFoodCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  foodCategory === cat
                    ? 'theme-food-gradient text-white shadow-lg shadow-orange-600/40 scale-105'
                    : 'bg-slate-800/90 text-slate-300 hover:text-white border border-slate-700/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FOOD CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFood.map((dish) => {
              const isFav = user?.savedFoods?.includes(dish.id);

              return (
                <motion.div
                  key={dish.id}
                  whileHover={{ y: -6 }}
                  className="glass-card rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden group hover:border-orange-400/40"
                >
                  <div>
                    <div className="relative rounded-2xl overflow-hidden aspect-square mb-4 bg-slate-900 border border-slate-700/60 shadow-md">
                      <img
                        src={dish.image}
                        alt={dish.itemName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-[10px] font-black text-amber-300 border border-amber-500/30 shadow-md flex items-center gap-1">
                        ⭐ {dish.rating}
                      </span>
                      <button
                        onClick={() => toggleFavoriteFood(dish.id)}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-slate-950/85 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-red-400 transition-colors border border-slate-700/80 shadow-md"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-extrabold uppercase text-orange-400 tracking-wider">
                        {dish.restaurantName}
                      </span>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
                        dish.isVeg ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' : 'bg-red-950/80 text-red-300 border-red-500/40'
                      }`}>
                        {dish.isVeg ? '🟢 VEG' : '🔴 NON-VEG'}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-1.5 font-heading group-hover:text-orange-200 transition-colors">
                      {dish.itemName}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-700/70 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-lg font-black text-gradient-gold font-heading block">
                        {formatPrice(dish.price)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold block">⏱️ {dish.prepTime}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => addToFoodCart({ ...dish, qty: 1 })}
                        className="px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-600/80 flex items-center gap-1 text-xs font-bold transition-all shadow-sm"
                        title="Add to Cart"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Add</span>
                      </button>
                      <button
                        onClick={() => {
                          addToFoodCart({ ...dish, qty: 1 });
                          setIsCartDrawerOpen(true);
                        }}
                        className="px-3 py-2 rounded-xl theme-food-gradient text-white flex items-center gap-1.5 text-xs font-black shadow-lg shadow-orange-600/30 hover:scale-105 active:scale-95 transition-all"
                        title="Instant Buy Now"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>Buy Now</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 5. FLOATING GLASS DOCK (SCREENSHOT 1 BOTTOM DOCK MATCH)        */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <div className="glass-dock rounded-full px-4 py-2 flex items-center gap-3">
          <a
            href="#rooms-section"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Room Search</span>
          </a>

          <button
            onClick={toggleCartDrawer}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Food Orders</span>
          </button>

          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
          >
            <Users className="w-3.5 h-3.5" />
            <span>My Account</span>
          </button>
        </div>
      </div>

    </div>
  );
};
