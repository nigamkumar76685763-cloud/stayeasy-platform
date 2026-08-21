import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useService } from '../context/ServiceContext';
import { Offer } from '../types';
import { Tag, Sparkles, Copy, Check, Clock, ShieldCheck, Gift, Percent, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export const OffersPage: React.FC = () => {
  const { offers } = useCart();
  const { formatPrice } = useService();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeOffers = offers.filter(o => o.isActive);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`📋 Coupon code "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO BANNER */}
        <div className="relative rounded-3xl overflow-hidden mb-12 p-8 sm:p-12 border border-amber-500/30 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Festive Indian Discounts & Exclusive Host Deals</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-heading">
              Exclusive StayEasy Offers & Promo Codes
            </h1>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              Superhosts set direct promo codes and seasonal discounts for luxury suites, heritage havelis, and beachfront stays across India. Apply codes directly at checkout!
            </p>
          </div>
          
          <div className="absolute right-6 -bottom-8 opacity-20 pointer-events-none hidden sm:block">
            <Gift className="w-64 h-64 text-amber-400" />
          </div>
        </div>

        {/* OFFERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeOffers.map((offer) => {
            const isCopied = copiedCode === offer.code;

            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between relative overflow-hidden group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 tracking-wider">
                        {offer.discountType === 'PERCENTAGE' ? `${offer.discountValue}% OFF` : `FLAT ₹${offer.discountValue} OFF`}
                      </span>
                      <h3 className="text-xl font-bold text-white font-heading mt-2">
                        {offer.title}
                      </h3>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 text-amber-400">
                      <Percent className="w-6 h-6" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {offer.description}
                  </p>

                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-1 mb-6">
                    <div className="flex justify-between text-slate-400">
                      <span>Minimum Booking:</span>
                      <strong className="text-slate-200">{formatPrice(offer.minBookingAmount)}</strong>
                    </div>
                    {offer.maxDiscountAmount && (
                      <div className="flex justify-between text-slate-400">
                        <span>Max Savings:</span>
                        <strong className="text-emerald-400">{formatPrice(offer.maxDiscountAmount)}</strong>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-400">
                      <span>Valid Till:</span>
                      <strong className="text-slate-200">{offer.validTill}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Set By Host:</span>
                      <strong className="text-amber-400">{offer.hostName}</strong>
                    </div>
                  </div>
                </div>

                {/* PROMO CODE STRIP WITH COPY BUTTON */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-2xl border border-dashed border-amber-500/60 font-mono font-black text-amber-400 tracking-widest text-sm">
                    <Tag className="w-4 h-4" />
                    <span>{offer.code}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyCode(offer.code)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
                    </button>

                    <Link
                      to="/rooms"
                      className="px-4 py-2.5 rounded-xl theme-room-gradient text-white font-black text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-1"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
