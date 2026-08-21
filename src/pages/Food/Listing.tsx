import React, { useState } from 'react';
import { MOCK_FOOD_ITEMS, MOCK_RESTAURANTS } from '../../data/mockData';
import { MenuItem } from '../../types';
import { useService } from '../../context/ServiceContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Search, UtensilsCrossed, Heart, Star, Clock, ShoppingBag, Plus, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const FoodListing: React.FC = () => {
  const { formatPrice } = useService();
  const { addToFoodCart, setIsCartDrawerOpen } = useCart();
  const { user, toggleFavoriteFood } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDiet, setSelectedDiet] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFood = MOCK_FOOD_ITEMS.filter(f => {
    const matchCategory = selectedCategory === 'All' || f.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchDiet = selectedDiet === 'all' || (selectedDiet === 'veg' ? f.isVeg : !f.isVeg);
    const matchSearch = f.itemName.toLowerCase().includes(searchQuery.toLowerCase()) || f.restaurantName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchDiet && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-red-950 text-orange-300 border border-red-800 mb-3">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Award-Winning In-Room & Express Delivery</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-heading">
            Gourmet Food & In-Room Dining
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Aromatic Awadhi biryanis, gourmet smash burgers, Himalayan momos, and royal thalis prepared fresh by master culinary partners.
          </p>
        </div>

        {/* RESTAURANT SPOTLIGHT CAROUSEL STRIP */}
        <div className="mb-12">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
            Featured Kitchen Partners
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_RESTAURANTS.map((rest) => (
              <div
                key={rest.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3 hover:border-slate-700 transition-all cursor-pointer"
              >
                <img
                  src={rest.logoUrl}
                  alt={rest.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-800"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{rest.name}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span className="text-amber-400 font-bold">⭐ {rest.rating}</span>
                    <span>•</span>
                    <span>⏱️ {rest.deliveryTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="glass-panel p-6 rounded-3xl mb-12 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative sm:col-span-2">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search dishes, burgers, biryanis, momos, or thalis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 font-semibold"
              />
            </div>

            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-2xl p-1">
              <button
                onClick={() => setSelectedDiet('all')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedDiet === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedDiet('veg')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedDiet === 'veg' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'text-slate-400'
                }`}
              >
                Pure Veg 🟢
              </button>
              <button
                onClick={() => setSelectedDiet('nonveg')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedDiet === 'nonveg' ? 'bg-red-950 text-red-300 border border-red-800' : 'text-slate-400'
                }`}
              >
                Non-Veg 🔴
              </button>
            </div>
          </div>

          {/* CUISINE CHIPS */}
          <div className="flex gap-2 overflow-x-auto pt-2">
            {['All', 'Biryani', 'Burger', 'Momos', 'Indian Thali', 'Fast Food', 'Desserts', 'Beverages'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'theme-food-gradient text-white shadow-md shadow-orange-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FOOD ITEMS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFood.map((dish) => {
            const isFav = user?.savedFoods?.includes(dish.id);

            return (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-3xl p-5 flex flex-col justify-between group border border-slate-800"
              >
                <div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-900">
                    <img
                      src={dish.image}
                      alt={dish.itemName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-black text-amber-400">
                      ⭐ {dish.rating}
                    </span>
                    <button
                      onClick={() => toggleFavoriteFood(dish.id)}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-slate-950/80 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-red-400 transition-colors"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-extrabold uppercase text-orange-400">
                      {dish.restaurantName}
                    </span>
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                      dish.isVeg ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'
                    }`}>
                      {dish.isVeg ? 'VEG' : 'NON-VEG'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white font-heading mb-1">
                    {dish.itemName}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-base font-black text-white font-heading">
                      {formatPrice(dish.price)}
                    </span>
                    <span className="text-[10px] text-slate-500 block">⏱️ {dish.prepTime}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => addToFoodCart({ ...dish, qty: 1 })}
                      className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 text-xs font-bold transition-all"
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
    </div>
  );
};
