import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { UserCircle, Building2, UtensilsCrossed, ShieldCheck, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RoleSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSelectorModal: React.FC<RoleSelectorModalProps> = ({ isOpen, onClose }) => {
  const { role, setRole } = useAuth();

  const handleSelectRole = (newRole: UserRole) => {
    setRole(newRole);
    onClose();
  };

  if (!isOpen) return null;

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
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden z-10"
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-800/80 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-950 text-indigo-300 border border-indigo-800 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Multi-Role Ecosystem</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
              Select Your Portal Experience
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Switch anytime to access customer bookings, host property management, or restaurant kitchen orders.
            </p>
          </div>

          {/* 3 CARDS WITH FLIP ANIMATION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD 1: GUEST */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectRole('GUEST')}
              className={`cursor-pointer rounded-2xl p-6 border transition-all relative overflow-hidden flex flex-col justify-between ${
                role === 'GUEST'
                  ? 'bg-gradient-to-b from-indigo-950/80 to-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/20'
                  : 'bg-slate-800/50 border-slate-700/60 hover:border-slate-600'
              }`}
            >
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl theme-room-gradient flex items-center justify-center text-white mb-4 shadow-lg shadow-indigo-600/30">
                  <UserCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">I'm a Guest</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Book luxury suites, private havelis, and order 5-star in-room gourmet dining.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs font-extrabold text-indigo-400">
                <span>{role === 'GUEST' ? 'Active Role ✓' : 'Switch to Guest'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>

            {/* CARD 2: HOST */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectRole('HOST')}
              className={`cursor-pointer rounded-2xl p-6 border transition-all relative overflow-hidden flex flex-col justify-between ${
                role === 'HOST'
                  ? 'bg-gradient-to-b from-amber-950/80 to-slate-900 border-amber-500 shadow-xl shadow-amber-500/20'
                  : 'bg-slate-800/50 border-slate-700/60 hover:border-slate-600'
              }`}
            >
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 mb-4 shadow-lg shadow-amber-600/30">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">I'm a Host</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  List luxury properties, verify cash handshakes, manage bookings, and deliver room meals.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs font-extrabold text-amber-400">
                <span>{role === 'HOST' ? 'Active Role ✓' : 'Switch to Host'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>

            {/* CARD 3: RESTAURANT */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectRole('RESTAURANT')}
              className={`cursor-pointer rounded-2xl p-6 border transition-all relative overflow-hidden flex flex-col justify-between ${
                role === 'RESTAURANT'
                  ? 'bg-gradient-to-b from-red-950/80 to-slate-900 border-red-500 shadow-xl shadow-red-500/20'
                  : 'bg-slate-800/50 border-slate-700/60 hover:border-slate-600'
              }`}
            >
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl theme-food-gradient flex items-center justify-center text-white mb-4 shadow-lg shadow-red-600/30">
                  <UtensilsCrossed className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">I'm a Restaurant</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Manage culinary menus, receive live kitchen orders, toggle stock availability, and view daily revenue.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs font-extrabold text-orange-400">
                <span>{role === 'RESTAURANT' ? 'Active Role ✓' : 'Switch to Kitchen'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>

          </div>

          <p className="text-center text-xs text-slate-500 mt-6">
            🔒 All accounts support instant role switching with zero data loss.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
