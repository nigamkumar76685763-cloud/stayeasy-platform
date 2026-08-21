import React, { useState } from 'react';
import { Offer } from '../../types';
import toast from 'react-hot-toast';

interface CreateOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOffer: (offer: Omit<Offer, 'id' | 'createdAt' | 'usageCount'>) => void;
  userId?: string;
  userName?: string;
}

export const CreateOfferModal: React.FC<CreateOfferModalProps> = ({
  isOpen,
  onClose,
  onAddOffer,
  userId = 'host_01',
  userName = 'Vikramaditya Oberoi',
}) => {
  const [newCode, setNewCode] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDiscountType, setNewDiscountType] = useState<'PERCENTAGE' | 'FLAT'>('PERCENTAGE');
  const [newDiscountValue, setNewDiscountValue] = useState<number>(20);
  const [newMinAmount, setNewMinAmount] = useState<number>(3500);
  const [newMaxDiscount, setNewMaxDiscount] = useState<number>(2000);
  const [newValidTill, setNewValidTill] = useState('2026-12-31');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !newTitle) {
      toast.error('Please enter Coupon Code and Title');
      return;
    }

    onAddOffer({
      code: newCode.trim().toUpperCase(),
      title: newTitle,
      description:
        newDescription ||
        `Exclusive ${newDiscountType === 'PERCENTAGE' ? `${newDiscountValue}%` : `₹${newDiscountValue}`} discount set by Host.`,
      discountType: newDiscountType,
      discountValue: Number(newDiscountValue),
      minBookingAmount: Number(newMinAmount),
      maxDiscountAmount: newDiscountType === 'PERCENTAGE' ? Number(newMaxDiscount) : undefined,
      validTill: newValidTill,
      hostId: userId,
      hostName: userName,
      propertyId: 'ALL',
      propertyTitle: 'All Managed Indian Properties',
      isActive: true,
    });

    onClose();
    setNewCode('');
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl" />

      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
              Host Direct Marketing
            </span>
            <h3 className="text-xl font-black text-white font-heading">Create New Promo Offer</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">
              Coupon Promo Code (e.g. MONSOON30, GOA500)
            </label>
            <input
              type="text"
              placeholder="e.g. DIWALI30"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value.toUpperCase())}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono font-black text-amber-400 outline-none uppercase focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Offer Title</label>
            <input
              type="text"
              placeholder="e.g. 🪔 Shubh Diwali Luxury Discount"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500 font-semibold"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Discount Type</label>
              <select
                value={newDiscountType}
                onChange={(e) => setNewDiscountType(e.target.value as 'PERCENTAGE' | 'FLAT')}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-amber-500"
              >
                <option value="PERCENTAGE">Percentage (%) Off</option>
                <option value="FLAT">Flat ₹ INR Off</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">
                {newDiscountType === 'PERCENTAGE' ? 'Discount Percentage (%)' : 'Flat Amount (₹)'}
              </label>
              <input
                type="number"
                value={newDiscountValue}
                onChange={(e) => setNewDiscountValue(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-bold text-white outline-none focus:border-amber-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Min Booking Amount (₹)</label>
              <input
                type="number"
                value={newMinAmount}
                onChange={(e) => setNewMinAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-bold text-white outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Expiry Date</label>
              <input
                type="date"
                value={newValidTill}
                onChange={(e) => setNewValidTill(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="Special festive season discount exclusively for guest bookings..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20"
            >
              Publish Offer Live 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
