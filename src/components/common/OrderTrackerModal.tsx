import React from 'react';
import { FoodOrder } from '../../types';
import { useCart } from '../../context/CartContext';
import { useService } from '../../context/ServiceContext';
import { X, CheckCircle2, Clock, Phone, MessageSquare, Bike, ChefHat, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderTrackerModalProps {
  order: FoodOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

const STAGES = [
  { key: 'PLACED', label: 'Order Placed', icon: '📝' },
  { key: 'CONFIRMED', label: 'Confirmed by Chef', icon: '👨‍🍳' },
  { key: 'PREPARING', label: 'Sizzling on Flame', icon: '🔥' },
  { key: 'READY', label: 'Packed Fresh', icon: '📦' },
  { key: 'PICKED', label: 'Picked by Host', icon: '🛵' },
  { key: 'ON_THE_WAY', label: 'On The Way', icon: '⚡' },
  { key: 'DELIVERED', label: 'Delivered Hot', icon: '🎉' },
];

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({ order, isOpen, onClose }) => {
  const { updateOrderStatus } = useCart();
  const { formatPrice } = useService();

  if (!isOpen || !order) return null;

  const currentStageIndex = STAGES.findIndex(s => s.key === order.status);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* BACKDROP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl"
        />

        {/* MODAL BODY */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* TOP HEADER */}
          <div className="text-center pb-6 border-b border-slate-800">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-red-950 text-orange-400 border border-red-800 animate-pulse">
              🔴 LIVE FOOD DELIVERY TRACKER
            </span>
            <h2 className="text-2xl font-black text-white font-heading mt-2">
              Order #{order.orderId}
            </h2>
            <p className="text-xs text-slate-400">
              Kitchen: <strong className="text-slate-200">{order.restaurantName}</strong> • Destination: <strong className="text-slate-200">{order.deliveryAddress}</strong>
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold mt-3">
              <Clock className="w-3.5 h-3.5" />
              <span>Estimated Arrival: <strong>{order.estimatedTime}</strong> (Placed at {order.orderPlacedAt})</span>
            </div>
          </div>

          {/* 7-STAGE ANIMATED TIMELINE */}
          <div className="py-6">
            <div className="relative">
              <div className="space-y-4">
                {STAGES.map((stage, idx) => {
                  const isDone = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  return (
                    <div key={stage.key} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border transition-all ${
                          isCurrent
                            ? 'bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/40 scale-110'
                            : isDone
                            ? 'bg-emerald-500 text-white border-emerald-400'
                            : 'bg-slate-800 text-slate-500 border-slate-700'
                        }`}>
                          {isDone && !isCurrent ? <Check className="w-4 h-4" /> : stage.icon}
                        </div>
                        {idx < STAGES.length - 1 && (
                          <div className={`w-0.5 h-6 my-1 ${
                            idx < currentStageIndex ? 'bg-emerald-500' : 'bg-slate-800'
                          }`} />
                        )}
                      </div>
                      <div className="pt-1.5 flex-1 flex items-center justify-between">
                        <div>
                          <h4 className={`text-xs font-bold ${
                            isCurrent ? 'text-orange-400 font-extrabold text-sm' : isDone ? 'text-white' : 'text-slate-500'
                          }`}>
                            {stage.label}
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            {isCurrent ? 'In progress right now' : isDone ? 'Completed' : 'Pending'}
                          </p>
                        </div>
                        {isCurrent && (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 animate-pulse">
                            ACTIVE
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIDER & SUPPORT CARD */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-xl font-bold">
                🛵
              </div>
              <div>
                <strong className="text-xs text-white block">Host Rider: {order.riderName || 'Tariq Al-Mansoor'}</strong>
                <span className="text-[11px] text-slate-400">Yamaha Express • ⭐ 4.98 Rating</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${order.riderPhone || '+919876512345'}`}
                className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-colors flex items-center gap-1.5 text-xs font-bold shadow-md shadow-emerald-600/30"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
              <button
                onClick={() => alert(`Connecting live chat with kitchen & rider...`)}
                className="p-2.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>
            </div>
          </div>

          {/* ITEMS SUMMARY */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 mb-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ordered Items</h4>
            {order.items.map((it, i) => (
              <div key={i} className="flex justify-between items-center text-xs">
                <span className="text-slate-300">{it.qty}x {it.itemName}</span>
                <strong className="text-slate-100">{formatPrice(it.price * it.qty)}</strong>
              </div>
            ))}
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs font-bold">
              <span className="text-slate-400">Total Paid ({order.paymentMode})</span>
              <strong className="text-orange-400 text-sm font-heading">{formatPrice(order.totalAmount)}</strong>
            </div>
          </div>

          {/* DEMO STAGE ADVANCER */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                const nextIdx = Math.min(STAGES.length - 1, currentStageIndex + 1);
                updateOrderStatus(order.id, STAGES[nextIdx].key as FoodOrder['status']);
              }}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-700 border border-slate-700"
            >
              Advance Tracking Stage ➔
            </button>
            <button
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl theme-food-gradient text-xs font-black text-white shadow-lg shadow-red-600/30"
            >
              Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
