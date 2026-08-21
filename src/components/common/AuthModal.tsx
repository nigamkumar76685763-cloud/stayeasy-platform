import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { X, Mail, Lock, User, Phone, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('GUEST');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      register(name || 'StayEasy Member', email || 'guest@stayeasy.com', selectedRole);
    } else {
      login(email || 'guest@stayeasy.com', selectedRole);
    }
    onClose();
  };

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

        {/* MODAL CONTAINER (SPLIT-SCREEN DESIGN) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2"
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800/80 text-slate-400 hover:text-white flex items-center justify-center transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* LEFT: FORM CARD */}
          <div className="p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xl">🏨</span>
                <span className="font-heading font-black text-xl text-white">StayEasy</span>
              </div>

              <h2 className="text-2xl font-black text-white font-heading mb-1">
                {isRegister ? 'Create Your Account' : 'Welcome Back'}
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                {isRegister
                  ? 'Join StayEasy to unlock private suite rates and express room dining.'
                  : 'Enter your credentials to manage your bookings and live orders.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {isRegister && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="e.g. Aarav Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-800/70 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      placeholder="aarav@stayeasy.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-800/70 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>

                {isRegister && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-800/70 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-800/70 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>

                {/* ROLE SELECTION RADIO */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1.5">Sign in as:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['GUEST', 'HOST', 'RESTAURANT'] as UserRole[]).map((r) => (
                      <button
                        type="button"
                        key={r}
                        onClick={() => setSelectedRole(r)}
                        className={`py-1.5 px-2 rounded-xl text-[11px] font-extrabold border transition-all ${
                          selectedRole === r
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        {r === 'GUEST' ? '👤 Guest' : r === 'HOST' ? '🏨 Host' : '🍳 Kitchen'}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full theme-room-gradient text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 hover:opacity-95 transition-opacity mt-4"
                >
                  <span>{isRegister ? 'Complete Registration' : 'Sign In to StayEasy'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-400 mt-4">
              {isRegister ? (
                <span>
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsRegister(false)}
                    className="text-indigo-400 font-bold hover:underline"
                  >
                    Sign In
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setIsRegister(true)}
                    className="text-indigo-400 font-bold hover:underline"
                  >
                    Register Now
                  </button>
                </span>
              )}
            </div>
          </div>

          {/* RIGHT: SPLIT-SCREEN PROMOTIONAL BANNER */}
          <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 border-l border-slate-800 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Luxury Hospitality Ecosystem</span>
              </span>

              <h3 className="text-2xl font-black text-white font-heading leading-tight mb-3">
                Experience 5-Star Accommodations & Gourmet Feasts.
              </h3>
              <p className="text-xs text-indigo-200/80 leading-relaxed mb-6">
                StayEasy connects travelers with verified oceanview penthouses, private havelis, and award-winning kitchen partners with anti-scam payment protection.
              </p>

              <div className="space-y-2.5 text-xs text-indigo-100">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span>Direct Host & Kitchen Chat with Auto-Translation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span>Anti-Scam Cash Denomination Handshake</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span>Live 7-Stage Food Delivery Tracker</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-indigo-900/50 flex items-center justify-between text-xs text-indigo-300">
              <span>⭐ 4.98/5 Rating</span>
              <span>50,000+ Happy Guests</span>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
