import React from 'react';
import { Payment } from '../../types';
import { useCart } from '../../context/CartContext';
import { useService } from '../../context/ServiceContext';
import { X, Banknote, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface CashDenominationModalProps {
  payment: Payment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CashDenominationModal: React.FC<CashDenominationModalProps> = ({ payment, isOpen, onClose }) => {
  const { confirmCashPayment } = useCart();
  const { formatPrice } = useService();

  if (!isOpen || !payment) return null;

  const handleConfirm = () => {
    const res = confirmCashPayment(payment.id);
    if (res.success) {
      toast.success(res.message);
      onClose();
    } else {
      toast.error(res.message);
    }
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

        {/* MODAL BODY */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden z-10"
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* HEADER */}
          <div className="text-center pb-5 border-b border-slate-800">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-950 text-amber-300 border border-amber-800">
              <Banknote className="w-3.5 h-3.5" />
              <span>OFFLINE CASH PAYMENT</span>
            </span>
            <h2 className="text-xl font-black text-white font-heading mt-2">
              Confirm Cash Collection
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Bill Ref: <strong className="text-slate-200">{payment.billId}</strong>
            </p>
          </div>

          <div className="py-6 space-y-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Guest Name:</span>
                <strong className="text-white">{payment.paidBy}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Item / Reservation:</span>
                <strong className="text-slate-200 max-w-[200px] truncate text-right">{payment.itemTitle}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Mode:</span>
                <span className="text-amber-400 font-bold">Offline Cash on Arrival</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-bold">
                <span className="text-white">Total Cash Amount:</span>
                <span className="text-xl font-black text-amber-400 font-heading">{formatPrice(payment.amount)}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Once confirmed, the reservation will be marked as <strong>PAID OFFLINE</strong> and official GST tax receipt will be issued.</span>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Confirm Cash Received ({formatPrice(payment.amount)})</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
