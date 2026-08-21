import React, { useState } from 'react';
import { MOCK_PROPERTIES } from '../../data/mockData';
import { Listing } from '../../types';
import { useService } from '../../context/ServiceContext';
import { useAuth } from '../../context/AuthContext';
import { Search, MapPin, Star, Heart, Building2, Compass, LayoutGrid, Map as MapIcon, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { IndiaLocationMap } from '../../components/room/IndiaLocationMap';

interface RoomsListingProps {
  onOpenBooking: (property: Listing) => void;
}

export const RoomsListing: React.FC<RoomsListingProps> = ({ onOpenBooking }) => {
  const { formatPrice } = useService();
  const { user, toggleFavoriteProperty } = useAuth();

  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(10000);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = MOCK_PROPERTIES.filter(p => {
    const matchCity = selectedCity === 'All' || p.city.toLowerCase() === selectedCity.toLowerCase();
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchPrice = p.pricePerNight <= priceRange;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.landmark.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCity && matchCategory && matchPrice && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-indigo-950 text-indigo-300 border border-indigo-800 mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>5-Star Sanctuaries & Private Residences in India</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-heading">
            Luxury Stays & Suites Across India
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Verified presidential suites in Goa, Mumbai sea-link penthouses, royal Jaipur havelis, and tech suites in Bangalore.
          </p>
        </div>

        {/* SEARCH & FILTER BAR WITH VIEW MODE TOGGLE */}
        <div className="glass-panel p-6 rounded-3xl mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
              <div className="relative sm:col-span-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search hotel or Indian landmark..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 font-semibold"
                />
              </div>

              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-2xl px-4 py-2.5 text-xs font-bold text-white outline-none focus:border-indigo-500"
              >
                <option value="All">All Indian Destinations</option>
                <option value="Goa">Goa (Candolim Beach)</option>
                <option value="Mumbai">Mumbai (Worli Sea Face)</option>
                <option value="Jaipur">Jaipur (Pink City Haveli)</option>
                <option value="Udaipur">Udaipur (Lake Pichola)</option>
                <option value="Bangalore">Bangalore (Indiranagar 100ft)</option>
                <option value="Delhi">Delhi NCR (Diplomatic Enclave)</option>
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-2xl px-4 py-2.5 text-xs font-bold text-white outline-none focus:border-indigo-500"
              >
                <option value="all">All Room Categories</option>
                <option value="suite">Executive Suites</option>
                <option value="penthouse">Skyline Penthouses</option>
                <option value="villa">Heritage Villas</option>
                <option value="studio">Lakeview Studios</option>
                <option value="deluxe">Deluxe Rooms</option>
              </select>
            </div>

            {/* VIEW MODE TOGGLE BUTTONS */}
            <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-700 self-start lg:self-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'theme-room-gradient text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>

              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                  viewMode === 'map'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>📍 India Map & GPS</span>
              </button>
            </div>

          </div>
        </div>

        {/* MAP VIEW */}
        {viewMode === 'map' ? (
          <div className="mb-12">
            <IndiaLocationMap
              properties={filtered}
              onSelectProperty={() => {}}
              onBookProperty={onOpenBooking}
            />
          </div>
        ) : (
          /* GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((property) => {
              const isFav = user?.savedProperties?.includes(property.id);

              return (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group border border-slate-800"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-black text-amber-400 border border-slate-700 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{property.rating} ({property.totalReviews})</span>
                      </div>

                      <button
                        onClick={() => toggleFavoriteProperty(property.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/80 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-red-400 transition-colors border border-slate-700"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>

                      <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-0.5 rounded-full text-[10px] font-bold text-slate-300">
                        📍 {property.city}, {property.state}
                      </div>

                      {property.distanceKm && (
                        <div className="absolute bottom-3 right-3 bg-emerald-950/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-black text-emerald-300 border border-emerald-700 flex items-center gap-1">
                          <Navigation className="w-2.5 h-2.5" />
                          <span>{property.distanceKm} km</span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider block mb-1">
                        {property.category} • Max {property.maxGuests} Guests
                      </span>
                      <h3 className="text-lg font-bold text-white font-heading group-hover:text-indigo-300 transition-colors line-clamp-1">
                        {property.title}
                      </h3>

                      {/* INDIAN LANDMARK */}
                      <p className="text-xs text-amber-400/90 font-semibold mt-1 flex items-center gap-1 truncate">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{property.landmark}</span>
                      </p>

                      <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {property.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {property.keyFeatures.slice(0, 3).map((feat, idx) => (
                          <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-4">
                    <div>
                      <span className="text-xl font-black text-white font-heading">{formatPrice(property.pricePerNight)}</span>
                      <span className="text-[10px] text-slate-500 block">/ night (+ 12% GST)</span>
                    </div>

                    <button
                      onClick={() => onOpenBooking(property)}
                      className="px-6 py-2.5 rounded-xl theme-room-gradient text-white text-xs font-black shadow-lg shadow-indigo-600/30 hover:scale-105 transition-transform uppercase tracking-wider"
                    >
                      Reserve ➔
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
