import React from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useService } from '../../context/ServiceContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, Zap, CreditCard, Banknote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export const CartDrawer: React.FC = () => {
  const {
    foodCart,
    updateFoodQty,
    removeFoodItem,
    clearFoodCart,
    foodCartTotal,
    isCartDrawerOpen,
    toggleCartDrawer,
    addFoodOrder,
  } = useCart();
  const { user } = useAuth();
  const { formatPrice } = useService();

  if (!isCartDrawerOpen) return null;

  const deliveryFee = foodCart.length > 0 ? 40 : 0;
  const tax = Math.round(foodCartTotal * 0.05);
  const grandTotal = foodCartTotal + deliveryFee + tax;

  const handleCheckout = (paymentMode: 'ONLINE' | 'OFFLINE') => {
    if (foodCart.length === 0) return;

    addFoodOrder({
      guestId: user?.id || 'usr_guest_01',
      guestName: user?.name || 'Aarav Sharma',
      restaurantId: foodCart[0]?.restaurantId || 'rest_1',
      restaurantName: foodCart[0]?.restaurantName || 'Gourmet Kitchen',
      items: foodCart.map(i => ({
        itemId: i.id,
        itemName: i.itemName,
        price: i.price,
        qty: i.qty,
        image: i.image,
      })),
      deliveryAddress: 'Signature Presidential Suite #402, Candolim, Goa',
      status: 'PLACED',
      paymentMode,
      paymentMethod: paymentMode === 'ONLINE' ? 'UPI' : 'OFFLINE_CASH',
      totalAmount: grandTotal,
      estimatedTime: '20-25 mins',
    });

    toggleCartDrawer();
    toast.success(`🎉 Feast Order Placed! Live delivery tracking active.`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* BACKDROP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleCartDrawer}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between"
          >
            {/* HEADER */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl theme-food-gradient flex items-center justify-center text-white text-lg shadow-md shadow-orange-600/30">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-lg text-white">Your Meal Cart</h3>
                  <span className="text-xs text-slate-400">{foodCart.length} Delicious items</span>
                </div>
              </div>

              <button
                onClick={toggleCartDrawer}
                className="w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* BODY ITEMS */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {foodCart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mx-auto mb-4 text-2xl">
                    🛎️
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">Your cart is empty</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto mb-6">
                    Add aromatic biryanis, smash burgers, or fresh Himalayan momos to order.
                  </p>
                  <button
                    onClick={toggleCartDrawer}
                    className="px-6 py-2.5 rounded-xl theme-food-gradient text-white text-xs font-bold shadow-lg shadow-red-600/30"
                  >
                    Browse Gourmet Food ➔
                  </button>
                </div>
              ) : (
                foodCart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center gap-3.5"
                  >
                    <img
                      src={item.image}
                      alt={item.itemName}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-800 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                        item.isVeg ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'
                      }`}>
                        {item.isVeg ? 'VEG 🟢' : 'NON-VEG 🔴'}
                      </span>
                      <h4 className="text-xs font-bold text-white truncate mt-1">{item.itemName}</h4>
                      <div className="text-xs font-black text-amber-400 mt-0.5">{formatPrice(item.price * item.qty)}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded-xl border border-slate-700">
                        <button
                          onClick={() => updateFoodQty(item.id, -1)}
                          className="text-slate-400 hover:text-white p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-black text-white px-1">{item.qty}</span>
                        <button
                          onClick={() => updateFoodQty(item.id, 1)}
                          className="text-slate-400 hover:text-white p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFoodItem(item.id)}
                        className="text-slate-500 hover:text-red-400 p-1.5"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER TOTAL & CHECKOUT */}
            {foodCart.length > 0 && (
              <div className="p-6 border-t border-slate-800 bg-slate-950/80 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Food Items Subtotal</span>
                    <strong className="text-slate-200">{formatPrice(foodCartTotal)}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>In-Room Delivery Fee</span>
                    <strong className="text-emerald-400">{formatPrice(deliveryFee)}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Taxes & GST (5%)</span>
                    <strong className="text-slate-200">{formatPrice(tax)}</strong>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-bold text-white">
                    <span>Total Amount</span>
                    <span className="text-lg font-black text-orange-400 font-heading">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleCheckout('ONLINE')}
                    className="w-full py-3.5 rounded-2xl theme-food-gradient text-white font-black text-sm shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>⚡ Buy Now (Online UPI / Card / NetBanking)</span>
                  </button>

                  <button
                    onClick={() => handleCheckout('OFFLINE')}
                    className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs border border-amber-500/40 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                  >
                    <Banknote className="w-4 h-4 text-amber-400" />
                    <span>⚡ Buy Now: Pay Cash on Delivery (Offline)</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
