import React from 'react';
import { Payment } from '../../types';
import { useService } from '../../context/ServiceContext';
import { X, Printer, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface BillReceiptModalProps {
  payment: Payment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BillReceiptModal: React.FC<BillReceiptModalProps> = ({ payment, isOpen, onClose }) => {
  const { formatPrice } = useService();

  if (!isOpen || !payment) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success(`Bill #${payment.billId} downloaded as PDF!`);
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
          className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden z-10"
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* INVOICE CARD */}
          <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 text-slate-300 font-mono text-xs space-y-4">
            
            <div className="text-center pb-4 border-b border-dashed border-slate-800">
              <div className="text-lg font-black font-heading text-white flex items-center justify-center gap-1.5 mb-1">
                <span>🏨 StayEasy</span>
              </div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest block">
                Official Hospitality Bill & Tax Invoice
              </span>
              <div className="inline-block bg-slate-900 px-3 py-1 rounded-full text-amber-400 font-bold mt-2">
                {payment.billId}
              </div>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Time:</span>
                <span className="text-slate-200">{payment.dateTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Guest (Paid By):</span>
                <span className="text-slate-200 font-bold">{payment.paidBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Beneficiary:</span>
                <span className="text-slate-200">{payment.paidTo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Mode:</span>
                <span className="text-amber-400 font-bold">{payment.mode} ({payment.method})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="text-emerald-400 font-bold">
                  {payment.status === 'PAID_ONLINE' ? '✓ PAID ONLINE (UPI / CARD / BANKING)' : payment.status === 'PAID_OFFLINE' ? '✓ PAID OFFLINE (CASH HANDSHAKE VERIFIED)' : 'PENDING'}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-dashed border-slate-800 space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Item / Service:</span>
                <strong className="text-white text-right max-w-[200px] truncate">{payment.itemTitle}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Taxes & Luxury Cess (5%):</span>
                <span>Included</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-bold text-white">
                <span>TOTAL AMOUNT:</span>
                <span className="text-amber-400 text-base font-black">{formatPrice(payment.amount)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-dashed border-slate-800 text-[10px] text-slate-500 text-center">
              🔒 Verified by StayEasy Anti-Scam Smart Ledger. Shared as legal proof of payment.
            </div>

          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 mt-5">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Bill</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 py-3 rounded-xl theme-room-gradient text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
