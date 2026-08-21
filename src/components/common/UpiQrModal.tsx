import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Copy, ShieldCheck, Smartphone, Clock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

interface UpiQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  payeeName?: string;
  orderTitle?: string;
  onPaymentSuccess: () => void;
}

export const UpiQrModal: React.FC<UpiQrModalProps> = ({
  isOpen,
  onClose,
  amount,
  payeeName = 'StayEasy Luxury Escrow Account',
  orderTitle = 'Luxury Suite Reservation',
  onPaymentSuccess,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 minutes expiry
  const [isVerifying, setIsVerifying] = useState(false);
  const upiId = 'stayeasy.luxury@okhdfcbank';

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(300);
      setIsVerifying(false);
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    toast.success('📋 UPI ID copied to clipboard!');
  };

  const handleSimulatePayment = () => {
    setIsVerifying(true);
    toast.loading('Verifying UPI payment with NPCI bank gateway...', { id: 'upi-gate' });

    setTimeout(() => {
      setIsVerifying(false);
      toast.success('✅ ₹' + amount.toLocaleString('en-IN') + ' received via UPI Escrow!', { id: 'upi-gate' });
      onPaymentSuccess();
      onClose();
    }, 2000);
  };

  // QR Code generator URL using standard safe API
  const upiString = encodeURIComponent(
    `upi://pay?pa=${upiId}&pn=StayEasy&am=${amount}&cu=INR&tn=${encodeURIComponent(orderTitle)}`
  );
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${upiString}&color=070B14&bgcolor=F59E0B`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-center"
        >
          {/* TOP HEADER */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Smartphone className="w-4 h-4" />
              </span>
              <span className="text-xs font-black uppercase text-amber-400">Instant UPI Payment</span>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs"
            >
              ✕
            </button>
          </div>

          <h3 className="text-xl font-black text-white font-heading mb-1">Scan & Pay ₹{amount.toLocaleString('en-IN')}</h3>
          <p className="text-xs text-slate-400 mb-4">{orderTitle}</p>

          {/* QR CODE CONTAINER */}
          <div className="relative mx-auto w-56 h-56 p-3 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-500 shadow-xl shadow-amber-500/20 flex flex-col items-center justify-center mb-4">
            <img src={qrUrl} alt="UPI QR Code" className="w-full h-full rounded-xl object-contain shadow-inner" />
            <span className="absolute -bottom-2.5 bg-slate-950 px-3 py-0.5 rounded-full text-[10px] font-black text-amber-400 border border-amber-500/40 shadow">
              ⚡ GPay • PhonePe • Paytm
            </span>
          </div>

          {/* TIMER & STATUS */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-300 mb-4 font-mono">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>
              QR expires in: <strong className="text-amber-300">{formattedTime}</strong>
            </span>
          </div>

          {/* UPI ID COPY BOX */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between mb-5">
            <div className="text-left">
              <span className="text-[10px] text-slate-400 block font-bold">UPI ID (VPA)</span>
              <span className="text-xs font-mono font-black text-indigo-300">{upiId}</span>
            </div>
            <button
              onClick={handleCopyUpi}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 font-bold"
              title="Copy UPI ID"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>

          {/* ACTION BUTTON */}
          <button
            disabled={isVerifying}
            onClick={handleSimulatePayment}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <span>Verifying Bank Escrow...</span>
            ) : (
              <>
                <span>I Have Paid ₹{amount.toLocaleString('en-IN')}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-bit Encrypted NPCI Escrow Protected</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
