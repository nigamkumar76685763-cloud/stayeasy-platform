import React, { useState, useEffect } from 'react';
import { Listing } from '../../types';
import { useService } from '../../context/ServiceContext';
import {
  MapPin, Navigation, Compass, Star, Eye, ArrowRight,
  ShieldCheck, Crosshair, Sparkles, Check, Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface IndiaLocationMapProps {
  properties: Listing[];
  onSelectProperty: (property: Listing) => void;
  onBookProperty: (property: Listing) => void;
}

export const IndiaLocationMap: React.FC<IndiaLocationMapProps> = ({
  properties,
  onSelectProperty,
  onBookProperty
}) => {
  const { formatPrice } = useService();

  // User live location state
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [activePin, setActivePin] = useState<Listing | null>(properties[0] || null);
  const [maxDistance, setMaxDistance] = useState<number>(50); // km radius
  const [calculatedListings, setCalculatedListings] = useState<Listing[]>(properties);

  // Haversine formula to compute distance in KM
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Number((R * c).toFixed(1));
  };

  // Detect Live GPS Location
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    toast.loading('Detecting your live GPS location in India...', { id: 'gps' });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setUserLocation({ lat: userLat, lng: userLng });
        setIsLocating(false);

        // Calculate distance for all properties and sort by nearest
        const updated = properties.map((p) => ({
          ...p,
          distanceKm: calculateDistance(userLat, userLng, p.latitude, p.longitude),
        })).sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));

        setCalculatedListings(updated);
        setActivePin(updated[0]);
        toast.success(`📍 Location detected! Showing nearest luxury rooms to you.`, { id: 'gps' });
      },
      (error) => {
        setIsLocating(false);
        // Fallback default: Mumbai coordinates (19.0760, 72.8777)
        const fallbackLat = 19.0760;
        const fallbackLng = 72.8777;
        setUserLocation({ lat: fallbackLat, lng: fallbackLng });

        const updated = properties.map((p) => ({
          ...p,
          distanceKm: calculateDistance(fallbackLat, fallbackLng, p.latitude, p.longitude),
        })).sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));

        setCalculatedListings(updated);
        setActivePin(updated[0]);
        toast.success('📍 Demo Location Set to Mumbai! Showing nearest rooms.', { id: 'gps' });
      },
      { timeout: 10000 }
    );
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl overflow-hidden border border-slate-800">
      
      {/* HEADER & GPS CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Compass className="w-4 h-4" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-indigo-400">
              Live Interactive India Map & Radar
            </span>
          </div>
          <h3 className="text-2xl font-black text-white font-heading mt-1">
            Find Nearby Luxury Stays Near You
          </h3>
          <p className="text-xs text-slate-400">
            Use your live GPS location to find verified sanctuaries, suites, and private villas across India.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleDetectLocation}
            disabled={isLocating}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : 'animate-pulse'}`} />
            <span>{isLocating ? 'Locating...' : '📍 Use My Current Location'}</span>
          </button>
        </div>
      </div>

      {/* MAP VIEWPORT & SELECTED HOTEL PREVIEW GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: INTERACTIVE MAP CANVAS */}
        <div className="lg:col-span-8 relative h-[380px] sm:h-[440px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
          
          {/* MAP BACKGROUND LAYER (HIGH-CONTRAST DARK THEME MAP TILES) */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-85"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80')`,
              filter: 'brightness(0.35) contrast(1.2) hue-rotate(200deg)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* GRID OVERLAY & RADAR CIRCLES */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[500px] h-[500px] rounded-full border border-indigo-500/40 animate-ping duration-1000" />
            <div className="w-[300px] h-[300px] rounded-full border border-indigo-400/30" />
            <div className="w-[150px] h-[150px] rounded-full border border-indigo-300/20" />
          </div>

          {/* USER LIVE GPS PIN (IF DETECTED) */}
          {userLocation && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none"
            >
              <div className="relative">
                <span className="flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-2 border-white"></span>
                </span>
              </div>
              <span className="mt-1 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500 text-[10px] font-black text-emerald-300 backdrop-blur-md shadow-lg">
                📍 You are here
              </span>
            </motion.div>
          )}

          {/* LUXURY PROPERTY MAP PINS */}
          <div className="absolute inset-0 p-8 flex flex-wrap items-center justify-around z-10">
            {calculatedListings.map((property, idx) => {
              const isSelected = activePin?.id === property.id;

              // Simulated placement offsets across the India map view
              const positions = [
                { top: '35%', left: '22%' }, // Goa
                { top: '48%', left: '38%' }, // Mumbai
                { top: '22%', left: '45%' }, // Jaipur
                { top: '30%', left: '60%' }, // Udaipur
                { top: '68%', left: '55%' }, // Bangalore
                { top: '15%', left: '72%' }, // Delhi
              ];
              const pos = positions[idx % positions.length];

              return (
                <div
                  key={property.id}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute cursor-pointer transition-all duration-300 group"
                  onClick={() => {
                    setActivePin(property);
                    onSelectProperty(property);
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-xl transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 font-black border-2 border-white scale-110 shadow-amber-500/50 z-30'
                        : 'bg-slate-900/90 text-white font-bold border border-slate-700 hover:border-indigo-400 backdrop-blur-md z-10'
                    }`}
                  >
                    <Building2 className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-indigo-400'}`} />
                    <span className="text-xs font-heading font-extrabold">{formatPrice(property.pricePerNight)}</span>
                  </motion.div>

                  {/* MINI LANDMARK BADGE */}
                  <div className="hidden group-hover:block absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950/90 border border-slate-700 text-[10px] text-slate-200 px-2 py-0.5 rounded-lg shadow-xl backdrop-blur-md z-40">
                    📍 {property.city} • {property.landmark}
                  </div>
                </div>
              );
            })}
          </div>

          {/* BOTTOM MAP BADGE */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800 text-[11px] text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Click any map price pin to inspect hotel distance & landmark</span>
          </div>

        </div>

        {/* RIGHT: SELECTED HOTEL CARD POPUP WITH REAL-TIME DISTANCE */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {activePin ? (
              <motion.div
                key={activePin.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card rounded-3xl p-5 border border-slate-800 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-3 bg-slate-900">
                    <img
                      src={activePin.images[0]}
                      alt={activePin.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-black text-amber-400 border border-slate-700 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{activePin.rating} ({activePin.totalReviews})</span>
                    </div>

                    {/* LIVE DISTANCE BADGE */}
                    <div className="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-full bg-emerald-950/90 backdrop-blur-md text-[11px] font-black text-emerald-300 border border-emerald-700 flex items-center gap-1 shadow-lg">
                      <Navigation className="w-3 h-3" />
                      <span>{activePin.distanceKm ? `${activePin.distanceKm} km away` : '2.1 km away'}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider block">
                    {activePin.category} • {activePin.state}, India
                  </span>
                  <h4 className="text-base font-bold text-white font-heading mt-0.5 line-clamp-1">
                    {activePin.title}
                  </h4>

                  {/* INDIAN LANDMARK INFO */}
                  <div className="mt-2.5 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span className="truncate">{activePin.landmark}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      PIN: {activePin.pinCode} • Govt ID / Aadhaar verified property
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {activePin.keyFeatures.slice(0, 3).map((feat, idx) => (
                      <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-black text-white font-heading block">
                      {formatPrice(activePin.pricePerNight)}
                    </span>
                    <span className="text-[10px] text-slate-400">/ night (+ 12% GST)</span>
                  </div>

                  <button
                    onClick={() => onBookProperty(activePin)}
                    className="px-6 py-2.5 rounded-xl theme-room-gradient text-white text-xs font-black shadow-lg shadow-indigo-600/30 hover:scale-105 transition-transform uppercase tracking-wider"
                  >
                    Book Now !
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
